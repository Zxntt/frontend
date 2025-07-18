"use client";

import Image from 'next/image';

export default function Card() {
  const cars = [
    { src: "/images/card/1.jpg", name: "Rx7" },
    { src: "/images/card/22.jpg", name: "Supra" },
    { src: "/images/card/33.jpg", name: "Nsx" },
  ];

  return (
    <div className='container py-5'>
      <div className='row justify-content-center g-4'>
        {cars.map((car, index) => (
          <div className='col-sm-10 col-md-6 col-lg-4 d-flex justify-content-center' key={index}>
            
            {/* ลด padding จาก p-1 เป็น p-0 */}
            <div 
              className="card-wrapper rounded-4 p-0" 
              style={{
                background: 'linear-gradient(135deg, #ff416c, #ff4b2b)',
                boxShadow: '0 0 20px rgba(255, 75, 43, 0.3)',
                transition: 'transform 0.3s ease',
              }}
            >
              <div 
                className="card shadow-lg rounded-4 overflow-hidden border-0 bg-dark text-white" 
                style={{ width: '20rem' }}
              >
                <div style={{ position: 'relative', width: '100%', height: '200px', marginTop: 0 }}>
                  <Image
                    src={car.src}
                    alt={car.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="rounded-top-4"
                    style={{ objectFit: 'cover', marginTop: 0 }}
                    priority={index === 0}
                  />
                </div>
                <div className="card-body text-center pt-2"> {/* ลด padding top ถ้าเยอะ */}
                  <h5 className="card-title fw-bold mb-0" style={{ fontSize: '1.25rem' }}>
                    🚗 {car.name} 🚗
                  </h5>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Hover effect ด้วย CSS */}
      <style jsx>{`
        .card-wrapper:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
