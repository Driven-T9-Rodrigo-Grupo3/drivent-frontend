import { Typography } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';

export default function Payment() {
  const [isRemote, setIsRemote] = useState(null);
  const [haveHotel, sethaveHotel] = useState(null);

  function renderModalityOptions() {
    return (
      <>
        <StyledDescription>Primeiro, escolha sua modalidade de ingresso</StyledDescription>
        <OptionsModality>
          <SelectButtonOption selected={!isRemote} onClick={() => setIsRemote(false)}>
            <OptionName>Presencial</OptionName>
            <OptionPrice>R$ 250</OptionPrice>
          </SelectButtonOption>
          <SelectButtonOption selected={isRemote} onClick={() => setIsRemote(true)}>
            <OptionName>Online</OptionName>
            <OptionPrice>R$ 100</OptionPrice>
          </SelectButtonOption>
        </OptionsModality>
      </>
    );
  }

  function renderHotelOptions() {
    if (isRemote === false) {
      return (
        <>
          <StyledDescription>Ótimo! Agora escolha sua modalidade de hospedagem</StyledDescription>
          <OptionsModality>
            <SelectButtonOption selected={!haveHotel} onClick={() => sethaveHotel(false)}>
              <OptionName>Sem Hotel</OptionName>
              <OptionPrice>+ R$ 0</OptionPrice>
            </SelectButtonOption>
            <SelectButtonOption selected={haveHotel} onClick={() => sethaveHotel(true)}>
              <OptionName>Com Hotel</OptionName>
              <OptionPrice>+ R$ 350</OptionPrice>
            </SelectButtonOption>
          </OptionsModality>
        </>
      );
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {renderModalityOptions()}
      {renderHotelOptions()}
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

  background: ${props => (props.selected ? '#FFEED2' : '#CECECE')};
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
