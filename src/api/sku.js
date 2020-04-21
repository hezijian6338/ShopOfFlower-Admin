import request from '@/utils/request'

export function getSku({ skuId }) {
  return request({
    url: '/sku/' + skuId,
    method: 'get'
  })
}

export function modifySku(sku) {
  return request({
    url: '/sku/' + sku.sku_id,
    method: 'put',
    data: sku
  })
}

export function createSku(sku) {
  return request({
    url: '/sku',
    method: 'post',
    data: sku
  })
}

export function delSku({ skuId }) {
  return request({
    url: '/sku/' + skuId,
    method: 'delete'
  })
}
