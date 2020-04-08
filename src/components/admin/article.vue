<template>
    <div id="article">
        <div>
            <form class="form-inline">
                <div class="form-group">
                    <label for="searchinput">title过滤器</label>
                    <input type="text" class="form-control" id="searchinput" placeholder="search" v-model="keywords">
                </div>
            </form>
        </div>
        <div>
        <table class="table table-striped table-hover">
            <thead>
            <tr>
                <th>#</th>
                <th>id</th>
                <th>title</th>
                <th>typename</th>
                <th>createdate</th>
                <th>isdelete</th>
                <th>operation</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in filterarticle()" :key="item.id">
                <td>{{index+1}}</td>
                <td>{{item.id}}</td>
                <td>{{item.title}}</td>
                <td>{{item.typename}}</td>
                <td>{{item.createdate}}</td>
                <td v-if="item.isdelete" style="color:red;font-weight:bold;">是</td>
                <td v-else style="color:green;font-weight:bold;">否</td>
                <td class="modify">
                    <span v-show="item.isdelete" @click="recoveryarticle(item.id)">恢复</span>
                    <span v-show="!item.isdelete" @click="deletearticle(item.id)">删除</span>
                </td>
            </tr>
            </tbody>
        </table>
        </div>
        <div class="pager">
            <div class="btn" @click="previouspage">上一页</div>
            <div>当前页：{{this.page}}</div>
            <div class="btn" @click="nextpage">下一页</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Article',
    data(){
        return{
            keywords:"",
            page:1,
            limit:5,
        }
    },
    methods:{
        deletearticle(val){
            if(confirm("确定要删除文章吗？")){
                var obj = {
                    id:val
                }
                this.$store.dispatch("admin/deleteArticle",obj);
            }
            
        },
        recoveryarticle(val){
            if(confirm("确定要恢复文章吗？")){
                var obj = {
                    id:val
                }
                this.$store.dispatch("admin/recoveryArticle",obj);
            }
        },
        filterarticle(){
            var newlist = [];
            if(this.keywords == ""){
                newlist = this.Articlealllist;
            }else{
                this.Articlealllist.forEach(item => {
                    if(item.title.includes(this.keywords) || item.typename.includes(this.keywords)){
                        newlist.push(item);
                    }
                });
            }
            return newlist;
        },
        nextpage(){
            var len = this.$store.state.admin.articlealllist.length;
            if(this.Articlealllist.length == this.limit && len%this.limit != 0){
                this.page+=1;
            }
                

        },
        previouspage(){
            if(this.page>1){
                this.page-=1;
            }
        }
    },
    computed:{
        Articlealllist(){
            return this.$store.state.admin.articlealllist.slice((this.page-1)*this.limit,this.page*this.limit);
        }
    },
    created(){
        this.$store.dispatch("admin/setArticlealllist").then((ret) => {
            if(ret){
                console.log("文章数据加载成功");
            }else{
                console.log("文章数据加载失败");
            }
        })
    }
}
</script>
<style scoped>
.modify span:hover{
    text-decoration: underline;
    color:#3bb0ff;
    cursor: pointer;
}
.pager{
    display: flex;
    justify-content: space-around;
}
.pager>div:hover{
    color:#3bb0ff;
}
</style>


