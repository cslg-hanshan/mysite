<template>
    <div class="picbed">
        <Title>图床</Title>
        <div class="top">
            <div class="picframe" >
                <img src="@/assets/addpic.jpg" @click="changepic" ref="img">
                <div v-show="this.hasvalue == true" class="closeico" @click="closepic"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></div>
            </div>
            <button class="btn btn-block btn-primary" @click="upload" v-show="this.hasvalue">上传</button>
        </div>
        <div class="middle">
            <div class="title">图库列表</div>
            <div class="imagelist">
                <div class="imageitem" v-for="item in Imagelist" :key="item.url">
                    <div class="image"><img :src="item.url"></div>
                    <div class="url">
                        <div>原图地址</div>
                        <div><input type="text" :value="item.url" readonly></div>
                    </div>
                </div>
            </div>
        </div>
        <input type="file" accept="image/*" ref="pic" style="display:none;" @change="filechange">
    </div>
</template>
<script>
import Title from '@/components/common/title'
import axios from "axios"
import {
    uploadimagetoserver,
} from '../../api/api'
export default {
    name:"Picbed",
    data(){
        return{
            defaultpicurl:"/static/img/addpic.5f254c4.jpg",
            hasvalue:false,
        }
    },
    computed:{
        Imagelist(){
            return this.$store.state.image.imagelist;
        },
        
    },
    methods:{
        // 关闭图片
        closepic(){
            var file = this.$refs.pic;
            file.value = "";
            this.$refs.img.src = this.defaultpicurl;
            this.hasvalue = false;
        },
        // 点击图片驱动input file点击
        changepic(){
            this.$refs.pic.click();
        },
        // input file值改变时  把图片改为预览
        filechange(){
            var _this = this;
            var file = this.$refs.pic.files[0];
            var reads = new FileReader();
            reads.readAsDataURL(file);
            reads.onload = function(e) {
                _this.$refs.img.src = this.result;
                _this.hasvalue = true;
            };
        },
        // 上传图片
        upload(){
            var pic = this.$refs.pic.files[0];
            var formData = new FormData();
            formData.append("url",pic);
            uploadimagetoserver(formData).then(response => {
                console.log(response);
                this.getimagelist();
            });
            
        },
        getimagelist(){
            this.$store.dispatch("image/setImagelist").then(ret => {
                if(ret){console.log("加载图片列表")}
            });
        }
    },
    
    created(){
        this.getimagelist();
    },
    components:{
        Title
    }
}
</script>
<style scoped>
.top{
    width:400px;overflow: hidden;margin :0 auto;
}
.picframe{
    position: relative;height: 300px;text-align: center;
}
.picframe img{
    width:auto;height: 300px;
}
.closeico{
    position: absolute;top:0px;right:0px;font-size: 20px;cursor: pointer;transition: 1s;
}
.closeico:hover{
    color: #3bb0ff;
}
.imagelist{
    width:100%;display: flex;flex-wrap: wrap;justify-content: space-between;
}
.imageitem{
    width:200px;text-align: center;overflow: hidden;
}
.image{
    height: auto;overflow: hidden;
}
.image img{
    width:100%;
}
.imageitem img:hover{
    transition: .5s;transform: scale(1.2);
}
@media screen and (max-width: 800px) {
    .imageitem{
        width: calc(50% - 10px);
    }
}
</style>


