<template>
    <div class="word">
        <table class="table table-striped table-hover table-responsive">
            <thead>
                <tr>
                    <th>序号</th>
                    <th>中文</th>
                    <th>英文</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in list" :key="item.id">
                    <td>{{index+1}}</td>
                    <td>{{item.china}}</td>
                    <td>{{item.english}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name:'Word',
    data(){
        return{
            list:[
                {
                    id:1,english:'one',china:'一'
                },
                {
                    id:2,english:'two',china:'二二二二二二'
                },
                {
                    id:3,english:'three',china:'三'
                },
                {
                    id:4,english:'four',china:'二二二二二'
                },
                {
                    id:5,english:'five',china:'二二二二二二二二二二二二二二二二二二二二二二二二二二'
                },
                {
                    id:6,english:'six',china:'二二二二二二二二二二二二二二二二'
                },
            ]
        }
    }
}
</script>
<style scoped>

</style>

