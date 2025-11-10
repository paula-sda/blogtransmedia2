'use client';

import { useState, useEffect } from 'react';

export default function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [lightboxActive, setLightboxActive] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');

  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 600) {
        setItemsToShow(1);
      } else if (window.innerWidth < 900) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prev => 
      prev >= images.length - itemsToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prev => 
      prev <= 0 ? images.length - itemsToShow : prev - 1
    );
  };

  const openLightbox = (imageSrc) => {
    setLightboxImage(imageSrc);
    setLightboxActive(true);
  };

  const closeLightbox = () => {
    setLightboxActive(false);
  };

  return (
    <>
      <div className={styles.carouselContainer}>
        <button className={`${styles.carouselBtn} ${styles.left}`} onClick={prevSlide}>
          &#10094;
        </button>
        
        <div 
          className={styles.carouselTrack}
          style={{ 
            transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` 
          }}
        >
          {images.map((image, index) => (
            <div 
              key={index}
              className={styles.carouselItem}
              onClick={() => openLightbox(image.src)}
            >
              <img src={image.src} alt={image.alt} />
              <div className={styles.carouselCaption}>{image.caption}</div>
            </div>
          ))}
        </div>
        
        <button className={`${styles.carouselBtn} ${styles.right}`} onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      {/* Lightbox */}
      <div 
        className={`${styles.lightbox} ${lightboxActive ? styles.active : ''}`}
        onClick={closeLightbox}
      >
        <div className={styles.lightboxContent}>
          <img src={lightboxImage} alt="" />
        </div>
      </div>
    </>
  );
}