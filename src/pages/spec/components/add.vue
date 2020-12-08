<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        

        <el-form-item label="分类名称" :label-width="width">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

    
        <el-form-item label="分类名称" :label-width="width"
          v-for="(item, index) in arrAttr"
          :key="index">
          
             <el-row>
         <el-col :span="18">
           <el-input v-model="item.value" autocomplete="off"></el-input>
         </el-col>
         <el-col :span="4">
          <el-button type="primary" v-if="index == 0"
          @click="addAttr"  >新增规格属性</el-button>
          <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
         </el-col>
        </el-row>
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
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqspecsAdd} from "../../../util/request";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      // cateList: "cate/list",
    }),
  },
  components: {},
  data() {
    return {
      width: "160px",
     
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      arrAttr:[
        {
          value:"",
        }
      ]
    };
  },
  methods: {
    
    //重置
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      }
    },
    //隐藏
    hide() {
      this.info.isShow = false;
    },
    //新增属性
    addAttr(){
      this.arrAttr.push({
        value:""
      })
    },
    //删除属性
    delAttr(index){
      this.arrAttr.splice(index,1)
    },

    add() {
      this.form.attrs=JSON.stringify(this.arrAttr.map(item=>{return item.value}))
      // console.log(this.form.attrs)
      reqspecsAdd(this.form).then((res) => {
        this.empty();
        this.hide();
        // this.requestspecsList();
      });
      
    },






    ...mapActions({
      // requestspecsList: "specs/requestspecsList",
    }),
    //获取一条数据
    look(id) {
      // reqcateListOne({ id: id }).then((res) => {
      //   this.form = res.data.list;
      //   this.form.id = id;
      //   this.imageUrl = this.$perImg+res.data.list.img
      // });
    },
    update() {
      // reqcateEdit(this.form).then((res) => {
      //   this.requestcateList();
      //   this.hide();
      // });
    },
  },
  mounted() {
      // this.requestspecsList();
    // console.log(this.menuList);
  },
};
</script>
<style scoped>
</style>