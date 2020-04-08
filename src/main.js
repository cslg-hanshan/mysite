// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//全局加载resource拦截器
import './axios/';
import Axios from 'axios';
Vue.prototype.$http = Axios

import vueiInfinite from 'vue-infinite-scroll';//无限滚动

import VueQuillEditor from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import './assets/css/bootstrap.min.css';
import './assets/js/bootstrap.min';

import {
  Message,
  MessageBox,
  Input,
  Radio,
  DatePicker,
  Button,
} from 'element-ui'
Vue.use(Input);
Vue.use(Radio);
Vue.use(DatePicker);
Vue.use(Button);
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;

Vue.config.productionTip = false;

Vue.use(VueQuillEditor);

Vue.use(vueiInfinite);

NProgress.configure({     
  easing: 'ease',  // 动画方式    
  speed: 500,  // 递增进度条的速度    
  showSpinner: false, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
});

router.beforeEach((to,from,next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
