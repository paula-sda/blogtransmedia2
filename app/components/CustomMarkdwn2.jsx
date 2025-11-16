'use client';
import React, { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';

// -------------------
// SitiosSection
// -------------------
export const SitiosSection = ({ postContent }) => {
  // Extraer sección
  let sitiosContent = '';
  const headingIndex = postContent.indexOf('## Sitios que no puedes perderte');
  if (headingIndex !== -1) {
    const nextHeadingIndex = postContent.indexOf('## ', headingIndex + 3);
    sitiosContent = nextHeadingIndex !== -1
      ? postContent.substring(headingIndex, nextHeadingIndex)
      : postContent.substring(headingIndex);
  }

  // Convertir Markdown en array de objetos
  const sitios = [];
  const lines = sitiosContent.split('\n');
  let tempSitio = {};

  lines.forEach(line => {
    line = line.trim();

    const match = line.match(/- \*\*(.+?)\*\* - (.+)/);
    if (match) {
      tempSitio.nombre = match[1];
      tempSitio.descripcion = match[2];
    }

    const imgMatch = line.match(/!\[.*?\]\((.+?)\)/);
    if (imgMatch && tempSitio.nombre && tempSitio.descripcion) {
      tempSitio.imagen = imgMatch[1];
      sitios.push({ ...tempSitio });
      tempSitio = {};
    }
  });

  return (
    <section className="sitios">
      <h2>Sitios que no puedes perderte</h2>
      <div className="sitios-grid">
        {sitios.map((sitio, index) => (
          <div key={index} className="sitio-card">
            <img src={sitio.imagen} alt={sitio.nombre} />
            <div className="info">
              <h3>{sitio.nombre}</h3>
              <p>{sitio.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


// -------------------
// ComidaSection
// -------------------


export const ComidaSection = ({ postContent }) => {
  const [platos, setPlatos] = useState({});
  const [selectedPlato, setSelectedPlato] = useState(null);

  useEffect(() => {
    // Extraer solo la sección de comida
    const startIndex = postContent.indexOf('## Comida típica');
    if (startIndex === -1) return; // no hay sección

    const endIndex = postContent.indexOf('## ', startIndex + 3);
    const comidaContent =
      endIndex !== -1
        ? postContent.substring(startIndex, endIndex)
        : postContent.substring(startIndex);

    // Parsear la sección de comida
    const lines = comidaContent.split('\n');
    const platosObj = {};
    let currentPlato = null;
    let currentDesc = '';

    lines.forEach((line) => {
      line = line.trim();
      
      const matchNombre = line.match(/- \*\*(.+?)\*\*/);
      if (matchNombre) {
        currentPlato = matchNombre[1];
        platosObj[currentPlato] = { titulo: currentPlato };
        currentDesc = '';
      }

      const matchImg = line.match(/!\[.*?\]\((.+?)\)/);
      if (matchImg && currentPlato) {
        platosObj[currentPlato].img = matchImg[1];
        platosObj[currentPlato].alt = currentPlato;
      }

      if (
        line &&
        !line.startsWith('-') &&
        !line.startsWith('!') &&
        currentPlato
      ) {
        currentDesc += currentDesc ? '\n' + line : line;
        platosObj[currentPlato].desc = currentDesc;
      }
    });

    setPlatos(platosObj);
    setSelectedPlato(Object.keys(platosObj)[0]);
  }, [postContent]);

  return (
    <section className="comida">
      <h2>Comida típica</h2>
      <div className="comida-buttons">
        {Object.keys(platos).map((plato) => (
          <button
            key={plato}
            className={plato === selectedPlato ? 'active' : ''}
            onClick={() => setSelectedPlato(plato)}
          >
            {plato}
          </button>
        ))}
      </div>

      {selectedPlato && (
        <div className="comida-content">
          <div className="comida-img">
            <img
              src={platos[selectedPlato].img}
              alt={platos[selectedPlato].alt}
            />
          </div>
          <div className="comida-text">
            <h3>{platos[selectedPlato].titulo}</h3>
            <p>{platos[selectedPlato].desc}</p>
          </div>
        </div>
      )}
    </section>
  );
};




// -------------------
// Carrusel
// -------------------


export const CarruselSection = ({ postContent }) => {
  const [fotos, setFotos] = useState([]);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxCaption, setLightboxCaption] = useState("");

  // Extraer imágenes del markdown
  useEffect(() => {
    const headingIndex = postContent.indexOf("## Galería de Fotos");
    if (headingIndex !== -1) {
      const nextHeadingIndex = postContent.indexOf("## ", headingIndex + 3);
      const galeriaContent = nextHeadingIndex !== -1
        ? postContent.substring(headingIndex, nextHeadingIndex)
        : postContent.substring(headingIndex);

      const lines = galeriaContent.split("\n");
      const nuevasFotos = [];

      lines.forEach(line => {
        const imgMatch = line.match(/!\[(.*?)\]\((.+?)\)/);
        if (imgMatch) {
          nuevasFotos.push({
            src: imgMatch[2],
            caption: imgMatch[1] || ""
          });
        }
      });

      setFotos(nuevasFotos);
    }
  }, [postContent]);

  // Interactividad carrusel y lightbox
  useEffect(() => {
    const track = document.querySelector(".carousel-track");
    const btnLeft = document.querySelector(".carousel-btn.left");
    const btnRight = document.querySelector(".carousel-btn.right");

    let currentIndex = 0;

    function updateCarousel() {
      if (!track) return;
      const items = Array.from(track.children);
      const itemWidth = items[0]?.getBoundingClientRect().width + 20 || 0;
      const itemsToShow = window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3;
      const maxIndex = Math.max(0, items.length - itemsToShow);

      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;

      track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    }

    if (btnRight) {
      btnRight.addEventListener("click", () => {
        currentIndex++;
        updateCarousel();
      });
    }

    if (btnLeft) {
      btnLeft.addEventListener("click", () => {
        currentIndex--;
        updateCarousel();
      });
    }

    // Lightbox
    if (track) {
      const items = Array.from(track.children);
      items.forEach((item) => {
        item.addEventListener("click", () => {
          const img = item.querySelector("img");
          setLightboxImage(img.src);
          setLightboxCaption(item.dataset.caption || "");
          const lightbox = document.querySelector(".lightbox");
          lightbox.classList.add("active");
        });
      });
    }

    const lightbox = document.querySelector(".lightbox");
    if (lightbox) {
      lightbox.addEventListener("click", () => {
        lightbox.classList.remove("active");
      });
    }

    window.addEventListener("resize", updateCarousel);
    setTimeout(updateCarousel, 100);

    return () => {
      window.removeEventListener("resize", updateCarousel);
    };
  }, [fotos]);

  if (fotos.length === 0) return null;

  return (
    <>
      <section className="carrusel">
        <h2>Galería de Fotos</h2>
        <div className="carousel-container">
          <button className="carousel-btn left">&#10094;</button>
          <div className="carousel-track">
            {fotos.map((foto, index) => (
              <div key={index} className="carousel-item" data-caption={foto.caption}>
                <img src={foto.src} alt={foto.caption} />
                <div className="carousel-caption">{foto.caption}</div>
              </div>
            ))}
          </div>
          <button className="carousel-btn right">&#10095;</button>
        </div>
      </section>

      <div className="lightbox">
        <div className="lightbox-content">
          {lightboxImage && <img src={lightboxImage} alt={lightboxCaption} />}
          <div className="lightbox-caption">{lightboxCaption}</div>
        </div>
      </div>
    </>
  );
};
