<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="product_id">
        <template slot-scope="scope">
          {{ scope.row.product_id }}
        </template>
      </el-table-column>
      <el-table-column label="name" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="photo" width="110" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.photo" style="width: 110px">
        </template>
      </el-table-column>
      <el-table-column label="price" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column label="sku_id" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.sku_id }}
        </template>
      </el-table-column>
      <el-table-column label="standard" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.standard }}
        </template>
      </el-table-column>
      <el-table-column label="state" width="110" align="center">
        <template slot-scope="scope">
          <span> {{ statusSwitch(scope.row.state) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="checkOrder(scope.row.id)">查看 详情/编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getOrderList } from '@/api/order'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  computed: {
    statusSwitch() {
      return function(status) {
        console.log(status)

        if (status === 0) { return '下单成功' }
        if (status === 1) { return '制作中' }
        if (status === 2) { return '制作完成' }
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getOrderList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    checkOrder(orderId) {
      this.$router.push({ path: '/order/modify', query: { orderId: orderId }})
    }
  }
}
</script>
