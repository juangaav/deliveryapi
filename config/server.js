module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("https://dddelivery-api-2024-b8c7e9ca2fd4.herokuapp.com/"),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "Eb8gqCWbjj0kFWZMZajX6OeFiO4g/ZJfGczgB7wDX44uEiR9ewbNNvr8uhvKE7oW"),
    },
    serveAdminPanel: false,
  },
});