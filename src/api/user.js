import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(phone) {
  return request({
    url: '/user/phone/' + phone,
    method: 'get'
  })
}

export function getInfoById({ id }) {
  return request({
    url: '/user/' + id,
    method: 'get'
  })
}

export function creatUser(user) {
  return request({
    url: '/user',
    method: 'post',
    data: user
  })
}

export function modifyUser(user) {
  return request({
    url: '/user/' + user.id,
    method: 'put',
    data: user
  })
}

export function deleteUser({ id }) {
  return request({
    url: '/user/' + id,
    method: 'delete'
  })
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
