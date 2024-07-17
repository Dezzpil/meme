export default () => ({
  port: parseInt(process.env.PORT as string, 10) || 3000,
  database: {
    type: 'postgres' as const,
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT as string, 10) || 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
  },
});
