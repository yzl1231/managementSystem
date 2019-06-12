<template>
    <div>
        <div class="search">
            <el-select class="searchInput" v-model="value" :disabled="searchInput" clearable :placeholder="placeholders[tab - 1]">
                <el-option
                    v-for="item in options[tab-1]"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-button class="addItem" type="success" @click="addItem">添加{{items[tab-1]}}</el-button>
            <el-button class="addItem" type="success" :disabled="turnToTableView" @click="tableView">{{viewBtnMsg[views-1]}}</el-button>
        </div>
        <!-- 列表视图 -->
        <el-table
            v-if="views == 1"
            class="listItem"
            :data="datas"
            height="498"
            border
            style="width: 100%">
            <el-table-column
                :prop="listTableOne[tab-1].english"
                :label="listTableOne[tab-1].chinese">
                <template v-if="tab != 2" scope="scope">
                    <img :src="scope.row.img" width="40" height="40" class="listImg"/>
                </template>
            </el-table-column>
            <el-table-column
                :prop="listTableTwo[tab-1].english"
                :label="listTableTwo[tab-1].chinese">
            </el-table-column>
            <el-table-column
                :prop="listTableThree[tab-1].english"
                :label="listTableThree[tab-1].chinese">
            </el-table-column>
            <el-table-column
                :prop="listTableFour[tab-1].english"
                :label="listTableFour[tab-1].chinese">
            </el-table-column>
            <el-table-column
                :prop="listTableFive[tab-1].english"
                :label="listTableFive[tab-1].chinese">
            </el-table-column>
            <el-table-column
                :prop="listTableSix[tab-1].english"
                :label="listTableSix[tab-1].chinese">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="detele(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 图表视图 -->
        <div v-if="views == 2">
            <charts :datas="datas"></charts>
        </div>
    </div>
</template>

<script>
import charts from './charts'
export default {
    data(){
        return{
            listTableOne:[
                {chinese:'商品图片',english: 'img'},
                {chinese:'时间',english: 'orderTime'},
                {chinese:'证件照',english: 'img'},
                ],
            listTableTwo:[
                {chinese:'商品名称',english: 'goodName'},
                {chinese:'商品名称',english: 'orderName'},
                {chinese:'姓名',english: 'personName'},
                ],
            listTableThree:[
                {chinese:'类目',english: 'type'},
                {chinese:'类目',english: 'type'},
                {chinese:'性别',english: 'sex'},
                ],
            listTableFour:[
                {chinese:'品牌',english: 'brand'},
                {chinese:'品牌',english: 'brand'},
                {chinese:'职位',english: 'job'},
                ],
            listTableFive:[
                {chinese:'经销商',english: 'agency'},
                {chinese:'购买商',english: 'purchaser'},
                {chinese:'家庭住址',english: 'address'},
                ],
            listTableSix:[
                {chinese:'库存',english: 'number'},
                {chinese:'数量',english: 'number'},
                {chinese:'工作时长（年）',english: 'workTime'},
                ],
            items:['商品','订单','员工'], //添加按钮的文字数组
            options: [[{
                value: '重庆电器',
                label: '重庆电器'
            }, {
                value: '成都电器',
                label: '成都电器'
            }, {
                value: '北京电器',
                label: '北京电器'
            }, {
                value: '上海科技',
                label: '上海科技'
            }],[{
                value: '万达集团',
                label: '万达集团'
            }, {
                value: '阿里巴巴',
                label: '阿里巴巴'
            }, {
                value: '中国石油',
                label: '中国石油'
            }, {
                value: '中国石化',
                label: '中国石化'
            }],[{
                value: '经理',
                label: '经理'
            }, {
                value: '领班',
                label: '领班'
            }, {
                value: '普通员工',
                label: '普通员工'
            }]],
            placeholders: ['全部经销商', '全部购买商', '全部职位'], //搜索框提示信息
            value: '', //搜索的标签
            searchName: '', //搜索的名称
            datas: [], // 信息列表数组
            views: '', //控制当前视图是列表视图，还是图表视图，1为列表视图、2为图表视图
            viewBtnMsg: ['转到图表视图','转到列表视图'], //转换按钮的文字信息
            turnToTableView: false, //控制转换视图按钮是否可用
            searchInput: false,
        }
    },
    props:[
        'tab'
    ],
    components: {
        charts
    },
    created(){
        this.views = 1
        this.requsetItems()
    },
    watch: {
        tab(val){
            //val的值就等于tab的值，tab每改变一个，就请求一次数据
            this.requsetItems()
            
        },
        value(val){
            if(val){
                //如果搜索框里有值，就自动搜索
                this.searchItems()
                this.turnToTableView = true
            }else{
                //如果搜索框里的值清空了，就请求全部信息渲染到页面
                this.requsetItems()
                this.turnToTableView = false
            }
        },
        views(val){
            if(val == 1){
                this.searchInput = false
            }else{
                this.searchInput = true
            }
        }
    },
    methods: {
        // 添加信息
        addItem: function(){
            let that = this
            this.$router.push({name:'addItem',params:{add: 1}})
        },
        // 点击跳转到修改页面,并把该条消息传过去
        handleClick(row) {
            // console.log(row);
            this.$router.push({name:'addItem',params:row})
        },
        // 请求全部信息函数
        requsetItems(){
            let that = this
            this.$axios.post('/users/getItems',{
                    tab: that.tab
                })
                .then(function(res){
                    console.log(res.data);
                    that.datas = res.data;
                })
                .catch(function (error) {
                    alert(error)
                });
        },
        //删除消息函数
        detele(row){
            let that = this
            this.$axios.post('/users/deleteItems',{
                    tab: that.tab, //传入后台来判断该条信息在哪个集合
                    messageId: row.messageId 
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.code == 1){
                        that.$message('删除成功')
                        if(that.value){
                            that.searchItems()
                        }else{
                            that.requsetItems()
                        }
                    }
                })
                .catch(function (error) {
                    alert(error)
                });
        },
        // 搜索信息
        searchItems(){
            let that = this
            let searchDatas = {
                tab: that.tab,
                label: that.value
            }
            this.$axios.post('/users/searchItems',searchDatas)
                .then(function(res){
                    console.log(res.data);
                    that.datas = res.data
                })
                .catch(function (error) {
                    alert(error)
                });
        },
        //切换到表格视图
        tableView(){
            let that = this
            if(this.views == 1){
                that.views = 2
            }else{
                that.views = 1
            }
            
        }
    }
}
</script>

<style scoped>
    /* 搜索框 */
    .search{
        width: 100%;
        height: 50px;
        background: rgb(200, 215, 231);
        border-radius: 10px;
    }
    .searchInput{
        margin: 5px 10px;
    }
    /* 添加信息按钮 */
    .addItem{
        float: right;
        margin: 5px 50px 5px 0;
    }
    /* 信息列表 */
    .listItem{
        border-radius: 10px;
        margin-top: 10px;
    }
    .listImg{
        width: 50px;
        height: 50px;
    }
    .chartOne{
        width: 300px;
        height: 300px;
        margin: 20px;
        background: blue;
    }
</style>