<template>
    <div class="hello">
        <!--<h1>{{ msg }}</h1>-->
        <h2>{{data}}</h2>
        <!--<h2>{{count}}</h2>-->
        <!--<el-button>hello dada</el-button>-->
    </div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex'
	//    import { Button } from 'element-ui'
	export default {
		name: 'HelloWorld',
		data () {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		computed: {
			...mapState({
				data: state => {
					return state.helloWorld.data
				}
			}),
			...mapGetters({
				count: 'count'
			})
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }
</style>
