
<template>
    <div class="recommend">
        <div class="movies">
            <div class="mtitle">{{obj.name}}</div>
            <div class="movieslist">
                <div class="movieitem" v-for="(item,index) in obj.movies" :key="index+item.name">
                    <div>{{index+1}}.</div>
                    <div>{{item.name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"Recommend",
    props:["obj"],
    data(){
        return{
            
        }
    },
    created(){

    }
}
</script>
<style scoped>
.mtitle{
    padding:5px;
    font-weight: bold;
    border-left:2px solid #3bb0ff;
}
.movieitem{
    padding:5px;
    display: flex;
    border-bottom: 1px solid #cfcfcf;
    cursor: pointer;
    transition: .5s;
}
.movieitem:hover{
    background-color: #3bb0ff;color: white;
}
.movieslist>div:nth-child(1)>div:nth-child(1){
    color: red;
}
.movieslist>div:nth-child(2)>div:nth-child(1){
    color: orange;
}
.movieslist>div:nth-child(3)>div:nth-child(1){
    color: green;
}
</style>


