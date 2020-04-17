// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { Button, Input, Pagination, Dropdown, DropdownMenu, DropdownItem, Form, FormItem, Radio, RadioGroup, Dialog, Message } from 'element-ui'
import 'font-awesome/scss/font-awesome.scss'
import './index.css'
import '../theme/index.css'
import customCompoents from '@/components/index'
Vue.prototype.$ELEMENT = { size: 'medium' }
Vue.use(Button)
Vue.use(Input)
Vue.use(Pagination)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Dialog)
Vue.use(customCompoents)
Vue.config.productionTip = false
Vue.prototype.$message = Message;
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
