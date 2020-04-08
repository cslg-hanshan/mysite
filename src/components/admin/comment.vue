<template>
    <div class="admincomment">
        <div class="frame">
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
                        <th>content</th>
                        <th>articleid</th>
                        <th>parentid</th>

                        <th>isdelete</th>
                        <th>operation</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in Commentalllist" :key="item.id">
                            <td>{{index +1}}</td>
                            <td>{{item.id}}</td>
                            <td>{{item.content}}</td>
                            <td>{{item.articleid}}</td>
                            <td>{{item.parentid}}</td>
                            <td v-show="item.isdelete" style="color:red;font-wieght:bold;">是</td>
                            <td v-show="!item.isdelete" style="color:green;font-wieght:bold;">否</td>
                            <td class="btn" v-show="!item.isdelete"><span @click="deletecomment(item.id)">删除</span></td>
                            <td class="btn" v-show="item.isdelete"><span @click="recoverycomment(item.id)">恢复</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"Admincomment",
    data(){
        return{
            keywords:""
        }
    },
    methods:{
        deletecomment(val){
            if(confirm("确定要删除评论吗？")){
                var obj = {
                    id:val
                }
                this.$store.dispatch("admin/deleteComment",obj).then((ret) => {
                    if(ret){
                        alert("删除成功");
                    }else{
                        alert("删除失败");
                    }
                })
            }
        },
        recoverycomment(val){
            if(confirm("确定要恢复评论吗？")){
                var obj = {
                    id:val
                }
                this.$store.dispatch("admin/recoverComment",obj).then((ret) => {
                    if(ret){
                        alert("恢复成功");
                    }else{
                        alert("恢复失败");
                    }
                })
            }
        }
    },
    computed:{
        Commentalllist(){
            return this.$store.state.admin.commentalllist.filter((item) => {
                if(item.isdelete == false && item.content.includes(this.keywords)){
                    return item;
                }
            })
        }
    },
    created(){
        this.$store.dispatch("admin/setCommentalllist").then((ret) => {
            if(ret){
                console.log("评论表加载成功");
            }else{
                console.log("评论表加载失败");
            }
        });
    }
}
</script>
<style scoped>

</style>

