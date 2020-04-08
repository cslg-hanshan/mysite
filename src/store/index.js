import Vue from 'vue';
import Vuex from 'vuex';
import music from './modules/music'
import english from './modules/english'
import article from './modules/article'
import user from './modules/user'
import comment from './modules/comment'
import movies from './modules/movies'
import admin from './modules/admin'
import image from './modules/image'

Vue.use(Vuex);


export default new Vuex.Store({
    modules:{
        music,
        english,
        article,
        user,
        comment,
        movies,
        admin,
        image,
    }
});