import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Send, Loader2 } from "lucide-react";

const CallbackModal = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("+7 ");
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const close = () => {
    document.getElementById("callback-modal")?.classList.add("hidden");
    setTimeout(() => { setPhone("+7 "); setPhoneError(""); }, 300);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneError("");
    const val = e.target.value;
    const digitsOnly = val.replace(/\D/g, "");
    if (digitsOnly.length >= 10) {
      setPhone("+7 " + digitsOnly.slice(-10));
      return;
    }
    if (!val.startsWith("+7 ")) { setPhone("+7 "); return; }
    const clean = val.slice(3).replace(/[^\d]/g, "");
    if (clean.length <= 10) setPhone("+7 " + clean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 11) {
      setPhoneError("Введите полный номер телефона");
      return;
    }

    setIsLoading(true);

    const BOT_TOKEN = "8620797217:AAEPQof7Tsrps1CgCBWUwT-s11_MR1D3FLE";
    const CHAT_ID = "-5126230189";

    const message = [
      "📞 <b>Заказ обратного звонка!</b>",
      `📱 <b>Телефон:</b> ${phone}`,
      "⏳ <b>Срочность:</b> Перезвонить в течение 5 минут",
    ].join("\n");

    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      });
      if (!res.ok) console.error("TG callback error:", await res.text());

      close();
      if (typeof window !== "undefined" && (window as any).ym) {
        (window as any).ym(109268456, "reachGoal", "form_submit");
      }
      setIsLoading(false);
      navigate("/thank-you");
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      close();
      if (typeof window !== "undefined" && (window as any).ym) {
        (window as any).ym(109268456, "reachGoal", "form_submit");
      }
      setIsLoading(false);
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
            autoComplete="tel"
            className={`w-full p-4 rounded-xl border-2 bg-background text-foreground focus:outline-none transition-colors text-lg mb-1 font-mono text-center ${
              phoneError ? "border-destructive" : "border-border focus:border-primary"
            }`}
          />
          {phoneError && <p className="text-destructive text-sm mb-3 text-center">{phoneError}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading
              ? <><Loader2 className="w-5 h-5 animate-spin" /> Отправляем...</>
              : <><Send className="w-5 h-5" /> Перезвоните мне</>
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default CallbackModal;