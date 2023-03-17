import pigBank from '../assets/icons/cofrinho.png';
import Form from '../components/Form';

export default function Register() {
  return (
    <section className="main_container_access">
      <img
        src={pigBank}
        alt="icon-pig-bank"
        width="160"
        height="160"
        style={{ marginBottom: '1rem' }}
      />
      <Form label="Register" />
    </section>
  );
}
