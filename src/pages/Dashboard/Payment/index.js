import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { FcOk } from 'react-icons/fc';

import useToken from '../../../hooks/useToken';

import { CreditCardForm } from '../../../components/Payment/CreditCard';
import { getTicketTypes, getUserTicket, postTicket } from '../../../services/ticketApi';
import { toast } from 'react-toastify';
import { verifyPayment } from '../../../services/paymentApi';
import { StripeForm } from '../../../components/Payment/StripeForm';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const [isRemote, setIsRemote] = useState(null);
  const [haveHotel, setHaveHotel] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [price, setPrice] = useState(null);
  const [isPaymentPage, setIsPaymentPage] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const token = useToken();

  function renderModalityOptions() {
    console.log(ticket);
    if (enrollment) {
      return (
        <>
          <StyledDescription>Primeiro, escolha sua modalidade de ingresso</StyledDescription>
          <OptionsModality>
            <SelectButtonOption selected={isRemote === false} onClick={() => setIsRemote(false)}>
              <OptionName>Presencial</OptionName>
              <OptionPrice>R$ 250</OptionPrice>
            </SelectButtonOption>
            <SelectButtonOption selected={isRemote === true} onClick={() => { setIsRemote(true); setHaveHotel(false); }}>
              <OptionName>Online</OptionName>
              <OptionPrice>R$ 100</OptionPrice>
            </SelectButtonOption>
          </OptionsModality>
        </>
      );
    }
  }

  function renderHotelOptions() {
    if (isRemote === false && enrollment) {
      return (
        <>
          <StyledDescription>Ótimo! Agora escolha sua modalidade de hospedagem</StyledDescription>
          <OptionsModality>
            <SelectButtonOption selected={haveHotel === false} onClick={() => setHaveHotel(false)}>
              <OptionName>Sem Hotel</OptionName>
              <OptionPrice>+ R$ 0</OptionPrice>
            </SelectButtonOption>
            <SelectButtonOption selected={haveHotel === true} onClick={() => setHaveHotel(true)}>
              <OptionName>Com Hotel</OptionName>
              <OptionPrice>+ R$ 350</OptionPrice>
            </SelectButtonOption>
          </OptionsModality>
        </>
      );
    }
  }

  function calculateValue() {
    const modalityValue = isRemote ? 100 : 250;
    const hotelValue = !isRemote && haveHotel ? 350 : 0;
    const price = modalityValue + hotelValue;
    return price;
  }

  function renderResume() {
    if (enrollment) {
      return (
        <>
          <StyledDescription>Fechado! O total ficou em <strong>R$ {calculateValue()}</strong>. Agora é só confirmar:</StyledDescription>
          <ButtonConfirmation onClick={() => { setPrice(calculateValue()); handleReservation(); }}>RESERVAR INGRESSO</ButtonConfirmation>
        </>
      );
    }
  }

  const ticketType = () => {
    return (isRemote ? 'Online' : 'Presencial') +
      (!isRemote ? ' + ' : ' ') +
      (haveHotel && !isRemote ? 'Com hotel' : !haveHotel && !isRemote ? 'Sem hotel' : '');
  };

  function renderPaymentConfirmation() {
    return (
      <>
        <PaymentConfirmationMessage>
          <FcOk size={40.33} />
          <p><strong>Pagamento confirmado!</strong><br />
            Prossiga para escolha de hospedagem e atividades</p>
        </PaymentConfirmationMessage>
      </>
    );
  }

  function renderTicketDetails() {
    return (
      <>
        <StyledDescription>Ingresso escolhido</StyledDescription>
        <StyledTicket>
          <OptionName>{ticket.TicketType.name}</OptionName>
          <OptionPrice>R$ {ticket.TicketType.price}</OptionPrice>
        </StyledTicket>
      </>
    );
  }

  function renderNoEnrollment() {
    if (!enrollment) {
      return (
        <ParentContainer>
          <StyledEnrollmentMessage>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</StyledEnrollmentMessage>
        </ParentContainer>
      );
    }
  }

  async function handleReservation() {
    const ticketPrices = {
      600: 1,
      250: 2,
      100: 3
    };

    const ticketTypeId = ticketPrices[price] || null;
    if (ticketTypeId) {
      let data = { ticketTypeId };
      try {
        const ticket = await postTicket(data, token);
        setTicket(ticket);
        setIsPaymentPage(true);
      } catch (error) {
        toast('Não foi possível finalizar a sua reserva.');
      }
    }
  }
  useEffect(() => {
    async function fetchData() {
      const ticket = await getUserTicket(token);
      const hasPaid = await verifyPayment(token);
      setTicket(ticket);
      console.log(ticket);
      console.log(hasPaid);
      if (ticket) {
        setIsPaymentPage(true);
        if (hasPaid) {
          setIsPaid(true);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {!isPaymentPage ? (
        <>
          {renderModalityOptions()}
          {renderHotelOptions()}
          {renderResume()}
          {renderNoEnrollment()}
        </>) : (
        <>
          <PaymentContainer>
            {renderTicketDetails()}
          </PaymentContainer>

          <StyledDescription>Pagamento</StyledDescription>
          {
            isPaid === false ? (
              <StripeForm />
            ) : (
              <>
                {renderPaymentConfirmation()}
              </>
            )
          }
        </>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const ParentContainer = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledEnrollmentMessage = styled(Typography)`
  width: 388px;
  height: 46px;

  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  
  margin: 1px, 3px;

  color: #8E8E8E;
`;

const StyledDescription = styled(Typography)`
  color: #8E8E8E;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  
  margin-bottom: 20px!important;
`;

const StyledTicket = styled.div`
  width: 290px;
  height: 108px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #FFEED2;
  border-radius: 20px;
  
  margin-bottom: 20px!important;
`;

const OptionsModality = styled.div`
  width: 324px;
  height: 145px;

  display: flex;
  justify-content: space-between;

  margin-bottom: 20px!important;
`;

const SelectButtonOption = styled.button`
  width: 145px;
  height: 145px;

  background: ${props => (props.selected ? '#FFEED2' : '#CECECE')};
  border: 1px solid #CECECE;
  border-radius: 20px;
`;

const ButtonConfirmation = styled.button`
  width: 162px;
  height: 37px;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  background: #E0E0E0;
  border: 1px solid #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  cursor: pointer;
`;

const OptionName = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  text-align: center;

  color: #454545;
`;

const OptionPrice = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  color: #898989;
`;
const PaymentConfirmationMessage = styled.div`
  display: flex;

  p{
    margin-left: 13.83px;
  }
`;

const PaymentContainer = styled.div`
  h2 {
    color: #8e8e8e;
    font-size: 1.25rem;
    padding-bottom: 20px;
  }
`;

