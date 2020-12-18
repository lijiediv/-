<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="手机号" :label-width="width">
          <el-input v-model="form.phone" autocomplete=""></el-input>
        </el-form-item>
      
        <el-form-item label="名称" :label-width="width">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
      
        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reqvipListOne, reqvipEdit } from "../../../util/request";
import {mapGetters,mapActions} from 'vuex'
export default {
    props:['info'],
    computed:{
      ...mapGetters({
        menuList:"menu/list"
      })
    },
  components: {},
  data() {
    return {
      width: "160px",
      form: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    //   取消弹框
      hide(){
          this.info.isShow=false
      },
      ...mapActions({
      requestvipList: "vip/requestvipList",
      }),

    // 查看一条数据
    look(id){
      reqvipListOne({uid:id}).then(res=>{
        this.form=res.data.list
        // console.log(res)
      })
    },
    //修改
    update() {
      reqvipEdit(this.form).then((res) => {
        
        this.hide();
        this.requestvipList();
        // console.log(res)
      });
    },

  },
  mounted() {},
};
</script>
<style scoped>
</style>