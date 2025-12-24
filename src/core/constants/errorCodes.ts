/**
 * Uygulama genelinde kullanılacak hata detayı arayüzü
 */
export interface IErrorDetail {
  code: string;
  statusCode: number;
  message: string;
  messageEn: string;
}

/**
 * Error Codes ve Mesajları
 * as const kullanımı, TypeScript'in bu değerleri değişmez literal tipler olarak görmesini sağlar.
 */
export const ERROR_CODES = {
  // ==================== AUTHENTICATION ERRORS ====================
  AUTH_INVALID_CREDENTIALS: {
    code: 'AUTH_001',
    statusCode: 401,
    message: 'Geçersiz email veya şifre.',
    messageEn: 'Invalid email or password.',
  },
  AUTH_TOKEN_EXPIRED: {
    code: 'AUTH_002',
    statusCode: 401,
    message: 'Token süresi dolmuş. Lütfen tekrar giriş yapın.',
    messageEn: 'Token expired. Please login again.',
  },
  AUTH_TOKEN_INVALID: {
    code: 'AUTH_003',
    statusCode: 401,
    message: 'Geçersiz token.',
    messageEn: 'Invalid token.',
  },
  AUTH_TOKEN_MISSING: {
    code: 'AUTH_004',
    statusCode: 401,
    message: 'Token bulunamadı. Lütfen giriş yapın.',
    messageEn: 'Token not found. Please login.',
  },
  AUTH_UNAUTHORIZED: {
    code: 'AUTH_005',
    statusCode: 403,
    message: 'Bu işlem için yetkiniz yok.',
    messageEn: 'You are not authorized for this operation.',
  },

  // ==================== AI & SAAS ERRORS (ARTIFICAGENT ÖZEL) ====================
  AI_PROVIDER_ERROR: {
    code: 'AI_001',
    statusCode: 502,
    message: 'Yapay zeka servisi şu an yanıt vermiyor.',
    messageEn: 'AI provider is not responding.',
  },
  AI_QUOTA_EXCEEDED: {
    code: 'AI_002',
    statusCode: 402,
    message: 'Kullanım kotanız doldu. Lütfen paketinizi yükseltin.',
    messageEn: 'Usage quota exceeded. Please upgrade your plan.',
  },
  AI_LATENCY_ERROR: {
    code: 'AI_003',
    statusCode: 504,
    message: 'Asistan yanıt süresi çok uzun sürdü.',
    messageEn: 'Assistant response timed out.',
  },

  // ==================== USER ERRORS ====================
  USER_NOT_FOUND: {
    code: 'USER_001',
    statusCode: 404,
    message: 'Kullanıcı bulunamadı.',
    messageEn: 'User not found.',
  },
  USER_ALREADY_EXISTS: {
    code: 'USER_002',
    statusCode: 400,
    message: 'Bu email adresi zaten kullanılıyor.',
    messageEn: 'This email is already registered.',
  },
  USER_PASSWORD_WEAK: {
    code: 'USER_007',
    statusCode: 400,
    message: 'Şifre en az 6 karakter olmalıdır.',
    messageEn: 'Password must be at least 6 characters.',
  },

  // ==================== VALIDATION ERRORS ====================
  VALIDATION_ERROR: {
    code: 'VAL_001',
    statusCode: 400,
    message: 'Geçersiz giriş verileri.',
    messageEn: 'Invalid input data.',
  },
  VALIDATION_REQUIRED_FIELD: {
    code: 'VAL_002',
    statusCode: 400,
    message: 'Zorunlu alan eksik.',
    messageEn: 'Required field missing.',
  },

  // ==================== DATABASE ERRORS ====================
  DB_CONNECTION_FAILED: {
    code: 'DB_001',
    statusCode: 500,
    message: 'Veritabanı bağlantısı başarısız.',
    messageEn: 'Database connection failed.',
  },
  DB_CAST_ERROR: {
    code: 'DB_003',
    statusCode: 400,
    message: 'Geçersiz ID formatı.',
    messageEn: 'Invalid ID format.',
  },
  DB_DUPLICATE_KEY: {
    code: 'DB_004',
    statusCode: 400,
    message: 'Bu kayıt zaten mevcut.',
    messageEn: 'Record already exists.',
  },
  DB_VALIDATION_ERROR: {
    code: 'DB_005',
    statusCode: 400,
    message: 'Veritabanı doğrulama hatası.',
    messageEn: 'Database validation error.',
  },

  // ==================== GENERAL ERRORS ====================
  INTERNAL_SERVER_ERROR: {
    code: 'GEN_001',
    statusCode: 500,
    message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.',
    messageEn: 'Internal server error. Please try again later.',
  },
  NOT_FOUND: {
    code: 'GEN_002',
    statusCode: 404,
    message: 'Kayıt bulunamadı.',
    messageEn: 'Not found.',
  },
  RATE_LIMIT_EXCEEDED: {
    code: 'GEN_005',
    statusCode: 429,
    message: 'Çok fazla istek. Lütfen daha sonra tekrar deneyin.',
    messageEn: 'Too many requests. Please try again later.',
  },
} as const;

/**
 * ERROR_CODES objesinin anahtarlarını (keys) bir tip olarak dışa aktarır.
 * Bu sayede getError fonksiyonuna sadece buradaki anahtarlar girilebilir.
 */
export type ErrorCodeKey = keyof typeof ERROR_CODES;

/**
 * Belirli bir hata anahtarına göre hata detaylarını döner.
 * @param errorKey - ERROR_CODES içindeki anahtar
 * @param customMessage - (Opsiyonel) Standart mesaj yerine kullanılacak özel mesaj
 */
export const getError = (errorKey: ErrorCodeKey, customMessage: string | null = null): IErrorDetail => {
  const error = ERROR_CODES[errorKey];

  // Eğer bir hata anahtarı yanlışlıkla bulunamazsa (TS engelleyecektir ama fallback olarak)
  if (!error) {
    return {
      code: 'UNKNOWN_ERROR',
      statusCode: 500,
      message: customMessage || 'Bilinmeyen bir hata oluştu.',
      messageEn: customMessage || 'An unknown error occurred.',
    };
  }

  return {
    ...error,
    message: customMessage || error.message,
  };
};