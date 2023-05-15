import styled from 'styled-components';

export function HotelCard({ hotelName, hotelImage, roomCapacity, bookedQty, bookedHotel, onClick, selected }) {
  return (
    <Container selected={selected} bookedHotel={bookedHotel} onClick={onClick}>
      <Image alt="Hotel" src={hotelImage} />
      <Title>{hotelName}</Title>
      <SubTitle>Tipos de acomodação:</SubTitle>
      <Description>
        {roomCapacity}
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
  background: ${({ selected }) => (selected ? '#FFEED2' : 'white')};
  border-radius: 10px;
  margin-right: 19px;
  padding: 14px;
  cursor: pointer;
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

