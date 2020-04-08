<template>
    <div id="moviesitem">
        <div v-if="this.getMoviessearchlist.length != 0">
            <div class="movietitle" style="border-bottom:2px solid #3bb0ff;">
                <div>影视名称</div>
                <div>类型</div>
                <div>更新时间</div>
            </div>
            <div  v-for="(item,index) in getMoviessearchlist" :key="item.title+index">
                
                <div class="movieitem">
                    <div @click="topage(item.pageurl)">{{item.title}}</div>
                    <div>{{item.type}}</div>
                    <div>{{item.updatetime}}</div>
                </div>
            </div>
        </div>
        <!-- <div v-show="istopage" class="mengban">
            <div>加载中</div>
        </div> -->
    </div>
</template>
<script>
export default {
    name:"Moviesitem",
    data(){
        return{
            istopage:false,
        }
    },
    computed:{
        getMoviessearchlist:{
            get(){return this.$store.state.movies.searchlist;},
            set(val){this.$store.state.movies.searchlist = val;}
        }
    },
    methods:{
        topage(url){
            this.istopage = true;
            this.$store.dispatch("movies/toMoviespage",url).then((ret) => {
                if(ret){
                    this.$router.push('/moviespage');
                }
                this.istopage = false;
            })
        }
    },
}
</script>
<style scoped>
.movietitle{
    padding:20px 30px;
    display: flex;
}
.movietitle>div:nth-child(1){
    flex:4;
    text-align: center;
}
.movietitle>div:nth-child(2){
    flex:3;
    text-align: center;
}
.movietitle>div:nth-child(3){
    flex:3;
    text-align: center;
}
.movieitem{
    margin:20px 30px;
    display: flex;
    font-size: 20px;
}
.movieitem>div:nth-child(1){
    flex: 4;
    text-align: center;
    cursor: pointer;
}
.movieitem>div:nth-child(2){
    flex: 3;
    text-align: center;
}
.movieitem>div:nth-child(3){
    flex: 3;
    text-align: center;
}

.mengban{
    top:0px;
    left:0px;
    position: fixed;
    width:100%;
    height: 100%;
    background-color: rgba(128, 128, 128, 0.5);
    color:white;
    font-size: 30px;
    text-align: center;
    transition: .5s;
}
.mengban > div{
    margin-top:100px;
}
</style>
