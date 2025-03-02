// types.ts（类型定义文件）
export type Role = string | 'guest' | 'user' | 'admin' // 根据实际角色类型调整

/**
 * 权限校验核心方法
 * @param requiredRoles 路由要求的角色数组（undefined表示无需权限）
 * @param userRoles 用户当前角色数组
 * @param mode 校验模式：any-满足任意角色即可，all-需满足所有角色
 */
export const checkPermission = (
  required?: string[],
  userRoles: string[] = [],
  checkAll = false // 是否需满足所有权限
) => {
  if (!required?.length) return true
  return checkAll
    ? required.every((role) => userRoles.includes(role))
    : required.some((role) => userRoles.includes(role))
}
