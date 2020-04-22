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
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Confirm</el-button>
        <!-- <el-button @click="onCancel">Cancel</el-button> -->
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
        id: String,
        product_id: String,
        name: String,
        sku_id: String,
        standard: String,
        price: Number,
        photo: String,
        state: Number,
        created_date: Number,
        updated_date: Number
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
          value: 1,
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

