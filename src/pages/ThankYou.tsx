import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Home } from "lucide-react";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-card border-2 border-border rounded-2xl p-8 max-w-md w-full text-center shadow-lg"
      >
        {/* Иконка галочки с анимацией пульсации */}
        <div 
          className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" 
          style={{ background: "var(--gradient-primary)" }}
        >
          <Check className="w-10 h-10 text-primary-foreground" strokeWidth={3} />
        </div>

        {/* Текст благодарности */}
        <h1 className="font-heading font-bold text-3xl text-foreground mb-3">
          Спасибо за заявку!
        </h1>
        <p className="text-muted-foreground text-base mb-8 leading-relaxed">
          Наш специалист уже получил ваше уведомление и свяжется с вами в течение 15 минут для уточнения всех деталей.
        </p>

        {/* Кнопка возврата на главную */}
        <button
          onClick={() => navigate("/")}
          className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4 shadow-md transition-all active:scale-[0.98]"
        >
          <Home className="w-5 h-5" />
          На главную
        </button>
      </motion.div>
    </div>
  );
};

export default ThankYou;