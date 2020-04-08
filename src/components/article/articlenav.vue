<template>
    <div class="articlenav">
        <div class="title">
            文章分类
        </div>
        <div class="navframe">
            <div :class="{tag:true,active:0==Currentid}" @click="changeclassify(0)">全部</div>
            <div
                :class="{tag:true,active:item.id==Currentid}"
                v-for="item in Articletypelist"
                :key="item.id"
                @click="changeclassify(item.id)"
            >
                {{item.name}}
            </div>
        </div>
    </div>
</template>
<script>
import {
    getArticleTypeList,
} from '../../api/api'
export default {
    name:'Articlenav',
    data(){
        return{
            currentid:0,
            typelist:[],
        }
    },
    methods:{
        changeclassify(id){
            if(this.Currentid == id){
                console.log("什么也不做");
            }else{
                this.Currentid = id;
                // this.getClassify = id;
                // this.$store.state.article.articlelist=[];
                // this.$store.state.article.page = 1;
                // this.$store.state.article.isloadover = false;
                // this.$store.state.article.isloading = false;
                // this.$store.state.article.loadmsg = "";
                // this.$store.dispatch("article/loadArticlelist");
                if(id==0){id="";}
                this.$emit("navclick",id);
            }
            
        }
    },
    computed:{
        Articletypelist:{
            get(){return this.typelist;},
            set(val){this.typelist = val;}
        },
        Currentid:{
            get(){return this.currentid;},
            set(val){this.currentid = val;}
        }
    },
    created(){
        var _this = this;
        // 获取数据
        this.$store.dispatch('article/setArticletypelist').then(ret => {
            if(ret){
                _this.Articletypelist = _this.$store.state.article.articletypelist;
            }
        });
    }
}
</script>
<style scoped>

.navframe{
    padding:10px 0px;
    width:100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    flex-direction: row;
}
.title{
    display: block;
    font-size: 16px;
    border-bottom: 2px #3bb0ff solid;
    font-weight: bold;
}
.tag{
    font-size: 20px;
    padding:5px 25px;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;
}
.tag:hover{
    color:#3bb0ff;
}
.active{
    font-weight: bold;
    color: #3bb0ff;
    text-decoration: underline;
}
</style>
