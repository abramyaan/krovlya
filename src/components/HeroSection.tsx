import { motion } from "framer-motion";
import { Shield, FileText, Calculator, Heart, Star, Send, Phone, User } from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/hero-roofing.jpg";

const usps = [
  { icon: Shield, text: "Гарантия 5 лет на все работы" },
  { icon: FileText, text: "Работаем по договору, всё официально" },
  { icon: Calculator, text: "Бесплатный расчёт стоимости и выезд" },
  { icon: Heart, text: "Делаем работу качественно, как для себя" },
];

const HeroSection = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь логика отправки
    setSubmitted(true);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-32 pb-20">
      <div className="absolute inset-0">
        <img 
          src={heroImg} 
          alt="Кровельные работы" 
          className="w-full h-full object-cover" 
          width={1920} 
          height={1080} 
        />
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Левая колонка: Текст */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-6">
              Кровельные работы
              <span className="block text-primary"> по Москве и МО</span>
              <span className="block text-2xl md:text-3xl font-bold mt-2 text-primary-foreground/80">
                Гарантия 5 лет · Без переплат
              </span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {usps.map((usp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                    <usp.icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-primary-foreground/90 text-sm md:text-base">{usp.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Блок доверия */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 p-2 px-4 rounded-xl">
                <div className="flex items-center justify-center w-8 h-8 bg-[#f33] rounded-full text-white font-bold text-lg">Я</div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-white font-bold text-lg leading-none">4.8</span>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <p className="text-white/60 text-[10px] uppercase tracking-wider font-semibold">Яндекс Карты</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 p-2 px-4 rounded-xl">
                <div className="flex gap-0.5">
                  <div className="w-2 h-2 rounded-full bg-[#96ef00]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#ffbb00]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#00aaee]"></div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-white font-bold text-lg leading-none">5.0</span>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <p className="text-white/60 text-[10px] uppercase tracking-wider font-semibold">Авито отзывы</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Правая колонка: Форма */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="bg-background/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/10">
              {!submitted ? (
                <>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-foreground">Заказать выезд мастера</h3>
                    <p className="text-muted-foreground mt-1">Оставьте заявку на бесплатный замер и расчет сметы</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border bg-background focus:border-primary focus:outline-none transition-all"
                      />
                    </div>
                    
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border bg-background focus:border-primary focus:outline-none transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                    >
                      <Send className="w-5 h-5" />
                      Получить расчет
                    </button>
                    
                    <p className="text-[11px] text-center text-muted-foreground px-4">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </form>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
                    <svg className="w-10 h-10 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Спасибо, {name}!</h3>
                  <p className="text-muted-foreground">Мы перезвоним вам в течение 15 минут.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-primary font-semibold hover:underline"
                  >
                    Отправить еще раз
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;