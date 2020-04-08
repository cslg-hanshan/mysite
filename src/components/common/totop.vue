<template>
    <div class="totop" id="scrollup" draggable="true" @click="go">
        <span class="glyphicon glyphicon-chevron-up" ref="top"></span>
    </div>
</template>
<script>
export default {
    name:'Totop',
    data(){
        return{

        }
    },
    methods:{
        go(){
            
            var timer = setInterval(function() {
                window.scrollBy(0, -10);
                if (document.documentElement.scrollTop <= 0) 
                clearInterval(timer);
            }, 2);
            // document.documentElement.scrollTop=0;
        }
    },
    computed:{
        
    }
}
window.onscroll= function(){
    //变量t是滚动条滚动时，距离顶部的距离
    var t = document.documentElement.scrollTop||document.body.scrollTop;
    var scrollup = document.getElementById('scrollup');
    //当滚动到距离顶部200px时，返回顶部的锚点显示
    if(t>=50){
        scrollup.style.display="block";

    }else{          //恢复正常
        scrollup.style.display="none";
    }
}
</script>
<style scoped>
.totop{
    display:none;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border:1px solid #3bb0ff;
    border-radius: 5px;
    color:#3bb0ff;
    font-size: 20px;
    text-align: center;
    position: fixed;
    right:20px;
    bottom: 100px;
    cursor: pointer;
}
</style>

