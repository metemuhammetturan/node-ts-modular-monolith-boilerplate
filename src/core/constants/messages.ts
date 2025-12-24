/**
 * Başarı mesajları sabitleri
 * Hata mesajları errorCodes.ts içinde tanımlıdır.
 */
export const MESSAGES = {
  SUCCESS: {
    // Auth
    USER_CREATED: 'Kullanıcı başarıyla oluşturuldu.',
    LOGIN_SUCCESS: 'Giriş başarılı.',
    LOGOUT_SUCCESS: 'Çıkış başarılı.',

    // User
    PROFILE_UPDATED: 'Profil başarıyla güncellendi.',
    PASSWORD_CHANGED: 'Şifre başarıyla değiştirildi.',

    // Notification
    PUSH_TOKEN_REGISTERED: 'Push token başarıyla kaydedildi.',

    // General
    OPERATION_SUCCESS: 'İşlem başarıyla tamamlandı.',
    DATA_RETRIEVED: 'Veri başarıyla getirildi.',
  },
} as const;

export type SuccessMessage = typeof MESSAGES.SUCCESS;