import { motion } from "framer-motion";
import { Check } from "lucide-react";

const prices = [
  { service: "Монтаж металлочерепицы", price: "от 500 ₽/м²" },
  { service: "Монтаж мягкой кровли", price: "от 550 ₽/м²" },
  { service: "Монтаж профнастила", price: "от 450 ₽/м²" },
  { service: "Ремонт кровли", price: "от 350 ₽/м²" },
  { service: "Утепление кровли", price: "от 400 ₽/м²" },
  { service: "Гидроизоляция", price: "от 450 ₽/м²" },
  { service: "Монтаж стропильной системы", price: "от 600 ₽/м²" },
  { service: "Установка водостоков", price: "от 600 ₽/п.м." },
  { service: "Демонтаж старой кровли", price: "от 250 ₽/м²" },
  { service: "Устройство обрешётки", price: "от 150 ₽/м²" },
];

const partners = [
  "Grand Line", "Технониколь", "Shinglas", "Металл Профиль", "Ruukki", "Velux",
];

const PricesSection = () => {
  return (
    <section id="prices" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="section-title text-foreground">
            Цены на <span className="text-primary">кровельные работы</span>
          </h2>
          <p className="section-subtitle mt-4">
            Прозрачное ценообразование без скрытых платежей
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-card rounded-2xl overflow-hidden card-hover mb-16"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "var(--gradient-primary)" }}>
                  <th className="text-left p-4 text-primary-foreground font-heading font-bold">Услуга</th>
                  <th className="text-right p-4 text-primary-foreground font-heading font-bold">Цена</th>
                </tr>
              </thead>
              <tbody>
                {prices.map((item, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors">
                    <td className="p-4 flex items-center gap-2 text-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      {item.service}
                    </td>
                    <td className="p-4 text-right font-bold text-foreground">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Partners */}
        <div className="text-center mb-8">
          <h3 className="font-heading font-bold text-2xl text-foreground mb-2">Наши партнёры</h3>
          <p className="text-muted-foreground">Используем только качественные материалы, сотрудничаем с надёжными и именитыми брендами</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {partners.map((p) => (
            <div key={p} className="px-6 py-3 bg-card rounded-xl font-heading font-bold text-foreground card-hover text-lg">
              {p}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Точную стоимость рассчитаем после замера</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#quiz" className="btn-primary text-lg">Оставить заявку</a>
            <a href="tel:+79991234567" className="btn-outline-primary text-lg">
              Позвоните нам: +7 (999) 123-45-67
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricesSection;
