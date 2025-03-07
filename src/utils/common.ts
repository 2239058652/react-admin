export const getCurrentDateTime = (): string => {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0') // 月份补零
  const day = String(now.getDate()).padStart(2, '0') // 日期补零

  const hours = String(now.getHours()).padStart(2, '0') // 小时补零
  const minutes = String(now.getMinutes()).padStart(2, '0') // 分钟补零
  const seconds = String(now.getSeconds()).padStart(2, '0') // 秒数补零

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
