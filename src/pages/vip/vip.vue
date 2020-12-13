<template>
<div> 
    <!-- 添加 -->
    <v-add :info='info' ref="one"></v-add>
    <!-- 列表 -->
    <v-list @edit='edit($event)'></v-list>
</div>
</template>
<script>
import vList from './components/list'
import vAdd from './components/add'
export default {
components:{
    vList,
    vAdd
 },
data () {
 return {
     info:{
         isShow:false,
         title:"角色添加",
         isAdd:true     //默认添加
     }
 }
},
methods:{
    
    //编辑
    edit(id){
        // console.log(this.$refs.one);
        this.info.isShow=true
        this.info.title="角色修改"
        this.$refs.one.look(id)
        // this.info.isAdd=false

    }
},
mounted(){
}
}
</script>
<style scoped>
</style>