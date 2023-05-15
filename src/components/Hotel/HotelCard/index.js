import styled from 'styled-components';

export function HotelCard({ hotelName, hotelImage, hotelRoom, roomCapacity, bookedQty, bookedHotel }) {
  return (
    <Container bookedHotel={bookedHotel}>
      <Image alt="Hotel" src={hotelImage} />
      <Title>{hotelName}</Title>
      <SubTitle>Tipos de acomodação:</SubTitle>
      <Description>
        {hotelRoom} ({roomCapacity === 2 ? 'Double' : roomCapacity === 3 ? 'Triple' : 'Single'})
      </Description>
      <SubTitle>Vagas disponíveis:</SubTitle>
      <Description>{bookedQty}</Description>
    </Container>
  );
}

export const Container = styled.div`
  width: 196px;
  height: 264px;
  display: flex;
  flex-direction: column;
  background-color: ${({ bookedHotel }) => (bookedHotel ? '#FFEED2' : '#EBEBEB')};
  border-radius: 10px;
  margin-right: 19px;
  padding: 14px;
`;

const Image = styled.img`
    width: 100%;
    height: 109px;
    border-radius: 5px;
`;

const Title = styled.h1`
    font-size: 20px;
    line-height: 23px;
    margin: 10px 0px;
    color: #343434;
`;

const SubTitle = styled.h2`
    font-weight: 600;
    font-size: 12px;
    color: #3c3c3c;
`;

const Description = styled.span`
    color: #3c3c3c;
    font-size: 12px;
    line-height: 20px;
    margin-bottom: 10px;
`;

