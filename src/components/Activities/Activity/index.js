import styled from 'styled-components';
import { IoEnterOutline } from 'react-icons/io5';
import { bookingActivity } from '../../../services/activitesApi';
import useToken from '../../../hooks/useToken';
import { toast } from 'react-toastify';

export function Activity({ id, name, time, capacity }) {
  const token = useToken();

  async function makeBooking() {
    try {
      await bookingActivity(id, token);
      toast('Inscrição feita!');
    } catch (error) {
      toast('Não foi possível fazer a inscrição!');
    }
  }

  return (
    <Container>
      <div>
        <NameActivity>{name}</NameActivity>
        <TimeActivity>{time}</TimeActivity>
      </div>
      <Line />
      <AcceptActivity onClick={makeBooking}>
        <IoEnterOutline size={30} color='#078632' />
        <p>{capacity} vagas</p>
      </AcceptActivity>
    </Container>
  );
}

const Container = styled.div`
  margin-left: 9px;

  width: 265px;
  height: 79px;
  display: flex;

  background: #F1F1F1;
  border-radius: 5px;

  div{
    margin-left: 10px;
  }
`;

const NameActivity = styled.p`
width: 171px;
height: 14px;

font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 14px;

color: #343434;
`;

const TimeActivity = styled.p`
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 14px;

color: #343434;
`;

const Line = styled.span`
  margin-left: 8px;
  margin-top: 10px;
  width: 0px;
  height: 60px;

  border: 1px solid #CFCFCF;
`;

const AcceptActivity = styled.div`
  margin-left: 20px !important; 
  margin-top: 14px !important;

  p{
  font-style: normal;
  font-weight: 400;
  font-size: 9px;
  line-height: 11px;

  color: #078632;
  }
`;
