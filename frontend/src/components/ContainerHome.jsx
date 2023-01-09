import History from './History';
import PopupTransaction from './PopupTransaction';

import '../styles/home.css';

export default function ContainerHome() {
  return (
    <div className="main-container-home">
      <div className="container-btn-home">
        <PopupTransaction />
      </div>
      <History />
    </div>
  );
}
