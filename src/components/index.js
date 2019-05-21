import CustomSpin from './Spin'
import CustomNoData from './NoData'

const components = {
  install: function (Vue) {
    Vue.component('CustomSpin', CustomSpin),
      Vue.component('CustomNoData', CustomNoData)
  }
}

export default components
