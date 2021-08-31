import './Preloader.css';

export default function Preloader() {
  return (
    <div className="preloader">
      <i className="preloader__circle-icon"></i>
      <p className="preloader__text">Searching for news...</p>
    </div>
  );
}
