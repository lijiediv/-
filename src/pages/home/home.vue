<template>
<div>
  <div id="main" style="width: 600px;height:400px;border:1px solid #ccc" ></div>
  <!-- {{list}} -->
</div>
</template>
<script>
import * as echarts from 'echarts'
import {mapActions,mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters({
      list:"cate/list"
    })
  },
components:{
 },
data () {
 return {
 }
},
methods:{


...mapActions({
  requestcateList:"cate/requestcateList"
})
},
mounted(){
  this.requestcateList()
      
  
},
watch:{
  list:{
    handler(){
      var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '近一周订单量'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                // data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                data:this.list.map(item=>item.catename)
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line', //line折线   bai柱状
                // data: [5, 20, 36, 10, 10, 20]
                data:this.list.map(item=>item.children?item.children.length:0)
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

    },
    deep:true
  }
}

}
</script>
<style scoped>
</style>