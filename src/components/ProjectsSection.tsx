import React from "react";
import { motion } from "framer-motion";
import proj1 from "@/assets/project-1.jpg";
import proj2 from "@/assets/project-2.jpg";
import proj3 from "@/assets/project-3.jpg";
import proj4 from "@/assets/project-4.png";
import proj5 from "@/assets/project-5.jpg";

const projects = [
  {
    img: proj1,
    title: "Монтаж кровли из металлочерепицы",
    location: "г. Одинцово, МО",
    area: "180 м²",
    duration: "7 дней",
    desc: "Полный монтаж кровельной системы: стропильная система, утепление, гидроизоляция, металлочерепица Grand Line. Идеальный баланс цены и долговечности.",
  },
  {
    img: proj2,
    title: "Строительство крыши под ключ",
    location: "г. Чехов, МО",
    area: "250 м²",
    duration: "14 дней",
    desc: "Возведение стропильной конструкции с нуля, обрешётка, укладка мягкой многослойной кровли Shinglas, установка снегозадержателей и водосточной системы.",
  },
  {
    img: proj3,
    title: "Крыша с утеплением мансарды",
    location: "г. Подольск, МО",
    area: "120 м²",
    duration: "10 дней",
    desc: "Утепление мансардного этажа минеральной ватой толщиной 200мм, профессиональная пароизоляция, качественный монтаж кровли из профнастила.",
  },
  {
    img: proj4,
    title: "Комплексный монтаж сложной скатной кровли",
    location: "г. Красногорск, МО",
    area: "240 м²",
    duration: "16 дней",
    desc: "Возведение стропильной системы с врезкой слухового фронтонного окна («кукушки»). Выполнено антисептирование древесины, укладка супердиффузионной гидроизоляционной мембраны, устройство вентилируемого зазора и шаговой обрешётки под финишное покрытие из металлочерепицы.",
  },
  {
    img: proj5,
    title: "Монтаж четырёхскатной вальмовой кровли под ключ",
    location: "г. Раменское, МО",
    area: "160 м²",
    duration: "12 дней",
    desc: "Расчёт и сборка вальмовой стропильной группы на загородном доме. Устройство кровельного пирога, обход кирпичного дымохода с монтажом герметичных фартуков примыкания, укладка металлочерепицы шоколадно-коричневого цвета, установка полукруглых коньков и трубчатых снегозадержателей.",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20" style={{ contentVisibility: "auto" } as React.CSSProperties}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="section-title text-foreground">
            Наши выполненные <span className="text-primary">работы</span>
          </h2>
          <p className="section-subtitle mt-4">
            Реальные объекты, сданные точно в срок с гарантией качества
          </p>
        </div>

        <div className="space-y-16 max-w-5xl mx-auto">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              className={`flex flex-col ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 items-center will-change-transform`}
            >
              {/* Фотография объекта */}
              <div className="lg:w-1/2 w-full">
                <div className="rounded-2xl overflow-hidden card-hover aspect-[4/3]">
                  <img 
                    src={p.img} 
                    alt={p.title} 
                    loading="lazy" 
                    width={800} 
                    height={600} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              
              {/* Описание объекта */}
              <div className="lg:w-1/2 w-full">
                <h3 className="font-heading font-bold text-2xl text-foreground mb-3">{p.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">{p.location}</span>
                  <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">{p.area}</span>
                  <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">{p.duration}</span>
                </div>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{p.desc}</p>
                
                {/* Кнопка ведет точно на форму лидогенерации */}
                <a href="#map" className="btn-primary inline-block text-base px-6 py-3 transition-all active:scale-[0.98]">
                  Хочу так же
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