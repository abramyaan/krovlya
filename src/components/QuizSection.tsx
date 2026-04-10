import { useState } from "react";
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
    options: ["До 50 м²", "50–100 м²", "100–200 м²", "200–500 м²", "Более 500 м²"],
  },
];

const QuizSection = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isLastQuestion = step === questions.length;
  const progress = ((step) / (questions.length + 1)) * 100;

  const selectAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[step] = answer;
    setAnswers(newAnswers);
    if (step < questions.length) {
      setTimeout(() => setStep(step + 1), 300);
    }
  };

  return (
    <section id="quiz" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title text-foreground">
            Рассчитайте стоимость <span className="text-primary">онлайн</span>
          </h2>
          <p className="section-subtitle mt-4">
            Ответьте на несколько простых вопросов и мы рассчитаем стоимость работ
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-card rounded-2xl p-8 card-hover">
          {/* Progress bar */}
          <div className="w-full h-2 bg-muted rounded-full mb-8 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--gradient-primary)" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              step < questions.length ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <p className="text-sm text-muted-foreground mb-2">Вопрос {step + 1} из {questions.length}</p>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-6">{questions[step].q}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {questions[step].options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => selectAnswer(opt)}
                        className={`p-4 rounded-xl border-2 text-left font-medium transition-all duration-200 hover:border-primary hover:bg-accent ${
                          answers[step] === opt ? "border-primary bg-accent text-accent-foreground" : "border-border text-foreground"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">Почти готово!</h3>
                  <p className="text-muted-foreground mb-6">Оставьте номер телефона и мы перезвоним с расчётом</p>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-4 rounded-xl border-2 border-border text-foreground bg-background focus:border-primary focus:outline-none transition-colors text-lg mb-4"
                  />
                  <button
                    onClick={() => setSubmitted(true)}
                    className="btn-primary w-full flex items-center justify-center gap-2 text-lg"
                  >
                    <Send className="w-5 h-5" />
                    Получить расчёт
                  </button>
                </motion.div>
              )
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
                  <svg className="w-8 h-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-heading font-bold text-2xl text-foreground mb-2">Спасибо!</h3>
                <p className="text-muted-foreground">Мы перезвоним вам в ближайшее время</p>
              </motion.div>
            )}
          </AnimatePresence>

          {!submitted && step > 0 && step <= questions.length && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground mt-6 transition-colors"
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
