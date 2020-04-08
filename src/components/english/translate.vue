<template>
    <div class="translate">
        <div class="top">
            <div class="inputframe">
                <input
                    v-model="getSearchinfo"
                    class="inputtag"
                    type="text"
                    placeholder="英语翻译"
                    v-on:keyup.enter="submit"
                    ref="input"
                >
            </div>
            <div class="inputbutton" @click="submit">
                搜索
            </div>
        </div>
        <div v-show="getSearchflag" style="text-align:center;color:gray;">{{getSearchmsg}}</div>
        <Englishcontent></Englishcontent>
    </div>
</template>
<script>
import Englishcontent from '@/components/english/englishcontent'
export default {
    name:'Translate',
    data(){
        return{
        }
    },
    watch: {
        getSearchinfo(newVal, oldVal) {
            if(newVal==""){
                this.topoffset(200);
                this.getTranslate=[];
            }else{
                this.topoffset(0);
            }
        }
    },
    methods:{
        submit(){
            if(this.getSearchinfo){
                this.$store.dispatch('english/translate');
            }else{
                alert("请输入内容");
            }
        },
        topoffset(num){
            var searchframe = document.getElementsByClassName("top")[0];
            searchframe.style.marginTop=num+"px";
        }
    },
    computed:{
        getTranslate:{
            get(){return this.$store.state.english.translate;},
            set(val){this.$store.state.english.translate = val;}
        },
        getSearchinfo:{
            get(){return this.$store.state.english.searchinfo;},
            set(val){this.$store.state.english.searchinfo = val;}
        },
        getSearchflag(){
            return this.$store.state.english.searchflag;
        },
        getSearchmsg(){
            return this.$store.state.english.searchmsg;
        }
    },
    mounted(){
        if(this.$refs.input.value){
            this.topoffset(0);
        }
    },
    components:{
        Englishcontent,
    }
}
</script>
<style scoped>
.top{
    margin-top:200px;
    display: flex;
    transition: 1s;
}
.inputframe{
    flex:9;
}
.inputtag{
    width:100%;
    padding: 14px;
    font-size: 16px;
    color: gray;
    text-align: center;
    border:1px solid #3bb0ff;
}
.inputbutton{
    flex:1;
    padding: 14px;
    background-color: #3bb0ff;
    color:white;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    white-space:nowrap;
}

</style>


