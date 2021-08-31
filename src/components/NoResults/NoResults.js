import notFound from '../../images/not-found.svg';
import './NoResults.css';

export default function NoResults() {
  return (
    <section className="no-results">
      <img
        src={notFound}
        alt="Icon indicating nothing was found."
        className="no-results__icon"
      />
      <h2 className="no-results__title">Nothing found</h2>
      <p className="no-results__text">
        Sorry, but nothing matched your search terms.
      </p>
    </section>
  );
}
