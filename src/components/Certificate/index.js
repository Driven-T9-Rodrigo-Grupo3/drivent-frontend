import styled from 'styled-components';

export function CertificateCard({ name, event, background, logo }) {
  return (
    <Container>
      <Title>CERTIFICADO</Title>
      <Subtitle bg={background}>DE PARTICIPAÇÃO</Subtitle>

      <Presentation>ORGULHOSAMENTE ENTREGUE À</Presentation>
      <Name>{name}</Name>
      <Description>
        Este certificado é concedido a {name} em reconhecimento à sua valiosa
        participação no evento {event}. Sua dedicação e envolvimento
        enriqueceram o evento, contribuindo para o seu sucesso. Agradecemos por
        seu comprometimento em contribuir para o aprendizado e o enriquecimento
        deste evento. Esperamos que os conhecimentos adquiridos e as conexões
        estabelecidas continuem a inspirar e impulsionar sua jornada pessoal e
        profissional.
      </Description>

      <EventTeam>
        Atenciosamente, organização {event}
      </EventTeam>

      <Logo src={logo} alt="logo" />
    </Container>
  );
}

const Container = styled.div`
  position: relative; 
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  align-items: center;
  margin-top: 10%;

  border-radius: 10px;

  background-color: #fafafa;
  box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
`;

const Title = styled.h1`
font-weight: 700;
font-size: 40px;
line-height: 30px;

text-align: center;
letter-spacing: 0.1em;

color: #16151C;

margin-bottom: 10px;

@media (max-width: 688px) {
  font-size: 35px;
}
`;

const Subtitle = styled.h2`
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 8px;
text-align: center;
letter-spacing: 0.25em;

color: #16151C;
background: ${({ bg }) => (bg ? bg : 'transparent')};

margin-bottom: 30px;
`;

const Presentation = styled.h3`
font-style: normal;
font-weight: 700;
font-size: 7px;
line-height: 6px;

text-align: center;
letter-spacing: 0.25em;

color: #16151C;
`;

const Name = styled.h1`
font-style: normal;
font-weight: 300;
font-size: 32px;
line-height: 32px;

text-align: center;

color: #000000;

margin-bottom: 15px;
`;

const Description = styled.p`
max-width: 300px;
font-style: normal;
font-weight: 400;
font-size: 10px;
line-height: 8px;

text-align: center;

color: #383C57;

opacity: 0.5;

margin-bottom: 30px;
`;

const EventTeam = styled.p`
font-style: normal;
font-weight: 500;
font-size: 8px;
`;

const Logo = styled.img`
  border-radius: 50%;
  position: absolute;
  width: 50px;
  
  right: 20px;

  @media (min-width: 689px) {
    top: 20px;
    bottom: 20px;
  }

  @media (max-width: 688px) {
    width: 40px;
    bottom: 20px;
  }
`;
