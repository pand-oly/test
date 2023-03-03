import pigBank from '../assets/icons/cofrinho.png';
import Form from '../components/Form';

export default function Register() {
  return (
    <section className="main_container_access">
      <img src={pigBank} alt="icon-pig-bank" className="icon_access" />
      <Form label="Register" />
    </section>
  );
}
