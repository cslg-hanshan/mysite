<template>
    <div class="english">
        <div class="col-sm-8 col-md-8">
            <Title>英语学习中心</Title>
            <transition>
                <router-view></router-view>
            </transition>
        </div>
        <div class="col-sm-4 col-md-4 hidden-xs">
            englishleft
        </div>
    </div>
</template>
<script>
import Title from '@/components/common/title'
import Enav from '@/components/english/englishnav'
export default {
    name:'English',
    data(){
        return{

        }
    },
    components:{
        Enav,
        Title,
    },
    mounted(){
        document.getElementsByClassName("english")[0].style.minHeight = document.documentElement.clientHeight - 100 + "px";
    }
    
}
</script>
<style scoped>
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
    transform: translateY(-100px);
}
</style>
