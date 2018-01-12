<template>
    <div>
        <input type="text" v-model="user.name">
        <input type="text" v-model="user.age">
        <button @click="addusersClicked">添加数据</button>
        <button @click="showData">展示数据</button>

        <ul>
            <li v-for="(item,index) in getUsers">
                {{item.name}}
            </li>
        </ul>
    </div>
</template>

<style>

</style>

<script>
    export default{
        data(){
            return {
                user:{}
            }
        },
        created(){
            // 这样的获取state里面值得形式，不推荐使用（因为这样不优雅）
            // console.log(this.$store.state.options.users);
            // 不推荐使用
            // this.$store.commit('add',{
            //     name:'小张',
            //     age:20
            // })

        },
        methods:{
            addusersClicked(){
                // 分发
                this.$store.dispatch('addUser',this.user)
            },
            showData(){
                console.log(this.$store.state.options.users);
            }
        },
        computed:{
            getUsers(){
                return this.$store.getters.users;
            }
        }
    }
</script>