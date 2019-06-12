<template>
    <div class="container" :style="{'width':width + 'px'}">
        <div class="top">
            <span class="logo">LOGO</span>
            <div class="top_right">
                <span>管理员，</span>
                <span class="administrator">{{username}}</span>
                <a @click="goOut">退出登录</a>
            </div>
        </div>
        <div class="bottom">
            <div class="left" >
                <ul class="list">
                    <li @click="changeTab(1)">
                        <img src="../../../static/icons/goods.png" alt="">
                        <span>商品管理</span>
                        <span class="point">></span>
                    </li>
                    <li @click="changeTab(2)">
                        <img src="../../../static/icons/order_icon.png" alt="">
                        <span>订单管理</span>
                        <span class="point">></span>
                    </li>
                    <li @click="changeTab(3)">
                        <img src="../../../static/icons/users.png" alt="">
                        <span>员工管理</span>
                        <span class="point">></span>
                    </li>
                </ul>
            </div>
            <div class="right" :style="{'width': (width-220) + 'px'}" >
                <list :tab="tab"></list>
            </div>
        </div>
    </div>
</template>

<script>
import list from '../components/left_navigation'
export default {
    name: 'index',
    data(){
        return{
            tab: '',
            username: localStorage.getItem('username'),
            width: '', //屏幕宽度
        }
    },
    components: {
        list
    },
    created(){
        this.tab = parseInt(localStorage.getItem('pageTab'))?parseInt(localStorage.getItem('pageTab')):1;
        this.width = document.body.clientWidth;
        console.log('屏幕宽度'+this.width);
    },
    methods: {
        //改变tab--->切换商品管理页、订单管理页、员工管理页
        changeTab: function(index){
            this.tab = index
            //保存tab到本地，来判断是商品、订单、人员
            localStorage.setItem('pageTab', this.tab);
        },
        //退出登录
        goOut(){
            this.$confirm('确定退出系统吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                localStorage.setItem('pageTab',1)
                this.$router.push('/')
            }).catch(() => {
            });
            
        }
    }
}
</script>

<style scoped>
    .container{
       /* height: 100%; */
       margin: 0 auto;
    }
    /* 顶部导航栏 */
    .top{
        width:100%;
        height: 8vh;
        line-height: 50px;
        background: rgb(200, 215, 231);
        display: flex;
        justify-content: space-between;
    }
    .logo{
        font-size: 30px;
        font-weight: bold;
        margin-left: 40px;
    }
    .top_right{
        margin-right: 40px;
        font-size: 12px;
    }
    .administrator{
        color: red;
    }
    .top_right a{
        margin-left: 20px; 
        text-decoration: underline;
        color: #1296DB;
    }
    .top_right a:hover{
        cursor: pointer;
    }
    /* 底部信息栏 */
    .bottom{
        display: flex;
        width: 100%;
        height: 100%;
    }
    /* 左边导航栏 */
    .left{
        width: 200px;
        height: 92vh;
        background: #1296DB;
    }
    .list{
        margin-top: 20px;
    }
    .list li{
        width: 100%;
        float: left;
        color:white;
        font-size: 20px;
        margin: 10px 5px;
    }
    .list li:hover{
        cursor:pointer;
    }
    .list img{
        width: 26px;
        height: 26px;
        vertical-align: middle
    }
    .point{
        float: right;
        margin-right: 10px;
    }
    /* 列表框 */
    .right{
        margin-top: 10px;
        margin-left: 10px;
        height: 558px;
    }
</style>