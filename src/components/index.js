import CustomSpin from './Spin'
import CustomNoData from './NoData'
import CustomSkeleton from './Skeleton'

const components = {
  install: function (Vue) {
    Vue.component('CustomSpin', CustomSpin)
    Vue.component('CustomNoData', CustomNoData)
    Vue.component('CustomSkeleton', CustomSkeleton)
  }
}

export default components
