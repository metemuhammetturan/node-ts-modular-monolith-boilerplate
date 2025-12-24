/**
 * Bildirim (Notification) tipleri sabitleri
 */
export const NOTIFICATION_TYPE = {
  SYSTEM: 'system',
  ALERT: 'alert',      // Yeni ekleme: AI uyarıları için
  INVOICE: 'invoice'   // Yeni ekleme: Ödeme bildirimleri için
} as const;

export type NotificationType = keyof typeof NOTIFICATION_TYPE;