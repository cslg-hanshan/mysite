<template>
  <div class="app">
    <vnav></vnav>
    <div class="container">
      <transition appear>
        <router-view></router-view>
      </transition>
    </div>
    <vtotop></vtotop>
    <!-- <player class="player"></player> -->
    <Vplayer></Vplayer>
  </div>
</template>

<script>
import vnav from '@/components/common/navigation'
import vtotop from '@/components/common/totop'
import player from '@/components/music/player'
import Vplayer from '@/components/music/vplayer'
export default {
  name: 'App',
  components:{
    vnav,
    vtotop,
    player,
    Vplayer,
  },
}

</script>

<style scoped>
.app{
  background-color: #f9f9f9;
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
    animation: show .5s;
}
.v-leave-active {
    animation: hide .5s;
}
.v-enter, .v-leave-to {
    opacity: 0;
}

.player{
  position: fixed;
  top:100px;
  left:0px;
}
.container{
  padding-bottom: 100px;
}


</style>
