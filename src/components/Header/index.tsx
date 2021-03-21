// React Modules
import React from 'react';
import { FiPlusSquare } from 'react-icons/fi';

// Images
import Logo from '../../assets/logo.svg';

// CSS
import { Container } from './styles';

// TS
interface HeaderProps {
  openModal: () => void;
};

// APP
export function Header({ openModal }: HeaderProps) {

  return (
    <Container>
      <header>
        <img src={Logo} alt="GoRestaurant" />
        <nav>
          <div>
            <button
              type="button"
              onClick={openModal}
            >
              <div className="text">Novo Prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </Container>
  )
}
