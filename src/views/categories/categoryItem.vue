<template>
    <div>
        <Spin v-if="getArticlesByCategoryLoading"/>

        <div v-else class="category-item-list-container">
            <div class="no-data" v-if="noData">
                暂无数据
            </div>
            <ul v-else>
                <li class="item-container">
                    <span class="key">{{$route.query.name}} 分类</span>
                    <ul class="article-container">
                        <li
                            class="article-item"
                            v-for="(item, key) in articles"
                            @click="$router.push({name:'Detail',params:{id:item._id}})"
                        >
                            <span class="date">{{formatYearAndDate(Number(item.publishAt)/1000)}}</span>
                            <span class="title">{{item.title}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
	import { getArticlesByCategory } from '@/api/article'
	import Spin from '@/components/Spin'

	export default {
		data () {
			return {
				getArticlesByCategoryLoading: false,
				articles: [],
				noData: false
			}
		},
		components: {
			// item,
			Spin
		},
		computed: {},
		created () {
			this.getArticlesByCategory()
		},
		methods: {
			formatYearAndDate (timestamp) {
				const add0 = (m) => {
					return m < 10 ? '0' + m : m
				}
				const format = (timestamps) => {

					var time = new Date(parseInt(timestamps) * 1000)
					var y = time.getFullYear()
					var m = time.getMonth() + 1
					var d = time.getDate()
					return `${y}-${add0(m)}-${add0(d)}`
				}
				return format(timestamp)
			},
			async getArticlesByCategory () {
				this.getArticlesByCategoryLoading = true
				try {
					console.log(this.$route.params.id)
					const result = await getArticlesByCategory(this.$route.params.id)
					this.getArticlesByCategoryLoading = false
					if (result.data.code) {
						this.$message.error('获取列表失败')
					} else {
						this.articles = result.data.data
						this.noData = this.articles.length > 0 ? false : true
					}
				} catch (e) {
					this.getArticlesByCategoryLoading = false
					this.$message.error('出错了')
				}
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .category-item-list-container {
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.9) none repeat scroll !important;
        /*min-height: 800px;*/
        margin-bottom: 60px;
        padding: 40px;
        max-width: 800px;
        margin: 30px auto;
        color: rgba(255, 255, 255, 0.6);
        .no-data {
            text-align: center;
            font-size: 16px;
        }
        .item-container {
            padding: 20px;
            .key {
                font-size: 20px;
            }
            .article-container {
                margin-top: 20px;
                padding: 15px;

                .article-item {
                    padding: 15px 0;
                    margin-bottom: 60px;
                    border-bottom: 1px dashed rgba(255, 255, 255, 0.6);
                    cursor: pointer;
                    .date {
                        margin-right: 30px;
                    }
                }
                .article-item:hover {
                    color: rgba(255, 255, 255, 0.9);
                    border-bottom: 1px dashed rgba(255, 255, 255, 0.9);

                }
            }
        }

    }

    @media screen and (max-width: 768px) {
        .category-item-list-container {
            padding: 40px 10px;
            border-radius: 0px;

        }
    }
</style>
