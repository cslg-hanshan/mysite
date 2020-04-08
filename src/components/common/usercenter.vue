<template>
    <div class="usercenter">
        <Title>用户中心</Title>
        <div v-if="this.success == true" class="frame">
            <div class="top">
                <div class="picframe">
                    <img src="@/assets/background.jpg" class="picbackground">
                    <div class="portrait">
                        <img v-if="this.pic==null" @click="pickimg" src="@/assets/defaulthead.jpg" ref="img">
                        <img v-else :src="this.pic" @click="pickimg" ref="img">
                        <input type="file" ref="picfile" @change="filechange" style="display:none;">
                    </div>
                </div>
            </div>
            <div class="middle">
                <div>用户信息</div>
                <div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">用户名</label>
                        <el-input placeholder="请输入内容" :disabled="true" v-model="username"></el-input>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">性别</label>
                        <el-radio v-model="gender" label="male" border>男</el-radio>
                        <el-radio v-model="gender" label="female" border>女</el-radio>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">出生日期</label>
                        <el-date-picker
                            v-model="birthday"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <el-button @click="updateinfo">提交</el-button>
                </div>
            </div>
            <!-- <div class="bottom">
                bottom
            </div> -->
        </div>
        <div v-else>
            用户信息加载失败
        </div>
    </div>
</template>
<script>
import Title from '@/components/common/title'
export default {
    name:'Usercenter',
    data(){
        return{
            success:false,
            pic:"",
            username:"",
            gender:'male',
            birthday:"2017-5-12",
            picfile:"",
        }
    },
    methods:{
        updateinfo(){
            var file = this.$refs.picfile;
            var formdata = new FormData();
            formdata.append("gender",this.gender);
            var date = new Date(this.birthday);
            console.log(date.getDate());
            var datestr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
            formdata.append("birthday",datestr);
            if(file.value != "") {
                formdata.append("pic",file.files[0]);
                console.log(file.files[0]);
            }
            this.$store.dispatch("user/updateuserinfo",formdata).then(ret => {
                if(ret){
                    this.$message({message:"信息已更新",type:"success"});
                }
            });
            file.value = "";
        },
        pickimg(){
            this.$refs.picfile.click();
        },
        filechange(){
            var _this = this;
            var file = this.$refs.picfile.files[0];
            var reads = new FileReader();
            reads.readAsDataURL(file);
            reads.onload = function(e) {
                _this.$refs.img.src = this.result;
            };
        }
    },
    created(){
        this.$store.dispatch("user/getuserinfo").then(ret => {
            if(ret == true){
                this.username = this.$store.state.user.userInfo.name;
                this.pic = this.$store.state.user.userInfo.pic;
                this.gender = this.$store.state.user.userInfo.gender;
                this.birthday = this.$store.state.user.userInfo.birthday;
                this.success = true;
                console.log(this.username,this.pic,this.gender);
            }
        });
    },
    components:{
        Title,
    }
}
</script>
<style scoped>
.usercenter{
    margin-bottom: 102px;
}
.top{
    height: 200px;
}
.picframe{
    position: relative;height:auto;
}
.picframe img{
    position: absolute;width:100%;z-index: 0;height: 200px;
}
.portrait{
    width:100px;height: 100px;border-radius: 50px;background-color: white;position: relative;z-index: 2;left:calc(50% - 50px);top:50px;overflow: hidden;border:2px solid #3bb0ff;
}
.portrait img{
    width:100px;height: 100px;border:0px;
}
</style>