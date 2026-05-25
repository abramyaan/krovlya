import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Импортируем хук для навигации
import { X, Send } from "lucide-react";

const CallbackModal = () => {
  const navigate = useNavigate(); // Инициализируем навигацию
  const [phone, setPhone] = useState("+7 "); // Префикс по умолчанию

  const close = () => {
    document.getElementById("callback-modal")?.classList.add("hidden");
    // Сбрасываем форму через небольшую задержку после закрытия, чтобы не дергался UI
    setTimeout(() => {
      setPhone("+7 ");
    }, 300);
  };

  // Шаблон для Телефона: держит префикс +7 и пускает только цифры
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formattedPhone = phone.replace(/\s/g, "");
    if (formattedPhone.length !== 12) {
      alert("Номер телефона должен содержать 11 цифр");
      return;
    }

    const BOT_TOKEN = "8620797217:AAEPQof7Tsrps1CgCBWUwT-s11_MR1D3FLE";
    const CHAT_ID = "-5126230189";

    const message = `
📞 *Заказ обратного звонка из модального окна!*
📱 *Телефон:* ${formattedPhone}
⏳ *Срочность:* Перезвонить в течение 5 минут
    `.trim();

    try {
      // 1. Сначала дожидаемся отправки в ТГ
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

      // 2. После успешного ответа закрываем модалку и делаем железный редирект для Метрики
      close();
      navigate("/thank-you");
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      // Даже если сеть подвела, редиректим, чтобы Яндекс зафиксировал лид
      close();
      navigate("/thank-you");
    }
  };

  return (
    <div
      id="callback-modal"
      className="hidden fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="bg-card border-2 border-border p-6 rounded-2xl max-w-sm w-full relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={close}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-heading font-bold text-2xl text-foreground mb-2">Заказать звонок</h3>
        <p className="text-muted-foreground mb-6">Оставьте номер и мы перезвоним в течение 5 минут</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="+7 (___) ___-__-__"
            required
            value={phone}
            onChange={handlePhoneChange}
            className="w-full p-4 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors text-lg mb-4 font-mono text-center"
          />
          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4">
            <Send className="w-5 h-5" /> Перезвоните мне
          </button>
        </form>
      </div>
    </div>
  );
};

export default CallbackModal;