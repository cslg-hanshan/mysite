import {translate} from '../../api/api'
const state={
    translate:{},
    searchinfo:"",
    searchflag:false,
    searchmsg:"",
};

const mutations={
    setTranslate(state,val){
        state.translate = val;
    }
 };
const actions={
    translate(context){
        var info = state.searchinfo;
        state.searchflag = true;
        state.searchmsg="正在查询。。。";
        translate(info).then(response => {
            state.searchflag = false;
            context.commit('setTranslate',response.data.data);
        }).catch((error) => {
            state.searchmsg = "查询失败";
        });
    }
};
export default {
     namespaced:true,
     state,
     mutations,
     actions
}