import React, { useState } from "react";
import { X, Send } from "lucide-react";

const CallbackModal = () => {
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const close = () => {
    document.getElementById("callback-modal")?.classList.add("hidden");
    // Сбрасываем форму через небольшую задержку после закрытия, чтобы не дергался UI
    setTimeout(() => {
      setPhone("");
      setSubmitted(false);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone.trim()) return;

    const BOT_TOKEN = "8620797217:AAEPQof7Tsrps1CgCBWUwT-s11_MR1D3FLE";
    const CHAT_ID = "-5126230189";

    const message = `
📞 *Заказ обратного звонка из модального окна!*
📱 *Телефон:* ${phone}
⏳ *Срочность:* Перезвонить в течение 5 минут
    `.trim();

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
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

      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error("Ошибка Telegram API:", response.statusText);
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Ошибка сети при отправке звонка:", error);
      setSubmitted(true);
    }
  };

  return (
    <div id="callback-modal" className="hidden fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50 backdrop-blur-sm" onClick={close}>
      <div className="bg-card rounded-2xl p-8 max-w-md w-full mx-4 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={close} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-6 h-6" />
        </button>
        <h3 className="font-heading font-bold text-2xl text-foreground mb-2">Заказать звонок</h3>
        <p className="text-muted-foreground mb-6">Оставьте номер и мы перезвоним в течение 5 минут</p>
        
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <input
              type="tel"
              placeholder="+7 (___) ___-__-__"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors text-lg mb-4"
            />
            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4">
              <Send className="w-5 h-5" /> Перезвоните мне
            </button>
          </form>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <svg className="w-7 h-7 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-heading font-bold text-xl text-foreground">Спасибо! Ожидайте звонка</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallbackModal;