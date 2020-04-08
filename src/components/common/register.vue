<template>
    <div class="register">
        <Title>注册中心</Title>
        <div class="form-group">
            <label for="account">账号</label>
            <input 
                type="text" 
                class="form-control" 
                id="account" 
                placeholder="Account" 
                @blur="checkaccount" 
                @focus="focusaccount" 
                autocomplete="off"
                v-model="account"
            >
            <div class="tip" v-show="this.accounttip != ''">{{this.accounttip}}</div>
        </div>
        <div class="form-group">
            <label for="password1">密码</label>
            <input 
                type="password" 
                class="form-control" 
                id="password1" 
                placeholder="Password"
                @blur="checkpassword1" 
                @focus="focuspassword1"
                v-model="password1"
            >
            <div class="tip" v-show="this.password1tip != ''">{{this.password1tip}}</div>
        </div>
        <div class="form-group">
            <label for="password2">确认密码</label>
            <input 
                type="password" 
                class="form-control" 
                id="password2" 
                placeholder="Password" 
                @blur="checkpassword2" 
                @focus="focuspassword2"
                v-model="password2"
            >
            <div class="tip" v-show="this.password2tip != ''">{{this.password2tip}}</div>
        </div>
        <router-link to="/login" style="display:block;margin:15px 0px;">登录</router-link>
        <button class="btn btn-block btn-primary" @click="register">注册</button>
    </div>
</template>
<script>
import Title from '@/components/common/title'
import axios from 'axios'
export default {
    name:'Register',
    data(){
        return{
            account:"",
            password1:"",
            password2:"",
            accounttip:"",
            password1tip:"",
            password2tip:"",
        }
    },
    methods:{
        focusaccount(){
            this.accounttip="用户名最好为邮箱或者手机号";
        },
        focuspassword1(){
            this.password1tip="密码长度为6-16位";
        },
        focuspassword2(){
            this.password2tip="密码长度为6-16位";
        },
        checkaccount(){
            var _this = this;
            if(this.account != ""){
                this.$store.dispatch("user/checkaccount",this.account).then((ret) => {
                    if(ret){
                        _this.accounttip = "用户名已经存在";
                        return false;
                    }else{
                        _this.accounttip = "用户名可用";
                    }
                });
                return true;
            }else{
                _this.accounttip = "用户名不为空"
                return false;
            }
        },
        checkpassword1(){
            var len = this.password1.length;
            if(len>=6 && len<=16){
                this.password1tip = "密码可用";
                return true;
            }
            this.password1tip = "密码长度不符合";
            return false;
        },
        checkpassword2(){
            var flag = this.checkpassword1();
            if(flag && this.password1 == this.password2){
                this.password2tip = "两次密码一致";
                return true;
            }
            this.password2tip = "两次密码不一致";
            return false;
        },

        register(){
            if(this.checkaccount() && this.checkpassword2()){
                var formData = new FormData();
                formData.append("username",this.account);
                formData.append("password",this.password1);
                this.$store.dispatch("user/register",formData).then((ret) => {
                    if(ret) this.$message({message:"注册成功",type:"success"});
                    else this.$message({message:"注册失败",type:"warning"});
                });
            }
        }
    },
    components:{
        Title,
    }
}
</script>
<style scoped>
.tip{
    color:#3ee0ff;
}
</style>