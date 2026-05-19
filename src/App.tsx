import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ThankYou from "./pages/ThankYou.tsx"; // Наша новая страница спасибо
import NotFound from "./pages/NotFound.tsx";
import FloatingPhone from "@/components/FloatingPhone.tsx"; // Импортируем иконку телефона

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Убрали basename="/krovlya", теперь корень приложения — это главная страница домена */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/thank-you" element={<ThankYou />} /> {/* Маршрут для страницы благодарности */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      {/* Закрепленная кнопка звонка поверх всего интерфейса */}
      <FloatingPhone />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;