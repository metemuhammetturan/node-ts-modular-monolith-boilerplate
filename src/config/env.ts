import joi from 'joi';
import dotenv from 'dotenv';

dotenv.config();

// Config objesinin tipini tanımlıyoruz (TS'in en kritik kısmı)
interface Config {
  env: string;
  port: number;
  database: { url: string };
  jwt: { secret: string; expiresIn: string };
  openai: { apiKey?: string };
  log: { level: string };
}

const envSchema = joi.object({
  NODE_ENV: joi.string().valid('development', 'production', 'test').default('development'),
  PORT: joi.number().default(3000),
  DATABASE_URL: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  JWT_EXPIRES_IN: joi.string().default('7d'),
  OPENAI_API_KEY: joi.string().optional(),
  LOG_LEVEL: joi.string().valid('error', 'warn', 'info', 'debug').default('info'),
}).unknown(true);

const { error, value } = envSchema.validate(process.env, {
  abortEarly: false,
  stripUnknown: true,
});

if (error) {
  console.error('Environment Variable Validation Failed ❌');
  process.exit(1);
}

const config: Config = {
  env: value.NODE_ENV,
  port: value.PORT,
  database: { url: value.DATABASE_URL },
  jwt: { secret: value.JWT_SECRET, expiresIn: value.JWT_EXPIRES_IN },
  openai: { apiKey: value.OPENAI_API_KEY },
  log: { level: value.LOG_LEVEL },
};

export default config;