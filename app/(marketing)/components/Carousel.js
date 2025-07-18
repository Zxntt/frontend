"use client";

import { useEffect } from "react";

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
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div className="carousel-inner" style={{ maxHeight: "70vh", overflow: "hidden" }}>
          <div className="carousel-item active">
            <img
              src="/images/sliders/V1.png"
              className="d-block w-100 rounded shadow-lg"
              alt="Slide 1"
              style={{ height: "70vh", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/sliders/V2.png"
              className="d-block w-100 rounded shadow-lg"
              alt="Slide 2"
              style={{ height: "70vh", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/sliders/V3.png"
              className="d-block w-100 rounded shadow-lg"
              alt="Slide 3"
              style={{ height: "70vh", objectFit: "cover" }}
            />
          </div>
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
    </>
  );
}
