
import {
    hotmusiclist,
    musicurl,
    musiclrc,
    musicsearch
} from '../../api/api'
const state={
    musicid:"",
    musiclist:[],
    musicobj:{},
    currentindex:0,
    searchmusiclist:[],
    hotsongsheet:{},
    searchinfo:"",
};

const mutations={
    // 设置音乐播放列表
    setMusiclist(state,list){
        state.musiclist = list;
    },
    // 设置当前正在播放的音乐
    addMusiclist(state,obj){
        console.log(obj);
        var item = state.musiclist.find((item) => {
            return item.id == obj.id;
        })
        if(item){
            var index = state.musiclist.findIndex((item) => {
                return item.id == obj.id;
            })
            state.currentindex = index;
            console.log(state.currentindex);
        }else{
            state.musiclist.push(obj);
            state.currentindex = state.musiclist.length - 1;
        }
    },
    // 设置搜索音乐列表
    setSearchmusiclist(state,list){
        state.searchmusiclist = [];
        state.searchmusiclist = list;
    },
    // 添加搜索音乐列表
    addSearchmusiclist(state,list){
        for(var i=0;i<list.length;i++){
            state.searchmusiclist.push(list[i]);
        }
    },
    HotSongsheet(state,obj){
        state.hotsongsheet = obj;
    },
    setMusicurl(state,val){
        state.musicobj.url = val;
    },
    setMusiclrc(state,val){
        state.musicobj.lrc = val;
    }
 };
const actions={
    async setMusiclist(context){
        return hotmusiclist().then((response) => {
            context.commit('setMusiclist',response.data.playlist.tracks);
            return true;
        });
    },
    async setMusicurl(context,id){
        return musicurl(id).then(response => {
            context.commit("setMusicurl",response.data.url);
            return true;
        })
    },
    async setMusiclrc(context,id){
        return musiclrc(id).then(response => {
            context.commit("setMusiclrc",response.data.lyric);
            return true;
        })
    },
    addMusiclist(context,obj){
        context.commit('addMusiclist',obj);
    },
    // 搜索功能
    async setSearchmusiclist(context,page){
        return musicsearch(state.searchinfo,page).then(response => {
            context.commit("setSearchmusiclist",response.data);
            return true;
        }).catch(error => {
            return false;
        })
    },
    addSearchmusiclist(context,page){
        musicsearch(state.searchinfo,page).then(response => {
            context.commit("addSearchmusiclist",response.data);
        }).catch(error => {
            console.log('加载失败');
        });
    },
    // 网易热歌歌单
    async HotSongsheet(context){
        var formData = new FormData();
        formData.append("types","playlist");
        formData.append("id","3778678");
        return axios({
            method: "post",
            url: url+"/api/searchmusic",
            data:formData,
            headers:{'Content-Type': 'multipart/form-data'},
        }).then((response) => {
            console.log(response);
            if(response.data.code == 200){
                context.commit('HotSongsheet',response.data);
                return true;
            }
            else{
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