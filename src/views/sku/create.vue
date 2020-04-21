<template>
  <div class="app-container">
    <el-form ref="sku" :model="sku" label-width="120px">
      <el-form-item label="Activity standard">
        <el-input v-model="sku.standard" />
      </el-form-item>
      <el-form-item label="Activity price">
        <el-input v-model="sku.price" />
      </el-form-item>
      <el-form-item label="Activity photo">
        <el-input v-model="sku.photo" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Confirm</el-button>
        <!-- <el-button @click="onCancel">Cancel</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createSku } from '@/api/sku'
import { getProduct, modifyProduct } from '@/api/product'

export default {
  data() {
    return {
      productId: '',
      sku: {
        standard: '手提',
        price: 80,
        photo: 'http://photo.dragonsking.cn/2020/04/08/606ea57aef693.jpg'
      },
      product: {
        id: '747c65c2d3e4428c9faf45ce42bbc9ee',
        product_id: 'a9efaae871bdd',
        name: '红橙玫瑰花礼',
        brief: '给出不一样的感觉, 不鲜艳, 不抢色, 很舒适的风格~',
        content: '',
        sku_ids: 'f9ee2ebd1c81433d8467bdfd01ba23e0,e556402c6f26416986d9acb7eaa83298',
        photo: 'http://photo.dragonsking.cn/2020/04/08/c04a17222a300.jpg',
        price: 253
      }
    }
  },
  mounted() {
    this.productId = this.$route.query.productId
    // this.fetchData()
  },
  methods: {
    fetchData() {
      // this.listLoading = true
      getProduct(this.productId).then(response => {
        this.product = response.data
        // this.listLoading = false
      })
    },
    onSubmit() {
      // this.$message('submit!')
      createSku(this.sku).then(res => {
        const { result, id } = res
        this.$message(result)
        if (this.product.sku_ids === '') {
          this.product.sku_ids = `${id}`
        } else {
          const skuIds = this.product.sku_ids.split(' ').split(',')
          skuIds.push(id)
        }

        if (result) {
          modifyProduct(this.product).then(res => {
            this.$confirm('是否继续添加 sku', '提示', {
              confirmButtonText: '是',
              cancelButtonText: '否',
              type: 'success'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '继续添加!'
              })
              const newSku = {
                standard: '',
                price: 0,
                photo: ''
              }
              this.sku = newSku
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '返回商品'
              })
              this.$router.go(-1)
            })
          })
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

