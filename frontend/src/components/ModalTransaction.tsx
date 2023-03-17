import { requestTransaction, setToken } from '../utils/api';
import { getLocalDataToken, getLocalDataUser } from '../utils/localStorage';
import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PopupTransaction() {
  const [showModal, setShowModal] = useState(false);
  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const creditedAccountId = Number(recipientId);

    let newValue = amount;
    if (amount.includes(',')) {
      newValue = amount.replace(',', '.');
    }
    const value = Number(newValue);
    if (isNaN(value)) {
      return;
    }

    if (!getLocalDataToken || !getLocalDataUser) {
      return;
    }
    setToken(getLocalDataToken);

    const debitedAccountId = JSON.parse(getLocalDataUser).accountId;

    requestTransaction({
      debitedAccountId,
      value,
      creditedAccountId,
    });

    setShowModal(false);
  }

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Transfer Credit</Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Credit Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="recipientId">
              <Form.Label>Recipient Account Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter recipient ID"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="amount">
              <Form.Label>Amount to be sent</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the amount to be sent. EX: 0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Transfer
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
