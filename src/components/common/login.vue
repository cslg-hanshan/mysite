<template>
    <div class="login">
        <Title>登录中心</Title>
        <div class="form-group">
            <label for="account">账号</label>
            <input type="text" v-model="account" class="form-control" id="account" placeholder="Account">
        </div>
        <div class="form-group">
            <label for="password">密码</label>
            <input
                type="password"
                v-model="password"
                class="form-control"
                id="password"
                placeholder="Password"
                @keyup.enter="submit"
            >
        </div>
        <router-link to="/register" style="display:block;margin:15px 0px;">注册</router-link>
        <button
            class="btn btn-block btn-primary"
            @click="submit"
        >
        登录
        </button>
    </div>
</template>
<script>
import {login} from '../../api/api'
import cookie from '../../assets/js/cookie'
import Title from '@/components/common/title'
export default {
    name:'Login',
    data(){
        return{
            account:'',
            password:'',
        }
    },
    methods:{
        submit(){
            var _this = this;
            if(this.account==""){
                alert("请输入账号");
                return;
            }
            if(this.password == ""){
                alert("请输入密码");
                return;
            }
            var params = new FormData();
            // var params = new URLSearchParams();
            params.append("username",this.account);
            params.append("password",this.password);
            login(params).then(response => {
                console.log(response);
                cookie.setCookie('name',this.account,7);
                cookie.setCookie('token',response.data.token,7);
                cookie.setCookie('isadmin',response.data.isadmin,7);
                _this.$store.dispatch("user/setUserInfo");
                var redirect = _this.$route.params.redirect;
                if(redirect != undefined){
                    _this.$router.push(redirect);
                }else{
                    _this.$router.push("/");
                }
                
            })
            
            // this.$store.dispatch("user/login",formData).then((ret) => {
            //     if(ret){
            //         var redirect = _this.$route.params.redirect;
            //         if(redirect != undefined){
            //             _this.$router.push(redirect);
            //         }else{
            //             _this.$router.push("/");
            //         }
            //     }else{
            //         alert("用户名或者密码错误");
            //         _this.account = "";
            //         _this.password = "";
            //     }
            // });
            
        }
    },
    components:{
        Title,
    },
}
</script>
<style scoped>

</style>
