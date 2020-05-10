import request from '@/utils/request'

export function createTag(tag) {
  return request({
    url: '/tag',
    method: 'post',
    data: tag
  })
}

export function modifyTag(tag) {
  return request({
    url: '/tag/' + tag.id,
    method: 'put',
    data: tag
  })
}

export function tagList() {
  return request({
    url: '/tag/list',
    method: 'get'
  })
}

export function tagOfProduct({ tagName }) {
  return request({
    url: '/tag/' + tagName + '/product',
    method: 'get'
  })
}
