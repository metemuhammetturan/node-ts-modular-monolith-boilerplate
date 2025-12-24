export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  BANNED: 'banned'
} as const;

export type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS];