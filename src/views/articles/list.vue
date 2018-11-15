<template>
    <div class="articles-list-container">
        <item
            v-for="item in articles"
            :key="item._id"
            :article="item"
        />

    </div>
</template>

<script>
	import { fetchArticle, deleteArticle } from '@/api/article'
	import formatTimestamp from '@/utils/formatTimestamp'
	import item from './components/item'

	export default {
		data () {
			return {
				fetchArticleLoading: false,
				pageSize: 1,
				pageLimit: 10,
				count: 0,
				articles: []
			}
		},
		components: {
			item
		},
		computed: {},
		created () {
			this.fetchArticle(this.pageSize, this.pageLimit)
		},
		methods: {
			formatTimestamp (timestamp) {
				return formatTimestamp(timestamp)
			},
			// handleSizeChange (val) {
			// 	this.pageLimit = val
			// 	this.fetchArticle(this.pageSize, val)
			// 	console.log(`每页 ${val} 条`)
			// },
			// handleCurrentChange (val) {
			// 	this.pageSize = val
			// 	this.fetchArticle(val, this.pageLimit)
			//
			// 	console.log(`当前页: ${val}`)
			// },

			async fetchArticle (pageSize, pageLimit) {
				this.fetchArticleLoading = true
				try {
					// await this.FetchArticle({pageSize, pageLimit})
					const result = await fetchArticle({pageSize, pageLimit})
					this.fetchArticleLoading = false
					if (result.data.code) {
						this.$message.error('获取列表失败')
					} else {
						this.articles = result.data.data.article
					}
				} catch (e) {
					this.fetchArticleLoading = false
					this.$message.error('出错了')
				}
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .articles-list-container {
        border-radius: 10px;
        margin-top: 30px;
        background: rgba(0, 0, 0, 0.9) none repeat scroll !important;
        min-height: 800px;
        margin-bottom: 60px;
        padding: 15px;
        max-width: 800px;
        margin: 30px auto;
    }
</style>
