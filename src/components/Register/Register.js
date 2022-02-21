import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useFormWithValidation } from '../../hooks/useFormWithValidation/useFormWithValidation';

const Register = ({
  isOpen,
  handleClosePopup,
  handleLinkClick,
  handleRegister,
  serverError
}) => {

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({ username: '', email: '', password: '' });
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRegister({
      name: values.username,
      email: values.email,
      password: values.password,
    });
    resetForm({ username: '', email: '', password: '' });
  }

  return (
    <PopupWithForm
      name="register"
      title="Sign up"
      isOpen={isOpen}
      onClose={handleClosePopup}
      buttonText="Sign up"
      onSubmit={handleFormSubmit}
      linkText="Sign in"
      onLinkClick={handleLinkClick}
      isValid={isValid}
    >
      <label className="popup__input-label" htmlFor="register-enter-email">
        Email
      </label>
      <input
        required
        placeholder="Enter email"
        type="email"
        name="email"
        id="register-enter-email"
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_type_email"
        value={values.email}
        onChange={handleChange}
      />
      <span className="popup__error register-enter-email-error">
        {errors.email}
      </span>
      <label className="popup__input-label" htmlFor="register-enter-password">
        Password
      </label>
      <input
        required
        placeholder="Enter password"
        type="password"
        name="password"
        id="register-enter-password"
        minLength="8"
        maxLength="40"
        className="popup__input popup__input_type_password"
        value={values.password}
        onChange={handleChange}
      />
      <span className="popup__error register-enter-password-error">
        {errors.password}
      </span>
      <label className="popup__input-label" htmlFor="register-enter-username">
        Username
      </label>
      <input
        required
        placeholder="Enter your username"
        type="text"
        name="username"
        id="register-enter-username"
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_type_username"
        value={values.username}
        onChange={handleChange}
      />
      <span className="popup__error register-enter-username-error">
        {errors.username}
      </span>
      <span className="popup__error">{serverError}</span>
    </PopupWithForm>
  );
};

export default Register;
