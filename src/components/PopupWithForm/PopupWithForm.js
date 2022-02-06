import './PopupWithForm.css';

const PopupWithForm = ({
  name,
  title,
  children,
  isOpen,
  isVisible,
  isValid,
  onClose,
  buttonText,
  onSubmit,
  linkText,
  onLinkClick,
}) => {
  return (
    <div
      className={`popup popup_purpose_${name} ${isOpen ? 'popup_opened' : ''} ${
        isVisible ? 'popup_visible' : ''
      }`}
    >
      <div className="popup__wrapper">
        <button
          aria-label="Close Form"
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <form className="popup__form" name={`${name}-form`} onSubmit={onSubmit}>
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
