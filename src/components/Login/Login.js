import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useState } from 'react';
const Login = ({ isOpen, handleClosePopup, handleLinkClick, handleLogin }) => {
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailErrorMessage(e.target.validationMessage);
    if (emailIsValid !== e.target.validity.valid) {
      setEmailIsValid(e.target.validity.valid);
      setIsFormValid(passwordIsValid && e.target.validity.valid);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordErrorMessage(e.target.validationMessage);
    if (passwordIsValid !== e.target.validity.valid) {
      setPasswordIsValid(e.target.validity.valid);
      setIsFormValid(emailIsValid && e.target.validity.valid);
    }
  };

  return (
    <PopupWithForm
      name="login"
      title="Login"
      isOpen={isOpen}
      onClose={handleClosePopup}
      buttonText="Sign in"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
        handleClosePopup();
      }}
      linkText="Sign up"
      onLinkClick={handleLinkClick}
      isValid={isFormValid}
    >
      <label className="popup__input-label" htmlFor="login-enter-email">
        Email
      </label>
      <input
        required
        placeholder="Enter email"
        type="email"
        name="login-enter-email"
        id="login-enter-email"
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_type_email"
        value={email}
        onChange={handleEmailChange}
      />
      <span className="popup__error login-enter-email-error">
        {emailErrorMessage}
      </span>
      <label className="popup__input-label" htmlFor="login-enter-password">
        Password
      </label>
      <input
        required
        placeholder="Enter password"
        type="password"
        name="login-enter-password"
        id="login-enter-password"
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_type_password"
        value={password}
        onChange={handlePasswordChange}
      />
      <span className="popup__error login-enter-password-error">
        {passwordErrorMessage}
      </span>
    </PopupWithForm>
  );
};

export default Login;
