import axios from 'axios'
import {
    getArticle,
    getArticleList,
    getArticleTypeList,
    praiseArticle,
} from '../../api/api'
const state={
    // 所有文章列表
    articlealllist:[],
    // 添加文章对象
    addarticle:{
        id:0,typeid:0,userid:0,title:"",content:"",
    },
    // 主页显示的文章列表
    articlelist:[],
    // 文章类型列表
    articletypelist:[],
    // 当前查看的文章
    currentarticle:{id:"",title:"",content:"",seetimes:"",praise:"",commenttimes:"",type:{id:"",name:""}},
};
const mutations={
    // 设置添加文章对象
    setAddarticle(state,obj){
        state.addarticle = obj;
    },
    // 设置所有文章列表变量
    setArticlealllist(state,list){
        state.articlealllist = list;
    },
    // 追加主页显示的文章列表
    pushArticlelist(state,list){
        for(var i=0;i<list.length;i++){
            state.articlelist.push(list[i])
        }
    },
    // 设置文章类型列表
    setArticletypelist(state,list){
        state.articletypelist = list;
    },
    setCurrentarticle(state,obj){
        state.currentarticle = obj;
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
};
const actions={
    // 获取文章类型列表
    async setArticletypelist(context){
        return getArticleTypeList().then(response => {
            console.log(response);
            context.commit('setArticletypelist',response.data);
            return true;
        });
    },
    // 动态加载文章
    async loadArticlelist(context,obj){
        return getArticleList(obj.page,obj.type).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return [];
        });
    },
    async setCurrentarticle(context,id){
        return getArticle(id).then(response => {
            context.commit("setCurrentarticle",response.data);
            return true;
        }).catch(error => {
            console.log(error);
            return false;
        })
    },
    // ====================================================================================================================
    
    // 设置添加文章对象
    setAddarticle(context,index){
        var item = state.articlealllist[index];
        context.commit("setAddarticle",item);
    },
    // 设置所有文章列表
    setArticlealllist(context,typeid){
        axios({
            method:"get",
            url:url+"/api/articlelist?typeid="+typeid,
        }).then((response) => {
            if(response.data.code == "200"){
                console.log(response.data.data);
                context.commit("setArticlealllist",response.data.data);
                // 编辑文章页面默认选中第一个
                if(response.data.data.length>0){
                    context.commit("setAddarticle",response.data.data[0]);
                }
            }
        })
    },
    
    
    // 创建新的文章
    async newArticle(context,typeid){
        return axios({
            method:'get',
            url:url+'/api/addarticle?typeid='+typeid,
        }).then((response) => {
            if(response.data.code == "200"){
                return true;
            }else{
                return false;
            }
            // context.commit("setAddarticle",response.data.data);
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
    // 保存文章
    saveArticle(context,obj){
        var Formdata = new FormData();
        Formdata.append("id",obj.id);
        Formdata.append("typeid",obj.typeid);
        Formdata.append("title",obj.title);
        Formdata.append("content",obj.content);
        axios({
            method:'post',
            url:url+'/api/savearticle',
            data:Formdata,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then((response) => {
            if(response.data.code==200){
                alert(response.data.msg);
            }else{
                alert(response.data.msg);
            }
            
        })
    },
    // 添加文章类型
    addArticletype(context,val){
        return axios({
            method:'get',
            url:url+'/api/addarticletype?tag='+val,
        }).then((response) => {
            if(response.data.data == true)
                alert(response.data.msg);
            else
                alert(response.data.msg);
        })
    },
    // 增加文章查看次数
    addSeetimes(context,id){
        axios({
            method:'get',
            url:url+'/api/addarticleseetimes?id='+id,
        })
    },
    async praisearticle(context,obj){
        var formdata = new FormData();
        formdata.append("praise",obj.praise+1);
        return praiseArticle(obj.id,formdata).then(response => {
            return true;
        }).catch(error => {
            return false;
        })
        
    }
    
};
export default {
     namespaced:true,
     state,
     mutations,
     actions
}