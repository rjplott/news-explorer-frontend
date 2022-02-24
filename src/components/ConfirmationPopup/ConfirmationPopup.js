import { useRef, useEffect } from 'react';
import './ConfirmationPopup.css';

const ConfirmationPopup = ({
  isOpen,
  onClose,
  onLinkClick,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickEscapeClose = (e) => {
      if (
        isOpen &&
        ref.current &&
        !ref.current.contains(e.target) &&
        (!e.key || e.key === 'Escape')
      ) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleClickEscapeClose);
    document.addEventListener('mousedown', handleClickEscapeClose);

    return () => {
      document.removeEventListener('keydown', handleClickEscapeClose);
      document.removeEventListener('mousedown', handleClickEscapeClose);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`popup popup_purpose_confirmation ${isOpen ? 'popup_opened' : ''}`}
    >
      <div className="popup__wrapper" ref={ref}>
        <button
          aria-label="Close Form"
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <div className="popup__confirm-wrapper">
          <h2 className="popup__title">
          Registration successfully completed!
        </h2>
        <span className="popup__link" onClick={onLinkClick}>
          Sign In
        </span>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;