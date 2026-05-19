import { useState } from "react";
import { Phone, Mail, Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Главная", href: "#hero" },
  { label: "Услуги", href: "#services" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Примеры работ", href: "#projects" },
  { label: "Цены", href: "#prices" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#map" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="bg-foreground text-primary-foreground">
        <div className="container mx-auto flex items-center justify-between py-2 px-4 text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+79999047771" className="flex items-center gap-2 hover:text-primary transition-colors font-mono">
              <Phone className="w-4 h-4" />
              +7 (999) 904-77-71
            </a>
            <a href="mailto:samlir272@yandex.ru" className="hidden sm:flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              info@krovlya-msk.ru
            </a>
          </div>
          
          {/* Блок мессенджеров: Ссылки ведут прямо в чат по номеру телефона */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground hidden xs:inline">Написать нам:</span>
            
            {/* Telegram чат */}
            <a 
              href="https://t.me/+79999047771" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors flex items-center gap-1 bg-background/10 px-2 py-1 rounded text-xs"
              title="Написать в Telegram"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#24A1DE]" />
              <span>TG</span>
            </a>

            {/* MAX чат */}
            <a 
              href="https://im.max.ru/+79999047771" /* Замени на точный URL твоего корпоративного пространства MAX, если требуется */
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors flex items-center gap-1 bg-background/10 px-2 py-1 rounded text-xs"
              title="Написать в MAX"
            >
              <MessageCircle className="w-3.5 h-3.5 text-primary" />
              <span>MAX</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main header bar */}
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <a href="#hero" className="font-heading font-black text-2xl tracking-tight text-foreground flex items-center gap-2">
          🔥 <span className="bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">КРОВЛЯ</span>МСК
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground font-medium transition-colors text-sm relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-primary after:transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => document.getElementById("callback-modal")?.classList.remove("hidden")}
            className="hidden md:block btn-primary text-sm !py-2.5 !px-6"
          >
            Заказать звонок
          </button>
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground hover:text-primary transition-colors py-2 font-medium"
                >
                  {item.label}
                </a>
              ))}
              <button 
                onClick={() => {
                  setMobileOpen(false);
                  document.getElementById("callback-modal")?.classList.remove("hidden");
                }}
                className="btn-primary text-sm mt-2"
              >
                Заказать звонок
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;