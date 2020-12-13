<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @opened="changeEditor">
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="width">
          <el-select
            v-model="form.first_cateid"
            placeholder="--请选择--"
            @change="changeCate"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态循环添加数据  菜单分类 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="width">
          <el-select
            v-model="form.second_cateid"
            placeholder="--请选择--"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态循环添加数据  菜单分类 -->
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="width">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="价格" :label-width="width">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" :label-width="width">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="width">
          <!-- 图片 -->

          <el-upload
            class="avatar-uploader"
            
            action="#" 
            :show-file-list="false"
            :on-change="changeImg"
          >
          <!-- 判断显示图片还是+ -->
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
 
 
        <el-form-item label="商品规格" :label-width="width">
          <el-select
            v-model="form.specsid"
            placeholder="--请选择--"
            @change="changeSpec"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态循环添加数据  菜单分类 -->
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" :label-width="width">
          <el-select
            v-model="form.specsattr"
            placeholder="--请选择--"
            multiple="multiple" 
          >
          <!-- multiple多选 -->
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态循环添加数据  菜单分类 -->
            <el-option
              v-for="item in secondSpec"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        
        <el-form-item label="是否新品" :label-width="width">
          <el-radio v-model="form.isnew" :label="1" >是</el-radio>
          <el-radio v-model="form.isnew" :label="2" >否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" :label-width="width">
          <el-radio v-model="form.ishot" :label="1" >是</el-radio>
          <el-radio v-model="form.ishot" :label="2" >否</el-radio>
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

        
        <el-form-item label="商品描述" :label-width="width">
            <!-- <textarea name="" id="" cols="30" rows="10" v-model="form.description">
              
            </textarea> -->
            <div id="div1" v-if="info.isShow"></div>
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
//引入富有文本编辑器
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
import { reqgoodsAdd,reqgoodsListOne,reqgoodsEdit} from "../../../util/request";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specList:"specs/list"
    }),
  },
  components: {},
  data() {
    return {
      width: "160px",
      imageUrl:"",   //用来做判断的图片
      secondCate:[],  //二级分类
      secondSpec:[],  //规格属性
      form: {
        first_cateid:0,
        second_cateid:0,
        goodsname: "",
        price:0,
        market_price:0,
        img:null,
        description:'',
        specsid:0,
        specsattr:[], //商品规格属性
        isnew:1,
        ishot:1,
        status: 1,
      },
    };
  },
  methods: {
      //上传图片
      changeImg(a){
        //   console.log(a) //获取到的文件  （上传的图片）
          var fire = a.raw
          this.imageUrl = URL.createObjectURL(fire);
          console.log(this.imageUrl)
          this.form.img=fire
      },
    //重置
    empty() {
      this.form = {
        first_cateid:0,
        second_cateid:0,
        goodsname: "",
        price:0,
        market_price:0,
        img:null,
        description:'', //文本框内容
        specsid:0,
        specsattr:[],
        isnew:1,
        ishot:1,
        status: 1,
      }
    },
    //隐藏
    hide() {
      this.info.isShow = false;
    },

    //修改二级分类
    changeCate(){
      this.secondCate = this.cateList.find((item)=>{
        return item.id==this.form.first_cateid}).children
    },


    //修改规格属性
    changeSpec(){
      this.form.specsattr=[]
      this.secondSpec = this.specList.find((item)=>{
        return item.id==this.form.specsid}).attrs;
    },


    add() {
      this.form.description = this.editor.txt.html()
      reqgoodsAdd(this.form).then((res) => {
        this.empty();
        this.hide();
        this.requestgoodsList();
      });
    },

    ...mapActions({
      requestcateList: "cate/requestcateList",
      requestspecsList: "specs/requestspecsList",
      requestgoodsList:"goods/requestgoodsList"
    }),
    //获取一条数据
    look(id) {
      reqgoodsListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$perImg+res.data.list.img
      //取回来的规格属性是字符串逗号隔开 ，所以需要进行分割
        this.form.specsattr = this.form.specsattr.split(",")
      //在这里获取因为是异步操作请求得慢，有可能显示的慢报错
        // this.editor.txt.html(this.form.description)
        //获取文本内容的方法this.editor.txt.html()
      });
    },
    update() {
      this.form.description=this.editor.txt.html()
      reqgoodsEdit(this.form).then((res) => {
        this.hide();
        this.empty()
        this.requestgoodsList();
      });
    },
    //页面加载完成创建富文本编辑器
    changeEditor(){
      this.editor = new E("#div1")
      this.editor.create()
      //为空获取，有内容为设置
      this.editor.txt.html(this.form.description)
    }

  },
  mounted() { 
      this.requestcateList();
      this.requestspecsList()
      this.requestgoodsList()
    // console.log(this.menuList);

   
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #ccc;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>