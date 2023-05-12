import { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

import useToken from '../../../hooks/useToken';
import { useWindowDimensions } from '../../../hooks/useWindowDimensions';
import { postPayment } from '../../../services/paymentApi';

import { paymentDataValidation, sanitizeCreditCardNumber } from './utils';

export function CreditCardForm(ticketId) {
  const [disabled, setDisabled] = useState(false);
  const [payment, setPayment] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focused: '',
  });
  const [creditCardData, setCreditCardData] = useState('');

  const token = useToken();
  const { width } = useWindowDimensions();

  function onInputFocus(e) {
    setPayment((form) => ({ ...form, focused: e.target.name }));
  }

  function onInputUpdate(e) {
    let { name, value } = e.target;
    if (name === 'number' && value.length > 19) {
      return;
    }
  
    if (name === 'expiry') {
      if (isNaN(Number(value)) && !value.includes('/')) {
        return;
      }
    
      if (value.length === 4 && value[2] !== '/') {
        value = `${value.slice(0, 2)}/${value.slice(2)}`;
      }
    
      if (value.length > 5) {
        return;
      }
    }
  
    if (name === 'cvc' && value.length > 3) {
      return;
    }

    setPayment(form => ({ ...form, [name]: value }));
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    setDisabled(true);

    const formattedCreditCardNumber = sanitizeCreditCardNumber(payment.number);

    const body = {
      ticketId: ticketId,
      cardData: {
        issuer: creditCardData.issuer,
        number: formattedCreditCardNumber,
        name: payment.name,
        expirationDate: payment.expiry,
        cvv: payment.cvc,
      },
    };

    console.log(body);

    const validation = paymentDataValidation(body);

    console.log(validation);

    if(validation === true) {
      try {
        await postPayment(body, token);
        //setar ticket como pago
        toast('Pagamento realizado!');
      } catch (error) {
        setDisabled(false);
        toast('Não foi possível realizar o pagamento!');
      }
    } else {
      setDisabled(false);
      toast(validation);
    }
  };

  return (
    <>
      <FormContainer>
        {
          width > 820 && (
            <CardContainer>          
              <Cards 
                number={payment.number}
                name={payment.name}
                expiry={payment.expiry}
                cvc={payment.cvc}
                focused={payment.focused}
                callback={(type) => setCreditCardData(type)}
              />        
            </CardContainer>
          )
        }             

        <Form onSubmit={(e) => onSubmit(e)}>
          <FormInput
            type="tel"
            name="number"
            placeholder="Card Number"
            pattern="[\d| ]{16,22}"
            required
            value={payment.number}
            onChange={onInputUpdate}
            onFocus={onInputFocus}
            disabled={disabled}
          />

          <span>E.g.: 49...,51...,36...,37...</span>

          <FormInput
            type="text"
            name="name"
            placeholder="Name"
            value={payment.name}
            required
            onChange={onInputUpdate}
            onFocus={onInputFocus}
            disabled={disabled}
          />
          
          <div>
            <FormInput
              type="tel"
              name="expiry"
              placeholder="Valid Thru"
              value={payment.expiry}
              pattern="\d\d/\d\d"
              required
              onChange={onInputUpdate}
              onFocus={onInputFocus}
              width={'195px'}
              disabled={disabled}
            />
            <FormInput
              type="tel"
              name="cvc"
              placeholder="CVC"
              value={payment.cvc}
              pattern="\d{3,4}"
              required
              onChange={onInputUpdate}
              onFocus={onInputFocus}
              width={'95px'}
              disabled={disabled}
            />
          </div>          
        </Form>
      </FormContainer>
      <Button onClick={onSubmit} disabled={disabled}>FINALIZAR PAGAMENTO</Button>
    </>
  );
}

const FormContainer = styled.div`
  display: flex;
`;

const CardContainer = styled.div`
  margin-right: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    color: #929292;
    margin-bottom: 15px;
  }

  div {
    display: flex;
    gap: 10px;
  }
`;

const FormInput = styled.input`
    display: flex;    
    width: ${({ width }) => width || '300px'};
    height: 46px;
    font-size: 18px;
    border: 2px solid gray;
    border-radius: 5px;
    padding-left: 10px;
    margin-bottom: 10px;
`;

const Button = styled.button`
  width: 182px;
  height: 37px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  margin-top: 20px;
  cursor: pointer;
`;
