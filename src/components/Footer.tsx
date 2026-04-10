import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
                <svg className="w-6 h-6 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M3 21V10l9-7 9 7v11M9 21v-6h6v6"/></svg>
              </div>
              <span className="font-heading font-bold text-lg">КРОВЛЯ МСК</span>
            </div>
            <p className="text-primary-foreground/60 text-sm">
              Профессиональные кровельные работы по Москве и Московской области. Гарантия 5 лет.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Услуги</h4>
            <ul className="space-y-2 text-primary-foreground/60 text-sm">
              <li>Монтаж кровли</li>
              <li>Ремонт кровли</li>
              <li>Утепление крыши</li>
              <li>Водосточные системы</li>
              <li>Гидроизоляция</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Контакты</h4>
            <div className="space-y-3 text-primary-foreground/60 text-sm">
              <a href="tel:+79991234567" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" /> +7 (999) 123-45-67
              </a>
              <a href="mailto:info@krovlya-msk.ru" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" /> info@krovlya-msk.ru
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Москва и МО
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center text-primary-foreground/40 text-sm">
          © {new Date().getFullYear()} КРОВЛЯ МСК. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
