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
      <el-table-column label="brief" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.brief }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button> -->
          <el-button type="text" size="small" @click="modifySku(scope.row.product_id)">添加 sku</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button> -->
          <el-button type="text" size="small" @click="modify(scope.row.product_id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getProductList } from '@/api/product'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getProductList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    modify(productId) {
      this.$router.push({ path: '/product/modify', query: { productId: productId }})
    },
    modifySku(productId) {
      const ids = this.list.sku_ids
      if (ids.lenght === 0 || ids === undefined || ids === null) {
        this.$router.push({ path: '/sku/modify', query: { productId: productId }})
      } else {
        this.$router.push({ path: '/sku/create', query: { productId: productId }})
      }
    }
  }
}
</script>
