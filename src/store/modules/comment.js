import axios from 'axios'
import {
    getArticleCommentList,
} from '../../api/api'
const state={
    commentalllist:[],
    // 评论列表
    commentlist:[],
    
};
const mutations={
    setCommentlist(state,list){
        state.commentlist = list;
    },
    getCommentalllist(state,list){
        state.commentalllist = list;
    },
    deleteComment(state,id){
        for(var i=0;i<state.commentalllist.length;i++){
            if(state.commentalllist[i].id == id){
                state.commentalllist[i].isdelete = false;
                break;
            }
        }
    }
};
const actions={
    // 获取文章评论列表
    async getCommentbyarticleid(context,aid){
        return getArticleCommentList(aid).then(response => {
            context.commit("setCommentlist",response.data.results);
            return true;
        }).catch(error => {
            console.log(error);
            return false;
        })
    },

    
    // 获取所有评论信息
    getCommentalllist(context){
        axios({
            method:"get",
            url:url+"/api/allcomment",
        }).then((response) => {
            context.commit("getCommentalllist",response.data.data);
        })
    },
    
    // 添加评论文章的评论
    addCommentofarticle(context,obj){
        axios({
            method:"post",
            url:url+"/api/addcommentofarticle",
            data:obj,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then((response) => {
            context.commit("setCommentlist",response.data.data);
        })
    },
    // 添加评论评论的评论
    addCommentofcomment(context,obj){
        axios({
            method:"post",
            url:url+"/api/addcommentofcomment",
            data:obj,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then((response) => {
            context.commit("setCommentlist",response.data.data);
        })
    },
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
    }
};
export default {
     namespaced:true,
     state,
     mutations,
     actions
}