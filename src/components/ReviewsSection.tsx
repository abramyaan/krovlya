import { motion } from "framer-motion";
import { Star } from "lucide-react";
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
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="section-title text-foreground">
            Отзывы <span className="text-primary">клиентов</span>
          </h2>
          <p className="section-subtitle mt-4">
            Что говорят о нас наши заказчики
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={r.img}
                  alt={r.name}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <h4 className="font-heading font-bold text-foreground">{r.name}</h4>
                  <p className="text-sm text-muted-foreground">{r.location}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
