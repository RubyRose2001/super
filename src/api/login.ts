import http from '@/utils/http.utils'

export const login = (data: any) => http.postFormData('/api/operation/login', data)