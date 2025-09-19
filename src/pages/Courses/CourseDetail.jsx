import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './CourseDetail.css';
import Modal from '../../components/ui/Modal';

const CourseDetail = () => {
  const location = useLocation();
  const { course } = location.state;
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="course-detail-container">
      <div className="course-detail-card">
        {/* Left Image Section */}
        <div className="course-detail-left">
          <img
            src={course.image}
            alt={course.title}
            className="course-detail-image"
          />
        </div>

        {/* Right Content Section */}
        <div className="course-detail-right">
          <h1 className="course-detail-title">{course.title}</h1>
          <p className="course-detail-description">{course.description}</p>

          {/* New Tags */}
          <div className="course-tags">
            <span className="course-tag">Beginner Friendly</span>
            <span className="course-tag">Lifetime Access</span>
            <span className="course-tag">Certificate</span>
          </div>

          <div className="course-detail-price">{course.price}</div>

          {/* Purchase Button */}
          <div className="purchase-button-container">
            <button
              onClick={() => setShowModal(true)}
              className="enhanced-purchase-btn"
            >
              <span className="btn-text">Purchase Course</span>
              <span className="btn-icon">🚀</span>
            </button>
            <p className="purchase-note">
              Secure payment • Instant access • 30-day guarantee
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal course={course} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default CourseDetail;