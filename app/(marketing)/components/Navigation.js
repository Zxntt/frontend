import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center fw-bold" href="#"
          style={{ fontSize: '1.5rem', letterSpacing: '0.5px', color: '#000' }}>
          <i className="bi bi-emoji-kiss-fill me-2 fs-3 text-warning"></i> Phathaipak
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active text-dark" href="#" style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                <i className="bi bi-speedometer2 me-1"></i> หน้าแรก
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#" style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                <i className="bi bi-info-circle-fill me-1"></i> เกี่ยวกับเรา
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false" style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                <i className="bi bi-list-ul me-1"></i> บริการของเรา
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Web Design</a></li>
                <li><a className="dropdown-item" href="#">App Development</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Support</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled text-muted" aria-disabled="true"
                style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                <i className="bi bi-x-octagon-fill me-1"></i> ติดต่อเรา
              </a>
            </li>
          </ul>

          <form className="d-flex" role="search">
            <input
              className="form-control me-2 shadow-sm"
              type="search"
              placeholder="Search..."
              aria-label="Search"
              style={{ fontSize: '1rem' }}
            />
            <button className="btn btn-outline-dark shadow-sm" type="submit" style={{ fontWeight: '600' }}>
              <i className="bi bi-search-heart me-1"></i> Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
