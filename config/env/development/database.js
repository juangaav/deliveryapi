const parse = require('pg-connection-string').parse;
const config = parse('postgres://u395dpba50u2jd:p77004aa657680d07c9acd51d1050871bc9a3274d894c4c6c1806a2ecf06552a1@c3gtj1dt5vh48j.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d75f3gc6fbpjjf');
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: {
        rejectUnauthorized: false
      },
    },
    debug: false,
  },
});
