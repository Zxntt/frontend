"use client";

import { useEffect } from "react";

const slides = [
  {
    icon: "bi-camera-video-fill",
    title: "See who's at the door",
    subtitle: "Live 4K video, day or night",
  },
  {
    icon: "bi-mic-fill",
    title: "Talk from anywhere",
    subtitle: "Two way audio through the app",
  },
  {
    icon: "bi-shield-lock-fill",
    title: "Motion alerts, instantly",
    subtitle: "Know the moment someone arrives",
  },
];

export default function Carousel() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ maxWidth: "2000px", margin: "50px auto" }}
      >
        <div className="carousel-indicators">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide-to={i}
              className={i === 0 ? "active" : ""}
              aria-current={i === 0 ? "true" : undefined}
              aria-label={`Slide ${i + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner" style={{ maxHeight: "70vh", overflow: "hidden" }}>
          {slides.map((slide, i) => (
            <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
              <div
                className="d-flex flex-column align-items-center justify-content-center rounded shadow-lg slide-placeholder"
                style={{ height: "70vh", width: "100%" }}
              >
                <i className={`bi ${slide.icon} slide-icon`}></i>
                <h2 className="slide-title mt-3">{slide.title}</h2>
                <p className="slide-subtitle">{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev bg-dark bg-opacity-50 rounded-circle"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
          style={{ width: "45px", height: "45px", top: "calc(50% - 22.5px)" }}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next bg-dark bg-opacity-50 rounded-circle"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
          style={{ width: "45px", height: "45px", top: "calc(50% - 22.5px)" }}
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <style jsx>{`
        .slide-placeholder {
          background: #0f172a;
          color: #fff;
          text-align: center;
          padding: 2rem;
        }
        .slide-icon {
          font-size: 4rem;
          color: #2563eb;
        }
        .slide-title {
          font-size: 1.8rem;
          font-weight: 600;
          margin: 0;
        }
        .slide-subtitle {
          color: #9ca3af;
          font-size: 1rem;
          margin: 0.4rem 0 0;
        }
      `}</style>
    </>
  );
}