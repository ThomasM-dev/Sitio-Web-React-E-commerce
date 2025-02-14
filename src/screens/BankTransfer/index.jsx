import React from 'react';
import './BankTransfer.css';

const  BankTransfer = () => {
  return (
    <div className="transferencia-container">
      <h2>Transferencia Bancaria</h2>
      <p>
        Por favor, realiza la transferencia a la siguiente cuenta:
      </p>
      <div className="detalles-cuenta">
        <p>
          <strong>Banco:</strong> 
          BBVA
        </p>
        <p>
          <p>
            <strong>CBU: </strong>
            0170005340000019407469
          </p>
          <strong>Número de Cuenta:</strong> 5-194074/6
        </p>
        <p>
          <strong>Titular de la Cuenta:</strong> Carolina Soledad Zurita
        </p>
        <p>
          <strong>CUIT/CUIL:</strong> 27279941077
        </p>
      </div>
      <p>
        Una vez realizada la transferencia, por favor, envía el comprobante a nuestro correo electrónico:
      </p>
      <a href="carolinazurita959@gmail.com" className="correo-electronico">
        carolinazurita959@gmail.com
      </a>
    </div>
  );
};

export default BankTransfer;