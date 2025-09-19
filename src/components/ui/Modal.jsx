import React, { useState, useEffect } from 'react';

const Modal = ({ course, onClose }) => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const paymentMethods = [
    { id: 'bank', name: 'Bank Transfer', account: '10470981020708013' },
    { id: 'easypaisa', name: 'EasyPaisa', account: '03159417898' },
    { id: 'jazzcash', name: 'JazzCash', account: '03159417898' },
    { id: 'sadapay', name: 'SadaPay', account: '03159417898' }
  ];

  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step, onClose]);

  const validateStep = (currentStep) => {
    const newErrors = {};

    switch (currentStep) {
      case 1:
        if (!paymentMethod) {
          newErrors.paymentMethod = 'Please select a payment method';
        }
        break;
      case 2:
        if (!file) {
          newErrors.file = 'Please upload the transaction slip';
        }
        if (!transactionId.trim()) {
          newErrors.transactionId = 'Please enter the transaction ID';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrors(prev => ({ ...prev, file: 'Please upload a valid image (JPG, PNG) or PDF file' }));
        return;
      }

      // Validate file size (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, file: 'File size must be less than 5MB' }));
        return;
      }

      setFile(selectedFile);
      setErrors(prev => ({ ...prev, file: '' }));
    }
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleConfirmPurchase = async () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
    }, 2000);
  };

  const selectedPaymentMethod = paymentMethods.find(method => method.id === paymentMethod);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="step-container">
            <div className="step-header">
              <h2>Step 1: Select Payment Method</h2>
              <div className="step-indicator">1 of 3</div>
              <div onClick={onClose} ><span className="cross-icon">❌</span></div>
            </div>

            <div className="payment-methods">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`payment-option ${paymentMethod === method.id ? 'selected' : ''}`}
                  onClick={() => {
                    setPaymentMethod(method.id);
                    setErrors(prev => ({ ...prev, paymentMethod: '' }));
                  }}
                >
                  <div className="payment-info">
                    <strong>{method.name}</strong>
                    <span className="account-number">{method.account}</span>
                  </div>
                  <div className="radio-indicator">
                    {paymentMethod === method.id && <div className="radio-selected"></div>}
                  </div>
                </div>
              ))}
            </div>

            {errors.paymentMethod && (
              <div className="error-message">{errors.paymentMethod}</div>
            )}

            <div className="button-group">
              <button onClick={onClose} className="secondary-btn">Cancel</button>
              <button onClick={handleNextStep} className="primary-btn">
                Next
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-container">
            <div className="step-header">
              <h2>Step 2: Upload Transaction Details</h2>
              <div className="step-indicator">2 of 3</div>
              <div onClick={onClose} ><span className="cross-icon">❌</span></div>
            </div>

            {selectedPaymentMethod && (
              <div className="payment-summary">
                <h3>Payment Details</h3>
                <p><strong>Method:</strong> {selectedPaymentMethod.name}</p>
                <p><strong>Account:</strong> {selectedPaymentMethod.account}</p>
                <p><strong>Amount:</strong> {course?.price || '99.99'}</p>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="transactionId">Transaction ID *</label>
              <input
                id="transactionId"
                type="text"
                value={transactionId}
                onChange={(e) => {
                  setTransactionId(e.target.value);
                  setErrors(prev => ({ ...prev, transactionId: '' }));
                }}
                placeholder="Enter your transaction ID"
                className={errors.transactionId ? 'error' : ''}
              />
              {errors.transactionId && (
                <div className="error-message">{errors.transactionId}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="fileUpload">Transaction Slip *</label>
              <div className="file-upload-container">
                <input
                  id="fileUpload"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className={errors.file ? 'error' : ''}
                />
                <div className="file-upload-info">
                  <small>Accepted formats: JPG, PNG, PDF (Max 5MB)</small>
                  {file && (
                    <div className="file-selected">
                      ✓ {file.name}
                    </div>
                  )}
                </div>
              </div>
              {errors.file && (
                <div className="error-message">{errors.file}</div>
              )}
            </div>

            <div className="button-group">
              <button onClick={handlePreviousStep} className="secondary-btn">
                Back
              </button>
              <button onClick={handleNextStep} className="primary-btn">
                Next
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-container">
            <div className="step-header">
              <h2>Step 3: Confirm Purchase</h2>
              <div className="step-indicator">3 of 3</div>
              <div onClick={onClose} ><span className="cross-icon">❌</span></div>
            </div>

            <div className="confirmation-details">
              <div className="course-info">
                <h3>{course?.title || 'Course Title'}</h3>
                <p className="course-price">{course?.price || '99.99'}</p>
              </div>

              <div className="payment-review">
                <div className="review-item">
                  <span>Payment Method:</span>
                  <span>{selectedPaymentMethod?.name}</span>
                </div>
                <div className="review-item">
                  <span>Transaction ID:</span>
                  <span>{transactionId}</span>
                </div>
                <div className="review-item">
                  <span>Receipt:</span>
                  <span>{file?.name}</span>
                </div>
              </div>

              {file && file.type.startsWith('image/') && (
                <div className="slip-preview">
                  <img src={URL.createObjectURL(file)} alt="Transaction slip" />
                </div>
              )}
            </div>

            <div className="button-group">
              <button onClick={handlePreviousStep} className="secondary-btn">
                Back
              </button>
              <button
                onClick={handleConfirmPurchase}
                className="primary-btn confirm-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Confirm Purchase'}
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-container success-step">
            <div className="success-icon">✓</div>
            <h2>Purchase Confirmed!</h2>
            <p>Thank you for your purchase. You will receive a confirmation email shortly.</p>
            <div className="success-details">
              <p><strong>Course:</strong> {course?.title}</p>
              <p><strong>Transaction ID:</strong> {transactionId}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {renderStep()}
      </div>
    </div>
  );
};

export default Modal;