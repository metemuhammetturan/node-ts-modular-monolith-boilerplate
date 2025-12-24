import helmet from 'helmet';
import config from '../../config/env.ts';

const helmetConfig = helmet({
  contentSecurityPolicy: config.env === 'production' ? undefined : false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
});

export default helmetConfig;