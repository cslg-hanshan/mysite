<template>
    <div class="top10">
        <div class="frame">
            <div class="title">音乐Top10</div>
            <div class="musiclist">
                <div
                    class="musicitem"
                    v-for="(item,index) in musiclist"
                    :key="item.id"
                    @click="play(item.name)"
                >
                    <div>{{index + 1}}</div>
                    <div>{{item.name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"Top10",
    data(){
        return{
            musiclist:[
                {id:1,name:'绿色'},
                {id:2,name:'dizzy'},
                {id:3,name:'Dust to Dust'},
                {id:4,name:'9420'},
                {id:5,name:'Anchor'},
                {id:6,name:'It Takes a Lot to Know a Man'},
                {id:7,name:'Lost Stars'},
                {id:8,name:'Tell Me if You Wanna Go Home'},
                {id:9,name:'A Higher Place'},
                {id:10,name:'Coming Up Roses'},
            ]
        }
    },
    methods:{
        play(val){
            console.log(val);
            this.$emit("childplay",val);
        }
    }
}
</script>
<style scoped>
.frame{
    width: 100%;

}
.title{
    padding:5px 0px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 2px solid #3bb0ff;
}
.musiclist > div:nth-child(1) > div:nth-child(1){
    color: red;
}
.musiclist > div:nth-child(2) > div:nth-child(1){
    color: orange;
}
.musiclist > div:nth-child(3) > div:nth-child(1){
    color: green;
}
.musicitem{
    display: flex;
    text-align: center;
    border-bottom: 1px solid #cfcfcf;
    padding:5px 0px;
    transition: 1s;
    cursor: pointer;
}
.musicitem:hover{
    background-color: #3bb0ff;
    color: white;
}
.musicitem > div:nth-child(1){
    flex: 1;
}
.musicitem > div:nth-child(2){
    flex: 4;
    font-weight: bold;
}
</style>
