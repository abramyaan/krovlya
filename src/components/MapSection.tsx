import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Импортируем хук для навигации
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, User, MessageSquare, Camera, X } from "lucide-react";

const MapSection = () => {
  const navigate = useNavigate(); // Инициализируем навигацию
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7 "); // Изначально задаем жесткий префикс
  const [comment, setComment] = useState("");
  const [photo, setPhoto] = useState<File | null>(null); // Стейт для хранения загруженного файла

  // 1. Фильтр для Имени: пропускает только буквы и пробелы
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Удаляем всё, что НЕ является русской/латинской буквой или пробелом
    const cleanName = val.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "");
    setName(cleanName);
  };

  // 2. Шаблон для Телефона: держит префикс +7 и пускает только цифры
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // Если пользователь пытается стереть "+7 ", возвращаем префикс на место
    if (!val.startsWith("+7 ")) {
      setPhone("+7 ");
      return;
    }

    // Извлекаем только ту часть номера, которую вводит пользователь после "+7 "
    const inputNumbers = val.slice(3);
    const cleanNumbers = inputNumbers.replace(/[^\d]/g, "");

    if (cleanNumbers.length <= 10) {
      setPhone("+7 " + cleanNumbers);
    }
  };

  // 3. Обработчик добавления фото с ограничением по размеру (до 5 МБ)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 5 * 1024 * 1024) {
        alert("Файл слишком тяжелый. Пожалуйста, выберите изображение размером до 5 МБ.");
        return;
      }
      setPhoto(file);
    }
  };

  // 4. Функция быстрой очистки выбранного файла
  const clearPhoto = (e: React.MouseEvent) => {
    e.preventDefault(); // Чтобы не триггерился клик по внешнему label
    setPhoto(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim().length < 2) {
      alert("Пожалуйста, введите корректное имя");
      return;
    }

    const formattedPhone = phone.replace(/\s/g, "");
    if (formattedPhone.length !== 12) {
      alert("Номер телефона должен содержать 11 цифр");
      return;
    }

    const BOT_TOKEN = "8620797217:AAEPQof7Tsrps1CgCBWUwT-s11_MR1D3FLE";
    const CHAT_ID = "-5126230189";

    // Строим текст сообщения для уведомления
    const message = `
🔔 *Новая заявка с сайта!*
👤 *Имя:* ${name.trim()}
📞 *Телефон:* ${formattedPhone}
💬 *Комментарий:* ${comment.trim() ? comment.trim() : "Не указан"}
    `.trim();

    try {
      let response;

      if (photo) {
        // Если фото выбрано, шлем multipart/form-data на метод sendPhoto
        const formData = new FormData();
        formData.append("chat_id", CHAT_ID);
        formData.append("photo", photo);
        formData.append("caption", message);
        formData.append("parse_mode", "Markdown");

        response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
          method: "POST",
          body: formData, // Браузер сам выставит нужные заголовки границы multipart формы
        });
      } else {
        // Если фото не выбрано, шлем обычный текстовый JSON на sendMessage
        response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "Markdown",
          }),
        });
      }

      if (response.ok) {
        // Сбрасываем поля формы
        setName("");
        setPhone("+7 ");
        setComment("");
        setPhoto(null);

        // Перенаправляем на страницу «Спасибо»
        navigate("/thank-you");
      } else {
        console.error("Ошибка Telegram API:", response.statusText);
        // Всё равно перекидываем пользователя на страницу спасибо, чтобы не ломать UX
        navigate("/thank-you");
      }
    } catch (error) {
      console.error("Ошибка при отправке заявки в Telegram:", error);
      navigate("/thank-you");
    }
  };

  return (
    <section id="map" className="py-20 bg-muted scroll-mt-10" style={{ contentVisibility: "auto" } as React.CSSProperties}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="section-title text-foreground">
            Наши работы <span className="text-primary">на карте</span>
          </h2>
          <p className="section-subtitle mt-4">
            Работаем по всей Москве и Московской области
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Карта оптимизирована под мобильные устройства */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="rounded-2xl overflow-hidden card-hover h-96 lg:h-auto will-change-transform"
          >
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A44c7e43b6e18e67e7e69e87e0b1f8e2e&amp;source=constructor"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              title="Карта работ"
              loading="lazy"
            />
          </motion.div>

          {/* Форма лидогенерации */}
          <motion.div
            id="lead-form"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-card rounded-2xl p-8 card-hover will-change-transform scroll-mt-32"
          >
            <h3 className="font-heading font-bold text-2xl text-foreground mb-2">Оставить заявку</h3>
            <p className="text-muted-foreground text-sm mb-6">Оставьте ваши контакты, и наш специалист свяжется с вами для консультации</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Ваше имя (только буквы)"
                  required
                  value={name}
                  onChange={handleNameChange}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                />
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Комментарий (необязательно)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Поле выбора файла изображения */}
              <div className="relative">
                <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-border bg-background cursor-pointer hover:border-primary/50 transition-colors justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <Camera className="w-6 h-6 text-muted-foreground shrink-0" />
                    <div className="text-left truncate">
                      <p className="text-sm font-medium text-foreground truncate">
                        {photo ? `Выбран файл: ${photo.name}` : "Прикрепить фото крыши"}
                      </p>
                      <p className="text-xs text-muted-foreground">До 5 МБ (необязательно)</p>
                    </div>
                  </div>
                  
                  {photo && (
                    <button 
                      onClick={clearPhoto}
                      className="p-1 rounded-full hover:bg-accent text-muted-foreground hover:text-destructive transition-colors shrink-0"
                      title="Удалить фото"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden" // Прячем дефолтный инпут
                  />
                </label>
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4 shadow-md transition-all active:scale-[0.98]"
              >
                <Send className="w-5 h-5" />
                Отправить заявку
              </button>
            </form>

            {/* Контакты компании под формой */}
            <div className="mt-8 space-y-4 border-t border-border pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                  <Phone className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telephone</p>
                  <a href="tel:+79999047771" className="font-bold text-foreground hover:text-primary transition-colors">+7 (999) 904-77-71</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href="mailto:samlir272@yandex.ru" className="font-bold text-foreground hover:text-primary transition-colors">samlir272@yandex.ru</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Адрес</p>
                  <p className="font-bold text-foreground">Москва и Московская область</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;