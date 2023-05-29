export default function useGithubAuth() {
  return {githubAuthURL: getAuthURL(), code: getURLCode(), }
}

function getParams() {
  return new URLSearchParams({
    response_type: 'code',
    scope: 'user',
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
  });
}
function getURL() {
  const GITHUB_URL = 'https://github.com/login/oauth/authorize';
  const options = getParams().toString();
  const authURL = `${GITHUB_URL}?${options}`;
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
