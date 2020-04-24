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
      <el-table-column label="standard">
        <template slot-scope="scope">
          {{ scope.row.standard }}
        </template>
      </el-table-column>
      <el-table-column label="price" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="photo" width="210" align="center">
        <template slot-scope="scope">
          <!-- {{ scope.row.photo }} -->
          <img :src="scope.row.photo" style="width: 210px">
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="110">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button> -->
          <el-button type="text" size="small" @click="modify(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="110">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button> -->
          <el-button type="text" size="small" @click="onDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSku, delSku } from '@/api/sku'
import { getProduct, modifyProduct } from '@/api/product'

export default {
  data() {
    return {
      list: [],
      listLoading: true,
      skuIds: [],
      productId: '',
      product: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // this.skuIds = this.$route.query.skuIds
      this.productId = this.$route.query.productId
      getProduct(this.productId).then(res => {
        const { code } = res
        console.log(code)

        if (code === 200) {
          const { data } = res
          this.product = data
          const { sku_ids } = this.product
          console.log(sku_ids)
          if (sku_ids !== '') {
            this.skuIds = sku_ids
            const ids = sku_ids.split(',')
            ids.forEach(skuId => {
              this.listLoading = true
              getSku({ skuId }).then(response => {
                this.list.push(response.data)
                this.listLoading = false
              })
            })
          } else {
            this.list = []
          }
        }
      })
    },
    modify(skuId) {
      this.$router.push({ path: '/sku/modify', query: { skuId: skuId }})
    },
    onDelete(skuId) {
      delSku({ skuId }).then(res => {
        const { code } = res
        console.log(code)
        console.log(`product: ${this.product.sku_ids}, skuId: ${skuId}, ${this.product.sku_ids.indexOf(skuId)}`)
        if (code === 200) {
          // this.$router.push({ path: '/product/list' })
          const ids = this.product.sku_ids.split(',')
          ids.splice(ids.indexOf(skuId), 1)
          if (ids.indexOf(skuId) === -1) {
            // this.product.sku_ids.replace(skuId, '')
            console.log(`sku_ids剩余: ${ids.toString()}`)
            // if (this.product.sku_ids.indexOf(',') !== -1) {
            //   this.product.sku_ids.replace(',', '')
            //   console.log(`sku_ids剩余: ${this.product.sku_ids}`)
            // }
            this.product.sku_ids = ids.toString()
            modifyProduct(this.product).then(res => {
              this.$message({
                message: '删除成功!',
                type: 'success'
              })
              // if (this.skuIds.replace(skuId, '')){}
              this.fetchData()
            })
          }
        }
      })
    }
  }
}
</script>
