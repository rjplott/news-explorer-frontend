import './PopupWithForm.css';
import { useRef, useEffect } from 'react';

const PopupWithForm = ({
  name,
  title,
  children,
  isOpen,
  isValid,
  onClose,
  buttonText,
  onSubmit,
  linkText,
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
      className={`popup popup_purpose_${name} ${isOpen ? 'popup_opened' : ''}`}
      ref={ref}
    >
      <div className="popup__wrapper">
        <button
          aria-label="Close Form"
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <form
          className="popup__form"
          name={`${name}-form`}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className="popup__form-title">{title}</h2>
          {children}
          <button
            aria-label="Submit Form"
            type="submit"
            className={`popup__submit ${
              isValid ? '' : 'popup__submit_disabled'
            }`}
            disabled={!isValid}
          >
            {buttonText}
          </button>
          <div className="popup__link-wrapper">
            or{' '}
            <span className="popup__link" onClick={onLinkClick}>
              {linkText}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
