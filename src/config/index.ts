import "dotenv/config";
import { cleanEnv, str, num } from "envalid";

const config = cleanEnv(process.env, {
  MONGODB_URI: str(),
  NODE_ENV: str({
    choices: ["development", "production"],
    default: "development",
  }),
  PORT: num({
    default: 3000,
  }),
  JWT_SECRET: str({
    default: "VERY_VERY_STRONG_JWT_SECRET_THAT_NO_ONE_CAN_GUESS",
  }),
});

export default config;