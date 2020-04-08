<template>
    <div class="searchmusic">
        <div class="col-sm-8 col-md-8 left">
            <!-- <div class="tip">QQ音乐破解(由于本地网速有限，请求速度慢)大约需要15s左右</div> -->
            <div class="searchframe">
                <div class="sinput">
                    <input
                        type='text'
                        class="search"
                        v-model="getSearchinfo"
                        ref="input"
                        placeholder="输入想听的音乐"
                        v-on:keyup.enter="submit"
                    >
                </div>
                <div class="sbutton" @click="submit">搜索</div>
            </div>
            <div class="searchhistory">
                <div class="searchitem" v-for="item in historylist" :key="item" @click="search(item)">{{item}}</div>
            </div>
            <div v-show="this.showloadmsg" class="msg">{{this.loadmsg}}</div>
            <Musicitem></Musicitem>
            <div v-show="getSearchinfo != ''" class="more" @click="loadMore">点我加载更多</div>
        </div>
        <div class="col-sm-4 col-md-4 hidden-xs right">
            <Top10  @childplay="search"></Top10>
        </div>
    </div>
</template>
<script>
import Musicitem from '@/components/music/musicitem'
import Top10 from '@/components/music/musictop10'
import {musicsearch} from '../../api/api'
export default {
    name:'Searchmusic',
    data(){
        return{
            isload:false,
            loadmsg:"",
            showloadmsg:false,
            page:1,
            historylist:[],
            musiclist:[],
        }
    },
    computed:{
        getSearchinfo:{
            get(){return this.$store.state.music.searchinfo;},
            set(val){this.$store.state.music.searchinfo = val;}
        },
        Musiclist:{
            get(){return this.$store.state.music.searchmusiclist;},
            set(val){this.$store.state.music.searchmusiclist = val;}
        },
        getHistorylist:{
            get(){return this.historylist;},
            set(val){this.historylist = val;}
        },
    },
    methods:{
        getsec(str){
            var str1=str.substring(1,str.length)*1;
            var str2=str.substring(0,1);
            if (str2=="s"){return str1*1000;}
            else if (str2=="h"){return str1*60*60*1000;}
            else if (str2=="d"){return str1*24*60*60*1000;}
        },
        setCookie(name,value,time){
            //这是有设定过期时间的使用示例： 
            //s20是代表20秒 
            //h是指小时，如12小时则是：h12 
            //d是天数，30天则：d30 
            var strsec = this.getsec(time);
            var exp = new Date();
            exp.setTime(exp.getTime() + strsec*1);
            document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
        },
        getCookie(name){
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },
        delCookie(name){
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval=getCookie(name);
            if(cval!=null)
                document.cookie= name + "="+cval+";expires="+exp.toGMTString();
        },
        addhistory(name){
            var i=0;
            for(i=0;i<this.getHistorylist.length;i++){
                if(this.getHistorylist[i] == name){break;}
            }
            if(i == this.getHistorylist.length){
                if(this.getHistorylist.length == 10){
                    this.getHistorylist = this.getHistorylist.slice(1);
                    this.getHistorylist.push(name);
                }else{
                    this.getHistorylist.push(name);
                }
                this.setCookie("searchhistory",this.getHistorylist,"h24");
            }
        },
        submit(){
            var _this = this;
            this.page = 1;
            // 搜索内容不能为空
            if(this.getSearchinfo && this.isload == false){
                this.isload = true;
                this.showloadmsg = true;
                this.loadmsg = "加载中。。。";
                // 把搜索的信息加入到历史记录中
                this.addhistory(this.getSearchinfo);
                this.$store.dispatch('music/setSearchmusiclist',this.page).then((ret) => {
                    if(ret == 1){
                        _this.showloadmsg = false;
                    }else if(ret == 0){
                        _this.loadmsg = "请求失败";
                    }else{
                        _this.loadmsg = "请求超时";
                    }
                    _this.isload = false;
                });
                
            }
        },
        // 子组件调用函数
        search(name){
            this.getSearchinfo = name;
            this.submit();
        },
        loadMore(){
            this.page++;
            this.$store.dispatch("music/addSearchmusiclist",this.page);
        }
        
    },
    created(){
        var list = this.getCookie("searchhistory");
        if(list){
            list = list.split(",");
            this.getHistorylist = [].concat(list);
        }
    },
    mounted(){
        
    },
    components:{
        Musicitem,
        Top10,
    }
}
</script>
<style scoped>
.searchframe{
    display:flex;
    margin-top:10px;
    margin-bottom: 20px;
    transition: 1s;
}
.tip{
    text-align: center;
    font-weight: bold;
    user-select: none;
    transition: 1s;
}
.tip:hover{
    color: #3ee0ff;
}
.sinput{
    flex:9;
}
.sbutton{
    flex:1;
    background-color: #3bb0ff;
    padding: 14px;
    color: white;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    overflow: hidden;
    white-space:nowrap;
}
.searchmusic{
    margin-bottom: 20px;
}
.search {
    width:100%;
    margin:0 auto;
    padding: 14px;
    font-size: 16px;
    color:gray;
    text-align: center;
}
.searchhistory{
    width:100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: left;
    margin-bottom: 20px;
}
.searchitem{
    color:gray;
    border:1px solid gray;
    border-radius: 17px;
    padding:6px 15px;
    margin:5px;
    cursor: pointer;
}
.searchitem:hover{
    color: #3bb0ff;
}
.msg{
    text-align: center;
    color:#cfcfcf;
    cursor: pointer;
}
.more{
    margin:20px 0px;
    text-align: center;
    font-size: 18px;
    color:#3bb0ff;
    text-decoration: underline;
    cursor: pointer;
    user-select: none;
}
</style>
