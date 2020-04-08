<template>
    <div class="addarticle">
        <div class="top">
            <Title>编辑文章</Title>
            
            <form class="form-inline">
                <div class="form-group tag">
                    <label>文章类型</label>
                    <select v-model="typeid" class="selectpicker show-tick form-control" @change="typechange">
                        <option
                            v-for="item in Articletypelist"
                            :key="item.id"
                            :value="item.id"
                        >
                            {{item.name}}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="searchinput">搜索文章</label>
                    <input type="text" class="form-control" id="searchinput" placeholder="search" v-model="keywords" @input="currentindex = 0">
                </div>
                <div class="form-group">
                    <label for="addtag">新建文章类型</label>
                    <input type="text" class="form-control" id="addtag" v-model="typename" placeholder="标签名">
                    <button type="button" class="btn btn-primary" @click="addarticletype">新建</button>
                </div>
            </form>
        </div>
        <div class="middle">
            <div class="articlelist" style="width:30%;">
                <div title="+添加新的文章" class="addarticleico" @click="newarticle">
                    +添加新的文章
                </div>
                <div
                    
                    v-for="(item,index) in Articlelist"
                    :key="item.id"
                    :class="{articletitle:true,active:currentindex == index}"
                    @click="changearticle(index)"
                >
                    <div :title="item.title" @click="changearticle(index)">{{item.title}}</div>
                    <div
                        title="删除"
                        @click="deletearticle(item)"
                    >
                        <span class="glyphicon glyphicon-trash" style="text-align:right;" aria-hidden="true"></span>
                    </div>
                </div>
                <div v-show="Articlelist.length" @click="loadmore" style="color:#3bb0ff;cursor:pointer;">加载更多</div>
            </div>
            <div v-show="Articlelist.length > 0" class="articlepage">
                <div class="form-group title">
                    <label for="titleinput">标题</label>
                    <input v-model="Currentarticle.title" type="text" class="form-control" id="titleinput" placeholder="文章标题">
                </div>
                <!-- rich text -->
                <quill-editor
                    class="quilleditor"
                    :options="toolbaroptions"
                    ref="newEditor"
                    v-model="Currentarticle.content"
                ></quill-editor>
                <input
                    type="file"
                    id="imginput"
                    name="file"
                    style="display:none;"
                    multiple
                    accept="image/jpg,image/jpeg,image/png,image/gif"
                    @change="uploadImg"
                    ref="contentupload"
                > 
                <div class="footer">
                    <button @click="savearticle" class="btn btn-block btn-primary">保存</button>
                </div>
            </div>
            <div v-show="Articlelist.length == 0" class="articlepage">
                Mysite
            </div>
            
        </div>

    </div>
</template>
<script>
import Title from '@/components/common/title'
import {
    getArticleTypeList,
    getArticleListOfSameType,
    CreateArticle,
    SaveArticle,
    UpdateArticle,
    DeleteArticle,
    CreateArticleType,
    uploadimagetoserver,
} from '../../api/api'
export default {
    name:'Addarticle',
    data(){
        return{
            articletypelist:[],  //文章列表
            typeid:1,            //下拉框绑定值
            articlelist:[],      //文章列表
            keywords:"",
            currentindex:0,
            typename:"",         //新建类型变量
            page:2,
            toolbaroptions:{
                modules:{
                    toolbar:[
                        [{'header':[1,2,3,4,5,6,false]}],
                        [{'list':'ordered'},{'list':'bullet'}],
                        [{'color':[]},{'background':[]}],
                        [{'align':[]}],
                        ['bold','italic','underline','strike',],
                        ['blockquote','code-block'],
                        ['image','clean']
                    ]
                }
            }
        }
    },
    computed:{
        Articlelist(){
            return this.articlelist.filter((item) => {
                if(item.isdelete == false){
                    if(item.title.includes(this.keywords) || item.content.includes(this.keywords))
                        return item;
                }
            });
        },
        Articletypelist:{
            get(){return this.articletypelist},
            set(val){this.articletypelist = val}
        },
        Currentarticle:{
            get(){
                if(this.Articlelist.length == 0){
                    return {title:"",content:""};
                }
                return this.Articlelist[this.currentindex];
            },
            set(val){
                this.Articlelist[this.currentindex] = val;
            }
        }
    },
    methods:{
        //初始化
        init(){
            // 加载文章类型列表
            this.$store.dispatch("article/setArticletypelist").then(ret => {
                this.Articletypelist = this.$store.state.article.articletypelist;
                // 设置默认显示文章
                getArticleListOfSameType(this.Articletypelist[0].id,1).then(response => {
                    console.log(response);
                    this.articlelist = response.data.results;
                    this.currentindex = 0;
                });
            });
        },
        // 加载更多
        loadmore(){
            getArticleListOfSameType(this.Articletypelist[0].id,this.page).then(response => {
                var ret = response.data.results;
                for(var i=0;i<ret.length;i++){
                    this.articlelist.push(ret[i]);
                }
                this.page += 1;
            });
        },
        // 富文本插入图片
        async uploadImg(){
            console.log("uploadimg");
            var _this = this;
            var file = this.$refs.contentupload.files[0];
            var formData = new FormData();
            formData.append('url',file);
            await uploadimagetoserver(formData).then(response => {
                var url = response.data.url;
                if (url != null && url.length > 0) {
                    _this.addImgRange = _this.$refs.newEditor.quill.getSelection();
                    _this.$refs.newEditor.quill.insertEmbed(_this.addImgRange.index, 'image', url);
                    this.$message({message:"图片增加成功",type:"success"});
                } else {
                    this.$message({message:"图片增加失败",type:"warning"});
                }
                document.getElementById('imginput').value='';
            });
            
        },
        // 添加文章
        newarticle(){
            this.keywords = "";
            var time = this.formatDate();
            var formdata = new FormData();
            formdata.append("title",time);
            formdata.append("content",time);
            formdata.append("type",this.typeid);
            CreateArticle(formdata).then(response => {
                this.articlelist.unshift(response.data);   //在数据开头插入数据
            });
        },
        // 保存文章
        savearticle(){
            if(this.Currentarticle.title =="" || this.Currentarticle.content == ""){
                alert("数据不能为空哦！");
            }else{
                var articleid = this.Articlelist[this.currentindex].id;
                var formdata = new FormData();
                formdata.append("title",this.Articlelist[this.currentindex].title);
                formdata.append("content",this.Articlelist[this.currentindex].content);
                formdata.append("type",this.Articlelist[this.currentindex].type.id);
                UpdateArticle(articleid,formdata).then(response => {
                    
                    getArticleListOfSameType(this.typeid,1).then(response => {
                        this.articlelist = response.data.results;
                        this.currentindex = 0;
                        this.page = 2;
                    });
                    this.$message({message:"保存成功",type:"success"})
                });
            }
        },
        // 文章类型改变
        typechange(){
            
            getArticleListOfSameType(this.typeid,1).then(response => {
                console.log(response);
                this.articlelist = response.data.results;
                this.currentindex = 0;
                this.page = 2;
            });
        },
        // 添加文章类型
        addarticletype(){
            var formdata = new FormData();
            formdata.append("isdelete",false);
            formdata.append("name",this.typename);
            CreateArticleType(formdata).then(response => {
                console.log(response);
                this.$store.dispatch("article/setArticletypelist").then(ret => {
                    this.Articletypelist = this.$store.state.article.articletypelist;
                    this.$message({message:"添加成功",type:"success"})
                });
            })
        },
        changearticle(index){
            this.currentindex = index;
        },
        deletearticle(item){

            var articleid = item.id;
            var formdata = new URLSearchParams();
            formdata.append("isdelete",true);
            formdata.append("type",item.type.id);
            DeleteArticle(articleid,formdata).then(response => {
                console.log(response);
                this.init();
            }).catch(error => {
                console.log(error);
            })

        },
        // 日期字符串
        formatDate(){
            var time = new Date();
            var year = time.getFullYear();
            var month = time.getMonth()+1;
            var day = time.getDate();
            var hour = time.getHours();
            var minute = time.getMinutes();
            var second = time.getSeconds();
            return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
        },
    },
    components:{
        Title,
    },
    created(){
        this.init();
        
    },
        
    mounted(){
        var imgHandler = function(state){
            if(state){
                var imginput = document.getElementById("imginput");
                imginput.click();
            }
        }
        this.$refs.newEditor.quill.getModule("toolbar").addHandler("image", imgHandler);

    },
    updated(){
        if(this.Articlelist.length){
            document.getElementsByClassName("ql-editor")[0].style.maxHeight = 500+"px";
            document.getElementsByClassName("ql-editor")[0].style.overflow = "auto";
        }
    }
}
</script>

<style scoped>
.addarticleico{
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
}
.middle{
    display:flex;
}
.articlelist{
    max-height: 700px;
    overflow: auto;
}

.articlelist::-webkit-scrollbar{
    width:5px;
    background: #3bb0ff;
}
.articlelist::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background:#3bb0ff;
}
.articlelist::-webkit-scrollbar-track {
    background-color: white;
}

.articletitle{
    display: flex;
    padding-left:20px;
    border-bottom: 1px solid gray;
    user-select: none;
    color:gray;
}

.articletitle > div:nth-child(1){
    flex:11;
    padding:20px 0px;
    font-size: 16px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
}
.articletitle > div:nth-child(2){
    flex:1;
    text-align: center;
    padding:20px 0px;
    cursor: pointer;
}
.articlepage{
    width: 70%;
    padding-left: 10px;
    overflow: auto;
}

.footer{
    margin-top: 30px;
}
.editor{
    z-index: 0;
}
.active{
    color: white;
    background-color: #3bb0ff;
    border-left: 3px solid #ec7259;
}
</style>
