import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function Header({ route }) {
  return (
    <header className="header">
      <div className="header__wrapper">
        <h1 className="header__title">NewsExplorer</h1>
        <Navigation isLoggedIn={true} route={route} user="Joe" />
      </div>
    </header>
  );
}
