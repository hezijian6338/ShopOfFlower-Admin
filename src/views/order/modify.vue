<template>
  <div class="app-container">
    <el-form ref="form" :model="order" label-width="120px">
      <el-form-item label="product_id">
        <el-input v-model="order.product_id" />
      </el-form-item>
      <el-form-item label="Activity name">
        <el-input v-model="order.name" />
      </el-form-item>
      <el-form-item label="Activity sku_id">
        <el-input v-model="order.sku_id" />
      </el-form-item>
      <el-form-item label="Activity standard">
        <el-input v-model="order.standard" />
      </el-form-item>
      <el-form-item label="Activity price">
        <el-input v-model="order.price" />
      </el-form-item>
      <el-form-item label="Activity photo">
        <img :src="order.photo" style="max-width: 220px">
      </el-form-item>
      <el-form-item label="Activity state">
        <el-select v-model="order.state" placeholder="请选择">
          <el-option
            v-for="item of options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Confirm</el-button>
        <el-button type="primary" @click="$router.go(-1)">Back</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getOrder, modifyOrder } from '@/api/order'

export default {
  data() {
    return {
      orderId: '',
      order: {
        id: '',
        product_id: '',
        name: '',
        sku_id: '',
        standard: '',
        price: 0,
        photo: '',
        state: 0
      },
      options: [
        {
          value: 0,
          label: '下单成功'
        },
        {
          value: 1,
          label: '制作中'
        },
        {
          value: 2,
          label: '制作完成'
        }
      ]
    }
  },
  mounted() {
    this.orderId = this.$route.query.orderId
    this.fetchData()
  },
  methods: {
    fetchData() {
      getOrder({ orderId: this.orderId }).then(response => {
        this.order = response.data
      })
    },
    onSubmit() {
      modifyOrder(this.order).then(res => {
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
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

