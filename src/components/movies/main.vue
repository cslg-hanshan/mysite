<template>
    <div id="movies">
        <div class="col-sm-8 col-md-8">
            <Title>视频中心</Title>
            <router-view></router-view>
        </div>
        <div class="col-sm-4 col-md-4 hidden-xs">
            <Recommend :obj="moviesobj"></Recommend>
        </div>
    </div>
</template>
<script>
import Title from '@/components/common/title'
import Recommend from '@/components/movies/recommend'
export default {
    name:"Movies",
    data(){
        return{
            moviesobj:{
                name:"电影推荐",
                movies:[
                    {id:1,name:"绿皮书"},
                    {id:2,name:"阿丽塔：战斗天使 Alita: Battle "},
                    {id:1,name:"Angel"},
                    {id:1,name:"流浪地球"},
                    {id:1,name:"飞驰人生"},
                ]
            }
        }
    },
    components:{
        Title,
        Recommend,
    },
    mounted(){
        document.getElementById("movies").style.minHeight = document.documentElement.clientHeight + "px";
    }
}
</script>
<style scoped>
#movies{
    margin-bottom: 50px;
}
</style>

