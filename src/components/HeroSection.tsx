import React from "react";
import { motion } from "framer-motion";
import { Shield, FileText, Calculator, Heart, Star, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-roofing.jpg";

const usps = [
  { icon: Shield, text: "Гарантия 5 лет на все работы" },
  { icon: FileText, text: "Работаем по договору, всё официально" },
  { icon: Calculator, text: "Бесплатный расчёт стоимости и выезд" },
  { icon: Heart, text: "Делаем работу качественно, как для себя" },
];

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <img 
          src={heroImg} 
          alt="Кровельные работы" 
          className="w-full h-full object-cover"
          width={1920} 
          height={1080} 
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-9 will-change-transform"
          >
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-6">
              Кровельные работы
              <span className="block text-primary"> по Москве и МО</span>
              <span className="block text-2xl md:text-3xl font-bold mt-2 text-primary-foreground/80">
                Гарантия 5 лет · Без переплат
              </span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-3xl">
              {usps.map((usp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                    <usp.icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-primary-foreground/90 text-sm md:text-base">{usp.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Ссылка теперь ведет прямо на форму скролла */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-12"
            >
              <a
                href="#map"
                onClick={(e) => { e.preventDefault(); document.getElementById("map")?.scrollIntoView({ behavior: "smooth" }); }}
                className="btn-primary inline-flex items-center justify-center gap-3 text-lg py-4 px-8 md:px-12 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Оставить заявку
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="flex flex-wrap items-center justify-start gap-4 mt-6 border-t border-white/10 pt-6 max-w-xl"
            >
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 p-2 px-4 rounded-xl transition-transform transform hover:scale-105">
                <div className="flex items-center justify-center w-8 h-8 bg-[#f33] rounded-full text-white font-bold text-lg">Я</div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-white font-bold text-lg leading-none">4.8</span>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <p className="text-white/60 text-[10px] uppercase tracking-wider font-semibold">Яндекс Карты</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 p-2 px-4 rounded-xl transition-transform transform hover:scale-105">
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

        </div>
      </div>
    </section>
  );
};

export default HeroSection;