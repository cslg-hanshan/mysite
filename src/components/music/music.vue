<template>
    <div class="music">

        <Title>音乐中心</Title>
        <div class="buttonlist">
            <div><router-link to="/music">音乐搜索</router-link></div>
            <div>音乐列表</div>
        </div>
        <transition>
            <router-view></router-view>
        </transition>

    </div>
</template>
<script>
import Title from '@/components/common/title'
import Top10 from '@/components/music/musictop10'
export default {
    name:'Music',
    data(){
        return{

        }
    },
    components:{
        Title,
        Top10,
    },
    created(){
    },
    mounted(){
        document.getElementsByClassName("music")[0].style.minHeight = document.documentElement.clientHeight + "px";
    }
}
</script>
<style scoped>
.left,.right{
    background-color: white;
}

@keyframes show {
    0% {
        opacity: 0;
        transform: translateY(50px);
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
        opacity: 0;
        transform: translateY(50px);
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
.buttonlist{
    display: flex;
    justify-content: space-around;
    padding:5px 0px;
}

</style>
