import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Добавили хук для перехода
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Send } from "lucide-react";

const questions = [
  {
    q: "Какие кровельные работы необходимо выполнить?",
    options: ["Монтаж кровли", "Ремонт кровли", "Утепление крыши", "Демонтаж кровли", "Гидроизоляция", "Другое"],
  },
  {
    q: "Какой тип кровли?",
    options: ["Металлочерепица", "Мягкая кровля", "Профнастил", "Фальцевая кровля", "Плоская кровля", "Не знаю"],
  },
  {
    q: "Какая примерная площадь кровли?",
    options: ["До 50 м²", "50–100 м²", "100–200 м²", "200–500 м²", "Более 500 м²", "Не знаю"],
  },
];

const QuizSection = () => {
  const navigate = useNavigate(); // Инициализируем навигацию для редиректа
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<string[]>([]);
  const [phone, setPhone] = useState("+7 "); // Префикс по умолчанию как в MapSection

  const handleOptionSelect = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[step - 1] = option;
    setAnswers(newAnswers);

    setTimeout(() => {
      setStep(step + 1);
    }, 300);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val.startsWith("+7 ")) {
      setPhone("+7 ");
      return;
    }
    const digits = val.slice(3).replace(/\D/g, "");
    if (digits.length <= 10) {
      let formatted = "+7 ";
      if (digits.length > 0) formatted += digits.slice(0, 3);
      if (digits.length > 3) formatted += " " + digits.slice(3, 6);
      if (digits.length > 6) formatted += "-" + digits.slice(6, 8);
      if (digits.length > 8) formatted += "-" + digits.slice(8, 10);
      setPhone(formatted);
    }
  };

  const handleSubmit = async () => {
    const formattedPhone = phone.replace(/\s/g, "").replace(/-/g, "");
    if (formattedPhone.length !== 12) {
      alert("Номер телефона должен содержать 11 цифр");
      return;
    }

    const BOT_TOKEN = "8620797217:AAEPQof7Tsrps1CgCBWUwT-s11_MR1D3FLE";
    const CHAT_ID = "-5126230189";

    const message = `
🎯 *Новая заявка из КВИЗа!*
📋 *Ответы на вопросы:*
1. Работы: ${answers[0] || "Не выбрано"}
2. Тип кровли: ${answers[1] || "Не выбрано"}
3. Площадь: ${answers[2] || "Не выбрано"}

📱 *Телефон:* ${formattedPhone}
    `.trim();

    try {
      // 1. Сначала шлём запрос в Telegram API и ждем промис
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      });

      // 2. Только после завершения fetch делаем физический переход на /thank-you
      navigate("/thank-you");
    } catch (error) {
      console.error("Ошибка квиза:", error);
      navigate("/thank-you");
    }
  };

  return (
    <section id="quiz" className="py-20 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-card border-2 border-border rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden">
          
          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-border">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${(step / (questions.length + 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <AnimatePresence mode="wait">
            {step <= questions.length ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-4 inline-block">
                  Вопрос {step} из {questions.length}
                </span>
                <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-6">
                  {questions[step - 1].q}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {questions[step - 1].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOptionSelect(opt)}
                      className={`p-4 rounded-xl border-2 text-left transition-all text-sm md:text-base font-medium active:scale-[0.99] ${
                        answers[step - 1] === opt
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-muted/50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="text-center py-4"
              >
                <h3 className="font-heading font-bold text-2xl text-foreground mb-2">Расчет готов!</h3>
                <p className="text-muted-foreground mb-6">Оставьте ваш number телефона, и мы пришлем смету</p>
                <div className="max-w-md mx-auto w-full">
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full p-4 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors text-xl mb-4 font-mono text-center"
                  />
                  <button onClick={handleSubmit} className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4">
                    <Send className="w-5 h-5" />
                    Получить расчёт
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {step > 1 && step <= questions.length + 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground mt-6 transition-colors text-sm font-medium self-start active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" /> Назад
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizSection;