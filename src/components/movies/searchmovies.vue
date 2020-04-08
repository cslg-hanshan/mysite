<template>
    <div id="searchmovies">
        <!-- <Moviesadv></Moviesadv> -->
        <div class="searchframe">
            <div class="sinput">
                <input
                    type='text'
                    class="search"
                    v-model="Searchinfo"
                    ref="input"
                    placeholder="输入想看的视频"
                    v-on:keyup.enter="submit"
                >
            </div>
            <div class="sbutton" @click="submit">搜索</div>
        </div>
        <div v-show="getIsload" class="loadmsg">{{Loadmsg}}</div>
        <Moviesitem></Moviesitem>
    </div>
</template>
<script>
import Moviesadv from '@/components/movies/moviesadv'
import Moviesitem from '@/components/movies/moviesitem'
export default {
    name:"Searchmovies",
    data(){
        return{
            searching:false,
        }
    },
    computed:{
        Searchinfo:{
            get(){return this.$store.state.movies.searchinfo;},
            set(val){this.$store.state.movies.searchinfo = val;}
        },
        Movieslist:{
            get(){return this.$store.state.movies.searchlist;},
            set(val){this.$store.state.movies.searchlist = val;}
        },
        getIsload(){
            return this.$store.state.movies.isload;
        },
        Loadmsg:{
            get(){return this.$store.state.movies.loadmsg;},
            set(val){this.$store.state.movies.loadmsg = val;}
        }

    },
    methods:{
        submit(){
            // 搜索内容不能为空
            if(this.Searchinfo && this.searching == false){
                this.searching = true;
                this.$store.dispatch('movies/setSearchmovieslist');
            }
        },
    },
    components:{
        Moviesitem,
        Moviesadv
    }
}
</script>
<style scoped>
.searchframe{
    display:flex;
}
.sinput{
    flex:9;
}
.sbutton{
    flex:1;
    background-color: #3bb0ff;
    padding: 14px;
    color: white;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    overflow: hidden;
    white-space:nowrap;
}
.searchmusic{
    margin-bottom: 20px;
}
.search {
    width:100%;
    margin:0 auto;
    padding: 14px;
    font-size: 16px;
    color:gray;
    text-align: center;
}
.searchhistory{
    width:100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: left;
    margin-bottom: 20px;
}
.searchitem{
    color:gray;
    border:1px solid gray;
    border-radius: 17px;
    padding:6px 15px;
    margin:5px;
    cursor: pointer;
}
.searchitem:hover{
    color: #3bb0ff;
}
.loadmsg{
    text-align: center;
    color:gray;
}
</style>

