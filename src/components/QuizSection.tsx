import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Импортируем хук для редиректа
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Send } from "lucide-react";

const questions = [
  {
    q: "Какие кровельные работы необходимо выполнить?",
    options: [["Монтаж кровли"], ["Ремонт кровли"], ["Утепление крыши"], ["Демонтаж кровли"], ["Гидроизоляция"], ["Другое"]],
  },
  {
    q: "Какой тип кровли?",
    options: [["Металлочерепица"], ["Мягкая кровля"], ["Профнастил"], ["Фальцевая кровля"], ["Плоская кровля"], ["Не знаю"]],
  },
  {
    q: "Какая примерная площадь кровли?",
    options: [["До 50 м²"], ["50–100 м²"], ["100–200 м²"], ["200–500 м²"], ["Более 500 м²"], ["Не знаю"]],
  },
];

const QuizSection = () => {
  const navigate = useNavigate(); // Инициализируем навигацию
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [phone, setPhone] = useState("+7 "); // Изначально задаем жесткий префикс

  const isLastQuestion = step === questions.length;
  const progress = (step / (questions.length + 1)) * 100;

  // 1. Шаблон для Телефона: держит префикс +7, пускает только цифры и ограничивает длину
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

  const handleOptionSelect = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[step] = option;
    setAnswers(newAnswers);
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    // Валидация перед отправкой
    const formattedPhone = phone.replace(/\s/g, "");
    if (formattedPhone.length !== 12) {
      alert("Номер телефона должен содержать 11 цифр");
      return;
    }

    const BOT_TOKEN = "8620797217:AAEPQof7Tsrps1CgCBWUwT-s11_MR1D3FLE";
    const CHAT_ID = "-5126230189";

    // Красиво форматируем ответы из квиза для Telegram
    const message = `
📊 *Новая заявка со страницы Квиза!*
📞 *Телефон:* ${formattedPhone}

📋 *Ответы на вопросы:*
1️⃣ *Работы:* ${answers[0] || "Не указано"}
2️⃣ *Тип кровли:* ${answers[1] || "Не указано"}
3️⃣ *Площадь:* ${answers[2] || "Не указано"}
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
        // Очищаем форму
        setPhone("+7 ");
        setAnswers([]);
        setStep(0);
        
        // Перенаправляем на общую страницу спасибо
        navigate("/thank-you");
      } else {
        console.error("Ошибка Telegram API:", response.statusText);
        navigate("/thank-you"); // Всё равно перенаправляем, чтобы не ломать UX
      }
    } catch (error) {
      console.error("Ошибка при отправке квиза в Telegram:", error);
      navigate("/thank-you");
    }
  };

  return (
    <section id="quiz" className="py-20 bg-background" style={{ contentVisibility: "auto" } as React.CSSProperties}>
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="section-title text-foreground">
            Узнайте стоимость <span className="text-primary">за 1 минуту</span>
          </h2>
          <p className="section-subtitle mt-4">
            Ответьте на 3 простых вопроса, чтобы мы рассчитали точную стоимость материалов и работ
          </p>
        </div>

        {/* Прогресс бар */}
        <div className="w-full bg-muted h-2 rounded-full mb-12 overflow-hidden">
          <motion.div
            className="h-full"
            style={{ background: "var(--gradient-primary)" }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="bg-card border-2 border-border rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden min-h-[350px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div
                key="start"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center py-8 flex flex-col items-center justify-center flex-grow"
              >
                <h3 className="font-heading font-black text-3xl text-foreground mb-4">
                  Пройдите быстрый тест
                </h3>
                <p className="text-muted-foreground mb-8 max-w-md text-lg">
                  В конце расчета вы получите подарок: бесплатный выезд инженера-замерщика на ваш объект
                </p>
                <button onClick={() => setStep(1)} className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
                  Начать расчет <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            ) : !isLastQuestion ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-grow flex flex-col justify-center"
              >
                <span className="text-primary font-bold text-sm uppercase tracking-wider mb-2 block">
                  Вопрос {step} из {questions.length}
                </span>
                <h3 className="font-heading font-bold text-2xl text-foreground mb-6">
                  {questions[step - 1].q}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {questions[step - 1].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(opt[0])}
                      className={`text-left p-4 rounded-xl border-2 transition-all font-medium text-base active:scale-[0.99] ${
                        answers[step - 1] === opt[0]
                          ? "border-primary bg-primary/5 text-foreground"
                          : "border-border bg-background text-muted-foreground hover:text-foreground hover:border-primary/50"
                      }`}
                    >
                      {opt[0]}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center py-4 flex flex-col justify-center flex-grow"
              >
                <h3 className="font-heading font-bold text-2xl text-foreground mb-2">Расчет готов!</h3>
                <p className="text-muted-foreground mb-6">Оставьте ваш номер телефона, и мы пришлем смету</p>
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

          {/* Кнопка «Назад» */}
          {step > 0 && (
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