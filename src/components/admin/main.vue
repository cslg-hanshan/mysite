<template>
    <div id="main">
        <div class="top">
            <Title>管理中心</Title>
        </div>
        <div class="row middle">
            <div class="nav col-sm-4">
                <!-- <Nav></Nav> -->
                <ul class="list-group">
                    <li class="list-group-item">
                        <router-link to="/admin">Article</router-link>
                    </li>
                    <li class="list-group-item">
                        <router-link to="/admincomment">Comment</router-link>
                    </li>
                    <li class="list-group-item">
                        <router-link to="/adminenglish">English</router-link>
                    </li>
                </ul>
            </div> 
            <div class="content col-sm-8">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import Title from '@/components/common/title'
import Nav from '@/components/admin/adminnav'
export default {
    name:"Main",
    data(){
        return{

        }
    },
    components:{
        Nav,
        Title,
    }
}
</script>
<style scoped>
.middle{
    display: flex;
    margin:0px 10px;
}

</style>
