<template>
    <div class="articlelist">
        <div class="col-sm-8 col-md-8 left">
            <transition-group v-if="this.Articlelist.length > 0" tag="div">
                <div class="articleitem" v-for="item in this.Articlelist"  :key="item.id">
                    <div class="time">{{formatDate(item.createdate)}}</div>
                    <div class="title">
                        <span @click="topage(item.id)" :title="item.title">{{item.title}}</span>
                    </div>
                    <div class="detail">
                        <div><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span><small>浏览</small>&nbsp;{{item.seetimes}}</div>
                        <div @click="praise(item)"><span class="glyphicon glyphicon-heart" aria-hidden="true" ></span><small>赞</small>&nbsp;{{item.praise}}</div>
                        <div><span class="glyphicon glyphicon-comment" aria-hidden="true"></span><small>评论</small>{{item.commenttimes}}</div>
                        <div><span class="glyphicon glyphicon-user" aria-hidden="true"></span>{{item.user.username}}</div>
                    </div>
                </div>
            </transition-group>
            <div v-show="Loading" class="loadmsg">{{loadmsg}}</div>
            <div v-show="Loadover == false" class="loadmsg" @click="loadMore" style="cursor: pointer;">点击加载更多</div>
            <div v-show="Loadover" @click="loadMore" class="loadmsg">我也是有底线的</div>
            
        </div>
        <div class="col-sm-4 col-md-4 hidden-xs right">
            <Articlenav @navclick="newlist"></Articlenav>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Articlenav from '@/components/article/articlenav'
import {
    getArticleList,
} from '../../api/api'
export default {
    name:'Articlelist',
    data(){
        return{
            articlelist:[],
            page:1,
            loadover:false,
            loading:false,
            loadmsg:"正在加载。。。",
            type:"",
        }
    },
    computed:{
        Articlelist:{
            get(){return this.articlelist;},
            set(val){this.articlelist = val;}
        },
        Loading:{
            get(){return this.loading;},
            set(val){this.loading = val;}
        },
        Loadover:{
            get(){return this.loadover;},
            set(val){this.loadover = val;}
        },
        Page:{
            get(){return this.page;},
            set(val){this.page = val;}
        },
        Type:{
            get(){return this.type;},
            set(val){this.type = val;}
        }
    },
    methods:{
        // 跳转页面
        topage(articleid){
            this.$router.push({path:'/articlepage',query:{id:articleid}});
        },
        loadMore(){
            var _this = this;
            if(this.Loadover == false && this.Loading == false){
                this.Loading = true;
                var obj = {page:this.Page,type:_this.Type};
                this.$store.dispatch("article/loadArticlelist",obj).then(ret => {
                    if(ret.count<=_this.Page*10){
                        _this.Loadover = true;
                    }
                    var list = ret.results;
                    for(var i=0;i<list.length;i++){
                        _this.Articlelist.push(list[i])
                    }
                    _this.Page += 1;
                });
                this.Loading = false;
            }
        },
        praise(obj){
            var _this = this;
            this.$store.dispatch("article/praisearticle",obj).then(ret => {
                if(ret){
                    for(var i=0;i<this.Articlelist.length;i++){
                        if(this.Articlelist[i].id == obj.id){
                            this.Articlelist[i].praise += 1;
                            break;
                        }
                    }
                }else{
                    this.$message({message:"点赞失败",type:"warning"});
                }
            });
        },
        // 格式化日期字符串
        formatDate(str){
            var time = new Date(str);
            var year = time.getFullYear();
            var month = time.getMonth()+1;
            var day = time.getDate();
            var hour = time.getHours();
            var minute = time.getMinutes();
            var second = time.getSeconds();
            return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
        },
        newlist(val){
            console.log(val);
            this.Articlelist = [];
            this.Type = val;
            this.Page = 1;
            this.Loadover = false;
            this.Loading = false;
            this.loadMore();
        }
    },
    created(){
        this.loadMore();
    },
    components:{
        Articlenav,
    },
}
</script>
<style scoped>
.left,.right{
    background-color: white;
}
@keyframes show {
    0% {
        opacity: 0;
        transform: translateY(50px);
    }
    100% {
        opacity: 1;
    }
}
@keyframes hide {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: translateY(50px);
    }
}
.v-enter-active {
    animation: show 1s;
}
.v-leave-active {
    animation: hide 1s;
}
.v-enter, .v-leave-to {
    opacity: 0;
}

.articleitem{
    padding:10px 20px;
    margin-bottom: 10px;
    background-color:#ffffff21;
    transition: 1s;
}
.articleitem:hover{
    border-left: 8px solid #3bb0ff;
}
.time{
    color:#333;
    font-size: 15px;
}
.title{
    display: block;
    padding:15px 0px;
    font-size: 25px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color:#3bb0ff;
    text-overflow:ellipsis;
    overflow: hidden;
}
.title > span:hover{
    text-decoration:underline;
    cursor: pointer;
}
.detail{
    user-select: none;
    font-size: 15px;
    display: flex;
    color:#cfcfcf;
}
.detail > div{
    margin-right:15px;
}
.detail > div:nth-child(2):hover{
    color: #3bb0ff;
    cursor: pointer;
}
.loadmsg{
    text-align: center;
    color:gray;
    user-select: none;
}


</style>

