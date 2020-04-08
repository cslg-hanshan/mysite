<template>
    <div class="vplayer">
        <div class="frame" v-if="Musiclist.length>0">
            <div :class="{musiclist:true, musiclistshow:showmusiclist,musiclisthide:showmusiclist == false}">
                <div class="listtitle"><div>歌曲名</div><div>歌手</div></div>
                <div class="listitem ">
                    <div
                        v-for="(item,index) in Musiclist"
                        :key="item.id"
                        :class="{listcontent:true,active:Currentindex == index}"
                        @click="Currentindex = index"
                    >
                        <div>{{item.name}}</div>
                        <div>{{getAuthor(item.artist)}}</div>
                    </div>
                </div>
            </div> 
            <div class="picframe">
                <img class="pic" :src="this.pic"/>
                <div class="playico" v-show="!this.isplay" @click="play"><span  class="glyphicon glyphicon-play" aria-hidden="true"></span></div>
                <div class="playico" v-show="this.isplay" @click="pause"><span class="glyphicon glyphicon-pause" aria-hidden="true"></span></div>
            </div>
            <div class="right">
                <div id="progress" ref="progress" @click="clickchangeprogress"><div id="bar" ref="bar"></div></div>
                <div class="content">
                    <div class="info">
                        <div class="title" :title="this.Currentmusic.name">{{this.Currentmusic.name}}</div>
                        <div class="author" :title="getAuthor(this.Currentmusic.artist)">{{getAuthor(this.Currentmusic.artist)}}</div>
                        <div class="time">{{this.Formatmusictime}}</div>
                    </div>
                    <div class="lrc">
                        <ul class="lrcul"><li v-for="(item,index) in this.lrccontentlist" :key="item+index" v-html="item"></li></ul>
                    </div>
                    <div class="tools">
                        <div class="circle">
                            <span v-show="this.status == 1" @click="changestatus" class="glyphicon glyphicon-refresh" aria-hidden="true" title="循环播放"></span>
                            <span v-show="this.status == 0" @click="changestatus" class="glyphicon glyphicon-repeat" aria-hidden="true" title="顺序播放"></span>
                        </div>
                        <div class="playlist"><span class="glyphicon glyphicon-list" @click="showmusiclist = ! showmusiclist" aria-hidden="true"></span></div>
                        <div><span class="glyphicon glyphicon-chevron-left" @click="this.previousmusic" aria-hidden="true"></span></div>
                        <div><span class="glyphicon glyphicon-chevron-right" @click="this.nextmusic" aria-hidden="true"></span></div>
                    </div>
                </div>
            </div>
        </div>
        <audio
            ref="player"
            id="player"
            @play="vplay"
            @pause="vpause"
            @timeupdate="vtimeupdate"
            @canplay="vcanplay"
            @ended="vended"
            @error="verror"
        ></audio>
    </div>
</template>
<script>
import {
    hotmusiclist,
    musicurl,
    musiclrc,
    musicpic,
} from '../../api/api'
export default {
    name:"Vplayer",
    data(){
        return{
            url:"",
            lrc:"",
            pic:"",
            isplay : false,
            first:true,
            status : 0,           //0:顺序播放；1:单曲循环
            totalTime : 0,
            currentTime : 0,
            lrctimelist : [],
            lrccontentlist : [],
            showmusiclist : false,
        }
    },
    computed:{
        Musiclist:{
            get(){return this.$store.state.music.musiclist;},
            set(val){this.$store.state.music.musiclist = val;}
        },
        Currentmusic:{
            get(){return this.$store.state.music.musicobj;},
            set(val){this.$store.state.music.musicobj = val;}
        },
        Currentindex:{
            get(){return this.$store.state.music.currentindex;},
            set(val){this.$store.state.music.currentindex = val;}
        },
        // 格式化歌曲播放时间
        Formatmusictime(){
            var cm = Math.floor(this.currentTime/60);
            var cs = this.currentTime % 60;
            var tm = Math.floor(this.totalTime/60);
            var ts = this.totalTime % 60;
            return cm+":"+cs+"/"+tm+":"+ts;
        },
        Isshowmusiclist:{
            get(){return this.showmusiclist;},
            set(val){this.showmusiclist = val;}
        }
    },
    watch:{
        Currentindex(newName, oldName) {
            // ...
            if(newName != oldName){
                this.playmusic(newName);
            }
        },
    },
    methods:{
        vplay(){
            this.isplay = true;
        },
        vpause(){
            this.isplay = false;
        },
        vcanplay(){
            var player = this.$refs.player;
            this.totalTime = parseInt(player.duration);
        },
        vtimeupdate(){
            var player = this.$refs.player;
            this.currentTime = parseInt(player.currentTime);
            this.changeprogress();
            this.showlrc();
        },
        vended(){
            var player = this.$refs.player;
            this.isplay = false;
            var long = this.Musiclist.length;
            if(long>1){
                if(this.status == 0){//列表循环
                    console.log("列表循环");
                    this.nextmusic();
                }else if(this.status == 1){//单曲循环
                    console.log("单曲循环");
                    player.play();
                }
            }else{
                player.play();
            }
        },
        verror(){
            console.log("error");
            this.nextmusic();
        },
        // 获取歌手名
        getAuthor(obj){
            if(obj != undefined){
                if(typeof(obj[0]) == "string"){
                    return obj[0];
                }else{
                    return obj[0].name;
                }
            }
            return ;
        },
        // 解析歌词
        async analysislrc(lrc){
            // 初始化数组
            this.lrctimelist = [];
            this.lrccontentlist = [];
            // 匹配时间正则表达式
            var timePatt = /\[\d*:\d*((\.|\:)\d*)*\]/g;
            if(lrc){
                // 把歌词文件按照行划分
                var lrclist = lrc.split("\n");
                for(var i=0;i<lrclist.length;i++){
                    var lyric = lrclist[i];
                    // 匹配每一行的时间部分
                    var matchtime = lyric.match(timePatt);
                    // 如果当前行没有时间 进入下次循环
                    if(!matchtime) continue;
                    // 把每一行的时间部分去掉
                    var matchcontent = lyric.replace(timePatt,"");
                    // 合成时间
                    for(var j=0;j<matchtime.length;j++){
                        var mtime = matchtime[j];
                        var min = Number(String(mtime.match(/\[\d*/i)).slice(1));
                        var sec = Number(String(mtime.match(/\:\d*/i)).slice(1));
                        var time = min * 60 + sec;
                        // 解析数据放入数组
                        this.lrctimelist.push(time);
                        this.lrccontentlist.push(matchcontent);
                    }
                }
            }
            
        },
        // 播放音乐
        play(){
            var player = this.$refs.player;
            if(this.first){
                player.src = this.url;
                player.load();
                this.analysislrc(this.lrc);
                this.resetlrcsite();
                this.first = false;
            }
            player.play();
        },
        // 暂停音乐
        pause(){
            var player = document.getElementById("player");
            player.pause();
        },
        // 下一曲
        nextmusic(){
            console.log("下一曲")
            var long = this.Musiclist.length;
            var player = this.$refs.player;
            if(long == 1){
                player.currentTime = 0;
            }else{
                var index = this.Currentindex;
                index = (index + 1) % long;
                this.playmusic(index);
            }
        },
        // 上一曲
        previousmusic(){
            var long = this.Musiclist.length;
            var audio = this.$refs.player;
            if(long == 1){
                audio.currentTime = 0;
            }else{
                if(this.Currentindex == 0){
                    this.playmusic(long - 1);
                }else{
                    var index = this.Currentindex;
                    this.playmusic(index - 1);
                }
            }
        },
        // 改变播放状态
        changestatus(){
            this.status = (this.status + 1) % 2;
        },
        // 列表循环
        listcycle(){
            this.Currentindex = (this.Currentindex+1)%this.Musiclist.length;
        },
        // 音乐列表点击播放
        async playmusic(index){
            var player = document.getElementById("player");
            if(!player.paused){this.pause();}
            if(!isNaN(index)){
                this.Currentindex = index;
                var id = this.Musiclist[index].id;
                this.Currentmusic = this.Musiclist[index];
                musiclrc(id).then(response => {
                    this.lrc = response.data.lyric;
                    this.analysislrc(this.lrc);
                    this.resetlrcsite();
                });
                musicpic(this.Musiclist[index].pic_id).then(response => {
                    this.pic = response.data.url;
                })
                await musicurl(id).then(response => {
                    this.url = response.data.url;
                    player.src = this.url;
                    player.load();
                    // player.crossOrigin = this.anonymous;
                    this.play();
                });
            }
        },
        // 点击改变进度条
        clickchangeprogress(event){
            var player = this.$refs.player;
            var bar = this.$refs.bar;
            var progress = this.$refs.progress;
            var offsetx = event.x - this.getOffsetLeft(progress);
            var point = offsetx / 700;
            var barwidth = Number(point*100).toFixed(1);
            bar.style.width = barwidth + "%";
            var changetime = point * this.totalTime;
            player.currentTime = changetime;
        },
        // 改变进度条进度
        changeprogress(){
            if(this.Musiclist.length>0){
                var bar = this.$refs.bar;
                var point = this.currentTime / this.totalTime;
                var barwidth = Number(point*100).toFixed(1);
                bar.style.width = barwidth + "%";
            }
        },
        // 重置歌词位置
        resetlrcsite(){
            var lrcul = document.getElementsByClassName("lrcul")[0];
            lrcul.style.transform = "translateY("+40+"px)";
        },
        // 展示歌词
        showlrc(){
            if(this.Musiclist.length>0){
                var lrcul = document.getElementsByClassName("lrcul")[0];
                var child = lrcul.children;
                if(this.lrccontentlist.length > 0){
                    for(var i=0;i<this.lrctimelist.length - 1;i++){
                        child[i].className = "";
                        if(this.lrctimelist[i] <= this.currentTime && this.currentTime <= this.lrctimelist[i+1]){
                            var top = 40 - i*20;
                            lrcul.style.transform = "translateY("+top+"px)";
                            if(i>0)
                                child[i-1].className = "";
                            child[i].className = "active";
                        }
                    }
                }
            }else{return;}
        },
        // 整理歌词列表
        arrangementmusiclist(list){
            var newlist = [];
            for(var i = 0; i < list.length;i++){
                var obj = {};
                obj["album"] = list[i].al.name;
                obj["artist"] = list[i].ar;
                obj["id"] = list[i].id;
                obj["lyric_id"] = list[i].id;
                obj["name"] = list[i].name;
                obj["pic_id"] = list[i].al.pic_str;
                obj["url_id"] = list[i].id;
                newlist.push(obj);
            }
            return newlist;
        },
        // 用于获取播放器在页面中所在的位置
        getOffsetLeft(obj){
            var tmp = obj.offsetLeft;
            var val = obj.offsetParent;
            while(val != null){
                tmp += val.offsetLeft;
                val = val.offsetParent;
            }
            return tmp;
        },
        async init(){
            this.Currentindex = 0;
            await hotmusiclist().then(response => {
                this.Musiclist = this.arrangementmusiclist(response.data.playlist.tracks);
                this.Currentmusic = this.Musiclist[0];
            });
            musicpic(this.Currentmusic.pic_id).then(response => {
                this.pic = response.data.url;
            });
            musiclrc(this.Currentmusic.id).then(response => {
                this.lrc = response.data.lyric;
            });
            await musicurl(this.Currentmusic.id).then(response => {
                this.url = response.data.url;
            });
        }
    },
    created(){
        this.init();
    },
}
</script>
<style scoped>
.vplayer{
    width:800px;
    position: fixed;
    bottom:0px;
    left:calc(50% - 399px);
}
.frame{
    width:800px;
    margin:0 auto;
    border:1px solid #cfcfcf;
    background-color: white;
    display: flex;
    position: relative;
    transition: 1s;
}
.musiclist{
    width:100%;
    
    position: absolute;
    top:0px;
    transition: .5s;
    border:1px solid #cfcfcf;
    
    background-color: white;
}
.musiclistshow{transform: translateY(-200px);}
.musiclisthide{transform: translateY(0px);}
.listtitle{
    text-align: center;
    padding:5px 0px;
    font-weight: bold;
    color:white;
    background-color: #60006d;
    display:flex;
    user-select: none;
}
.listtitle > div:nth-child(1){width:500px;}
.listtitle > div:nth-child(2){width:300px;}
.listitem{
    background-color: white;
    height: 170px;
    overflow: hidden;
    overflow-y: auto;
    cursor: pointer;
}

.listcontent{
    padding:5px 0px;
    display:flex;
    border-bottom: 1px #cfcfcf solid;
}
.listcontent:hover{
    background-color:#cfcfcf;
}
.listcontent > div:nth-child(1){
    width:500px;
    text-align: center;
}
.listcontent > div:nth-child(2){
    width:300px;
    text-align: center;
}
.musiclist .active{
    color:white;
    background-color: #3bb0ff;
    transition: .5s;
}

.picframe{
    position: relative;
    background-color: white;
}
.picframe:hover .playico{
    opacity:1;
}
.pic{
    width: 100px;
    height: 100px;
    transition: 1s;
}
.playico{
    width:50px;
    height: 50px;
    line-height: 50px;
    border: 3px solid white;
    border-radius: 25px;
    font-size: 18px;
    color: white;
    text-align: center;
    position: absolute;
    top:25%;
    left:25%;
    align-items: center;
    cursor: pointer;
    opacity:0;
    transition: 1s;
}
.playico:hover{
    border: 3px solid #3bb0ff;
    color: #3bb0ff;
}
.right{
    width:700px;
    position: relative;
    background-color: white;
    transition: 1s;
}
.right:hover #progress{
    opacity: 1;
}
#progress{
    position: absolute;
    top:0px;
    width:100%;
    height: 5px;
    background-color:gray;
    opacity: 0;
    cursor: pointer;
    z-index: 1000;
}
#bar{
    width:0%;
    height: 5px;
    background-color: #3bb0ff;
    transition: .5s;
}
.content{
    width: 100%;
    display: flex;
    background-color: white;
}
.info{
    flex:2;
    overflow: hidden;
    white-space: nowrap;
    cursor: default;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-around;
    text-align: center;
    transition: 1s;
}
.title{
    font-size: 17px;
    text-overflow:ellipsis;
    overflow: hidden;
    white-space:nowrap;
}
.author{
    color:gray;
    text-overflow:ellipsis;
    overflow: hidden;
    white-space:nowrap;
}
.time{
    color:gray;
    text-overflow:ellipsis;
    overflow: hidden;
    white-space:nowrap;
}
.lrc{
    flex:6;
    text-align: center;
    height: 100px;
    overflow: hidden;
    transition: 1s;
}
.lrc .active{
    color:#3bb0ff;
    font-size: 17px;
}
.lrcul{
    user-select: none;
    transform: translateY(40px);
    padding:0px;
    color:gray;
    font-size: 13px;
    transition: .5s;
}
.lrc li{
    padding:0px;
    margin:0px;
    list-style: none;
    height: 20px;
    line-height: 20px;
    text-overflow:ellipsis;
    overflow: hidden;
    white-space:nowrap;
    transition: .5s;
}
.tools{
    flex:4;
    display:flex;
    align-items: center;
}
.tools>div{
    flex:1;
    font-size: 17px;
    color: gray;
    text-align: center;
}
.tools span:hover{
    color: #3bb0ff;
    cursor: pointer;
}
.listitem::-webkit-scrollbar{
    width:5px;
    background: #3bb0ff;
}
.listitem::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background:#3bb0ff;
}
.listitem::-webkit-scrollbar-track {
    background-color: white;
}

@media screen and (max-width: 800px) {
    .vplayer{
        width:100%;
        left:0px;
    }
    .frame{
        width:100%;
        height: 80px;
    }
    .pic{
        width:80px;
        height: 80px;
    }
    .playico{
        width:40px;
        height: 40px;
        line-height: 40px;
    }
    .right{
        width:calc(100% - 80px);
    }
    #progress{
        display:none;
    }
    .lrc{
        display:none;
    }
    .playlist{
        display:none;
    }
    .musiclist{
        transform: translateY(0px);
        opacity: 0;
    }
}

</style>

