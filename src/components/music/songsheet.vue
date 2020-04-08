<template>
    <div class="songsheet">
        <div v-if="this.isloadup">
            <div class="list">
                <div class="item" v-for="item in getSongsheet" :key="item.id">
                    <img :src="item.coverImgUrl" width="200">
                    <div class="playico"><span class="glyphicon glyphicon-headphones play-xs" aria-hidden="true" ></span></div>
                    <div class="itemname">{{item.name}}</div>
                </div>
            </div>
        </div>
        <div v-else class="tip">
            <div>加载中。。。</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Songsheet',
    data(){
        return{
            isloadup:false,
        }
    },
    methods:{
    },
    computed:{
        getSongsheet(){
            return this.$store.state.music.songsheet;
        }
    },
    created(){
        var _this = this;
        this.$store.dispatch('music/setSongsheet').then((ret) => {
            if(ret){
                console.log("歌单请求成功");
                _this.isloadup = true;
            }else{
                console.log("歌单请求失败");
            }
        })
    },
    mounted(){
        
    }
}
</script>
<style scoped>
.tip{
    text-align: center;
}
.list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    transition: .5s;
}
.item{
    padding:10px 0px;
    position: relative;
    transition: .5s;
}
.item:hover .playico{opacity: 1;}
.itemname{text-overflow:ellipsis;overflow: hidden;white-space:nowrap;}
.playico{
    opacity: 0;
    font-size: 90px;
    color:#ffffff99;
    position: absolute;
    top:60px;
    left:60px;
    transition: .5s;
    cursor: pointer;
}
.playico:hover{color: #3bb0ff99;}
</style>
