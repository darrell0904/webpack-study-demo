import Vue from 'vue'
import App from './App.vue'
import VConsole from 'vconsole';

Vue.config.productionTip = false

console.log(process.env);

// 如果是非正式环境，加载 VConsole
if (process.env.NODE_ENV !== 'production') {
  var vConsole = new VConsole();
}

Vue.use(vConsole)

console.log(process.env);

new Vue({
  render: h => h(App),
}).$mount('#app')
