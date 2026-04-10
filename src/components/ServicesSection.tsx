import { motion } from "framer-motion";
import montazhImg from "@/assets/service-montazh.jpg";
import remontImg from "@/assets/service-remont.jpg";
import uteplenieImg from "@/assets/service-uteplenie.jpg";
import vodostokImg from "@/assets/service-vodostok.jpg";
import gidroImg from "@/assets/service-gidro.jpg";
import demontazhImg from "@/assets/service-demontazh.jpg";

const services = [
  { title: "Монтаж кровли", desc: "Профессиональный монтаж кровли любой сложности. Работаем с металлочерепицей, мягкой кровлей, профнастилом.", img: montazhImg, price: "от 500 ₽/м²" },
  { title: "Ремонт кровли", desc: "Устранение протечек, замена повреждённых элементов, восстановление кровельного покрытия.", img: remontImg, price: "от 350 ₽/м²" },
  { title: "Утепление крыши", desc: "Теплоизоляция кровли современными материалами. Снижение теплопотерь до 40%.", img: uteplenieImg, price: "от 400 ₽/м²" },
  { title: "Водосточные системы", desc: "Монтаж и ремонт водосточных систем. Защита фасада и фундамента от осадков.", img: vodostokImg, price: "от 600 ₽/п.м." },
  { title: "Гидроизоляция", desc: "Устройство гидроизоляции плоских и скатных кровель. Надёжная защита от влаги.", img: gidroImg, price: "от 450 ₽/м²" },
  { title: "Демонтаж кровли", desc: "Аккуратный демонтаж старого кровельного покрытия с вывозом мусора.", img: demontazhImg, price: "от 250 ₽/м²" },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="section-title text-foreground">
            Кровельные <span className="text-primary">услуги</span>
          </h2>
          <p className="section-subtitle mt-4">
            Полный комплекс кровельных работ для частных домов и коммерческих объектов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl overflow-hidden bg-card card-hover"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                  {s.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{s.desc}</p>
                <a href="#quiz" className="btn-primary inline-block text-sm !py-2.5 !px-5">
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
