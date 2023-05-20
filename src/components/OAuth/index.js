import { IoLogoGithub } from 'react-icons/io';
import { AiFillGoogleCircle } from 'react-icons/ai';

import styled from 'styled-components';

export default function OAuth() {
  return (
    <OAuthButtons>
      <button>
        Entrar com Github <IoLogoGithub></IoLogoGithub>
      </button>
      <button>
        Entrar com Google <AiFillGoogleCircle></AiFillGoogleCircle>
      </button>
    </OAuthButtons>
  );
}

const OAuthButtons = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  button {
    margin-bottom: 5px;
    height: 35px;
    width: 340px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    :hover{
      box-shadow: 1px 1px 5px black;
      transform: scale(1.02);
      filter: brightness(120%);
    }
  }
  > :nth-child(1){
    background-color: black;
    color: white;
  }
  > :nth-child(2){
    background-color: #4b7fd1;
    color: white;
  }
`;
