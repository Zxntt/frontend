export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="fw-bold">Phathaipak</h5>
            <p>© 2025 All rights reserved.</p>
          </div>

          <div className="col-md-4 mb-3 mb-md-0">
            <h6>Contact</h6>
            <p>Email: contact@phathaipak.com</p>
            <p>Phone: +66 123 456 789</p>
          </div>

          <div className="col-md-4">
            <h6>Follow Us</h6>
            <a href="#" className="text-light me-3" aria-label="Facebook">
              <i className="bi bi-facebook fs-4"></i>
            </a>
            <a href="#" className="text-light me-3" aria-label="Twitter">
              <i className="bi bi-twitter fs-4"></i>
            </a>
            <a href="#" className="text-light" aria-label="Instagram">
              <i className="bi bi-instagram fs-4"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
