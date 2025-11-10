import Header from './Header';
import Footer from './Footer';
import Carousel from './Carousel';
import FoodSelector from './FoodSelector';

export default function PostLayout({ 
  title,
  description, 
  cityData,
  postData 
}) {
  // Convertir objetos de lugares a array para el grid
  const sitesArray = Object.values(cityData.lugares || {});
  
  // Convertir objetos de comidas a array para FoodSelector
  const foodsArray = Object.values(cityData.comidas || {});

  return (
    <>
      <Header />
      
      <main>
        <header className={styles.header}>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>

        {/* Introducción del post */}
        <section className={styles.intro}>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </section>

        {/* Sección de sitios */}
        {sitesArray.length > 0 && (
          <section className={styles.sitios}>
            <h2>Sitios que no puedes perderte</h2>
            <div className={styles.sitiosGrid}>
              {sitesArray.map((site, index) => (
                <div key={index} className={styles.sitioCard}>
                  <img src={site.img} alt={site.alt} />
                  <div className={styles.info}>
                    <h3>{site.titulo}</h3>
                    <p>{site.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Sección de comida */}
        {foodsArray.length > 0 && (
          <FoodSelector foods={cityData.comidas} />
        )}

        {/* Sección curiosidad */}
        <section className={styles.curiosidad}>
          <h2>¿Sabías que...?</h2>
          <p>Descubre datos curiosos sobre {cityData.title} en nuestra sección especial.</p>
        </section>

        {/* Carrusel - puedes agregar imágenes específicas aquí */}
        <section className={styles.carrusel}>
          <h2>Galería de Fotos</h2>
          <Carousel images={sitesArray.map(site => ({
            src: site.img,
            alt: site.alt,
            caption: site.titulo
          }))} />
        </section>
      </main>
      
      <Footer />
    </>
  );
}