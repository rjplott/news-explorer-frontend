import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import NoResults from '../NoResults/NoResults';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Footer from '../Footer/Footer';

export default function Main({ cards }) {
  return (
    <div className="page">
      <SearchForm />
      <main className="main">
        <NewsCardList cards={cards} />
        <Preloader />
        <NoResults />
        <About />
      </main>
      <Footer />
    </div>
  );
}
