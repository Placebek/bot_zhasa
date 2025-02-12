export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  basicAuth: {
    username: process.env.BASIC_AUTH_USER,
    password: process.env.BASIC_AUTH_PASS,
  },
  apiUrl: process.env.API_URL,
});
