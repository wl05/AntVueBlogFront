import Vue from 'vue'
import { createApp } from './main'
const { app, eventBus } = createApp()

if (window.__INITIAL_STATE__) {
  eventBus._data = window.__INITIAL_STATE__
}

app.$mount('#app')
