<template>
    <div class="article">
        <Title>我的首页</Title>
        <Articleitem></Articleitem>
    </div>
</template>
<script>
import Articleitem from '@/components/article/articleitem'
import Title from '@/components/common/title'
export default {
    name:'Article',
    data(){
        return{

        }
    },
    components:{
        Articleitem,
        Title,
    },
    mounted(){
        document.getElementsByClassName("article")[0].style.height = document.documentElement.clientHeight - 100 + "px";
    }
}
</script>
<style scoped>

</style>
