<template>
    <div class="articlepage container">
        <div v-if="Article">
            <div class="title">{{Article.title}}</div>
            <div class="detail">
                {{Article.type.name}}&nbsp;/&nbsp;{{formatDate(Article.createdate)}}
            </div>
            <div class="content" v-html="Article.content"></div>
            <div class="commenttitle">评论</div>
            
            <div v-show="this.token != ''">
                <div>本评论系统不可以添加表情符号!</div>
                <textarea
                    class="commentarea"
                    placeholder="要说些有分量的话哦"
                    v-model="comment"
                ></textarea>
                <button @click="commentarticle(Article.id)" class="btn btn-default">评论</button>
                <div class="commentframe">
                    <div class="comment" v-for="item in Commentlist" :key="item.id">
                        <div>
                            <img class="port" v-if="item.user.pic==null" src="@/assets/defaulthead.jpg">
                            <img class="port" v-else :src="item.user.pic">
                            {{item.user.username}}
                            <br>
                            {{formatDate(item.modifydate)}}
                        </div>
                        <div v-html="item.content"></div>
                        <div ><span class="reply" @click="addcomment(item.id,item.user.username)">回复</span></div>
                        <div class="childcommentframe">
                            <div class="childcomment" v-for="li in item.child" :key="li.id">
                                <div>
                                    <img class="port" v-if="li.user.pic==null" src="@/assets/defaulthead.jpg">
                                    <img class="port" v-else :src="li.user.pic">
                                    {{li.user.username}}
                                </div>
                                <div v-html="li.content"></div>
                                <div>
                                    {{formatDate(li.modifydate)}}
                                    <span class="reply" @click="addcomment(item.id,li.user.username)">回复</span>
                                </div>
                            </div>
                            <div class="childtext" :id="'childtextframe'+item.id">
                                <textarea :id="'childtext'+item.id"></textarea>
                                <button class="btn btn-default" @click="commentcomment(item.id)">发送</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="this.token == ''" style="min-height:250px;">
                <a class="btn" @click="tologin">登录</a>才能评论
            </div>
        </div>
    </div>
</template>
<script>
import {
    getArticle,
    CreateArticleComment,
    CreateReplyComment,
    UpdateArticle,
} from '../../api/api'
import cookie from '@/assets/js/cookie'
export default {
    name:'Articlepage',
    data(){
        return{
            article:{id:"",title:"",content:"",seetimes:"",praise:"",commenttimes:"",type:{id:"",name:""}},
            comment:'',
            token:"",
            tocid:"",
            toolbaroptions:{
                modules:{
                    toolbar:[
                    ]
                }
            }
        }
    },
    computed:{
        Article:{
            get(){return this.$store.state.article.currentarticle;},
            set(val){this.$store.state.article.currentarticle = val;}
        },
        Commentlist:{
            get(){return this.$store.state.comment.commentlist;},
            set(val){this.$store.state.comment.commentlist = val;}
            
        }
    },
    methods:{
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
        addcomment(cid,tousername){
            var _this = this;
            var frameid = "childtextframe"+cid;
            var frame = document.getElementById(frameid);
            var textid = "childtext"+cid;
            var text = document.getElementById(textid);
            if(frame.style.display=="block" && text.value=="@"+tousername+" "){
                frame.style.display = "none";
                text.value="";
            }else{
                frame.style.display = "block";
                text.focus();
                text.value="@"+tousername+" ";
            }
            this.tocid = cid;
        },
        commentarticle(aid){
        	var _this = this;
            var content = this.comment.replace(/</gi,"&lt;").replace(/>/gi,"&gt;").replace(/\n/gi,"<br/>");
            if(content){
                content = content.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "^o^y");
                var formdata = new FormData();
                formdata.append("article",aid);
                formdata.append("content",content);
                CreateArticleComment(formdata).then(response => {
                    this.$store.dispatch("comment/getCommentbyarticleid",aid).then(ret => {
                        if(ret){
                            console.log(this.Commentlist)
                            console.log("评论加载成功");
                            _this.Article.commenttimes += 1;
                            _this.addcommenttimes();
                        }
                    })
                });
                this.comment = "";
            }else{
                alert("评论内容不能为空");
            }
            
        },
        commentcomment(cid){
        	var _this = this;
            var aid = this.Article.id;
            var frameid = "childtextframe"+cid;
            var frame = document.getElementById(frameid);
            var textid = "childtext"+cid;
            var text = document.getElementById(textid);
            var content = text.value.replace(/</gi,"&lt;").replace(/>/gi,"&gt;").replace(/\n/gi,"<br/>");
            if(content){
                content = content.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "^o^y");
                var formdata = new FormData();
                formdata.append("parent",cid);
                formdata.append("content",content);
                CreateReplyComment(formdata).then(response => {
                    this.$store.dispatch("comment/getCommentbyarticleid",aid).then(ret => {
                        if(ret){
                            console.log(this.Commentlist)
                            console.log("评论加载成功");
                            _this.Article.commenttimes += 1;
                            _this.addcommenttimes();
                        }
                    })
                });
                text.value=""
                frame.style.display = "none";
            }else{
                alert("评论内容不能为空");
            }
            
        },
        tologin(){
            var redirect = "/articlepage?id="+this.getArticle.id;
            this.$router.push({
                name:"Login",
                params:{redirect:redirect}
            });
        },
        addcommenttimes(){
        	var formdata = new FormData();
            formdata.append("commenttimes",this.Article.commenttimes);
            console.log(this.Article.commenttimes);
            UpdateArticle(this.Article.id,formdata);
        }
    },
    
    created(){
        var id = this.$route.query.id;
        // 获取文章的信息
        this.$store.dispatch("article/setCurrentarticle",id).then(ret => {
            if(ret){
                console.log(this.Article);
                console.log("评论加载成功");
            }
        })
        // 获取文章的评论信息
        this.$store.dispatch("comment/getCommentbyarticleid",id).then(ret => {
            if(ret){
                console.log(this.Commentlist)
                console.log("评论加载成功");
            }
        })
        // 初始化账户参数
        this.token = cookie.getCookie("token");
        this.username = cookie.getCookie("name");
        this.isadmin = cookie.getCookie("isadmin");
    },
    mounted(){
        // 进入文章界面  要清空文章页面的所有内容
        // this.$store.state.article.articlelist = [];
        // this.$store.state.article.isloadover = false;
        // this.$store.state.article.isloading = false;
        // this.$store.state.article.page = 1;
    },
    updated(){
        $('.content').find('img').css('max-width', '100%');
    },
    
}
</script>
<style scoped>
.title{
    padding:20px 0px;
    font-size: 35px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #3bb0ff;
}
.title:hover{
    text-decoration: underline;
    cursor: pointer;
}
.port{
    width:25px;height: 25px;
}
.detail{
    color: gray;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    margin-bottom: 30px;
}
.content{
    width:100%;
    font-size: 16px;
    min-height: 500px;
}
.commenttitle{
    border-left: 1px solid gray;
    padding-left: 10px;
    margin-bottom: 30px;
}
.commentframe{
    min-height: 300px;
    margin-bottom: 100px;
}
.commentarea{
    width:100%;
    height: 70px;
    resize: none;
    padding:10px;
}
.comment{
    border-bottom: 1px solid gray;
}
.comment >div:nth-child(1){
    margin:20px 0px;
    padding:10px 15px;
    border-left:4px solid #3bb0ff;
}
.comment >div:nth-child(2){
    margin:20px 20px;
    font-weight: bold;
}
.comment >div:nth-child(3){
    font-size: 14px;
    color:#969696;
}
.childcommentframe{
    border-left:2px solid #d9d9d9;
    margin: 20px 0px;
    padding-left: 20px;
}
.childcomment{
    padding:0px 0px 15px 0px;
    border-bottom: 1px dashed #f0f0f0;
}
.childcomment > div:nth-child(1){
    padding:10px 0px;
}
.childcomment > div:nth-child(2){
    font-size: 12px;
    color:#969696;
}
.childtext{
    display: none;
    padding:10px;
}
.childtext textarea{
    width: 100%;
    height: 70px;
    resize: none;
    padding:8px;
}
.reply{
    cursor: pointer;
}
.reply:hover{
    color:#3bb0ff;
}
</style>

