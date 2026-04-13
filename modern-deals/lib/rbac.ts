export type AppRole = 'ADMIN' | 'EDITOR' | 'ANALYST';

const rank: Record<AppRole, number> = {
  ANALYST: 1,
  EDITOR: 2,
  ADMIN: 3,
};

export function canAccess(required: AppRole, current?: string | null) {
  if (!current) return false;
  return rank[current as AppRole] >= rank[required];
}
