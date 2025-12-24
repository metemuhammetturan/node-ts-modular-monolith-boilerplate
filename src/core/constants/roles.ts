export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  CLINIC_ADMIN: 'clinic_admin'
} as const;

export const ALL_ROLES = Object.values(ROLES);

export type Role = typeof ROLES[keyof typeof ROLES];