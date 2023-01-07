import { useRef, useState, useContext } from 'react';
import Popup from 'reactjs-popup';
import MainContext from '../context/MainContext';
import { requestTransaction, setToken } from '../utils/api';

import 'reactjs-popup/dist/index.css';
import '../styles/pop-up.css';

export default function PopupTransaction() {
  const recipient = useRef(null);
  const transferValue = useRef(null);

  const [errorRecipientValue, setErrorRecipientValue] = useState(false);
  const [errorTransferValue, setErrorTransferValue] = useState(false);

  const { user, token } = useContext(MainContext);

  const transaction = (e) => {
    e.preventDefault();

    const { value: valueTransaction } = transferValue.current;
    const { value: recipientValue } = recipient.current;

    const creditedAccountId = Number(recipientValue);

    if (isNaN(creditedAccountId)) {
      return setErrorRecipientValue(!errorRecipientValue);
    }

    let newValue = valueTransaction;
    if (valueTransaction.includes(',')) {
      newValue = valueTransaction.replace(',', '.');
    }
    const value = Number(newValue);
    if (isNaN(value)) {
      return setErrorTransferValue(!errorTransferValue);
    }

    setToken(token);

    return requestTransaction({
      debitedAccountId: user.accountId,
      value,
      creditedAccountId,
    });
  };

  return (
    <Popup
      trigger={
        <button type="button" className="btn-home">
          Transaction
        </button>
      }
      position="bottom center"
    >
      {(close) => (
        <div>
          <legend className="mt-2">Recipient Account Id</legend>
          <input
            type="text"
            ref={recipient}
            className={errorRecipientValue && 'border-2 border-red-400'}
          />
          <legend className="mt-2">Value</legend>
          <input
            type="text"
            ref={transferValue}
            placeholder="0,00"
            className={errorTransferValue && 'border-2 border-red-400'}
          />
          <button
            type="button"
            className="mt-2"
            onClick={(event) => {
              transaction(event);
              if (!errorRecipientValue && !errorTransferValue) {
                close();
              }
            }}
          >
            Trasfer
          </button>
        </div>
      )}
    </Popup>
  );
}
