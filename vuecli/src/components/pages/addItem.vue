<template>
    <div class="centerBox">
        <h3 v-if="tab == 1">商品</h3>
        <h3 v-if="tab == 2">订单</h3>
        <h3 v-if="tab == 3">员工</h3>
        <el-form ref="form"  label-width="80px">
            <el-form-item v-if="tab == 2" label="时间">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="orderTime" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item v-if="tab != 3" label="名称">
                <el-input v-model="goodName"></el-input>
            </el-form-item>
            <el-form-item v-if="tab == 3" label="姓名">
                <el-input v-model="personName"></el-input>
            </el-form-item>
            <el-form-item v-if="tab == 3" label="性别">
                <el-radio-group v-model="sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="tab == 3" label="职位">
                <el-select v-model="job" placeholder="请选择职位">
                    <el-option label="经理" value="经理"></el-option>
                    <el-option label="领班" value="领班"></el-option>
                    <el-option label="普通员工" value="普通员工"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="tab == 3" label="家庭住址">
                <el-input v-model="address"></el-input>
            </el-form-item>
            <el-form-item v-if="tab == 3" label="工作时长（年）">
                <el-input v-model="workTime"></el-input>
            </el-form-item>
            <el-form-item v-if="tab != 3" label="种类">
                <el-select v-model="type" placeholder="请选择商品种类">
                    <el-option label="电脑" value="电脑"></el-option>
                    <el-option label="手机" value="手机"></el-option>
                    <el-option label="显示器" value="显示器"></el-option>
                    <el-option label="主机" value="主机"></el-option>
                    <el-option label="键盘" value="键盘"></el-option>
                    <el-option label="鼠标" value="鼠标"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="tab != 3" label="品牌">
                <el-select v-model="brand" placeholder="请选择品牌">
                    <el-option label="宏碁" value="宏碁"></el-option>
                    <el-option label="海尔" value="海尔"></el-option>
                    <el-option label="华为" value="华为"></el-option>
                    <el-option label="小米" value="小米"></el-option>
                    <el-option label="oppo" value="oppo"></el-option>
                    <el-option label="vivo" value="vivo"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="tab == 1" label="经销商">
                <el-radio-group v-model="agency">
                    <el-radio label="重庆电器"></el-radio>
                    <el-radio label="成都电器"></el-radio>
                    <el-radio label="北京电器"></el-radio>
                    <el-radio label="上海科技"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="tab == 2" label="购买商">
                <el-radio-group v-model="purchaser">
                    <el-radio label="万达集团"></el-radio>
                    <el-radio label="阿里巴巴"></el-radio>
                    <el-radio label="中国石油"></el-radio>
                    <el-radio label="中国石化"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="tab == 1" label="库存">
                <el-input v-model="amount"></el-input>
            </el-form-item>
            <el-form-item v-if="tab == 2" label="订单数量">
                <el-input v-model="number"></el-input>
            </el-form-item>
            <div v-if="tab != 2" class="imgBox">
                <div class="addFile">
                    <input name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/>
                    <div  class="add">+</div>
                </div>
                <div v-if="img" class="showImg">
                    <p @click="deleteImg">x</p>
                    <img :src="img" alt="">
                </div>
            </div>
            <p v-if="tab != 2" class="tips">只能上传一张图片哟！</p>
            <el-form-item>
                <el-button v-if="add" type="primary" @click="onSubmit">添加</el-button>
                <el-button v-else type="primary" @click="changeItem">确认修改</el-button>
                <el-button @click="clearForm">清空</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            tab: localStorage.getItem('pageTab'),//判断是商品页、订单页、人员页
            goodName: '', //商品名称,订单名称
            type: '',   //商品类型
            brand: '', //商品品牌
            agency: '', //商品经销商
            amount: '', //商品库存
            img: '', //图片地址、人员证件照
            orderTime: '', // 订单管理的时间
            purchaser: '', //订单购买商
            number: '', //订单数量
            personName: '', //人员姓名
            sex: '', //人员性别
            job: '',// 人员职位
            address: '', //人员家庭住址
            workTime: '', //人员工作时长,
            messageId: '', //消息时间戳，用于区别不同的消息
            add: '', // 判断当前页面的功能是否是添加信息
            release: true, //判断是否可发布，为true可以发布，false不可以
        }
    },
    methods: {
        // 添加商品
        onSubmit: function() {
            let that = this;
            let requseDate
            if(that.tab == 1){
                requseDate = {
                    tab: that.tab,
                    goodName: that.goodName,
                    type: that.type,
                    brand: that.brand,
                    agency: that.agency,
                    number: that.amount,
                    img: that.img
                }
            }else if(that.tab == 2){
                let orderTimed = that.orderTime.getFullYear() + '-' + (that.orderTime.getMonth() + 1) + '-' + that.orderTime.getDate()
                requseDate = {
                    tab: that.tab,
                    orderTime: orderTimed,
                    orderName: that.goodName,
                    type: that.type,
                    brand: that.brand,
                    purchaser: that.purchaser,
                    number: that.number
                }
            }else if(that.tab == 3){
                requseDate = {
                    tab: that.tab,
                    personName: that.personName,
                    sex: that.sex,
                    job: that.job,
                    address: that.address,
                    workTime: that.workTime,
                    img: that.img
                }
            }
            this.judgeNull()
            if(this.release){
                this.$axios.post("/users/setItems",requseDate)
                .then(function(res){
                    if(res.data.code == 1){
                        that.clearForm();
                        that.$message('添加商品成功')
                    }
                })
                .catch(function (error) {
                    alert(error)
                });
            }else{
                that.$message('表单不能有空值哟！')
            }
            
        },
        //修改商品
        changeItem(){
            let that = this
            let changeItemsData 
            if(that.tab == 1){
                changeItemsData = {
                    tab: that.tab,
                    goodName: that.goodName,
                    type: that.type,
                    brand: that.brand,
                    agency: that.agency,
                    number: that.amount,
                    img: that.img,
                    messageId:that.messageId
                }
            }else if(that.tab == 2){
                changeItemsData = {
                    tab: that.tab,
                    orderTime: that.orderTime,
                    orderName: that.goodName,
                    type: that.type,
                    brand: that.brand,
                    purchaser: that.purchaser,
                    number: that.number,
                    messageId:that.messageId
                }
            }else if(that.tab == 3){
                changeItemsData = {
                    tab: that.tab,
                    personName: that.personName,
                    sex: that.sex,
                    job: that.job,
                    address: that.address,
                    workTime: that.workTime,
                    img: that.img,
                    messageId:that.messageId
                }
            }
            this.judgeNull()
            if(this.release){
                this.$axios.post("/users/changeItems",changeItemsData)
                    .then(function(res){
                        if(res.data.code == 1){
                            that.$message('修改成功')
                            that.$router.push('/index')
                        }
                    })
                    .catch(function (error) {
                        alert(error)
                    });
            }else{
                that.$message('表单不能有空值哟！')
            }
            
        },
        //判断表单是否有空值
        judgeNull(){
            let that = this
            if(that.tab == 1){
                if(
                    that.goodName == "" || 
                    that.type == "" || 
                    that.brand == "" || 
                    that.agency == "" || 
                    that.amount == "" || 
                    that.img == ""  
                ){
                    //有空值时返回false
                    that.release = false
                }else{
                    that.release = true
                }
            }else if(that.tab == 2){
                if(
                    that.orderTime == "" || 
                    that.goodName == "" || 
                    that.type == "" || 
                    that.brand == "" || 
                    that.purchaser == "" || 
                    that.number == ""  
                ){
                    that.release = false
                }else{
                    that.release = true
                }
            }else if(that.tab == 3){
                if(
                    that.personName == "" || 
                    that.sex == "" || 
                    that.job == "" || 
                    that.address == "" || 
                    that.workTime == "" || 
                    that.img == ""  
                ){
                    that.release = false
                }else{
                    that.release = true
                }
            }
        },
        // 选择图片函数
        update: function(e){
            let that = this
            let file = e.target.files[0]; 
            // console.log(file)          
            //压缩图片
            lrz( e.target.files[0],{
                    width : 300,
                    quality: 0.2    //自定义使用压缩方式
                })  
                .then(function(rst) {
                    //成功时执行
                    // console.log(rst.base64)
                    that.img = rst.base64;
                }).catch(function(error) {
                    //失败时执行
                }).always(function() {
                    //不管成功或失败，都会执行
                })
        },
        // 删除图片
        deleteImg: function(){
            this.img = ''
        },
        //清空列表函数
        clearForm(){
            this.goodName = '',
            this.type = '',
            this.brand = '',
            this.agency = '',
            this.amount = '',
            this.img = '',
            this.orderTime = '',
            this.orderTime = '', 
            this.purchaser = '', 
            this.number = '', 
            this.personName = '', 
            this.sex = '', 
            this.job = '',
            this.address = '', 
            this.workTime = ''
        }
    },
    created(){
        let changeDatas = this.$route.params
        if(changeDatas.add){
            this.add = changeDatas.add
        }
        // console.log(changeDatas)
        //对传入该页面的值进行判断，若是商品信息，就把传过来的值赋值给商品信息的属性名
        if(changeDatas.goodName){
            this.goodName = changeDatas.goodName,
            this.type = changeDatas.type,
            this.brand = changeDatas.brand,
            this.agency = changeDatas.agency,
            this.amount = changeDatas.number,
            this.img = changeDatas.img,
            this.messageId = changeDatas.messageId
        }else if(changeDatas.orderName){
            this.orderTime = changeDatas.orderTime,
            this.goodName = changeDatas.orderName,
            this.type = changeDatas.type,
            this.brand = changeDatas.brand,
            this.purchaser = changeDatas.purchaser,
            this.number = changeDatas.number,
            this.messageId = changeDatas.messageId
        }else if(changeDatas.personName){
            this.personName = changeDatas.personName,
            this.sex = changeDatas.sex,
            this.job = changeDatas.job,
            this.address = changeDatas.address,
            this.workTime = changeDatas.workTime,
            this.img = changeDatas.img,
            this.messageId = changeDatas.messageId
        }
    }
}
</script>

<style scoped>
    .centerBox{
        width: 400px;
        height: 500px;
        margin: 0 auto;
    }
    h3{
        width: 60px;
        margin: 10px auto;
    }
    .imgBox{
        display: flex;
    }
    .addFile{
        width: 100px;
        height: 100px;
        margin: 10px;
        background: #ccc;
    }
    .addFile input{
        position: absolute;
        height: 100px;
        width: 100px;
        opacity: 0;
    }
    .addFile .add{
        text-align: center;
        line-height: 100px;
        font-weight: bold;
        font-size: 40px;
        color: #fff;
    }
    .showImg p{
        position: absolute;
        width: 16px;
        height: 16px;
        font-size: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 50%;
        background: red;
        color: white;
        margin-left: 104px;
        margin-top: 2px;
    }
    .showImg p{
        cursor: pointer;
    }
    .showImg img{
        width: 99px;
        height:99px;
        border: 1px solid #ccc;
        margin: 10px;
    }
    .tips{
        font-size: 12px;
        color: red;
        margin: 0 0 10px 10px;
    }
</style>