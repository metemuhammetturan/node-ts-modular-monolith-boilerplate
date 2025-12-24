import mongoose, { ConnectOptions } from 'mongoose';
import config from '../config/env';
import logger from '../core/utils/log-management/logger'; 

let isConnected: boolean = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected) return;

  try {
    const options: ConnectOptions = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(config.database.url, options);

    isConnected = true;
    logger.info('MongoDB\'ye başarıyla bağlandı! 🟢');

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
      isConnected = false;
    });
  } catch (error: any) {
    logger.error('Veritabanına bağlanırken hata:', error.message);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  if (!isConnected) return;
  await mongoose.connection.close();
  isConnected = false;
  logger.info('MongoDB bağlantısı kapatıldı.');
};

export const isDBConnected = (): boolean => {
  return isConnected && mongoose.connection.readyState === 1;
};