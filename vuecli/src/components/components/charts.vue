<template>
    <div class="container">
        <div id="chart" class="chart"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            chartDatas: []
        }
    },
    props:[
        'datas'
    ],
    methods: {
        showCharts: function(datas){
            let chartDatas
            if(datas[0].agency){
                chartDatas = [
                    {value: 0, name: '重庆电器'},
                    {value: 0, name: '成都电器'},
                    {value: 0, name: '北京电器'},
                    {value: 0, name: '上海科技'}
                ]
                for(let i = 0;i<this.datas.length;i++){
                    if(this.datas[i].agency == '重庆电器'){
                        chartDatas[0].value += parseInt(this.datas[i].number)
                    }else if(this.datas[i].agency == '成都电器'){
                        chartDatas[1].value += parseInt(this.datas[i].number)
                    }else if(this.datas[i].agency == '北京电器'){
                        chartDatas[2].value += parseInt(this.datas[i].number)
                    }else if(this.datas[i].agency == '上海科技'){
                        chartDatas[3].value += parseInt(this.datas[i].number)
                    }
                }
            }else if(datas[0].purchaser){
                chartDatas = [
                    {value: 0, name: '万达集团'},
                    {value: 0, name: '阿里巴巴'},
                    {value: 0, name: '中国石油'},
                    {value: 0, name: '中国石化'}
                ]
                for(let i = 0;i<this.datas.length;i++){
                    if(this.datas[i].purchaser == '万达集团'){
                        chartDatas[0].value += parseInt(this.datas[i].number)
                    }else if(this.datas[i].purchaser == '阿里巴巴'){
                        chartDatas[1].value += parseInt(this.datas[i].number)
                    }else if(this.datas[i].purchaser == '中国石油'){
                        chartDatas[2].value += parseInt(this.datas[i].number)
                    }else if(this.datas[i].purchaser == '中国石化'){
                        chartDatas[3].value += parseInt(this.datas[i].number)
                    }
                }
            }else if(datas[0].job){
                chartDatas = [
                    {value: 0, name: '经理'},
                    {value: 0, name: '领班'},
                    {value: 0, name: '普通员工'},
                ]
                for(let i = 0;i<this.datas.length;i++){
                    if(this.datas[i].job == '经理'){
                        chartDatas[0].value += 1
                    }else if(this.datas[i].job == '领班'){
                        chartDatas[1].value += 1
                    }else if(this.datas[i].job == '普通员工'){
                        chartDatas[2].value += 1
                    }
                }
            }
            for(let i = 0;i<chartDatas.length;i++){
                if(chartDatas[i].value == 0){
                    chartDatas.splice(i,1)
                }
            }
            var myChart = this.$echarts.init(document.getElementById('chart'));
            myChart.setOption({
                series : [
                    {
                        name: '库存数量及人数',
                        type: 'pie',
                        radius: '55%',
                        roseType: 'angle',
                        itemStyle: {
                            // 阴影的大小
                            shadowBlur: 200,
                            // 阴影水平方向上的偏移
                            shadowOffsetX: 0,
                            // 阴影垂直方向上的偏移
                            shadowOffsetY: 0,
                            // 阴影颜色
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        data:chartDatas
                    }
                ]
            })
        }
    },
    watch:{
        // datas的值改变一次，就重新画图一次
        datas(){
            this.showCharts(this.datas)
        }
    },
    mounted(){
        //挂载完成就画图
        this.showCharts(this.datas)
    }
}
</script>

<style scoped>
    .container{
        width: 100%;
        height: 100%;
        margin-top: 10px;
        background:#ccc;
        border-radius: 10px;
    }
    .chart{
        width: 600px;
        height: 400px;
        margin: 0 auto; 
    }
</style>
