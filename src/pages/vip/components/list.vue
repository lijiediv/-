<template>
  <div class="box">

    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="用户编号"  width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="名称"  width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <!-- <el-button type="primary">启用</el-button>
        <el-button type="info">禁用</el-button> -->
         <template slot-scope="scope">
          <el-button type='primary' v-if='scope.row.status==1'>启用</el-button>
          <el-button type='danger' v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type='primary' @click="edit(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "vip/list",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestvipList: "vip/requestvipList",
    }),
    // 编辑
    edit(id){
        this.$emit('edit',id)
        // console.log(scope);
    },
  },
  mounted() {
    this.requestvipList();
  },
};
</script>
<style scoped>
.box {
  margin-top: 20px;
}
</style>