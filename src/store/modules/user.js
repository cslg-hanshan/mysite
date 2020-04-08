import axios from 'axios'
import {
    register,
    checkuser,
    userinfo,
    updateinfo
} from '../../api/api'
import router from '@/router'
import cookie from "../../assets/js/cookie"

const userInfo = {
    name:cookie.getCookie('name')||'',
    token:cookie.getCookie('token')||''
};

const state={
    userInfo,
};

const mutations={
    login(state,obj){
        sessionStorage.setItem("USER_ACCOUNT",obj.account);
        sessionStorage.setItem("ISLOGIN",true);
        sessionStorage.setItem("USER_ID",obj.id);
        console.log(obj.typeid);
        if(obj.typeid == 1){
            sessionStorage.setItem("ISADMIN",true);
        }else{
            sessionStorage.setItem("ISADMIN",false);
        }
    },
    setuserinfo(state,obj){
        state.userInfo["gender"] = obj.gender;
        state.userInfo["birthday"] = obj.birthday;
        state.userInfo["pic"] = obj.pic;
    }
 };
const actions={
    async login(context,formData){
        return await axios({
            method:'post',
            url:url+'/api/login',
            data:formData,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then((response) => {
            if(response.data.code == 200){
                context.commit("login",response.data.data);
                return true;
            }else{
                return false;
            }
        });
    },
    // 设置用户信息
    setUserInfo(context){
        state.userInfo = {
            name:cookie.getCookie('name')||'',
            token:cookie.getCookie('token')||''
        };
        console.log(userInfo);
    },
    async register(context,formdata){
        return register(formdata).then(response => {
            return true;
        }).catch(error => {
            return false;
        });
    },
    async checkaccount(context,val){
        return checkuser(val).then(response => {
            console.log(response.data.length);
            if(response.data.length == 0)
                return false;
            return true;
        });
    },
    async getuserinfo(context){
        return userinfo().then(response => {
            context.commit("setuserinfo",response.data);
            return true;
        }).catch(error => {
            return false;
        });
    },
    async updateuserinfo(context,obj){
        return updateinfo(obj).then(response => {
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