export interface INotificationTemplate {
  title: string;
  body: string;
}

export const NOTIFICATION_TEMPLATES = {
  // ==================== SYSTEM ====================
  SYSTEM_MAINTENANCE: {
    title: 'Sistem Bakımı',
    body: 'Sistem bakımı nedeniyle {duration} boyunca hizmet veremeyeceğiz.',
  },
  SYSTEM_ANNOUNCEMENT: {
    title: 'Duyuru',
    body: '{announcementText}',
  },
} as const;

/**
 * Şablonu değişkenlerle dolduran yardımcı fonksiyon
 */
export const fillNotificationTemplate = (
  template: INotificationTemplate,
  variables: Record<string, string | number> = {}
): INotificationTemplate => {
  let { title, body } = { ...template };

  Object.keys(variables).forEach((key) => {
    const value = String(variables[key] || '');
    const regex = new RegExp(`\\{${key}\\}`, 'g');
    title = title.replace(regex, value);
    body = body.replace(regex, value);
  });

  return { title, body };
};