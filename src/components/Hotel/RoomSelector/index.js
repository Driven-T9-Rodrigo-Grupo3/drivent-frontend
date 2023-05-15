import styled from 'styled-components';
import { BsPerson } from 'react-icons/bs';
import { bookingRoomById } from '../../../services/bookingApi';
import useToken from '../../../hooks/useToken';
import { useEffect, useState } from 'react';

export default function RoomSelector({ id, capacity, onClick }) {
  const person = [];
  const [bookings, setBookings] = useState(null);

  const token = useToken();

  for (let i = 0; i < capacity; i++) {
    person.push(<BsPerson size={20.25} />);
  }

  useEffect(() => {
    async function fetchData() {
      const promise = await bookingRoomById(id, token);
      setBookings(promise);
    }
    fetchData();
  }, []);

  return (
    <Container onClick={onClick}>
      <p>101</p>
      <div>
        {person}
      </div>
    </Container>
  );
}

export const Container = styled.div`
    display: flex;
    width: 190px;
    height: 45px;
    border: 1px solid #CECECE;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    p{
        margin-right: 60px;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        
        color: #454545;
    }
`;
