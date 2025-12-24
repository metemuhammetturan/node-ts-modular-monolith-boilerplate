/**
 * Uygulama genelinde standart hata yapısı için özel Error sınıfı.
 * Operasyonel hataları (beklenen hatalar) merkezi olarak yönetmemizi sağlar.
 */
class AppError extends Error {
    public readonly statusCode: number;
    public readonly status: string;
    public readonly isOperational: boolean;
    public readonly errorCode?: string;
  
    /**
     * @param statusCode HTTP Durum Kodu (400, 404, 500 vb.)
     * @param message Hata Mesajı
     * @param isOperational Hatanın beklenen (true) veya beklenmedik (false) olması
     * @param errorCode errorCodes.ts içindeki teknik hata kodu (örn: AUTH_001)
     */
    constructor(
      statusCode: number,
      message: string,
      isOperational: boolean = true,
      errorCode?: string
    ) {
      super(message);
  
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = isOperational;
      this.errorCode = errorCode;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default AppError;