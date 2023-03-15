import ContainerHistory from './ContainerHistory';
import ModalTransaction from './ModalTransaction';
import '../styles/home.css';

export default function ContainerHome() {
  return (
    <div className="home-container">
      <ModalTransaction />
      <ContainerHistory />
    </div>
  );
}
