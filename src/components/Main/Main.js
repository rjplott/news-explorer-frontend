import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Footer from '../Footer/Footer';

export default function Main({ cards }) {
  return (
    <div className="page">
      <SearchForm />
      <main className="main">
        <NewsCardList cards={cards} />
        <About />
      </main>
      <Footer />
    </div>
  );
}
