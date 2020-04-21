import request from '@/utils/request'

export function createProduct(product) {
  return request({
    url: '/product',
    method: 'post',
    data: product
  })
}

export function modifyProduct(product) {
  return request({
    url: '/product/' + product.product_id,
    method: 'put',
    data: product
  })
}

export function getProductList() {
  return request({
    url: '/product/list',
    method: 'get'
  })
}

export function getProduct(productId) {
  return request({
    url: '/product/' + productId,
    method: 'get'
  })
}

export function delProduct(productId) {
  return request({
    url: '/product/' + productId,
    method: 'delete'
  })
}
