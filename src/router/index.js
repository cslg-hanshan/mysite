import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import cookie from '../assets/js/cookie'

import Index from '@/components/index'

import Login from '@/components/common/login'
import Register from '@/components/common/register'
import Test from '@/components/common/test'
import Usercenter from '@/components/common/usercenter'

import Article from '@/components/article/article'
import Articlepage from '@/components/article/articlepage'
import Addarticle from '@/components/article/addarticle'

import Music from '@/components/music/music'
import Searchmusic from '@/components/music/searchmusic'
import Songsheet from '@/components/music/songsheet'

import English from '@/components/english/english'
import Translate from '@/components/english/translate'

import Movies from '@/components/movies/main'
import Searchmovies from '@/components/movies/searchmovies'
import Moviespage from '@/components/movies/moviespage'

import Admin from '@/components/admin/main'
import Adminarticle from "@/components/admin/article"
import Admincomment from '@/components/admin/comment'

import Uploadimg from "@/components/image/picbed"

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: Usercenter,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/article',
      name: 'Article',
      component: Article,
    },
    {
      path: '/articlepage',
      name: 'Articlepage',
      component: Articlepage,
    },
    {
      path: '/addarticle',
      name: 'Addarticle',
      component: Addarticle,
      meta:{
        login_required:true,
      },
      beforeEnter:function(to,from,next){
        var isadmin = cookie.getCookie("isadmin");
        // 管理界面需要管理员用户才可以进入
        if(!isadmin && to.matched.some(function(item){
          return item.meta.login_required;
        })){
          next('/login');
        }else{
          next();
        }
      },
    },
    {
      path: '/music',
      component: Music,
      children:[
        {
          path:'/',
          component:Searchmusic,
        },
        {
          path:'songsheet',
          component:Songsheet,
        },
        
      ]
    },
    {
      path:'/uploadimg',
      component:Uploadimg,
    },
    {
      path: '/english',
      component: English,
      children:[
        {
          path:'/',
          component:Translate,
        },
      ]
    },
    {
      path: '/movies',
      component: Movies,
      children:[
        {
          path:'/',
          component:Searchmovies,
        },
        {
          path:'/moviespage',
          component:Moviespage,
        }
        
      ]
    },
    {
      path: '/admin',
      component: Admin,
      meta:{
        login_required:true,
      },
      beforeEnter:function(to,from,next){
        var isadmin = sessionStorage.getItem("ISADMIN");
        // 管理界面需要管理员用户才可以进入
        if(!isadmin && to.matched.some(function(item){
          return item.meta.login_required;
        })){
          next('/login');
        }else{
          next();
        }
      },
      children:[
        {
          path:'/',
          component:Adminarticle,
        },
        {
          path:"/admincomment",
          component:Admincomment,
        }
      ]
    },
    {
      path: '/test',
      component: Test,
      
    },
  ]
})


