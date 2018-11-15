<template>
    <div class="archives-list-container">
        <ul>
            <li
                v-for="(value, key) in formatedArticles"
                class="item-container"
            >
                <span>{{key}}</span>
                <ul class="article-container">
                    <li
                        class="article-item"
                        v-for="(item,index) in value"
                    >
                        <span>{{item.date}}</span>
                        <span>{{item.title}}</span>
                    </li>
                </ul>

            </li>
        </ul>

    </div>
</template>

<script>
	import { fetchArticle, deleteArticle } from '@/api/article'
	import formatYearAndDate from '@/utils/formatYearAndDate'

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
		computed: {
			formatedArticles () {
				let articles = [ ...this.articles ]
				return this.formatArticles(articles)
			}
		},
		created () {
			this.fetchArticle(this.pageSize, this.pageLimit)
		},
		methods: {

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
			formatArticles (articles) {
				for (let article of articles) {
					article.year = formatYearAndDate(Number(article.publishAt) / 1000)[ 0 ]
					article.date = formatYearAndDate(Number(article.publishAt) / 1000)[ 1 ]
				}
				let data = {}
				try {
					for (let i = 0; i < articles.length; i++) {
						if (data[ articles[ i ].year ]) {
							data[ articles[ i ].year ].push({
								_id: articles[ i ]._id,
								date: articles[ i ].date,
								title: articles[ i ].title
							})
						}
						else {
							data[ articles[ i ].year ] = [ {
								_id: articles[ i ]._id,
								date: articles[ i ].date,
								title: articles[ i ].title
							} ]
						}
					}
				} catch (e) {
					console.log(e)
				}
				return data

			},
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
    .archives-list-container {
        border-radius: 10px;
        margin-top: 30px;
        background: rgba(0, 0, 0, 0.9) none repeat scroll !important;
        min-height: 800px;
        margin-bottom: 60px;
        padding: 15px;
        max-width: 800px;
        margin: 30px auto;
        color: #fff;
        .item-container {
            padding: 20px;
            .article-container {
                margin-top: 100px;
                padding: 15px;
                .article-item {
                    padding: 15px 0;
                    margin-bottom: 60px;
                    border-bottom: 1px dashed rgba(255, 255, 255, 0.7);
                }
            }
        }

    }
</style>
