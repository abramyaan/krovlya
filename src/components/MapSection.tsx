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
    const cleanName = val.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "");
    setName(cleanName);
  };

  // 2. Шаблон для Телефона: держит префикс +7 и пускает только цифры
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (!val.startsWith("+7 ")) {
      setPhone("+7 ");
      return;
    }

    const inputNumbers = val.slice(3);
    const cleanNumbers = inputNumbers.replace(/[^\d]/g, "");

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

  // Экранируем спецсимволы HTML чтобы пользовательский ввод не сломал разметку
  const escHtml = (str: string) =>
    str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanPhone = phone.replace(/\s/g, "");
    if (cleanPhone.length < 12) {
      alert("Пожалуйста, введите корректный номер телефона");
      return;
    }

    const BOT_TOKEN = "8620797217:AAEPQof7Tsrps1CgCBWUwT-s11_MR1D3FLE";
    const CHAT_ID = "-5126230189";

    // parse_mode HTML — не ломается от спецсимволов в пользовательском вводе
    const message = [
      "📝 <b>Новая заявка с формы у карты!</b>",
      `👤 <b>Имя:</b> ${escHtml(name || "Не указано")}`,
      `📱 <b>Телефон:</b> ${escHtml(phone)}`,
      `💬 <b>Комментарий:</b> ${escHtml(comment || "Без комментария")}`,
      `📎 <b>Фото:</b> ${photo ? `Прикреплено (${escHtml(photo.name)})` : "Нет"}`,
    ].join("\n");

    try {
      // 1. Отправляем текстовые данные в ТГ
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      });
      if (!res.ok) console.error("TG sendMessage error:", await res.text());

      // 2. Если есть фото — отправляем вторым запросом
      if (photo) {
        const formData = new FormData();
        formData.append("chat_id", CHAT_ID);
        formData.append("photo", photo);

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
          method: "POST",
          body: formData,
        });
      }

      // Фиксируем цель в Яндекс.Метрике
      if (typeof window !== "undefined" && (window as any).ym) {
        (window as any).ym(109268456, "reachGoal", "form_submit");
      }

      // Сбрасываем форму и переходим на страницу благодарности
      setName(""); setPhone("+7 "); setComment(""); setPhoto(null);
      navigate("/thank-you");

    } catch (error) {
      console.error("Ошибка отправки:", error);
      if (typeof window !== "undefined" && (window as any).ym) {
        (window as any).ym(109268456, "reachGoal", "form_submit");
      }
      setName(""); setPhone("+7 "); setComment(""); setPhoto(null);
      navigate("/thank-you");
    }
  };

  return (
    <section id="map" className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Форма слева */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card border-2 border-border p-6 md:p-10 rounded-3xl shadow-xl z-10"
          >
            <h2 className="font-heading font-bold text-3xl text-foreground mb-2">Вызовите замерщика бесплатно</h2>
            <p className="text-muted-foreground mb-8">Оставьте ваши контакты, наш инженер приедет в удобное время, сделает точный замер и рассчитает смету.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={handleNameChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-background border-2 border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-background border-2 border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                />
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                <textarea
                  placeholder="Комментарий или описание задачи (необязательно)"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-background border-2 border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Загрузка фото */}
              <div className="pt-2">
                {!photo ? (
                  <label className="flex items-center justify-center gap-2 w-full py-3 px-4 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-all text-sm font-medium text-muted-foreground">
                    <Camera className="w-5 h-5 text-primary" />
                    <span>Прикрепить фото крыши (необязательно)</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-muted/40 border-2 border-border rounded-xl animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 overflow-hidden pr-2">
                      <Camera className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm font-medium text-foreground truncate">{photo.name}</span>
                    </div>
                    <button type="button" onClick={removePhoto} className="text-muted-foreground hover:text-destructive transition-colors shrink-0 p-1">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base mt-4">
                <Send className="w-5 h-5" /> Отправить заявку
              </button>
            </form>
          </motion.div>

          {/* Карта и контакты справа */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col h-full justify-between gap-8"
          >
            <div className="rounded-3xl border-2 border-border overflow-hidden shadow-lg h-[300px] sm:h-[350px] md:h-[400px] w-full relative bg-muted/20">
              <iframe 
                loading="lazy"
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A36ed75dfbdf3684bc22ba8c31b3bf07e997a3ee3e7f45c2fdfdc0858e390bd01&amp;source=constructor"
                width="100%"
                height="100%"
                frameBorder="0"
                className="absolute inset-0"
                title="Карта офиса Кровля МСК"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-card border-2 border-border p-6 rounded-3xl shadow-md">
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