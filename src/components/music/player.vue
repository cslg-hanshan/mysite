<template>
    <div v-if="getMusiclist" class="player" id="musicplayer">
        <div v-show="this.isShowlist" class="musiclist">
            <!-- 歌曲列表 -->
            <div
                v-for="(item,index) in getMusiclist"
                :key="item.songid"
                :class="{active:index==getCurrentindex,deactive:index!=getCurrentindex}"
                
            >
                <div
                    @click="changeindex(index)"
                    :title="item.title"
                >
                    {{index+1}}.{{item.title}}
                </div>
                <div @click="dropmusic(index)">
                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                </div>
            </div>
        </div>
        <div v-show="this.isShowtools" class="tools">
            <div class="tools-top">
                <!-- 歌曲名 -->
                <div>
                    {{getMusiclist[getCurrentindex].title}}-{{getMusiclist[getCurrentindex].author}}
                </div>
            </div>
            <div class="tools-middle">
                <div class="music-previous">
                    <!-- 上一曲按钮 -->
                    <span @click="previous" class="glyphicon glyphicon-step-backward" aria-hidden="true" title="上一曲"></span>
                </div>
                <div class="music-play">
                    <!-- 播放暂停按钮 -->
                    <span v-if="!this.isPlay" @click="play" class="glyphicon glyphicon-play" aria-hidden="true" title="播放"></span>
                    <span v-else @click="pause" class="glyphicon glyphicon-pause" aria-hidden="true" title="暂停"></span>
                </div>
                <div class="music-next">
                    <!-- 下一曲按钮 -->
                    <span @click="next" class="glyphicon glyphicon-step-forward" aria-hidden="true" title="下一曲"></span>
                </div>
                <div class="music-lrc" @click="loop">
                    <span v-if="this.isloop" style="color:#3bb0ff;" class="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                    <span v-else class="glyphicon glyphicon-refresh" aria-hidden="true" title="单曲循环"></span>
                </div>
                <div class="music-list">
                    <!-- 歌曲列表按钮 -->
                    <span @click="listtoggle" class="glyphicon glyphicon-list" aria-hidden="true" title="歌曲列表"></span>
                </div>
            </div>
            <div class="tools-bottom">
                <!-- 歌词 -->
                <span class="showlrc" :title="this.getShowlrc">{{this.getShowlrc}}</span>
            </div>
        </div>
        <!-- 歌曲图片 -->
        <div class="image">
            <img class="simg" :src="getMusiclist[getCurrentindex].pic" width="60" height="60">
        </div>
        <!-- 歌曲进度条 -->
        <div class="bar" @click="toolstoggle">
            <!-- 歌曲时间 -->
            {{parseInt(this.currentTime/60)}}:{{this.currentTime%60}}/{{parseInt(this.totalTime/60)}}:{{this.totalTime%60}}
            <div class="process"></div>
        </div>
        
        <audio
            :src="getMusiclist[getCurrentindex].url"
            ref="player"
            id="player"
            preload="preload"
        ></audio>
    </div>
    <div v-else></div>
    
</template>
<script>
import axios from 'axios'
export default {
    name:'Player',
    data(){
        return{
            isloop:false,
            // 是否显示播放器工具栏
            isShowtools:false,
            // 是否显示歌曲列表
            isShowlist:false,
            // 音乐总时间
            totalTime : 0,
            // 音乐播放当前时间
            currentTime : 0,
            // 音乐是否正在播放
            isPlay : false,
            lrctimelist:[],
            lrccontentlist:[],
            lrc:"",
            first:true,
        }
    },
    methods:{
        // 解析歌词
        analysislrc(lrc){
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
        showlrc(currenttime){
            for(var i=0;i<this.lrctimelist.length;i++){
                var lrctime = this.lrctimelist[i];
                if(lrctime == currenttime){
                    this.getShowlrc = this.lrccontentlist[i];
                }
            }
        },
        play(){
            var audio = this.$refs.player;
            audio.play();
            this.isPlay = true;
        },
        pause(){
            var audio = this.$refs.player;
            audio.pause();
            this.isPlay = false;
        },
        changeindex(index){
            var audio = this.$refs.player;
            if(index == this.getCurrentindex){
                audio.load();
            }else{
                this.getCurrentindex = index;
            }
        },
        next(){
            this.getShowlrc = "";
            var audio = this.$refs.player;
            var currentindex = this.getCurrentindex;
            this.getCurrentindex = (currentindex+1)%this.getMusiclist.length;
            if( currentindex == this.getCurrentindex){
                audio.load();
            }
        },
        previous(){
            this.getShowlrc = "";
            var audio = this.$refs.player;
            var currentindex = this.getCurrentindex;
            if(currentindex == 0){
                this.getCurrentindex = this.getMusiclist.length - 1;
            }else{
                this.getCurrentindex = (currentindex - 1);
            }
            if( currentindex == this.getCurrentindex){
                audio.load();
            }
        },
        toolstoggle(){
            var tools = document.getElementsByClassName("tools")[0];
            if(this.isShowtools){
                this.isShowtools = false;
                this.isShowlist = false;
            }else{
                this.isShowtools = true;
            }
        },
        listtoggle(){
            var list = document.getElementsByClassName("musiclist")[0];
            if(this.isShowlist){
                this.isShowlist = false;
            }else{
                this.isShowlist = true;
            }
        },
        async Musiclist(){
            var _this = this;
            await axios({
                method:'get',
                url:_this.Url+'/api/musiclist',
            }).then((response) => {
                if(response.data.code == 200){
                    _this.$store.dispatch("music/setMusiclist",response.data.data);
                }else{
                    console.log(response.data.msg);
                }
                
            })
        },
        // 删除音乐列表中的音乐
        dropmusic(index){
            if(this.getMusiclist.length > 1){
                // 当要删除的下标大于正在播放的下标
                if(this.getCurrentindex==0){
                    this.getMusiclist.splice(index,1);
                }else if(this.getCurrentindex>0 && this.getCurrentindex<this.getMusiclist.length-1){
                    if(this.getCurrentindex > index){
                        this.getMusiclist.splice(index,1);
                        this.getCurrentindex -= 1;
                    }else if(this.getCurrentindex == index){
                        this.getMusiclist.splice(index,1);
                    }else{
                        this.getMusiclist.splice(index,1);
                    }
                }else{
                    this.getCurrentindex -= 1;
                    this.getMusiclist.splice(index,1);
                }
                
            }else{
                alert("音乐列表不能为空");
            }
            
        },
        loop(){
            this.isloop = !this.isloop;
        }
    },
    computed:{
        // 获取音乐列表
        getMusiclist:{
            get(){
                return this.$store.state.music.musiclist;
            },
            set(val){
                this.$store.state.music.musiclist = val;
            }
        },
        // 获取当前播放音乐所处列表的下标
        getCurrentindex:{
            get(){
                return this.$store.state.music.currentindex;
            },
            set(val){
                this.$store.state.music.currentindex = val;
            }
        },
        getShowlrc:{
            get(){
                return this.lrc;
            },
            set(val){
                this.lrc = val;
            }
        }
    },
    created(){
        // 获取数据库音乐数据
        this.Musiclist();
    },
    mounted(){
        var div = document.getElementById("musicplayer");
        var dragFlag = false;
        var x,y;
        div.onmousedown = function (e) {
            e = e || window.event;
            x = e.clientX - div.offsetLeft;
            y = e.clientY - div.offsetTop;
            dragFlag = true;
        };
        document.onmousemove = function (e) {
            if (dragFlag) {
                e = e || window.event;
                div.style.left = e.clientX - x + "px";
                div.style.top  = e.clientY - y + "px";
            }
        };
        document.onmouseup = function (e) {
            dragFlag = false;
        };

        var _audio = document.getElementById("player");
        _audio.volume = 0.5;
        var _this = this;
        _audio.addEventListener('play',function(){
            // 开启图片旋转
            $(".simg").css("animation-play-state","running");
        });
        _audio.addEventListener('pause',function(){
            $(".simg").css("animation-play-state","paused");
        });
        _audio.addEventListener('ended',function(){
            $(".simg").css("animation-play-state","paused");
            if(_this.isloop == false){
                _this.next();
            }else{
                _audio.play();
            }
        });
        _audio.addEventListener('canplay',function(){
            // 解析歌词
            _this.analysislrc(_this.getMusiclist[_this.getCurrentindex].lrc);
            // 设置歌曲总时长
            _this.totalTime = parseInt($("#player")[0].duration);
            // 设置歌词
            if(_this.lrctimelist.length == 0){
                _this.getShowlrc = "欣赏纯音乐";
            }else{
                _this.getShowlrc = "";
            }
            // 第一次打开网页  音乐不自动播放
            if(_this.first == false){
                _this.play();
                _this.totalTime = parseInt($("#player")[0].duration);
            }else{
                _this.first = false;
            }
            
        });
        _audio.addEventListener('timeupdate',function(){
            var current = parseInt(_audio.currentTime);
            _this.currentTime = current;
            var mstr = Number(current / _this.totalTime * 100).toFixed(1) + "%";
            $(".process").css("width",mstr);
            _this.showlrc(current);
        });
    }

}
</script>
<style scoped>
.player{
    user-select: none;
}
@keyframes rotate
{
    from{transform:rotate(0)}
    to{transform:rotate(360deg)}
}
.image{
    width: 60px;
    height: 60px;
    border-radius: 30px;
    position: absolute;
    top:0px;
    overflow: hidden;
    -webkit-user-select:none;
}
.simg{
    width: 60px;
    height: 60px;
    border-radius: 30px;
    transition: 1s;
    animation: rotate 10s linear infinite;
    animation-play-state:paused;
}
.bar{
    width: 60px;
    height: 60px;
    border-radius: 30px;
    overflow: hidden;
    position: absolute;
    top:0px;
    cursor: pointer;
    background-color: #bbbbbb20;
    line-height: 60px;
    text-align: center;
    color:#ffffff;
    font-weight: bold;
}
.process{
    width:1%;
    height: 60px;
    background-color: #3bb0ff50;
    position: absolute;
    top:0px;
}
.tools{
    width:300px;
    height: 60px;
    padding:0px 10px;
    background-color: white;
    border: 1px solid #3bb0ff;
    position: absolute;
    top:0px;
    padding-left:35px;
    transform: translateX(30px);
    transition: 2s;
    overflow: hidden;
}
.tools div{
    overflow: hidden;
    text-align: center;
}
.tools-top{
    height: 17px;
}
.tools-middle{
    display: flex;
}
.tools-middle > div > span:hover{
    color:gray;
    cursor: pointer;
}
.music-previous{
    width:30px;
}
.music-play{
    width: 30px;
}
.music-next{
    width: 30px;
}
.music-lrc{
    width: 30px;
}
.music-list{
    width: 30px;
}
.musiclist{
    width:300px;
    position: absolute;
    background-color: #e0e0e0;
    top:-120px;
    left:30px;
    border:1px solid #3bb0ff;
    border-bottom:0px;
    height: 120px;
    overflow: auto;
}
.musiclist::-webkit-scrollbar{
    width:5px;
    background: #3bb0ff;
}
.musiclist::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background:#3bb0ff;
}
.musiclist::-webkit-scrollbar-track {
    background-color: white;
}
.musiclist > div{
    padding:5px 0px;
    border-bottom: 1px solid #cfcfcf;
    cursor: pointer;
    display:flex;
}
.musiclist > div>div:nth-child(1){
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 11;
}
.musiclist > div>div:nth-child(2){
    flex: 1;
    text-align: center;
}
.deactive{
    background-color: #fff;
}
.active{
    background-color: #3bb0ff;
    color: white;
}
</style>
