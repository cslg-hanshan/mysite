<template>
    <div id="adminnav">
        <div class="panel-group" role="tablist">
            <div class="panel panel-default">
            <div
                class="panel-heading"
                role="tab"
                id="collapseListGroupHeading1"
            >
                <h4 class="panel-title">
                <a 
                    class=""
                    role="button"
                    data-toggle="collapse"
                    href="#collapseListGroup1"
                    aria-expanded="true"
                    aria-controls="collapseListGroup1"
                >
                    管理条目
                </a>
                </h4>
            </div>
            <div
                id="collapseListGroup1"
                class="panel-collapse collapse in"
                role="tabpanel"
                aria-labelledby="collapseListGroupHeading1"
                aria-expanded="true"
                style=""
            >
                <ul class="list-group">
                    <li class="list-group-item">
                        <router-link to="/admin">Article</router-link>
                    </li>
                    <li class="list-group-item">
                        <router-link to="/admin/comment">Comment</router-link>
                    </li>
                    <li class="list-group-item">
                        <router-link to="/admin/english">English</router-link>
                    </li>
                </ul>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"Adminnav",
    data(){
        return{

        }
    },

}
</script>

