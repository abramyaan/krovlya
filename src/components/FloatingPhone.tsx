import React from "react";
import { Phone } from "lucide-react";

const FloatingPhone = () => {
  return (
    <a
      href="tel:+79991234567"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 will-change-transform md:bottom-8 md:right-8"
      style={{ 
        background: "var(--gradient-primary)",
        boxShadow: "0 4px 20px rgba(239, 68, 68, 0.4)" // Подставь альфа-цвет под свою тему
      }}
      aria-label="Позвонить нам"
    >
      {/* Пульсирующий фоновый эффект для привлечения внимания */}
      <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping pointer-events-none" style={{ animationDuration: '2s' }} />
      
      {/* Иконка телефона */}
      <Phone className="w-6 h-6 animate-pulse" />
    </a>
  );
};

export default FloatingPhone;