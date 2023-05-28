import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getActivities } from '../../../services/activitesApi';
import useToken from '../../../hooks/useToken';
import { ActivitiesDay } from '../../../components/Activities/ActivitiesDay';

export default function Activities() {
  const [activitiesDaysList, setActivitiesDaysList] = useState([]);
  const [daySelected, setDaySelected] = useState(null);

  const token = useToken();

  useEffect(() => {
    async function fetchData() {
      const activities = await getActivities(token);
      const filteredArray = activities.filter((obj, index, self) =>
        index === self.findIndex((o) => o.dateTime === obj.dateTime)
      );

      const formattedDateTimeArray = filteredArray.map(obj => {
        const dateTime = new Date(obj.dateTime);
        const formattedDateTime = dateTime.toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit' });
        return formattedDateTime;
      });
      setActivitiesDaysList(formattedDateTimeArray);
    }
    fetchData();
  }, []);

  function renderDate(date) {
    const [day, month] = date.split('/');
    const year = new Date().getFullYear(); // Assumes current year
  
    const formattedDate = new Date(`${year}-${month}-${day}`);
    const options = { weekday: 'long', day: '2-digit', month: '2-digit' };
  
    const text = formattedDate.toLocaleDateString('pt-BR', options);

    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      {!daySelected ? (<StyledDescription>Primeiro, filtre pelo dia do evento:</StyledDescription>) : (<></>)}
      <DaysOptions>
        {activitiesDaysList.map((day, index) => (
          <StyledButton onClick={() => setDaySelected(day)} selected={day === daySelected} key={index}>{renderDate(day)}</StyledButton>
        ))}
      </DaysOptions>
      {daySelected ? (<ActivitesOptions>
        <ActivitiesDay day={daySelected} />
      </ActivitesOptions>) : (<></>)}
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

  background: ${({ selected }) => (selected ? '#FFD37D' : '#E0E0E0')};
  border: 1px solid #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  color: #000000;
  cursor: pointer;
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
