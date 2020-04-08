<template>
    <div id="moviespage">
        <div v-show="Moviesdetail">
            <div class="title">
                {{Moviesdetail.title}}
                <span style="color:red;">{{Moviesdetail.score}}</span>
            </div>
            <div class="image">
                <img :src="Moviesdetail.picurl" height="300" />
            </div>
            <div class="detail">
                <div class="item">状态:{{Moviesdetail.state}}</div>
                <div class="item">导演:{{Moviesdetail.director}}</div>
                <div class="item">主演:{{Moviesdetail.mainperformer}}</div>
                <div class="item">类型:{{Moviesdetail.videotype}}</div>
                <div class="item">地区:{{Moviesdetail.zone}}</div>
                <div class="item">语言:{{Moviesdetail.language}}</div>
                <div class="item">发布时间:{{Moviesdetail.release}}</div>
                <div class="item">剧情:{{Moviesdetail.plot}}</div>
            </div>
            <div class="playlist">
                <a
                    class="playbtn" 
                    v-for="(item,index) in Moviesdetail.videosurl" 
                    :key="item.url+index"
                    :href="item.url"
                    target="_blank"
                >
                    {{item.title}}
                </a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"Moviespage",
    data(){
        return{

        }
    },
    computed:{
        Moviesdetail(){
            return this.$store.state.movies.moviesdetail;
        }
    },
    beforeRouteEnter (to, from, next) {
        if(from.fullPath == "/"){
            next("/movies");
        }
        next();
    }
}
</script>
<style scoped>
.title{
    color:black;
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
}
.image > img{
    border:3px solid #3ee0ff;
}
.image{
    text-align: center;
}
.detail{
    display: flex;
    flex-direction: left;
    flex-wrap: wrap;
    margin-top: 20px;
}
.item{
    color:#888;
    border:1px solid #3ee0ff;
    border-radius: 20px;
    padding:5px 15px;
    cursor: pointer;
}
.playlist{
    margin-top:10px;
    display: flex;
    flex-direction: left;
    justify-content: space-between;
    flex-wrap: wrap;
}
.playbtn{
    background-color: #00aeff;
    color:white;
    font-size: 18px;
    padding:5px 15px;
    border-radius: 20px;
    cursor: pointer;
    margin: 5px;
}
</style>
