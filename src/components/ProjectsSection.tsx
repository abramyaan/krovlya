import { motion } from "framer-motion";
import proj1 from "@/assets/project-1.jpg";
import proj2 from "@/assets/project-2.jpg";
import proj3 from "@/assets/project-3.jpg";

const projects = [
  {
    img: proj1,
    title: "Монтаж кровли из металлочерепицы",
    location: "г. Одинцово, МО",
    area: "180 м²",
    duration: "7 дней",
    desc: "Полный монтаж кровельной системы: стропильная система, утепление, гидроизоляция, металлочерепица Grand Line.",
  },
  {
    img: proj2,
    title: "Строительство крыши под ключ",
    location: "г. Чехов, МО",
    area: "250 м²",
    duration: "14 дней",
    desc: "Возведение стропильной конструкции с нуля, обрешётка, укладка мягкой кровли Shinglas, установка водостоков.",
  },
  {
    img: proj3,
    title: "Крыша с утеплением мансарды",
    location: "г. Подольск, МО",
    area: "120 м²",
    duration: "10 дней",
    desc: "Утепление мансардного этажа минеральной ватой 200мм, пароизоляция, монтаж кровли из профнастила.",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="section-title text-foreground">
            Примеры <span className="text-primary">работ</span>
          </h2>
          <p className="section-subtitle mt-4">
            Готовые объекты, которыми мы гордимся
          </p>
        </div>

        <div className="space-y-12">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 items-center`}
            >
              <div className="lg:w-1/2">
                <div className="rounded-2xl overflow-hidden card-hover">
                  <img src={p.img} alt={p.title} loading="lazy" width={800} height={600} className="w-full h-80 object-cover" />
                </div>
              </div>
              <div className="lg:w-1/2">
                <h3 className="font-heading font-bold text-2xl text-foreground mb-3">{p.title}</h3>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">{p.location}</span>
                  <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">{p.area}</span>
                  <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">{p.duration}</span>
                </div>
                <p className="text-muted-foreground mb-6">{p.desc}</p>
                <a href="#quiz" className="btn-primary inline-block">
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

export default ProjectsSection;
