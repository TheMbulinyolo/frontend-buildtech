import React, { useEffect, useRef, useState } from 'react';

const products = [
  { id: 1, title: 'EDITION 1', image: '/edition/E11.jpeg' },
  { id: 2, title: 'EDITION 1', image: '/edition/E12.jpeg' },
  { id: 3, title: 'EDITION 1', image: '/edition/E13.jpeg' },
  { id: 4, title: 'EDITION 1', image: '/edition/E14.jpeg' },
  { id: 5, title: 'EDITION 1', image: '/edition/E15.jpeg' },
  { id: 6, title: 'EDITION 2', image: '/edition/E21.jpeg' },
  { id: 7, title: 'EDITION 2', image: '/edition/E22.jpeg'  },
  { id: 8, title: 'EDITION 2', image: '/edition/E23.jpeg'  },
  { id: 9, title: 'EDITION 2', image: '/edition/E24.jpeg'  },
  { id: 10, title: 'EDITION 2', image: '/edition/E25.jpeg'  },
  { id: 11, title: 'EDITION 2', image: '/edition/E26.jpeg'  },
  { id: 12, title: 'EDITION 2', image: '/edition/E27.jpeg'  },
  { id: 13, title: 'EDITION 2', image: '/edition/E28.jpeg'  },


];

const AutoScrollCarousel = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Observer 5% de la section visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.intersectionRatio >= 0.05);
      },
      { threshold: [0.05] }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Scroll automatique
  useEffect(() => {
    let interval;

    if (isVisible) {
      interval = setInterval(() => {
        if (containerRef.current) {
          containerRef.current.scrollLeft += 1;
          if (
            containerRef.current.scrollLeft + containerRef.current.clientWidth >=
            containerRef.current.scrollWidth
          ) {
            containerRef.current.scrollLeft = 0;
          }
        }
      }, 20);
    }

    return () => clearInterval(interval);
  }, [isVisible]);

  // Pour effet infini visuel → on duplique les produits
  const duplicatedProducts = [...products, ...products];

  return (
    <section ref={sectionRef} className="product-section" style={{ padding: '2rem 0' }}>
      <div className="product-category" style={{ marginBottom: '1rem' }}>
        <span><h2>Première Édition : </h2> Année 2023</span>
        <span><h2>Deuxième Édition : </h2> Année 2024</span>
      </div>
      <div
        ref={containerRef}
        className="product-container"
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          whiteSpace: 'nowrap', 
        }}
      >
        {duplicatedProducts.map((product, index) => (
          <div
            key={index}
            className="product-card"
            style={{
              minWidth: '200px',
              marginRight: '1rem',
              flex: '0 0 auto',
              background: '#f5f5f5',
              borderRadius: '12px',
              overflow: 'hidden',
              textAlign: 'center',
              padding: '1rem',
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ width: '100%', height: '13rem', objectFit: 'cover', borderRadius: '8px' }}
            />
            <h3 style={{ marginTop: '0.5rem' }}>{product.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AutoScrollCarousel;
