<template>
    <a class="tags-item-container">
        {{item.name}}
    </a>
</template>

<script>

	export default {
		props: [
			'item',
			'style'
		],
		data () {
			return {}
		},
		created () {
		},

		methods: {}
	}
</script>
<style lang="scss" scoped rel="stylesheet/scss">
    .tags-item-container {
        border-bottom: 2px solid #ddd;
        cursor: pointer;
    }

    .tags-item-container:hover {
        border-bottom: 2px solid rgba(255, 255, 255, 0.5);
    }
</style>
