import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import styled from 'styled-components';
import { Activity } from '../Activity';
import { getActivities } from '../../../services/activitesApi';

export function ActivitiesDay({ day }) {
  const [activitiesMainList, setActivitiesMainList] = useState([]);
  const [activitiesSideList, setActivitiesSideList] = useState([]);
  const [activitiesWorkshopList, setActivitiesWorkshopList] = useState([]);

  const token = useToken();

  useEffect(() => {
    async function fetchData() {
      const activities = await getActivities(token);
      const filteredActivities = activities.filter(obj => {
        const activityDate = new Date(obj.dateTime);
        const activityDay = activityDate.getUTCDate();
        const activityMonth = activityDate.getUTCMonth() + 1;
        const dayMonth = `${activityDay}/${activityMonth}`;
        return dayMonth === day;
      });
      setActivitiesMainList(filteredActivities.filter(obj => obj.location === 'MAIN'));
      setActivitiesSideList(filteredActivities.filter(obj => obj.location === 'SIDE'));
      setActivitiesWorkshopList(filteredActivities.filter(obj => obj.location === 'WORKSHOP'));
    }
    fetchData();
  }, [day]);

  function timeRender(dateTime, hoursDuration) {
    const startDateTime = new Date(dateTime);
  
    const endDateTime = new Date(startDateTime.getTime() + hoursDuration * 60 * 60 * 1000);
  
    const startTime = startDateTime.toISOString().substr(11, 5);
    const endTime = endDateTime.toISOString().substr(11, 5);
  
    return `${startTime} - ${endTime}`;
  }

  return (<>
    <ActivitesContainer>
      <Location>Auditório Principal</Location>
      <ActivitesBorder>
        {activitiesMainList.map((props, index) => (
          <Activity
            id={props.id}
            name={props.name}
            time={timeRender(props.dateTime, props.hoursDuration)}
            capacity={props.capacity}
            key={index}
          />
        ))}
      </ActivitesBorder>
    </ActivitesContainer>
    <ActivitesContainer>
      <Location>Auditório Lateral</Location>
      <ActivitesBorder>
        {activitiesSideList.map((props, index) => (
          <Activity
            id={props.id}
            name={props.name}
            time="09:00 - 10:00"
            capacity={props.capacity}
            key={index}
          />
        ))}
      </ActivitesBorder>
    </ActivitesContainer>
    <ActivitesContainer>
      <Location>Sala de Workshop</Location>
      <ActivitesBorder>
        {activitiesWorkshopList.map((props, index) => (
          <Activity
            id={props.id}
            name={props.name}
            time="09:00 - 10:00"
            capacity={props.capacity}
            key={index}
          />
        ))}
      </ActivitesBorder>
    </ActivitesContainer>
  </>);
}

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
