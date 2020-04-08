<template>
    <div class="container index">
        <div class="individuation">
            <div>学习如逆水行舟，不进则退！</div>
            <small class="copyright">CopyRight&copy;Hanshan</small>
        </div>
        <div class="content">
            <div class="log" v-if="this.token == ''">
                <router-link to="/login">登录/注册</router-link>
            </div>
            <div class="userinfo" v-else>
                <div>
                    用户名：<router-link to="/userinfo">{{username}}</router-link>&nbsp;/&nbsp;<a @click.prevent="logout" href="">注销</a>
                </div>
            </div>
            <div class="tools" v-show="this.isadmin == 'true'">
                <div><router-link to="/addarticle">编写文章</router-link></div>
                <div><router-link to="/uploadimg">上传图片</router-link></div>
                <div><a href="http://127.0.0.1:8000/docs/" target="_blank">管理系统</a></div>
                
            </div>
        </div>
    </div>
</template>
<script>
import cookie from '../assets/js/cookie'
export default {
    name:'Index',
    data(){
        return{
            username : "",
            token : "",
            isadmin:"false",
        }
    },
    methods:{
        logout(){
            console.log("注销");
            cookie.setCookie("token","");
            cookie.setCookie("name","");
            cookie.setCookie("isadmin","");
            this.$router.go(0);
        },
    },
    created(){
        this.token = cookie.getCookie("token");
        this.username = cookie.getCookie("name");
        this.isadmin = cookie.getCookie("isadmin");
    },
    mounted(){
        document.getElementsByClassName("index")[0].style.height = document.documentElement.clientHeight - 100 + "px";
    }
}
</script>
<style scoped>
.individuation{
    padding:40px 0px;
    color:#3bb0ff;
    font-size: 25px;
}
.copyright{
    color: #3bb0ff;
}
.tools > div{
    margin:10px 0px;
}
</style>
