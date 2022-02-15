import github from '../../images/github.svg';
import facebook from '../../images/facebook.svg';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner-wrapper">
        <p className="footer__copyright">
          &copy; 2021 Supersite, Powered by News API
        </p>
        <nav className="footer__navigation">
          <ul className="footer__navigation-list">
            <li className="footer__list-item">
              <a href="https://www.placeholder.com" className="footer__link">
                Home
              </a>
            </li>
            <li className="footer__list-item footer__list-item_site-yandex">
              <a href="https://practicum.yandex.com" className="footer__link">
                Practicum by Yandex
              </a>
            </li>
            <div className="footer__icon-wrapper">
              <li className="footer__list-item">
                <a href="https://www.github.com" className="footer__link">
                  <img
                    className="footer__icon"
                    src={github}
                    alt="Github.com's logo"
                  />
                </a>
              </li>
              <li className="footer__list-item">
                <a href="https://www.facebook.com" className="footer__link">
                  <img
                    className="footer__icon"
                    src={facebook}
                    alt="Facebook.com's logo"
                  />
                </a>
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
