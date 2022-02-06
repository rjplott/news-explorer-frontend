import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useState } from 'react';

const Register = ({
  isOpen,
  isVisible,
  handleClosePopup,
  handleLinkClick,
  handleRegister,
}) => {
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailIsValid !== e.target.validity.valid) {
      setEmailIsValid(e.target.validity.valid);
      setIsFormValid(
        usernameIsValid && passwordIsValid && e.target.validity.valid
      );
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordIsValid !== e.target.validity.valid) {
      setPasswordIsValid(e.target.validity.valid);
      setIsFormValid(
        usernameIsValid && emailIsValid && e.target.validity.valid
      );
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (usernameIsValid !== e.target.validity.valid) {
      setUsernameIsValid(e.target.validity.valid);
      setIsFormValid(
        passwordIsValid && emailIsValid && e.target.validity.valid
      );
    }
  };

  return (
    <PopupWithForm
      name="register"
      title="Register"
      isOpen={isOpen}
      isVisible={isVisible}
      onClose={handleClosePopup}
      buttonText="Sign up"
      onSubmit={(e) => {
        e.preventDefault();
        handleRegister(username);
        handleClosePopup();
      }}
      linkText="Sign in"
      onLinkClick={handleLinkClick}
      isValid={isFormValid}
    >
      <label className="popup__input-label" htmlFor="register-enter-email">
        Email
      </label>
      <input
        required
        placeholder="Enter email"
        type="email"
        name="register-enter-email"
        id="register-enter-email"
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_type_email"
        value={email}
        onChange={handleEmailChange}
      />
      <span className="popup__error register-enter-password-error"></span>
      <label className="popup__input-label" htmlFor="register-enter-password">
        Password
      </label>
      <input
        required
        placeholder="Enter password"
        type="password"
        name="register-enter-password"
        id="register-enter-password"
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_type_password"
        value={password}
        onChange={handlePasswordChange}
      />
      <span className="popup__error register-enter-email-password"></span>
      <label className="popup__input-label" htmlFor="register-enter-username">
        Username
      </label>
      <input
        required
        placeholder="Enter your username"
        type="text"
        name="register-enter-username"
        id="register-enter-username"
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_type_username"
        value={username}
        onChange={handleUsernameChange}
      />
      <span className="popup__error register-enter-username-error"></span>
    </PopupWithForm>
  );
};

export default Register;
