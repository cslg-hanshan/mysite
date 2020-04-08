<template>
    <div class="title">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:'Title',

}
</script>
<style scoped>
.title{
    margin-top:10px;
    border-left: 5px solid gray;
    padding: 15px;
    margin-bottom: 20px;
    font-size: 18px;
    letter-spacing:8px;
    user-select: none;
    font-weight: bold;
}
</style>
