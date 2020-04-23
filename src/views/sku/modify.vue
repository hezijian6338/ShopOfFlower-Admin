<template>
  <div class="app-container">
    <el-form ref="sku" :model="sku" label-width="120px">
      <el-form-item label="standard">
        <el-input v-model="sku.standard" />
      </el-form-item>
      <el-form-item label="Activity price">
        <el-input v-model="sku.price" />
      </el-form-item>
      <el-form-item label="Activity photo">
        <el-input v-model="sku.photo" />
      </el-form-item>
      <el-form-item label="Activity photo">
        <img :src="sku.photo" style="max-width: 220px">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Confirm</el-button>
        <el-button type="primary" @click="goBack">Back</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { modifySku, getSku } from '@/api/sku'

export default {
  data() {
    return {
      skuId: '',
      sku: {
        standard: '手提',
        price: 80,
        photo: 'http://photo.dragonsking.cn/2020/04/08/606ea57aef693.jpg'
      }
    }
  },
  mounted() {
    this.skuId = this.$route.query.skuId
    this.fetchData()
  },
  methods: {
    fetchData() {
      // this.listLoading = true
      getSku({ skuId: this.skuId }).then(response => {
        this.sku = response.data
        // this.listLoading = false
      })
    },
    onSubmit() {
      modifySku(this.sku).then(res => {
        const { data } = res
        if (data) {
          this.$message({
            message: '成功!',
            type: 'success'
          })
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

