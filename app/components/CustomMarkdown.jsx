'use client';

import { useEffect } from 'react';

// Componente para la sección de sitios
export const SitiosSection = () => {
  const sitios = [
    {
      nombre: "Torre Eiffel",
      imagen: "/imagenes/blog1/torre eiffel.jpeg",
      descripcion: "El icono más famoso de París. Visítala de día y de noche para disfrutar vistas espectaculares."
    },
    {
      nombre: "Museo del Louvre", 
      imagen: "/imagenes/blog1/louvre.jpeg",
      descripcion: "Casa de la Mona Lisa y muchas obras maestras. Reserva tus entradas con antelación."
    },
    {
      nombre: "Notre-Dame",
      imagen: "/imagenes/blog1/notre dame.jpeg", 
      descripcion: "Impresionante arquitectura gótica y una visita obligada en el corazón de París."
    },
    {
      nombre: "Montmartre",
      imagen: "/imagenes/blog1/montmartre.jpeg",
      descripcion: "Calles bohemias y la basílica del Sacré-Cœur con vistas panorámicas de la ciudad."
    }
  ];

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

// Componente para la sección de comida
export const ComidaSection = () => {
  useEffect(() => {
    const platos = {
      croissant: {
        img: "/imagenes/blog1/croissant.jpg",
        alt: "Croissant",
        titulo: "Croissant", 
        desc: "El croissant es un símbolo de la panadería francesa. Recomendamos probarlo en cualquier boulangerie tradicional cerca de Montparnasse o Le Marais.",
      },
      baguette: {
        img: "/imagenes/blog1/baguette.jpeg",
        alt: "Baguette",
        titulo: "Baguette",
        desc: "La baguette fresca es indispensable. Se disfruta mejor con queso y vino en un picnic en los Campos de Marte frente a la Torre Eiffel.",
      },
      escargots: {
        img: "/imagenes/blog1/escargots.jpg", 
        alt: "Escargots",
        titulo: "Escargots",
        desc: "Caracoles preparados con mantequilla, ajo y perejil, un plato clásico de la gastronomía parisina. Ideal en restaurantes tradicionales cerca de Saint-Germain.",
      },
      ratatouille: {
        img: "/imagenes/blog1/ratatuille.jpg",
        alt: "Ratatouille",
        titulo: "Ratatouille",
        desc: "Un guiso de verduras provenzal, saludable y delicioso. Muy popular en bistrós parisinos de ambiente bohemio.",
      },
      crepes: {
        img: "/imagenes/blog1/crepes.jpg",
        alt: "Crêpes",
        titulo: "Crêpes", 
        desc: "Las crêpes dulces o saladas son perfectas para cualquier hora del día. Prueba una de Nutella o de jamón y queso en Montparnasse.",
      }
    };

    // Inicializar interactividad de comida
    const buttons = document.querySelectorAll(".comida-buttons button");
    const platoImg = document.getElementById("plato-img");
    const platoTitulo = document.getElementById("plato-titulo");
    const platoDesc = document.getElementById("plato-descripcion");

    if (buttons.length && platoImg && platoTitulo && platoDesc) {
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          buttons.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          const plato = platos[btn.dataset.plato];
          if (plato) {
            platoImg.src = plato.img;
            platoImg.alt = plato.alt;
            platoTitulo.textContent = plato.titulo;
            platoDesc.textContent = plato.desc;
          }
        });
      });
    }
  }, []);

  return (
    <section className="comida">
      <h2>Comida típica de París</h2>
      <div className="comida-buttons">
        <button className="active" data-plato="croissant">Croissant</button>
        <button data-plato="baguette">Baguette</button>
        <button data-plato="escargots">Escargots</button>
        <button data-plato="ratatouille">Ratatouille</button>
        <button data-plato="crepes">Crêpes</button>
      </div>
      <div className="comida-content">
        <div className="comida-img">
          <img id="plato-img" src="/imagenes/blog1/croissant.jpg" alt="Croissant" />
        </div>
        <div className="comida-text">
          <h3 id="plato-titulo">Croissant</h3>
          <p id="plato-descripcion">
            El croissant es un símbolo de la panadería francesa. Recomendamos probarlo en cualquier boulangerie tradicional cerca de Montparnasse o Le Marais.
          </p>
        </div>
      </div>
    </section>
  );
};

// Componente para la curiosidad
export const CuriosidadSection = () => (
  <section className="curiosidad">
    <h2>¿Sabías que...?</h2>
    <p>
      En París existen más de <strong>1.800 panaderías</strong>, y se consumen diariamente alrededor de <strong>10 millones de baguettes</strong>.
    </p>
  </section>
);

// Componente para el carrusel
export const CarruselSection = () => {
  useEffect(() => {
    // Inicializar carrusel
    const track = document.querySelector(".carousel-track");
    const btnLeft = document.querySelector(".carousel-btn.left");
    const btnRight = document.querySelector(".carousel-btn.right");
    const lightbox = document.querySelector(".lightbox");
    
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
    if (track && lightbox) {
      const lightboxImg = lightbox.querySelector("img");
      const lightboxCaption = lightbox.querySelector(".lightbox-caption");
      const items = Array.from(track.children);

      items.forEach((item) => {
        item.addEventListener("click", () => {
          const img = item.querySelector("img");
          lightboxImg.src = img.src;
          lightboxCaption.textContent = item.dataset.caption || "";
          lightbox.classList.add("active");
        });
      });

      lightbox.addEventListener("click", () => {
        lightbox.classList.remove("active");
      });
    }

    window.addEventListener("resize", updateCarousel);
    setTimeout(updateCarousel, 100);

    return () => {
      window.removeEventListener("resize", updateCarousel);
    };
  }, []);

  const fotos = [
    { src: "/imagenes/blog1/img1.webp", caption: "Torre Eiffel" },
    { src: "/imagenes/blog1/img2.webp", caption: "Museo del Louvre" },
    { src: "/imagenes/blog1/img3.jpg", caption: "Notre-Dame" },
    { src: "/imagenes/blog1/img4.webp", caption: "Torre Eiffel" }
  ];

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
          <img src="" alt="" />
          <div className="lightbox-caption"></div>
        </div>
      </div>
    </>
  );
};