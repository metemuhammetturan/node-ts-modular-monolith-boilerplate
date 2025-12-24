// src/utils/response-helper/response.helper.js

class ResponseHelper {
    /**
     * Başarılı işlemler için standart response
     */
    static success(res, data = {}, message = "İşlem başarıyla tamamlandı", statusCode = 200) {
      return res.status(statusCode).json({
        success: true,
        message,
        data
      });
    }
  
    /**
     * Hatalı işlemler için standart response
     * (Global Error Handler ile entegre çalışır)
     */
    static error(res, message = "Bir hata oluştu", errorCode = "INTERNAL_SERVER_ERROR", statusCode = 500) {
      return res.status(statusCode).json({
        success: false,
        errorCode,
        message
      });
    }
  }
  
  module.exports = ResponseHelper;