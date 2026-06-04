import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

// Структурированные данные на 2026 год на основе присланной таблицы
const priceCategories = [
  {
    category: "Фальцевая кровля",
    items: [
      { name: "Монтаж фальцевых панелей", unit: "м²", dual: "870 ₽", walm: "1 045 ₽", complex: "1 220 ₽" },
      { name: "Монтаж примыканий к стене/трубе", unit: "пог.м.", dual: "820 ₽", walm: "970 ₽", complex: "1 070 ₽" },
      { name: "Монтаж капельника на примыкание", unit: "пог.м.", dual: "276 ₽", walm: "314 ₽", complex: "370 ₽" },
      { name: "Монтаж коньков, вальм", unit: "пог.м.", dual: "820 ₽", walm: "970 ₽", complex: "1 070 ₽" },
      { name: "Устройство ендов", unit: "пог.м.", dual: "820 ₽", walm: "970 ₽", complex: "1 070 ₽" },
      { name: "Монтаж торцевых планок", unit: "пог.м.", dual: "539 ₽", walm: "639 ₽", complex: "764 ₽" },
      { name: "Монтаж карнизных планок", unit: "пог.м.", dual: "539 ₽", walm: "639 ₽", complex: "764 ₽" },
    ]
  },
  {
    category: "Металлочерепица / штучная черепица",
    items: [
      { name: "Монтаж металлочерепицы", unit: "м²", dual: "370 ₽", walm: "445 ₽", complex: "1 364 ₽" },
      { name: "Монтаж керамической черепицы", unit: "м²", dual: "970 ₽", walm: "1 170 ₽", complex: "1 364 ₽" },
      { name: "Монтаж примыканий к стене/трубе", unit: "пог.м.", dual: "539 ₽", walm: "639 ₽", complex: "751 ₽" },
      { name: "Монтаж коньков, вальм", unit: "пог.м.", dual: "426 ₽", walm: "501 ₽", complex: "583 ₽" },
      { name: "Устройство ендов", unit: "пог.м.", dual: "451 ₽", walm: "533 ₽", complex: "633 ₽" },
      { name: "Монтаж торцевых планок", unit: "пог.м.", dual: "539 ₽", walm: "501 ₽", complex: "564 ₽" },
      { name: "Монтаж карнизных планок", unit: "пог.м.", dual: "426 ₽", walm: "501 ₽", complex: "564 ₽" },
    ]
  },
  {
    category: "Мягкая битумная черепица",
    items: [
      { name: "Монтаж гибкой черепицы", unit: "м²", dual: "426 ₽", walm: "501 ₽", complex: "583 ₽" },
      { name: "Монтаж подкладочного ковра", unit: "м²", dual: "76 ₽", walm: "95 ₽", complex: "101 ₽" },
      { name: "Монтаж примыканий к стене/трубе", unit: "пог.м.", dual: "483 ₽", walm: "583 ₽", complex: "683 ₽" },
      { name: "Монтаж коньков, вальм", unit: "пог.м.", dual: "539 ₽", walm: "639 ₽", complex: "751 ₽" },
      { name: "Устройство ендов", unit: "пог.м.", dual: "451 ₽", walm: "533 ₽", complex: "633 ₽" },
      { name: "Монтаж торцевых планок", unit: "пог.м.", dual: "426 ₽", walm: "501 ₽", complex: "564 ₽" },
      { name: "Монтаж карнизных планок", unit: "пог.м.", dual: "426 ₽", walm: "501 ₽", complex: "564 ₽" },
    ]
  },
  {
    category: "Монтаж несущих конструкций и утепление",
    items: [
      { name: "Монтаж мауэрлата", unit: "пог.м.", dual: "820 ₽", walm: "970 ₽", complex: "1 070 ₽" },
      { name: "Монтаж стропильной системы", unit: "м²", dual: "970 ₽", walm: "1 170 ₽", complex: "1 364 ₽" },
      { name: "Монтаж чернового потолка", unit: "м²", dual: "133 ₽", walm: "176 ₽", complex: "195 ₽" },
      { name: "Укладка пароизоляции", unit: "м²", dual: "114 ₽", walm: "133 ₽", complex: "133 ₽" },
      { name: "Укладка утеплителя", unit: "м²", dual: "133 ₽", walm: "151 ₽", complex: "176 ₽" },
      { name: "Укладка гидроизоляции", unit: "м²", dual: "114 ₽", walm: "114 ₽", complex: "114 ₽" },
      { name: "Монтаж контробрешетки", unit: "м²", dual: "76 ₽", walm: "85 ₽", complex: "93 ₽" },
      { name: "Монтаж разреженной обрешетки", unit: "м²", dual: "133 ₽", walm: "151 ₽", complex: "176 ₽" },
      { name: "Монтаж шаговой обрешетки", unit: "м²", dual: "151 ₽", walm: "176 ₽", complex: "195 ₽" },
      { name: "Устройство сплошного основания из фанеры/ОСП", unit: "м²", dual: "145 ₽", walm: "176 ₽", complex: "195 ₽" },
      { name: "Обработка швов (для битумной черепицы)", unit: "м²", dual: "39 ₽", walm: "39 ₽", complex: "39 ₽" },
      { name: "Септирование пиломатериалов", unit: "м³", dual: "2 145 ₽", walm: "2 145 ₽", complex: "2 145 ₽" },
    ]
  }
];

const partners = [
  "Grand Line", "Технониколь", "Shinglas", "Металл Профиль", "Ruukki", "Velux",
];

const PricesSection = () => {
  return (
    <section id="prices" className="py-20 bg-muted" style={{ contentVisibility: "auto" } as React.CSSProperties}>
      <div className="container mx-auto px-4">
        
        {/* Оглавление на 2026 год */}
        <div className="text-center mb-14">
          <h2 className="section-title text-foreground">
            Стоимость кровельных работ <span className="text-primary">на 2026 год</span>
          </h2>
          <p className="section-subtitle mt-4">
            Прозрачные расценки в зависимости от геометрии вашей крыши. Фиксируем смету в договоре.
          </p>
        </div>

        {/* Информационная плашка для мобилок (Оптимизация под Android) */}
        <div className="block lg:hidden text-center text-xs text-muted-foreground mb-2 animate-pulse">
          ← Сдвиньте таблицу влево, чтобы увидеть все цены →
        </div>

        {/* Главный блок таблицы */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          className="max-w-5xl mx-auto bg-card rounded-2xl overflow-hidden card-hover mb-16"
        >
          <div className="overflow-x-auto [WebkitOverflowScrolling:touch]">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr style={{ background: "var(--gradient-primary)" }}>
                  <th className="p-4 text-primary-foreground font-heading font-bold w-[35%]">Наименование работ</th>
                  <th className="p-4 text-primary-foreground font-heading font-bold text-center w-[10%]">Ед. изм.</th>
                  <th className="p-4 text-primary-foreground font-heading font-bold text-right w-[18%]">Двускатная (от)</th>
                  <th className="p-4 text-primary-foreground font-heading font-bold text-right w-[18%]">Вальмовая (от)</th>
                  <th className="p-4 text-primary-foreground font-heading font-bold text-right w-[19%]">Сложная (от)</th>
                </tr>
              </thead>
              <tbody>
                {priceCategories.map((cat, catIdx) => (
                  <React.Fragment key={catIdx}>
                    {/* Категорийный разделитель внутри таблицы */}
                    <tr className="bg-accent/40 border-b border-border">
                      <td colSpan={5} className="p-3 pl-4 font-heading font-extrabold text-primary uppercase tracking-wider text-xs md:text-sm">
                        {cat.category}
                      </td>
                    </tr>
                    
                    {/* Строки с услугами */}
                    {cat.items.map((item, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-accent/20 transition-colors">
                        <td className="p-4 flex items-start gap-2 text-foreground text-sm md:text-base font-medium">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                          <span>{item.name}</span>
                        </td>
                        <td className="p-4 text-center text-muted-foreground text-xs md:text-sm whitespace-nowrap">
                          {item.unit}
                        </td>
                        <td className="p-4 text-right font-bold text-foreground text-sm md:text-base whitespace-nowrap">
                          {item.dual}
                        </td>
                        <td className="p-4 text-right font-bold text-foreground text-sm md:text-base whitespace-nowrap">
                          {item.walm}
                        </td>
                        <td className="p-4 text-right font-bold text-foreground text-sm md:text-base whitespace-nowrap text-primary">
                          {item.complex}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Блок партнеров */}
        <div className="text-center mb-8">
          <h3 className="font-heading font-bold text-2xl text-foreground mb-2">Наши партнёры</h3>
          <p className="text-muted-foreground">Работаем напрямую с производителями материалов, гарантируя дилерские цены</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {partners.map((p) => (
            <div key={p} className="px-6 py-3 bg-card rounded-xl font-heading font-bold text-foreground card-hover text-lg">
              {p}
            </div>
          ))}
        </div>

        {/* CTA кнопки */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Окончательная смена формируется инженером после бесплатного замера</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#map" onClick={(e) => { e.preventDefault(); const el = document.getElementById("map"); if(el){ el.style.contentVisibility="visible"; setTimeout(() => { const top = el.getBoundingClientRect().top + window.scrollY - 100; window.scrollTo({ top, behavior: "smooth" }); }, 50); }; }} className="btn-primary text-lg px-8 py-4 rounded-xl shadow-md transition-transform active:scale-95">
              Оставить заявку
            </a>
            <a href="tel:+79999047771" className="btn-outline-primary text-lg px-8 py-4 rounded-xl transition-transform active:scale-95">
              Позвоните нам: +7 (999) 904-77-71
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PricesSection;