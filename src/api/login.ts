import request from '@/axios'

// 文件上传接口
export const fetchUploadFile = (data: FormDataLogin) => {
  return request.post({
    url: '/api/upload/image',
    data,
    headersType: 'multipart/form-data'
  })
}

// api/user.ts
export const exportBalance = (data: { keyWord: string }) => {
  return request.get({
    url: '/api/pc/export_balance',
    params: data,
    responseType: 'blob'
  })
}
