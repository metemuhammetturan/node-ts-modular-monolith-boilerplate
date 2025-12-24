import winston from 'winston';
import config from '../../../config/env';

// Log seviyeleri (Sıralama kritiktir)
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Ortama göre log seviyesini belirle
const level = () => {
  const env = config.env || 'development';
  return env === 'development' ? 'debug' : 'info';
};

// Renklendirme ayarları
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

// Log formatı (Timestamp + Renk + Mesaj)
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}${info.stack ? '\n' + info.stack : ''}`
  )
);

// Taşıyıcılar (Şu an sadece Console, yarın File veya Cloud eklenebilir)
const transports = [
  new winston.transports.Console(),
];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default logger;