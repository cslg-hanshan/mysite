<template>
    <div class="introduce">
        <div>
            <strong>警句：</strong>
            <span>{{msg}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name:'Introduce',
    data(){
        return{
            msg:"学习如逆水行舟，不进则退。"
        }
    }
}
</script>
<style scoped>
.introduce{
    width: 100%;
    padding:20px;
    border-radius: 5px;
    background-color:#ffffff21;
}
</style>
