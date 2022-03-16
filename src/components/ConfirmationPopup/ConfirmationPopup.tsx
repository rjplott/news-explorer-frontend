import { useRef, useEffect } from 'react';
import './ConfirmationPopup.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLinkClick: () => void;
}

const ConfirmationPopup = ({
  isOpen,
  onClose,
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
      className={`popup popup_purpose_confirmation ${
        isOpen ? 'popup_opened' : ''
      }`}
    >
      <div className='popup__wrapper' ref={ref}>
        <button
          aria-label='Close Form'
          type='button'
          className='popup__close'
          onClick={onClose}
        ></button>
        <div className='popup__confirm-wrapper'>
          <h2 className='popup__title'>Registration successfully completed!</h2>
          <span className='popup__link' onClick={onLinkClick}>
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
