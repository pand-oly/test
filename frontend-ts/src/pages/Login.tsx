import pigBank from '../assets/icons/cofrinho.png';
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <section className="main_container_access">
      <img src={pigBank} alt="icon-pig-bank" className="icon_access" />
      <Form
        label="Login"
        extraButton={{
          label: 'Sing up',
          type: 'button',
          onClick: () => navigate('/register'),
        }}
      />
    </section>
  );
}
