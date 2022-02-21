import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useFormWithValidation } from '../../hooks/useFormWithValidation/useFormWithValidation';

const Login = ({ isOpen, handleClosePopup, handleLinkClick, handleLogin, serverError }) => {
  
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({ email: '', password: '' });
  
  const handleFormSubmit = (e) => {
            e.preventDefault();
            handleLogin({ email: values.email, password: values.password });
            resetForm({ email: '', password: '' });
  }

  return (
    <PopupWithForm
      name="login"
      title="Sign in"
      isOpen={isOpen}
      onClose={handleClosePopup}
      buttonText="Sign in"
      onSubmit={handleFormSubmit}
      linkText="Sign up"
      onLinkClick={handleLinkClick}
      isValid={isValid}
    >
      <label className="popup__input-label" htmlFor="login-enter-email">
        Email
      </label>
      <input
        required
        placeholder="Enter email"
        type="email"
        name="email"
        id="login-enter-email"
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_type_email"
        value={values.email}
        onChange={handleChange}
      />
      <span className="popup__error login-enter-email-error">
        {errors.email}
      </span>
      <label className="popup__input-label" htmlFor="login-enter-password">
        Password
      </label>
      <input
        required
        placeholder="Enter password"
        type="password"
        name="password"
        id="login-enter-password"
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_type_password"
        value={values.password}
        onChange={handleChange}
      />
      <span className="popup__error login-enter-password-error">
        {errors.password}
      </span>
      <span className='popup__error'>{serverError}</span>
    </PopupWithForm>
  );
};

export default Login;
