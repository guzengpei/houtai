import request from '@/utils/request'

// 获取所有权限列表
export const getRights = () => {
  return request({
    url: 'rights/list'
  })
}

// 获取角色列表
export const getRoles = () => {
  return request({
    url: 'roles'
  })
}

// 角色分配权限
export const assignPermissions = () => {
  return request({
    url: 'rights/tree'
  })
}
