import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { useContext } from 'react';

import useTicket from '../../../hooks/api/useTicket';
import useEnrollment from '../../../hooks/api/useEnrollment';

import { CertificateCard } from '../../../components/Certificate';

import EventInfoContext from '../../../contexts/EventInfoContext';

export default function Certificate() {
  const { ticket } = useTicket();
  const { eventInfo } = useContext(EventInfoContext);
  const { enrollment } = useEnrollment();

  const targetDate = new Date(eventInfo.endsAt);
  const currentDate = new Date();

  function renderError() {
    if (ticket === undefined || ticket === null) {
      return (
        <StyledError>
          Você precisa ter selecionado o seu ticket e confirmado pagamento
          <br /> antes de ter acesso ao seu certificado.
        </StyledError>
      );
    }

    if (ticket?.status !== 'PAID') {
      return (
        <StyledError>
          Você precisa ter confirmado pagamento antes <br /> de ter acesso ao
          seu certificado.
        </StyledError>
      );
    }

    if (currentDate < targetDate) {
      return (
        <StyledError>
          Seu certificado ficará disponível ao <br /> final do evento.
        </StyledError>
      );
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Seu Certificado</StyledTypography>
      {renderError() ? (
        renderError()
      ) : (
        <CertificateCard
          name={enrollment.name}
          event={eventInfo.title}
          logo={eventInfo.logoImageUrl}
          background={eventInfo.backgroundImageUrl}
        />
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const StyledError = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30%;

  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  text-align: center;
  color: #8e8e8e;
`;
