import React from 'react';
import Title from '../atoms/Title';
import Text from '../atoms/Text';

export default function MissionVisionSection() {
  return (
    <section className="mission-vision-section">
      <div className="mission-vision-container">
        {/* Misión */}
        <div className="mission-vision-card mission-card">
          <div className="card-icon"></div>
          <div className="card-content">
            <Title className="card-title">Misión</Title>
            <Text className="card-text">
              Ofrecer una experiencia dulce y memorable a nuestros clientes, proporcionando tortas y productos 
              de repostería de alta calidad para todas las ocasiones, mientras celebramos nuestras raíces 
              históricas y fomentamos la creatividad en la repostería.
            </Text>
          </div>
        </div>

        {/* Visión */}
        <div className="mission-vision-card vision-card">
          <div className="card-icon"></div>
          <div className="card-content">
            <Title className="card-title">Visión</Title>
            <Text className="card-text">
              Convertirnos en la tienda online líder de productos de repostería en Chile, conocida por nuestra 
              innovación, calidad y el impacto positivo en la comunidad, especialmente en la formación de nuevos 
              talentos en gastronomía.
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
