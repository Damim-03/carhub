import Navbar from '../../Home/NavBar';
import Footer from '../../Home/Footer';
import ServicesHero from "./components/ServicesHero.tsx";
import ServicesGrid from "./components/ServicesGrid.tsx";
import ServicesCTA from "./components/ServicesCTA.tsx";

const ServicesPage = () => {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                <ServicesHero />
                <ServicesGrid />
                <ServicesCTA />
            </main>
            <Footer />
        </>
    );
};

export default ServicesPage;
