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

    // Ограничиваем ввод 10 цифрами (чтобы суммарно с +7 было 11 цифр)
    if (cleanNumbers.length <= 10) {
      setPhone("+7 " + cleanNumbers);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Проверяем длину номера телефона перед отправкой (должно быть ровно 11 цифр без учета пробелов, т.е. +7XXXXXXXXXX = 12 символов)
    const formattedPhone = phone.replace(/\s/g, "");
    if (formattedPhone.length !== 12) {
      alert("Номер телефона должен содержать 11 цифр");
      return;
    }

    // ⚡ МОМЕНТАЛЬНЫЙ ПЕРЕХОД: уводим пользователя мгновенно, не дожидаясь ответа от Telegram API
    navigate("/thank-you");

    const BOT_TOKEN = "8620797217:AAEPQof7Tsrps1CgCBWUwT-s11_MR1D3FLE";
    const CHAT_ID = "-5126230189";

    // Строим сообщение для группы
    const message = `
🔔 *Новая заявка с карты (Контакты)!*
👤 *Имя:* ${name || "Не указано"}
📞 *Телефон:* ${formattedPhone}
💬 *Комментарий:* ${comment.trim() ? comment : "Не указан"}
📎 *Фотография:* ${photo ? `Прикреплена (${photo.name})` : "Нет"}
    `.trim();

    // Асинхронно отправляем в Telegram на фоне, чтобы не тормозить интерфейс
    (async () => {
      try {
        if (photo) {
          const formData = new FormData();
          formData.append("chat_id", CHAT_ID);
          formData.append("photo", photo);
          formData.append("caption", message);
          formData.append("parse_mode", "Markdown");

          await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
            method: "POST",
            body: formData,
          });
        } else {
          await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
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
      } catch (error) {
        console.error("Ошибка при отправке в Telegram:", error);
      }
    })();
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
            viewport={{ once: true }}
            className="w-full h-[450px] lg:h-auto rounded-2xl overflow-hidden border-2 border-border shadow-sm bg-card min-h-[350px]"
          >
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A999c153724c9359e1903ba868b4491702d08a9c3dcb6bc781c7f7bc8d554a938&amp;source=constructor"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Яндекс Карта объектов"
              loading="lazy"
              className="w-full h-full"
            ></iframe>
          </motion.div>

          {/* Форма контактов */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border-2 border-border rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between"
          >
            <div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-2">Вызовите замерщика</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Оставьте контакты, прикрепите фото текущего состояния крыши, и мы свяжемся с вами для согласования времени выезда. Это бесплатно.
              </p>

              {/* Добавил id="lead-form" сюда, чтобы плавно перекидывало из Hero */}
              <form id="lead-form" onSubmit={handleSubmit} className="space-y-4 scroll-mt-24">
                {/* Инпут Имени */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={handleNameChange}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                {/* Инпут Телефона */}
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                  />
                </div>

                {/* Текстовое поле Комментария */}
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                  <textarea
                    placeholder="Комментарий к объекту (какие работы нужны, размеры)"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Загрузка фото */}
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-4 py-3 bg-muted text-muted-foreground rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:text-foreground cursor-pointer transition-all text-sm font-medium active:scale-95">
                    <Camera className="w-4 h-4" />
                    <span>{photo ? "Изменить фото" : "Прикрепить фото крыши"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  {photo && (
                    <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 px-3 py-1.5 rounded-lg text-xs font-medium text-foreground">
                      <span className="truncate max-w-[150px]">{photo.name}</span>
                      <button type="button" onClick={removePhoto} className="text-destructive hover:text-red-700 transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base font-semibold">
                  <Send className="w-5 h-5" /> Отправить заявку
                </button>
              </form>
            </div>

            {/* Блок контактов */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                  <Phone className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Telephone</p>
                  <a href="tel:+79999047771" className="font-bold text-foreground hover:text-primary transition-colors text-sm">+7 (999) 904-77-71</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <a href="mailto:samlir272@yandex.ru" className="font-bold text-foreground hover:text-primary transition-colors text-sm">samlir272@yandex.ru</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Адрес</p>
                  <p className="font-bold text-foreground text-sm">Москва и Московская область</p>
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