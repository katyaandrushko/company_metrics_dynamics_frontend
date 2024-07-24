const apiUrl = 'https://company-metrics-dynamics-backend.onrender.com';

export const apiEndpoint = {
  Auth: {
    Register: `${apiUrl}/api/users/register`,
    Login: `${apiUrl}/api/users/login`,
    Me: `${apiUrl}/api/users/me`,
  },
  Companies: `${apiUrl}/companies/`,
  Metrics: `${apiUrl}/metrics/`,
};

export const LocalStorage = {
  token: 'USER_TOKEN',
};
