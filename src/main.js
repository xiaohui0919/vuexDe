
import Vue from 'vue'
import App from './app.vue'

// 引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

let options={
    state:{
        // 共享的一些状态值
        users:[{name:'小明',age:18},{name:'小红',age:17}]
    },
    mutations:{
        add(state,data){
            state.users.push(data)
        }
    },
    actions:{
        // content是第一个参数 content可以用.commit  .state来代替
        addUser({commit},ueser){
            commit('add',ueser)
        }
    },
    getters:{
        users(state){
            return state.users
        }
    }
}

let store=new Vuex.Store({
    modules:{
        options
    }
})

new Vue({
    el:'#app',
    store,
    render:create=>create(App)
})
