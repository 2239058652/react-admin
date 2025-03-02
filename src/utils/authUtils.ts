export type Role = string | 'guest' | 'user' | 'admin' // 根据实际角色类型调整

export const checkPermission = (required?: string[], userRoles: string[] = []) => {
  // 当路由不要求权限时直接放行
  if (!required || required.length === 0) return true
  // 检查用户是否拥有任意一个要求的权限
  return required.some((role) => userRoles.includes(role))
}
