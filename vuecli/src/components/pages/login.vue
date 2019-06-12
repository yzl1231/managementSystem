<template>
    <div class="container" :style="{'width':width + 'px'}">
        <img class="background_img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559721549159&di=215193cd50250df2ab8d8f201fab61dd&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D1735688044%2C4235283864%26fm%3D214%26gp%3D0.jpg" />
        <div class="center_box">
            <div class="top">
                <img class="avatar" src="../../../static/icons/login.png" />
            </div>
            <el-form  label-color="white" label-width="80px">
                <el-form-item  label="用户名">
                    <el-input class="input" v-model="username" clearable></el-input>
                </el-form-item>
                <el-form-item label-color="white" label="密码">
                    <el-input class="input" v-model="password" show-password clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn" type="primary" @click="login">登录</el-button>
                    <el-button class="btn" @click="enroll">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data(){
        return{
            username: '',
            password: '',
            width: ''//屏幕宽度
        }
    },
    created(){
        this.width = document.body.clientWidth;
        console.log(window.history)
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        });
    },
    methods: {
        //登录函数+注册函数的封装
        requests: function(url,success){
            let that = this;
            this.$axios.post(url,{
                        username:that.username,
                        password:that.password
                    })
                    .then(function(res){
                        console.log(res)
                        success(res.data) 
                    })
                    .catch(function (error) {
                        alert(error)
                    });
        },
        // 登录函数
        login: function(){
            let that = this
            this.requests("/users/login",function(res){
                if(res.code == -1){
                    that.$message('密码错误');
                }else if(res.code == 0){
                    that.$message('用户不存在，请先注册');
                }else{
                    that.$message('登录成功');
                    localStorage.setItem('pageTab',1) // 每次登陆都默认显示商品管理页
                    localStorage.setItem('username', that.username);
                    that.$router.push('/index');
                }
            })
        },
        // 注册函数
        enroll: function(){
            let that = this
            this.requests("/users/enroll",function(res){
                if(res.code == -1){
                    that.$message('注册失败');
                }else if(res.code == 1){
                    that.$message('注册成功，可以登录');
                }
            })
        }
    }
}
</script>

<style scoped>
    .container{
        margin: 0 auto;
    }
    .background_img{
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    .center_box{
        z-index: 999;
        width: 30%;
        height: 50%;
        margin: 10% auto;
        text-align: center;
    }
    .top{
        width: 20%;
        height: 20%;
        border-radius: 50%;
        background: white;
        margin: 10px auto;
    }
    .avatar{
        width:100%;
        height: 100%;
    }
    .input{
        width: 80%;
    }
    .btn{
        float: left;
        margin: 0 30px;
    }
</style>

