<template>
<div class="navigation">

    <div class="frame">
        <div class="left">
            <a @click.prevent="toindex" class="mysite">
                <img alt="Brand" height="30" width="30" src="@/assets/mysite.png">
            </a>
        </div>
        <div class="right">
            <div
                v-for="(item,index) in menu"
                :class="{item:true,active:index==currentindex}"
                :key="item.name"
                @click="changeindex(index)"
                >
                <router-link class="link" :to="item.url">{{item.name}}<small>{{item.english}}</small></router-link>
                <div :class="{mark:index == currentindex}"></div>
            </div>
        </div>

    </div>
  
</div>
</template>
<script>
export default {
    name:'Navigation',
    data(){
        return{
            menu:[
                {name:"文章",english:"Article",url:"/article"},
                {name:"音乐",english:"Music",url:"/music"},
                {name:"英语",english:"English",url:"/english"},
                {name:"视频",english:"Movies",url:"/movies"},
            ],
            currentindex:-1,
        }
    },
    methods:{
        toindex(){
            this.currentindex = -1;
            this.$router.push('/');
        },
        changeindex(num){
            this.currentindex = num;
        },
        // postup(){
        //   this.axios.get(this.Url+"/article").then(ret => {
        //     console.log(ret);
        //   }).catch(err => {
        //     console.log(err);
        //   })

        // }
    },
    mounted(){
    }

}
</script>
<style scoped>
.navigation{
    height: 56px;
}
.frame{
    display: flex;
}
.left{
    width:100px;height: 50px;line-height: 50px;text-align: center;cursor: pointer;
}
.right{
    display: flex;
}
.right .active a{
    color:white;
}
.item{
    height: 50px;line-height: 50px;position: relative;
}
.item:hover{
    background-color: #e7e7e7;
}
.item .mark{
    height: 50px;width: 100%;position: absolute;bottom: 0px;z-index: 0;background-color: #3bb0ff;
}
.item a {
    display: inline-block;position: relative;z-index: 1;padding:0px 5px;
    font-size: 18px;text-overflow:ellipsis;overflow: hidden;white-space:nowrap;
}

</style>



