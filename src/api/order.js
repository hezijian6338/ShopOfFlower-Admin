import request from '@/utils/request'

export function getOrderList() {
  return request({
    url: '/order/list',
    method: 'get'
  })
}

export function getOrder({ orderId }) {
  return request({
    url: '/order/' + orderId,
    method: 'get'
  })
}

export function modifyOrder(order) {
  return request({
    url: '/order/' + order.id,
    method: 'put',
    data: order
  })
}

export function delOrder({ orderId }) {
  return request({
    url: '/order/' + orderId,
    method: 'delete'
  })
}
