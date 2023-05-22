import { IoLogoGithub } from 'react-icons/io';
import { AiFillGoogleCircle } from 'react-icons/ai';
import qs from 'query-string';

import styled from 'styled-components';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const navigate = useNavigate();
  function githubRedirect() {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize';
    const params = {
      response_type: 'code',
      scope: 'user',
      client_id: process.env.GITHUB_CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URI,
    };
    const authURL = `${GITHUB_URL}?
    response_type=code&scope=user&client_id=${process.env.GITHUB_CLIENT_ID}
    &redirect_uri=${process.env.REDIRECT_URI}`;
    window.location.href = authURL;
  }

  async function getUserCredentials() {
    try {
      const { code } = qs.parseUrl(window.location.href).query;
      if (code) {
        const response = await axios.post('http://localhost:4000/auth/sign-in-github', { code });
        const user = response.data;
        if (user) navigate('/dashboard');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getUserCredentials();
  }, [])
  return (
    <OAuthButtons>
      <button onClick={githubRedirect}>
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
