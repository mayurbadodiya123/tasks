export const APP_CONFIG = {
  JWT_SECRET: process.env.JWT_SECRET || "",
  DATABASE: {
    HOST: process.env.DATABASE_HOST || "",
    NAME: process.env.DATABASE_NAME || "",
    USER: process.env.DATABASE_USER_NAME || "",
    PASSWORD: process.env.DATABASE_PASSWORD || "",
  },
  PORT: process.env.PORT,
  ENV_TYPE: process.env.ENV_TYPE,
  JWT_EXPIRE_TIME: process.env.JWT_EXPIRE_TIME,
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE,
};
