<template>
    <div class="spin-container">
        <div v-if="type==='Pencil'">
            <Pencil/>
        </div>
        <div v-else-if="type==='Stretch'">
            <Stretch/>
        </div>
        <div v-else>
            <Stretch/>
        </div>
    </div>


</template>

<script>
	import { Pencil, RotateSquare2, Stretch } from 'vue-loading-spinner'

	export default {
		props: [
			'type'
		],
		components: {
			Pencil,
			RotateSquare2,
			Stretch
		},

	}
</script>


<style scoped>
    .spin-container {
        /*min-height: 200px;*/
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        height: 100%;
        /*height: 300px;*/
        position: absolute;
    }
</style>

