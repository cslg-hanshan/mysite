import axios from 'axios'
import router from '@/router'
const state={
    articlealllist:[],//文章所有列表
    commentalllist:[],//评论所有列表
};

const mutations={
    setArticlealllist(state,list){
        state.articlealllist = list;
    },
    deleteArticle(state,val){
        for(var i=0;i<state.articlealllist.length;i++){
            if(state.articlealllist[i].id == val){
                state.articlealllist[i].isdelete = true;
                break;
            }
        }
    },
    recoveryArticle(state,val){
        for(var i=0;i<state.articlealllist.length;i++){
            if(state.articlealllist[i].id == val){
                state.articlealllist[i].isdelete = false;
                break;
            }
        }
    },
    recoveryCommentre(state,val){
        for(var i=0;i<state.commentalllist.length;i++){
            if(state.commentalllist[i].id == val){
                state.commentalllist[i].isdelete = false;
                break;
            }
        }
    },
    setCommentalllist(state,list){
        state.commentalllist = list;
    }
 };
const actions={
    async setArticlealllist(context){
        return axios({
            method:'get',
            url:url+"/api/articlelist?includedelete=1",
        }).then((response) => {
            if(response.data.code == "200"){
                context.commit("setArticlealllist",response.data.data);
                return true;
            }else{
                return false;
            }
        })
    },
    // 删除文章
    deleteArticle(context,obj){
        var formData = new FormData();
        formData.append("id",obj["id"])
        axios({
            method:'post',
            url:url+'/api/deletearticle',
            data:formData,
            headers:{'Content-Type': 'multipart/form-data'},
        }).then((response) => {
            context.commit("deleteArticle",obj["id"]);
            alert(response.data.msg);
        })
    },
    // 恢复文章
    recoveryArticle(context,obj){
        var formData = new FormData();
        formData.append("id",obj["id"])
        axios({
            method:'post',
            url:url+'/api/recoveryarticle',
            data:formData,
            headers:{'Content-Type': 'multipart/form-data'},
        }).then((response) => {
            context.commit("recoveryArticle",obj["id"]);
            alert(response.data.msg);
        })
    },
    // 获取所有评论信息
    setCommentalllist(context){
        axios({
            method:"get",
            url:url+"/api/allcomment",
        }).then((response) => {
            context.commit("setCommentalllist",response.data.data);
        })
    },
    // 删除评论信息
    async deleteComment(context,obj){
        var formData = new FormData();
        formData.append("id",obj["id"]);
        return axios({
            method:"post",
            url:url+"/api/deletecomment",
            data:formData,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then((response) => {
            if(response.data.code == 200){
                context.commit("deleteComment",obj["id"]);
                return true;
            }else{
                return false;
            }
        })
    },
    // 恢复评论信息
    recoverComment(context,obj){
        var formData = new FormData();
        formData.append("id",obj["id"])
        axios({
            method:'post',
            url:url+'/api/recoverycomment',
            data:formData,
            headers:{'Content-Type': 'multipart/form-data'},
        }).then((response) => {
            context.commit("recoveryComment",obj["id"]);
            alert(response.data.msg);
        })
    },
};
export default {
     namespaced:true,
     state,
     mutations,
     actions
}