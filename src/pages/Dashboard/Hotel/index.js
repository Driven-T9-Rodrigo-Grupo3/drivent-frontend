import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { HotelCard } from '../../../components/Hotel/HotelCard';
import { getHotels, getHotelsWithRooms } from '../../../services/hotelsApi';
import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import useTicket from '../../../hooks/api/useTicket';
import RoomSelector from '../../../components/Hotel/RoomSelector';

export default function Hotel() {
  const [hotelsList, setHotelsList] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
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
              onClick={() => setSelectedHotel(props)}
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
          <RoomSelector capacity={1}/>
          <RoomSelector capacity={1}/>
          <RoomSelector capacity={1}/>
          <RoomSelector capacity={1}/>
          <RoomSelector capacity={1}/>
          <RoomSelector capacity={1}/>
          <RoomSelector capacity={1}/>
          <RoomSelector capacity={1}/>
          <RoomSelector capacity={1}/>
          <RoomSelector capacity={1}/>
          <RoomSelector capacity={1}/>
          <RoomSelector capacity={1}/>
        </RoomsContainer>
      </div>
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
