'use client';

import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './about.module.css';

export default function About() {
  useEffect(() => {
    // Función para animar el contador - CORREGIDA
    function animateCounter(id: string, target: number, duration: number): () => void {
      const el = document.getElementById(id);
      if (!el) {
        return () => {}; // Retorna función vacía si el elemento no existe
      }
      
      let start = 0;
      const increment = target / (duration / 16);
      let animation: number;

      function update() {
        start += increment;
        // VERIFICAMOS que el existe en cada uso
        if (!el) return;
        
        if (start < target) {
          el.textContent = Math.floor(start).toString();
          animation = requestAnimationFrame(update);
        } else {
          el.textContent = target.toString();
        }
      }

      update();

      // Devuelve una función para reiniciar la animación
      return () => {
        if (animation) {
          cancelAnimationFrame(animation);
        }
        if (el) {
          el.textContent = "0";
        }
      };
    }

    let resetAnimations: (() => void)[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Inicia las animaciones y guarda las funciones para reiniciarlas
            resetAnimations = [
              animateCounter("counter1", 120, 2500),
              animateCounter("counter2", 345, 2500),
              animateCounter("counter3", 42, 2500),
            ];
          } else {
            // Reinicia los números al salir de la vista
            if (resetAnimations.length > 0) {
              resetAnimations.forEach((reset) => reset());
              resetAnimations = [];
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    const statsSection = document.getElementById("stats-section");
    if (statsSection) {
      observer.observe(statsSection);
    }

    // Función de limpieza
    return () => {
      if (statsSection) {
        observer.unobserve(statsSection);
      }
      if (resetAnimations.length > 0) {
        resetAnimations.forEach((reset) => reset());
      }
    };
  }, []);

  return (
    <>
      <Header />
      
      {/* Header de la página "Sobre Nosotros" */}
      <header className="aboutHeader">
        <h1>Sobre Nosotros</h1>
        <p>Explora el mundo con nosotros, un viaje a la vez</p>
      </header>

      {/* Sección 1 */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.text}>
            <h2>Pasión por los viajes</h2>
            <p>
              Desde 2015 hemos recorrido más de 40 países documentando
              experiencias, culturas y aventuras para inspirar a otros viajeros
              como tú. Nuestro equipo está formado por exploradores, fotógrafos y
              narradores de historias.
            </p>
          </div>
          <div className={styles.image}>
            <img
              src="imagenes/about us/img1.jpg"
              alt="paisaje de montaña"
            />
          </div>
        </div>
      </section>

      {/* Sección 2 */}
      <section className={`${styles.section} ${styles.reverse}`}>
        <div className={styles.sectionContent}>
          <div className={styles.text}>
            <h2>Conectamos culturas</h2>
            <p>
              Creemos en los viajes responsables, en compartir historias
              auténticas y en dejar huella positiva en cada lugar que visitamos.
              Nuestra comunidad crece cada día con personas como tú, curiosas por
              descubrir el mundo.
            </p>
          </div>
          <div className={styles.image}>
            <img
              src="imagenes/about us/img2.jpg"
              alt="Cultura y personas"
            />
          </div>
        </div>
      </section>

      {/* Sección 3 */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.text}>
            <h2>Viajar con respeto</h2>
            <p>
              Creemos que cada destino merece ser cuidado. Respetar la cultura
              local, la naturaleza y las comunidades es tan importante como
              disfrutar del viaje. Por eso promovemos experiencias responsables
              que dejen una huella positiva, para que todos podamos seguir
              explorando el mundo de manera consciente y sostenible.
            </p>
          </div>
          <div className={styles.image}>
            <img
              src="imagenes/about us/img3.jpg"
              alt="Viajes por el mundo"
            />
          </div>
        </div>
      </section>

      {/* Sección de Estadísticas */}
      <section id="stats-section" className={styles.statsSection}>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <h3 id="counter1">0</h3>
            <p>Viajes Realizados</p>
          </div>
          <div className={styles.stat}>
            <h3 id="counter2">0</h3>
            <p>Reseñas Publicadas</p>
          </div>
          <div className={styles.stat}>
            <h3 id="counter3">0</h3>
            <p>Países Visitados</p>
          </div>
        </div>
      </section>

      {/* Sección adicional */}
      <section className={styles.finalSection}>
        <h2>¿Quieres unirte a nuestras aventuras?</h2>
        <p>
          Sigue nuestro blog, redes sociales o únete a nuestras experiencias
          guiadas por viajeros para viajeros. Este viaje apenas comienza, y
          queremos que seas parte de él.
        </p>
      </section>

      <Footer />
    </>
  );
}