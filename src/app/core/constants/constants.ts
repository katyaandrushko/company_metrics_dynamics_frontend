const apiUrl =
  'https://github.com/katyaandrushko/company_metrics_dynamics_backend';

export const apiEndpoint = {
  Auth: {
    Register: `${apiUrl}/users/register`,
    Login: `${apiUrl}/users/login`,
    Me: `${apiUrl}/users/me`,
  },
};

export const LocalStorage = {
  token: 'USER_TOKEN',
};
