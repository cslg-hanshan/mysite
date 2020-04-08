<template>
    <div class="footer" v-html="msg">
    </div>
</template>
<script>
export default {
    name:'Footer',
    data(){
        return{
            msg:'CopyRight&copy;HanShan'
        }
    }
}
</script>
<style scoped>
.footer{
    width: 100%;
    margin-top: 30px;
    padding:20px;
    border-radius: 5px 5px 0px 0px;
    font-size: 20px;
    text-align: center;
    color: #3bb0ff;
}
</style>
