import Footer from './components/Footer';
import Header from './components/Header';
import Link from 'next/link';
import './home.css';


export default function Home() {
  return (
    <>
      <Header />
      {/* HERO con video */}
      <header className="hero">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="videos/fondo.mp4" type="video/mp4" />
          Tu navegador no soporta este video.
        </video>
        <div className="hero-content">
          <h1>Explora el mundo</h1>
          <p>Descubre lugares increíbles y vive nuevas aventuras</p>
          <a href="#contenido" className="scroll-circle">↓</a>
        </div>
      </header>
      
      {/* CONTENIDO */}
      <section id="contenido" className="contenido">
        <h2>Bienvenido a este Blog de Viajes</h2>
        <p>
          Aquí encontrarás experiencias, consejos y aventuras de distintos
          destinos.
        </p>

        <div className="cards-container">
          {/* Tarjeta 1 */}
          <div className="card">
            <img src="imagenes/blog1/portada.jpg" alt="Foto París" />
            <div className="card-content">
              <h3>París en 3 días</h3>
              <p>
                Explora los rincones más impresionantes y come como un auténtico
                parisino.
              </p>
              <Link href="/posts/post1" className="btn">Leer más</Link>
              </div>
          </div>

          {/* Tarjeta 2 */}
          <div className="card">
            <img src="imagenes/blog2/portada.jpg" alt="Foto Amsterdam" />
            <div className="card-content">
              <h3>Una semana en Amsterdam</h3>
              <p>
                Explora los canales de Amsterdam, visita museos y disfruta de su
                vibrante vida urbana.
              </p>
              <Link href="/posts/post2" className="btn">Leer más</Link>
            </div>
          </div>

          {/* Tarjeta 3 */}
          <div className="card">
            <img src="imagenes/blog3/portada.jpg" alt="Foto Berlín" />
            <div className="card-content">
              <h3>Visitamos Berlín</h3>
              <p>
                Berlín te espera con sus monumentos históricos, arte callejero y
                una vida nocturna inolvidable.
              </p>
              <Link href="/posts/post3" className="btn">Leer más</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}