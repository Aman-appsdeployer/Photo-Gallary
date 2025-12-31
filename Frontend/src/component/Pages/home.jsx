import AboutSection from "../AboutSection.jsx";
import CardSection from "../CardSection.jsx";
import GallerySection from "../GallerySection.jsx";
import ImageCarousel from "../ImageCarousel.jsx";
import TestimonialsSection from "../TestimonialsSection.jsx";
function Home() {
  return (
    <div className="bg-white dark:bg-gray-900">
      
      <section className="w-full overflow-hidden relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] 2xl:h-[900px]">
        <ImageCarousel />
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <CardSection />
      </section>

x      <section className="max-w-6xl mx-auto px-4 py-12">
        <GallerySection />
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <AboutSection />
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <TestimonialsSection />
      </section>  
      
    </div>
  );
}

export default Home;
