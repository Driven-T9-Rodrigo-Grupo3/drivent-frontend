import axios from 'axios';
import useToken from '../../../hooks/useToken';
import styled from 'styled-components';

import stripeSVG from '../../../assets/images/stripe_payments.svg';
import { postStripePayment } from '../../../services/paymentApi';

export function StripeForm() {
  const token = useToken();

  async function handleStripePayment(e) {
    e.preventDefault();
    await postStripePayment(token)
      .then((res) => {
        window.location.href = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Container>
      <img src={stripeSVG} alt="Stripe Payment" />
      <form 
        onSubmit={handleStripePayment}
      >
        <Button type="submit">FINALIZAR PAGAMENTO</Button> 
      </form>
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    align-items: bottom;
    gap: 10px;

    img {
        width: 200px;        
    }

    form {
        display: flex;
        align-items: center;
    }

    @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  width: 182px;
  height: 37px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;
