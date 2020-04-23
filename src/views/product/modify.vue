<template>
  <div class="app-container">
    <el-form ref="form" :model="product" label-width="120px">
      <el-form-item label="product_id">
        <el-input v-model="product.product_id" />
      </el-form-item>
      <el-form-item label="Activity name">
        <el-input v-model="product.name" />
      </el-form-item>
      <el-form-item label="Activity content">
        <el-input
          v-model="product.content"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item label="Activity brief">
        <el-input v-model="product.brief" />
      </el-form-item>
      <el-form-item label="Activity photo">
        <el-input v-model="product.photo" />
      </el-form-item>
      <el-form-item label="Activity photo">
        <img :src="product.photo" style="max-width: 220px">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Confirm</el-button>
        <!-- <el-button @click="onCancel">Cancel</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getProduct, modifyProduct } from '@/api/product'

export default {
  data() {
    return {
      userId: '',
      product: {
        product_id: 'af9982f11572f',
        name: '绣球花',
        content: '',
        brief: '淡淡的花色, 不会抢新人的美颜...',
        sku_ids: '',
        photo: 'http://photo.dragonsking.cn/2020/04/08/af9982f11572f.jpg'
      }
    }
  },
  mounted() {
    this.productId = this.$route.query.productId
    this.fetchData()
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
      modifyProduct(this.product).then(res => {
        const { message } = res
        this.$message(message)
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

