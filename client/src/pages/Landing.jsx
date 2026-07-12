import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Infographic from '../components/Infographic';
import HousingOptions from '../components/HousingOptions';
import ProcessTimeline from '../components/ProcessTimeline';
import RegistrationForm from '../components/RegistrationForm';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Infographic />
        <HousingOptions />
        <ProcessTimeline />
        <RegistrationForm />
      </main>
      <Footer />
    </>
  );
}
