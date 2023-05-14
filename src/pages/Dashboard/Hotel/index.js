import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { HotelCard } from '../../../components/Hotel/HotelCard';
import { getHotels } from '../../../services/hotelsApi';
import useToken from '../../../hooks/useToken';
import { useEffect, useState } from 'react';

export default function Hotel() {
  const [hotels, setHotels] = useState([]);

  const token = useToken();

  useEffect(() => {
    async function fetchData() {
      const hotelsBack = await getHotels(token);
      setHotels(hotelsBack);
    }
    fetchData();
  }, []);

  console.log(hotels);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledDescription>Você já escolheu seu quarto:</StyledDescription>
      <HotelCard
        hotelName='Driven Resort'
        hotelImage='https://www.peninsula.com/pt/-/media/images/the-peninsula-hotels/destination/phk_exterior_1280.jpg?mw=867&hash=1291A55911B67AA850150A9FAC42D6CD'
        hotelRoom='101'
        roomCapacity={2}
        bookedQty={1}
        bookedHotel={true}
      />
    </>
  );
}

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
