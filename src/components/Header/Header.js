import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header__wrapper">
        <h1 className="header__title">NewsExplorer</h1>
        <Navigation isLoggedIn={false} user="Joe" />
      </div>
    </header>
  );
}
