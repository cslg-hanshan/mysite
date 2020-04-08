<template>
    <div id="englishcontent">
        <div v-if="getTranslate">
            <div class="fanyi">
                {{getTranslate.fanyi}}
            </div>
            <div v-if="getTranslate.explain">
                <!-- 翻译中文时显示汉语和拼音 -->
                <div class="index" v-if="Array.isArray(getTranslate.explain.phonetic)">
                    {{getTranslate.explain.word}}{{getTranslate.explain.phonetic[0]}}
                </div>
                <div class="index" v-else>
                    {{getTranslate.explain.word}}-美{{getTranslate.explain.phonetic["美"]}}-英{{getTranslate.explain.phonetic["英"]}}
                </div>
                <!-- 翻译英文时显示英文意思 -->
                <div class="means" v-if="getTranslate.explain.english_explain.length">
                    <div class="title">英文解释</div>
                    <div
                        class="means_content text_overflow"
                        v-for="item in getTranslate.explain.english_explain[0].means"
                        :key="item.word_mean"
                        :title="item.word_mean"
                    >
                        {{item.word_mean}}
                    </div>
                </div>
                <!-- 显示例句 -->
                <div class="sentence" v-if="getTranslate.explain.exsentence.length">
                    <div class="title">例句</div>
                    <div class="sentence_content" v-for="item in getTranslate.explain.exsentence" :key="item.example">
                        <div class="text_overflow" v-html="item.Body" :title="item.Body"></div>
                        <div class="text_overflow" v-html="item.Title" :title="item.Title"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"Englishcontent",
    data(){
        return{

        }
    },
    computed:{
        getTranslate:{
            get(){
                return this.$store.state.english.translate;
            },
            set(val){
                this.$store.state.english.translate = val;
            }
            
        },
    },
}
</script>
<style scoped>
#englishcontent{
    padding-top:20px;
}
.fanyi{
    font-size: 25px;
    color:#3bb0ff;
    font-weight: bold;
    text-align: center;
}
.index{
    color:#3bb0ff;
    text-align: center;
}
.means{
    margin-top:10px;
    font-size: 16px;
}
.means_content{
    margin:10px 0px;
}
.title{
    font-size: 18px;
    font-weight: bold;
    color: gray;
    border-left:5px solid black;
    padding-left:5px;
}
.sentence{
    margin-top:10px;
    font-size: 16px;
}
.sentence_content{
    margin:10px 0px;
}

.text_overflow{
    text-overflow:ellipsis;
    overflow: hidden;
    white-space:nowrap;
}
</style>


