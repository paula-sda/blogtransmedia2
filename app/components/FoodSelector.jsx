'use client';

import { useState } from 'react';

export default function FoodSelector({ foods }) {
  const [activeFood, setActiveFood] = useState(Object.keys(foods)[0]);

  const currentFood = foods[activeFood];

  return (
    <div className={styles.comida}>
      <h2>Comida típica</h2>
      <div className={styles.comidaButtons}>
        {Object.keys(foods).map(foodKey => (
          <button
            key={foodKey}
            className={activeFood === foodKey ? styles.active : ''}
            onClick={() => setActiveFood(foodKey)}
          >
            {foods[foodKey].titulo}
          </button>
        ))}
      </div>
      <div className={styles.comidaContent}>
        <div className={styles.comidaImg}>
          <img 
            src={currentFood.img} 
            alt={currentFood.alt}
          />
        </div>
        <div className={styles.comidaText}>
          <h3>{currentFood.titulo}</h3>
          <p>{currentFood.desc}</p>
        </div>
      </div>
    </div>
  );
}