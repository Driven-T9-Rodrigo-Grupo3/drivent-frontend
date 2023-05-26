import styled from 'styled-components';
import useTicket from '../../../hooks/api/useTicket';
import { Typography } from '@material-ui/core';

export default function Activities() {
  const { ticket } = useTicket();

  function renderError() {
    if (ticket?.TicketType?.isRemote || !ticket?.TicketType?.includesHotel) {
      return (
        <StyledError>
        Sua modalidade de ingresso não necessita escolher <br /> atividade. Você terá acesso a todas as atividades.
        </StyledError>
      );
    }

    if(ticket?.status !== 'PAID') {
      return (
        <StyledError>
          Você precisa ter confirmado pagamento antes <br /> de fazer a escolha de atividades
        </StyledError>
      );
    };
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      {renderError() ? (
        renderError()
      ) : (
        <>
          Restante da página
        </>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
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
  color: #8E8E8E;
`;
