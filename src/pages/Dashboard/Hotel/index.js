import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { HotelCard } from '../../../components/Hotel/HotelCard';
import { getHotels, getHotelsWithRooms } from '../../../services/hotelsApi';
import { bookingRoom } from '../../../services/bookingApi';
import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import useTicket from '../../../hooks/api/useTicket';
import RoomSelector from '../../../components/Hotel/RoomSelector';

export default function Hotel() {
  const [hotelsList, setHotelsList] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { ticket } = useTicket();

  function renderError() {
    if (ticket?.TicketType?.isRemote) {
      return (
        <StyledErrorHotels>
        Sua modalidade de ingresso não inclui hospedagem <br/> Prossiga para a escolha de atividades
        </StyledErrorHotels>
      );
    }
  }

  const token = useToken();

  useEffect(() => {
    async function fetchData() {
      const hotels = await getHotels(token);
      const promises = hotels.map(async(hotel) => {
        const room = await getHotelsWithRooms(hotel.id, token);
        return {
          hotel: hotel,
          rooms: room.Rooms
        };
      });
      const finalArr = await Promise.all(promises);
      setHotelsList(finalArr);
    }
    fetchData();
  }, []);

  function getRoomLenght(hotelData) {
    const { rooms } = hotelData;
    return rooms.length;
  }

  async function makeBooking(roomId) {
    await bookingRoom(roomId, token);
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {renderError()}
      <StyledDescription>Você já escolheu seu quarto:</StyledDescription>
      {hotelsList.length > 0 ? (
        <HotelsContainer>
          {hotelsList.map((props, index) => (
            <HotelCard
              hotelName={props.hotel.name}
              hotelImage={props.hotel.image}
              hotelRoom='101'
              roomCapacity={2}
              bookedQty={getRoomLenght(props)}
              bookedHotel={true}
              onClick={() => setSelectedHotel(props.rooms)}
              key={index}
            />
          ))}
        </HotelsContainer>
      ) : (
        <p>Loading...</p>
      )}
      <div>
        <StyledDescription>Ótima pedida! Agora escolha seu quarto:</StyledDescription>
        <RoomsContainer>
          {selectedHotel.map((props, index) => (
            <RoomSelector onClick={() => {setSelectedRoom(props.id); console.log(props.id);}} capacity={props.capacity} key={index}/>
          ))}
        </RoomsContainer>
      </div>
      <ConfirmationButton onClick={() => makeBooking(selectedRoom)}>
         RESERVAR QUARTO
      </ConfirmationButton>
    </>
  );
}

const HotelsContainer = styled.div`
  display: flex;
`;

const RoomsContainer = styled.div`
  width: 55vw;
  height: 12vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const StyledDescription = styled(Typography)`
  color: #8E8E8E;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  
  margin-bottom: 20px!important;
`;

const StyledErrorHotels = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  text-align: center;
  color: #8E8E8E;
`;

const ConfirmationButton = styled.button`
width: 182px;
height: 37px;

background: #E0E0E0;
border: 1px solid #E0E0E0;
box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
border-radius: 4px;

font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
text-align: center;

color: #000000;
cursor: pointer;
`;
