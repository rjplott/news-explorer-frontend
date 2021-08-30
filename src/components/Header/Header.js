import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <h1 className="header__title">NewsExplorer</h1>
      <Navigation isLoggedIn={true} user="Joe" />
    </header>
  );
}
