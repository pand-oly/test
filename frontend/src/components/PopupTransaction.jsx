import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css';
import '../styles/pop-up.css';

export default function PopupTransaction() {
  return (
    <Popup
      trigger={
        <button type="button" className="btn-home">
          Transaction
        </button>
      }
      position="bottom center"
    >
      <div>
        <legend className="mt-2">destino</legend>
        <input type="text" />
        <legend className="mt-2">valor</legend>
        <input type="text" />
        <button type="button" className="mt-2">
          enviar
        </button>
      </div>
    </Popup>
  );
}
