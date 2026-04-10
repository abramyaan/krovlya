import { motion } from "framer-motion";
import { Shield, FileText, Calculator, Heart, Star } from "lucide-react";
import heroImg from "@/assets/hero-roofing.jpg";

const usps = [
  { icon: Shield, text: "Гарантия 5 лет на все работы" },
  { icon: FileText, text: "Работаем по договору, всё официально" },
  { icon: Calculator, text: "Бесплатный расчёт стоимости и выезд на замер" },
  { icon: Heart, text: "Делаем работу качественно, как для себя" },
];

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-32">
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-6">
            Кровельные работы
            <span className="block text-primary"> по Москве и МО</span>
            <span className="block text-2xl md:text-3xl font-bold mt-2 text-primary-foreground/80">
              Гарантия 5 лет · Без переплат
            </span>
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {usps.map((usp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="flex items-center gap-3"
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" 
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <usp.icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-primary-foreground/90 text-sm md:text-base">{usp.text}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <motion.a
              href="#quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="btn-primary text-center text-lg animate-pulse-glow"
            >
              Рассчитать стоимость
            </motion.a>
            <motion.a
              href="#services"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="btn-outline-primary !border-primary-foreground !text-primary-foreground hover:!bg-primary-foreground/10 text-center"
            >
              Наши услуги
            </motion.a>
          </div>

          {/* Блок доверия: Яндекс и Авито */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            {/* Яндекс Карты */}
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

            {/* Авито */}
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
      </div>
    </section>
  );
};

export default HeroSection;