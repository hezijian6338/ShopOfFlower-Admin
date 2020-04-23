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
      <el-table-column width="110" label="product_id">
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
      <el-table-column label="brief" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.brief }}
        </template>
      </el-table-column>
      <el-table-column label="content" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button> -->
          <el-button type="text" size="small" @click="checkSku(scope.row.sku_ids)">查看 sku</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button> -->
          <el-button type="text" size="small" @click="modifySku(scope.row)">添加 sku</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
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
      list: [],
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
    modifySku(product) {
      const ids = product.sku_ids.trim().split(',')
      const productId = product.product_id

      console.log(ids)

      console.log(product)

      // if (ids.lenght !== 0) {
      // this.$router.push({ path: '/sku/modify', query: { productId: productId }})
      // } else {
      this.$router.push({ path: '/sku/create', query: { productId: productId }})
      // }
    },
    checkSku(skuIds) {
      this.$router.push({ path: '/sku/list', query: { skuIds: skuIds }})
    }
  }
}
</script>
