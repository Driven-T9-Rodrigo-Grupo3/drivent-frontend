import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { HotelCard } from '../../../components/Hotel/HotelCard';
import { getHotels, getHotelsWithRooms } from '../../../services/hotelsApi';
import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';

export default function Hotel() {
  const [hotelsList, setHotelsList] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

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

  console.log(hotelsList);

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
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

    </>
  );
}

const HotelsContainer = styled.div`
  display: flex;
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
