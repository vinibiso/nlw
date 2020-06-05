import React from 'react';
import { FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css'

const CreatePointSuccess = () => {
  return (
    <div id="page-success">
      <div id="page-success-content">
        <FiCheckCircle />
        <h1>Cadastro Concluído!</h1>
        <Link to="/">
          <span>
            <FiArrowLeft />
          </span>
          <strong>Voltar para a tela inicial</strong>
        </Link>
      </div>
    </div>
  )
}

export default CreatePointSuccess;
