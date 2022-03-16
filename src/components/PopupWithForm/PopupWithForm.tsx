import './PopupWithForm.css';
import { useRef, useEffect } from 'react';

interface Props {
  name: string;
  title: string;
  children: JSX.Element | JSX.Element[];
  isOpen: boolean;
  isValid: boolean;
  onClose: () => void;
  buttonText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  linkText: string;
  onLinkClick: () => void;
}

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
}: Props): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscapeClose = (e: KeyboardEvent) => {
      if (
        isOpen &&
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        e.key === 'Escape'
      ) {
        onClose();
      }
    };

    const handleClickClose = (e: MouseEvent) => {
      if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeClose);
    document.addEventListener('mousedown', handleClickClose);

    return () => {
      document.removeEventListener('keydown', handleEscapeClose);
      document.removeEventListener('mousedown', handleClickClose);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`popup popup_purpose_${name} ${isOpen ? 'popup_opened' : ''}`}
    >
      <div className='popup__wrapper' ref={ref}>
        <button
          aria-label='Close Form'
          type='button'
          className='popup__close'
          onClick={onClose}
        ></button>
        <form
          className='popup__form'
          name={`${name}-form`}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className='popup__form-title'>{title}</h2>
          {children}
          <button
            aria-label='Submit Form'
            type='submit'
            className={`popup__submit ${
              isValid ? '' : 'popup__submit_disabled'
            }`}
            disabled={!isValid}
          >
            {buttonText}
          </button>
          <div className='popup__link-wrapper'>
            or{' '}
            <span className='popup__link' onClick={onLinkClick}>
              {linkText}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
