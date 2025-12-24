import cors, { CorsOptions } from 'cors';

/**
 * CORS Configuration
 * İzin verilen kaynaklar listesi
 */
const allowedOrigins: string[] = [
  'http://127.0.0.1:5500',
];

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (
      !origin || 
      origin === 'null' || 
      allowedOrigins.includes(origin) || 
      origin.endsWith('.netlify.app')
    ) {
      callback(null, true);
    } else {
      callback(new Error('Bu alan adına CORS tarafından izin verilmiyor.'));
    }
  },
  credentials: true,
};

export default cors(corsOptions);