import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Internships from './components/Internships';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Internships />
        <About />
      </main>
      <Footer />
    </>
  );
}

export default App;
