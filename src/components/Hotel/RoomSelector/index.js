import styled from 'styled-components';
import { BsFillPersonFill, BsPerson } from 'react-icons/bs';
import { bookingRoomById } from '../../../services/bookingApi';
import useToken from '../../../hooks/useToken';
import { useEffect, useState } from 'react';

export default function RoomSelector({ id, capacity, onClick, selected }) {
  const person = [];
  const [bookings, setBookings] = useState([]);

  const token = useToken();

  for (let i = 0; i < bookings.length; i++) {
    person.push(<BsFillPersonFill color="#FF4791" size={20.25} key={i}/>);
  }

  for (let i = 0; i < capacity - bookings.length; i++) {
    person.push(<BsPerson size={20.25} key={i + capacity}/>);
  }

  useEffect(() => {
    async function fetchData() {
      const promise = await bookingRoomById(id, token);
      setBookings(promise);
    }
    fetchData();
  }, []);

  const isDisabled = bookings.length === capacity;

  return (
    <Container selected={selected} disabled={isDisabled} onClick={onClick}>
      <p>{id}</p>
      <div>
        {person}
      </div>
    </Container>
  );
}

export const Container = styled.button`
    display: flex;
    width: 190px;
    height: 45px;
    border: 1px solid #CECECE;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: ${({ selected, disabled }) => (disabled ? '#CECECE' : selected ? '#FFEED2' : 'white')};

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
