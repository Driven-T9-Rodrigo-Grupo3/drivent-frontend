import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { Activity } from '../../../components/Activities/Activity';

export default function Activities() {
  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <StyledDescription>Primeiro, filtre pelo dia do evento:</StyledDescription>
      <DaysOptions>
        <StyledButton>Sexta, 22/10</StyledButton>
        <StyledButton>Sábado, 23/10</StyledButton>
        <StyledButton>Domingo, 24/10</StyledButton>
      </DaysOptions>
      <ActivitesOptions>
        <ActivitesContainer>
          <Location>Auditório Principal</Location>
          <ActivitesBorder>
            <Activity name={'Minecraft: montando o PC ideal'} time={'09:00 - 10:00'}/>
            <Activity name={'Minecraft: montando o PC ideal'} time={'09:00 - 10:00'}/>
            <Activity name={'Minecraft: montando o PC ideal'} time={'09:00 - 10:00'}/>
          </ActivitesBorder>
        </ActivitesContainer>
        <ActivitesContainer>
          <Location>Auditório Lateral</Location>
          <ActivitesBorder>
            <Activity name={'Minecraft: montando o PC ideal'} time={'09:00 - 10:00'}/>
            <Activity name={'Minecraft: montando o PC ideal'} time={'09:00 - 10:00'}/>
            <Activity name={'Minecraft: montando o PC ideal'} time={'09:00 - 10:00'}/>
          </ActivitesBorder>
        </ActivitesContainer>
        <ActivitesContainer>
          <Location>Sala de Workshop</Location>
          <ActivitesBorder>
            <Activity name={'Minecraft: montando o PC ideal'} time={'09:00 - 10:00'}/>
            <Activity name={'Minecraft: montando o PC ideal'} time={'09:00 - 10:00'}/>
            <Activity name={'Minecraft: montando o PC ideal'} time={'09:00 - 10:00'}/>
          </ActivitesBorder>
        </ActivitesContainer>
      </ActivitesOptions>
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

const StyledButton = styled.button`
  width: 131px;
  height: 37px;

  background: #E0E0E0;
  border: 1px solid #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  color: #000000;
`;

const DaysOptions = styled.div`
  width: 417px;
  display: flex;
  justify-content: space-between;
`;

const ActivitesOptions = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
`;

const ActivitesContainer = styled.div`
  div{
    margin-top: 10px;
  }
`;

const ActivitesBorder = styled.div`
  width: 285px;
  height: 392px;
  border: 1px solid #D7D7D7;
`;

const Location = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;

  text-align: center;

  color: #7B7B7B;
`;
