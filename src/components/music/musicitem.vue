<template>
    <div class="musicitem">
        <div v-if="getMusiclist.length>0">
            <transition tag="ul" v-for="(item,index) in getMusiclist" :key="index+item.id">
                <li class="music" >
                    <div class="musicno">{{index+1}}</div>
                    <div class="musicname">{{item.name}}</div>
                    <div class="musicsinger">{{item.artist[0].name || item.artist[0]}}</div>
                    <div class="play">
                        <span @click="changeCurrentmusic(item)" class="glyphicon glyphicon-headphones play-xs" aria-hidden="true" ></span>
                    </div>
                </li>
            </transition>
            
        </div>
    </div>
</template>
<script>
export default {
    name:'Musicitem',
    data(){
        return{
        }
    },
    computed:{
        getMusiclist(){
            return this.$store.state.music.searchmusiclist;
        },
        getSearchmusicname(){
            return this.$store.state.music.searchmusicname;
        },
    },
    methods:{
        changeCurrentmusic(obj){
            this.$store.dispatch('music/addMusiclist',obj);
        },
        addpageofparent(){
            this.$emit("childevent");
        }
    }
}
</script>
<style scoped>
@keyframes show {
    0% {
        opacity: 0;transform: translateY(50px);
    }
    100% {
        opacity: 1;
    }
}
@keyframes hide {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;transform: translateY(50px);
    }
}
.v-enter-active {
    animation: show 1s;
}
.v-leave-active {
    animation: hide 1s;
}
.v-enter, .v-leave-to {
    opacity: 0;
}
.songsheet{
    display: block;text-align: center;font-size: 15px;color:#3bb0ff;cursor: pointer;margin:20px 0px;
}
ul{
    padding: 0px;margin:0px;
}
li{
    list-style: none;height: 60px;line-height: 60px;display:flex;margin-bottom: 20px;transition: .5s;
}
li:hover{color: #3bb0ff;}
li:hover .play{
    display: block;
}
li:nth-child(1) > div:nth-child(1){
    color:red;font-weight: bold;
}
li:nth-child(2) > div:nth-child(1){
    color:orange;font-weight: bold;
}
li:nth-child(3) > div:nth-child(1){
    color:green;font-weight: bold;
}
.music{
    display: flex;justify-content: space-between;user-select: none;border-bottom: 1px solid #cfcfcf;
}
.musicno{
    width:50px;text-align: center;
}
.pic{
    width:60px;height: 60px;border-radius: 5px;border:1px solid #cfcfcf;overflow: hidden;
}
.pic > img{width:60px;height:60px;transition: .5s;}
.pic>img:hover{transform: scale(1.3)}
.musicname{
    width:250px;text-overflow:ellipsis;overflow: hidden;white-space:nowrap;
}
.musicsinger{
    width:200px;text-overflow: ellipsis;overflow: hidden;
}
.play{
    cursor: pointer;
}
.upload > span:hover{
    cursor: pointer;color: gray;
}
</style>
