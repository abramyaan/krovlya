import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import QuizSection from "@/components/QuizSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProjectsSection from "@/components/ProjectsSection";
import PricesSection from "@/components/PricesSection";
import ReviewsSection from "@/components/ReviewsSection";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import CallbackModal from "@/components/CallbackModal";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <QuizSection />
      <ServicesSection />
      <PortfolioSection />
      <ProjectsSection />
      <PricesSection />
      <ReviewsSection />
      <MapSection />
      <Footer />
      <CallbackModal />
    </div>
  );
};

export default Index;
