import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export default function Payment() {
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledDescription>Primeiro, escolha sua modalidade de ingresso</StyledDescription>
      <OptionsModality>
        <SelectButtonOption>
          <OptionName>Presencial</OptionName>
          <OptionPrice>R$ 250</OptionPrice>
        </SelectButtonOption>
        <SelectButtonOption>
          <OptionName>Online</OptionName>
          <OptionPrice>R$ 100</OptionPrice>
        </SelectButtonOption>
      </OptionsModality>

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

const OptionsModality = styled.div`
  width: 324px;
  height: 145px;

  display: flex;
  justify-content: space-between;

  margin-bottom: 20px!important;
`;

const SelectButtonOption = styled.button`
  width: 145px;
  height: 145px;

  border: 1px solid #CECECE;
  border-radius: 20px;
`;

const OptionName = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  text-align: center;

  color: #454545;
`;

const OptionPrice = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;

  color: #898989;
`;
