import { motion } from "framer-motion";
import { Star, CheckCircle, ArrowRight } from "lucide-react";
import rev1 from "@/assets/review-1.jpg";
import rev2 from "@/assets/review-2.jpg";
import rev3 from "@/assets/review-3.jpg";

const reviews = [
  {
    name: "Алексей Петров",
    location: "г. Одинцово",
    text: "Отличная бригада! Сделали крышу за неделю, всё аккуратно и качественно. Гарантию дали на 5 лет, работали по договору. Рекомендую!",
    rating: 5,
    img: rev1,
  },
  {
    name: "Елена Смирнова",
    location: "г. Подольск",
    text: "Обратились для ремонта кровли после зимы — протекало. Ребята быстро приехали, всё починили. Цены адекватные, без накруток. Спасибо!",
    rating: 5,
    img: rev2,
  },
  {
    name: "Виктор Николаев",
    location: "г. Чехов",
    text: "Заказывал полный монтаж кровли на новый дом. Результат превзошёл ожидания. Профессиональный подход, чистота на объекте. Буду обращаться ещё.",
    rating: 5,
    img: rev3,
  },
  {
    name: "Михаил Козлов",
    location: "г. Красногорск",
    text: "Долго искал мастеров для монтажа сложной кликфальцевой кровли. Парни справились на ура, геометрия идеальная, примыкания к трубам проработали на совесть. Смета в процессе не выросла ни на рубль.",
    rating: 5,
    img: rev2,
  },
  {
    name: "Дмитрий Воронов",
    location: "г. Раменское",
    text: "Заказывал перекрытие старой крыши из шифера на современную металлочерепицу Grand Line. Демонтировали старый хлам быстро, стропила укрепили, за собой всё убрали и вывезли. Настоящие профи.",
    rating: 5,
    img: rev3,
  },
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-20" style={{ contentVisibility: "auto" } as React.CSSProperties}>
      <div className="container mx-auto px-4">
        {/* Блок Отзывов */}
        <div className="text-center mb-14">
          <h2 className="section-title text-foreground">
            Отзывы <span className="text-primary">клиентов</span>
          </h2>
          <p className="section-subtitle mt-4">
            Что говорят о нас наши заказчики
          </p>
        </div>

        {/* Сетка перестроена: на планшетах (md) в 2 колонки, на ПК (lg) в 3 колонки */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={r.img}
                  alt={r.name}
                  loading="lazy"
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary shrink-0"
                />
                <div>
                  <h4 className="font-heading font-bold text-foreground text-base leading-tight">{r.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.location}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary shrink-0" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Смысловой SEO-блок об устранении протечек кровли */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-card border-2 border-border p-6 md:p-10 rounded-2xl shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7">
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">
                Ремонт кровли и <span className="text-primary">устранение протечек</span>
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                Ремонт кровли и устранение протечек — важные услуги для сохранения надежности и долговечности вашей крыши. Протечки негативно воздействуют на конструкцию здания, вызывая коррозию, гниение и плесень. Своевременное устранение проблем предотвратит серьезные повреждения и большие расходы на капитальный ремонт.
              </p>
              <h4 className="font-heading font-semibold text-lg text-foreground mb-3">
                Особенности ремонта
              </h4>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                Наши специалисты проводят полную диагностику крыши, выявляют источник протечек и выбирают оптимальный способ ремонта. В зависимости от типа кровельного материала — будь то металлочерепица, наплавляемая кровля, мягкая или керамическая черепица — используются современные герметики, заплатки, замена поврежденных участков и восстановление гидроизоляции.
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col justify-between h-full bg-background/50 border border-border p-5 md:p-6 rounded-xl">
              <div>
                <h4 className="font-heading font-bold text-base text-foreground mb-4 uppercase tracking-wider">
                  Преимущества работы с нами
                </h4>
                <ul className="space-y-3.5">
                  <li className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Быстрое выявление и устранение проблем</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Использование качественных материалов и современных технологий</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Работа с любыми видами кровельных покрытий</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Гарантия качества выполняемых работ</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Обслуживание по всей Москве и Подмосковью</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-4 leading-normal">
                  Для заказа ремонта кровли и устранения протечек обращайтесь к нам в офис в Москве и Подмосковье или оставьте заявку прямо сейчас. Мы обеспечим надежную защиту вашего дома!
                </p>
                <a
                  href="#map"
                onClick={(e) => { e.preventDefault(); const el = document.getElementById("map"); if(el){ el.style.contentVisibility="visible"; setTimeout(() => { const top = el.getBoundingClientRect().top + window.scrollY - 100; window.scrollTo({ top, behavior: "smooth" }); }, 50); }; }}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-sm font-medium !py-3 active:scale-95 transition-transform"
                >
                  Вызвать мастера на диагностику
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;