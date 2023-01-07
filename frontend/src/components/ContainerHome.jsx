import CardHistory from './CardHistory';

import '../styles/home.css';
import PopupTransaction from './PopupTransaction';

export default function ContainerHome() {
  return (
    <div className="main-container-home">
      <div className="container-btn-home">
        <PopupTransaction />
      </div>
      <div>
        <h3 className="title-history">history</h3>
        <div className="container-filter-history">
          <div className="container-input-search">
            <input type="text" /> <button type="button">search</button>
          </div>
          <button type="button" className="btn-filter-history">
            cash-in
          </button>
          <button type="button" className="btn-filter-history">
            cash-out
          </button>
        </div>
        <div className="container-card-history">
          <CardHistory />
        </div>
      </div>
    </div>
  );
}
