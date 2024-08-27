import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Card, Spinner, Row, Col, Modal } from 'react-bootstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './logo.webp'; // Importing the logo

function App() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleStarClick = (stars) => {
    setRating(stars);
    if (stars === 5) {
      setLoading(true);
      window.location.href = 'https://g.page/r/Cbi81v4qB7wqEAE/review';
    } else if (stars < 5 && window.innerWidth < 768) {
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (rating < 5 && window.innerWidth >= 768) {
      setShowModal(false);
    }
  }, [rating]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const form = e.target;
    const data = new FormData(form);
    const json = Object.fromEntries(data.entries());

    try {
      const response = await fetch(form.action, {
        method: form.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        form.reset(); // Reset the form fields
        setShowModal(false); // Close the modal
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="App">
      <Navbar className='navbar-1' bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <img
              src={logo} // Using the imported logo
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="Logo"
            />
            <span className="ml-2 text-white nav-name">Divine Software Systems LLC</span>
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="https://maps.google.com/?q=your+location" className="nav-item-right">
              <FaMapMarkerAlt className='icon-nav'/> 37675 Niles Blvd, Fremont, CA 94536
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="hero-wrapper">
        <header className="hero-section">
          <Card className="feedback-card">
            <Card.Body>
              {loading ? (
                <div className="loading-container">
                  <Spinner animation="border" variant="light" />
                </div>
              ) : formSubmitted ? (
                <div className="thank-you-message">
                  <h2>Thank you for your feedback!</h2>
                  <p>We appreciate your input and will use it to improve our services.</p>
                </div>
              ) : (
                <>
                  <h1>We Value Your Feedback!</h1>
                  {rating === 0 && (
                    <div className="stars">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`star ${index < (hoverRating || rating) ? 'filled' : ''}`}
                          onClick={() => handleStarClick(index + 1)}
                          onMouseEnter={() => setHoverRating(index + 1)}
                          onMouseLeave={() => setHoverRating(0)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  )}
                  {rating > 0 && rating < 5 && (
                    <motion.div
                      className="feedback-container"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      style={{ display: formSubmitted ? 'none' : 'block' }} // Hide form when submitted
                    >
                      <form
                        id="feedback-form"
                        action="https://formspree.io/f/xdknbzok"
                        method="POST"
                        className="feedback-form"
                        onSubmit={handleFormSubmit}
                      >
                        <h2>We're sorry to hear that!</h2>
                        <Row>
                          <Col md={6}>
                            <input
                              type="text"
                              name="name"
                              placeholder="Full Name"
                              required
                              className="form-control"
                            />
                          </Col>
                          <Col md={6}>
                            <input
                              type="text"
                              name="reason"
                              placeholder="Reason"
                              required
                              className="form-control"
                            />
                          </Col>
                        </Row>
                        <textarea
                          name="feedback"
                          placeholder="Please let us know how we can improve..."
                          required
                          className="form-control mt-3"
                        ></textarea>
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                      </form>
                    </motion.div>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </header>
      </div>

      {/* Modal for small screens */}
      <Modal show={showModal} onHide={() => setShowModal(false)} fullscreen>
        <Modal.Body className="feedback-modal">
          <h2>We're sorry to hear that!</h2>
          <form
            id="modal-feedback-form"
            action="https://formspree.io/f/xdknbzok"
            method="POST"
            className="feedback-form"
            onSubmit={handleFormSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="form-control mb-3"
            />
            <input
              type="text"
              name="reason"
              placeholder="Reason"
              required
              className="form-control mb-3"
            />
            <textarea
              name="feedback"
              placeholder="Please let us know how we can improve..."
              required
              className="form-control mb-3"
              style={{ height: '150px' }}
            ></textarea>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
