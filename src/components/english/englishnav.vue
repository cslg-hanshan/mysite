<template>
    <div class="englishnav">
        <ul class="list-inline">
            <li><router-link to="/english/word">单词</router-link></li>
            <li><router-link to="/english/phrase">短语</router-link></li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'Englishnav'
}
</script>
<style scoped>
.englishnav{
    text-align: center;
    font-size: 20px;
}

</style>
