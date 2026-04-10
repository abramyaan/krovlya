import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { useState } from "react";

const MapSection = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="map" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="section-title text-foreground">
            Наши работы <span className="text-primary">на карте</span>
          </h2>
          <p className="section-subtitle mt-4">
            Работаем по всей Москве и Московской области
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden card-hover h-96 lg:h-auto"
          >
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A44c7e43b6e18e67e7e69e87e0b1f8e2e&amp;source=constructor"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              title="Карта работ"
              loading="lazy"
            />
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 card-hover"
          >
            <h3 className="font-heading font-bold text-2xl text-foreground mb-6">Оставить заявку</h3>
            
            {!submitted ? (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
                />
                <button
                  onClick={() => setSubmitted(true)}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-lg"
                >
                  <Send className="w-5 h-5" />
                  Отправить заявку
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
                  <svg className="w-8 h-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-heading font-bold text-2xl text-foreground mb-2">Заявка отправлена!</h3>
                <p className="text-muted-foreground">Мы свяжемся с вами в ближайшее время</p>
              </div>
            )}

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                  <Phone className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Телефон</p>
                  <a href="tel:+79991234567" className="font-bold text-foreground hover:text-primary transition-colors">+7 (999) 123-45-67</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href="mailto:info@krovlya-msk.ru" className="font-bold text-foreground hover:text-primary transition-colors">info@krovlya-msk.ru</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Адрес</p>
                  <p className="font-bold text-foreground">Москва и Московская область</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
