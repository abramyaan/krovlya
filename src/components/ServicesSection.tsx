import React from "react";
import { motion } from "framer-motion";
import montazhImg from "@/assets/service-montazh.jpg";
import remontImg from "@/assets/service-remont.jpg";
import uteplenieImg from "@/assets/service-uteplenie.jpg";
import vodostokImg from "@/assets/service-vodostok.jpg";
import gidroImg from "@/assets/service-gidro.jpg";
import demontazhImg from "@/assets/service-demontazh.jpg";

// Массив из 8 услуг (идеально для сетки 4х2 на ПК и 2х4 на мобильных)
const services = [
  { 
    title: "Монтаж кровли", 
    desc: "Профессиональный монтаж кровли любой сложности под Ваш бюджет с нуля под ключ. Работаем со всеми типами покрытий.", 
    img: montazhImg, 
    price: "от 500 ₽/м²" 
  },
  { 
    title: "Ремонт кровли", 
    desc: "Устранение протечек, частичная замена повреждённых элементов, восстановление герметичности кровельного покрытия.", 
    img: remontImg, 
    price: "от 350 ₽/м²" 
  },
  { 
    title: "Устранение протечек кровли", 
    desc: "Используем профессиональные тепловизоры и влагомеры. Находим точное место повреждения без тотального вскрытия пирога, экономя до 70% бюджета.", 
    img: gidroImg, // Временная заглушка
    price: "от 2 500 ₽" 
  },
  { 
    title: "Ремонт мансардных окон", 
    desc: "Комплексный ремонт в районе окон с демонтажом покрытия, оперативное устранение протечек, герметизация стыков и примыканий.", 
    img: remontImg, // Временная заглушка
    price: "от 1 200 ₽/шт." 
  },
  { 
    title: "Утепление крыши", 
    desc: "Теплоизоляция кровли и качественный демонтаж старого утеплителя. Снижение общих теплопотерь здания до 40%.", 
    img: uteplenieImg, 
    price: "от 400 ₽/м²" 
  },
  { 
    title: "Водосточные системы и аксессуары", 
    desc: "Монтаж водостоков, снегозадержателей, ветровых планок, ендов, коньков и карнизов для полной защиты фасада и фундамента.", 
    img: vodostokImg, 
    price: "от 600 ₽/п.м." 
  },
  { 
    title: "Реставрация покрытия", 
    desc: "Отреставрируем и вернем первозданный вид любому кровельному покрытию — как самому современному, так и традиционному.", 
    img: montazhImg, // Временная заглушка
    price: "от 300 ₽/м²" 
  },
  { 
    title: "Демонтаж кровли", 
    desc: "Аккуратный и безопасный демонтаж старого кровельного пирога любой толщины с последующим быстрым вывозом строительного мусора.", 
    img: demontazhImg, 
    price: "от 250 ₽/м²" 
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="section-title text-foreground">
            Кровельные <span className="text-primary">услуги</span>
          </h2>
          <p className="section-subtitle mt-4">
            Полный комплекс кровельных работ для частных домов и коммерческих объектов
          </p>
        </div>

        {/* Сетка: на мобилках 2 столбца (grid-cols-2), на планшетах 3 (md:grid-cols-3), на ПК 4 (lg:grid-cols-4) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Высота контейнера картинки уменьшена до h-36/h-44, чтобы плитки на мобильных и ПК смотрелись компактно */}
                <div className="relative h-36 md:h-44 overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div 
                    className="absolute top-2 right-2 md:top-4 md:right-4 px-2.5 py-1 rounded-full text-xs md:text-sm font-bold text-primary-foreground shadow-md" 
                    style={{ background: "var(--gradient-primary)" }}
                  >
                    {s.price}
                  </div>
                </div>
                
                <div className="p-4 md:p-6">
                  <h3 className="font-heading font-bold text-base md:text-xl text-foreground mb-1.5 line-clamp-2 min-h-[3rem] md:min-h-[3.5rem] flex items-center">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm mb-4 line-clamp-3 md:line-clamp-4 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>

              <div className="p-4 md:p-6 pt-0">
                <a 
                  href="#lead-form" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    const el = document.getElementById("lead-form"); 
                    if(el){ 
                      el.scrollIntoView({ behavior: "smooth", block: "center" });
                    } 
                  }} 
                  className="btn-primary block text-center text-xs md:text-sm !py-2 md:!py-2.5 w-full active:scale-95 transition-transform"
                >
                  Оставить заявку
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;