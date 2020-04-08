import {
    searchmovies,
    detailmovies,
} from '../../api/api'

const state={
    // 搜索结果列表
    searchlist:[],
    // 搜索关键字信息
    searchinfo:"",
    // 电影详细信息
    moviesdetail:null,
    // 加载信息
    loadmsg:"",
    // 是否在加载中
    isload:false,
};

const mutations={
    setSearchlist(state,list){
        state.searchlist = list;
    },
    setMoviesdetail(state,obj){
        state.moviesdetail = obj;
    }
}

const actions={
    setSearchmovieslist(context){
        state.isload = true;
        state.loadmsg = "正在加载中。。。";
        searchmovies(state.searchinfo).then(response => {
            console.log(response);
            context.commit("setSearchlist",response.data);
            state.isload = false;
        }).catch(error => {
            console.log(error);
        })
        
    },
    async toMoviespage(context,url){
        return detailmovies(url).then(response => {
            context.commit("setMoviesdetail",response.data);
            return true;
        }).catch(error => {
            console.log(error);
            context.commit("setMoviesdetail",null);
            return false;
        })
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}








