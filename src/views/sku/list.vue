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
    </el-table>
  </div>
</template>

<script>
import { getSku } from '@/api/sku'

export default {
  data() {
    return {
      list: [],
      listLoading: true,
      skuIds: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.skuIds = this.$route.query.skuIds
      const ids = this.skuIds.split(',')
      ids.forEach(skuId => {
        this.listLoading = true
        getSku({ skuId }).then(response => {
          this.list.push(response.data)
          this.listLoading = false
        })
      })
    },
    modify(skuId) {
      this.$router.push({ path: '/sku/modify', query: { skuId: skuId }})
    }
  }
}
</script>
