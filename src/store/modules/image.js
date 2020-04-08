import axios from 'axios'
import router from '@/router'
import {getimagelist} from '../../api/api'
const state={
     imagelist:[],
};

const mutations={
     setImagelist(state,list){
          state.imagelist = list;
     }
 };
const actions={
     async setImagelist(context){
          return getimagelist().then(response => {
               context.commit("setImagelist",response.data);
               console.log(response);
               return true;
          }).catch(error => {
               console.log(error);
               return false;
          });
     }
};
export default {
     namespaced:true,
     state,
     mutations,
     actions
}