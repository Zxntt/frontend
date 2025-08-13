"use client";

import Image from 'next/image';

export default function Card() {
  const cars = [
    { src: "/images/card/1.png", name: "Marc Márquez" },
    { src: "/images/card/2.png", name: "Álex Márquez Alentà" },
    { src: "/images/card/3.png", name: "Francesco Bagnaia" },
  ];

  return (
    <div className='container py-5'>
      <div className='row justify-content-center g-4'>
        {cars.map((car, index) => (
          <div className='col-sm-10 col-md-6 col-lg-4 d-flex justify-content-center' key={index}>
            
            <div 
              className="card-wrapper rounded-4 p-0 w-100 h-100" 
              style={{
                background: 'linear-gradient(135deg, #ff416c, #ff4b2b)',
                boxShadow: '0 0 20px rgba(255, 75, 43, 0.3)',
                transition: 'transform 0.3s ease',
                maxWidth: '500px', // กันไม่ให้ใหญ่เกินไป
              }}
            >
              <div 
                className="card shadow-lg rounded-4 overflow-hidden border-0 bg-dark text-white h-100" 
                style={{ width: '100%' }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                  <Image
                    src={car.src}
                    alt={car.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="rounded-top-4"
                    style={{ objectFit: 'cover' }}
                    priority={index === 0}
                  />
                </div>
                <div className="card-body text-center pt-2">
                  <h5 className="card-title fw-bold mb-0" style={{ fontSize: '1.25rem' }}>
                    - {car.name} -
                  </h5>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      <style jsx>{`
        .card-wrapper:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
