<template lang="html">
    <div class="detail-background">
        <div class="detail-container-wrap">
            <div v-if="Object.keys(detail).length" class="detail-container">
                <header class="header">
                    <h4 class="title">{{detail.title}}</h4>
                    <div class="date-tag">
                    <span class="icon fa fa-calendar">
                        <span class="publish-date">{{formatTimestamp(Number(detail.publishAt)/1000)}}</span>
                    </span>
                        <span class="post-meta-divider">|</span>
                        <span class="icon fa fa-envelope">
                        <a class="category"
                           @click="$router.push({path: `/categories/${detail.category._id}`,query:{name:detail.category.name}})"
                        >{{detail.category.name}}</a>
                    </span>
                        <span class="post-meta-divider">|</span>
                        <span class="icon fa fa-tags">
                        <a
                            class="tag"
                            @click="$router.push({ path:`/tags/${detail.tag._id}` })"
                        >
                            {{detail.tag.name}}
                        </a>
                    </span>
                        <span class="post-meta-divider">|</span>
                        <span class="fa fa-eye">
                        阅读次数 {{detail.viewCount}}
                    </span>
                    </div>

                </header>
                <div class="content">
                    <Markdown :content="content"/>
                </div>

            </div>
            <Spin v-else/>
        </div>

    </div>

</template>

<script>
	import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
	import { getArticleDetail } from '@/api/article'
	import formatTimestamp from '@/utils/formatTimestamp'
	import Markdown from '@/components/Markdown'
	import Spin from '@/components/Spin'

	export default {
		components: {
			Markdown,
			Spin
		},
		data () {
			return {
				id: '',
				getArticleDetailLoading: false,
				detail: {}
			}
		},
		computed: {
			content: function () {
				return {
					htmlValue: this.detail.htmlValue,
					markdownValue: this.detail.markdownValue,
				}
			}
		},
		mounted () {
			this.getArticleDetail(this.$route.params.id)
		},
		methods: {

			formatTimestamp (timestamp) {
				return formatTimestamp(timestamp)
			},
			async getArticleDetail (id) {
				this.getArticleDetailLoading = true
				try {
					const result = await getArticleDetail(id)
					if (result.data.code) {
						this.$message.error('获取失败')
					} else {
						this.detail = result.data.data
					}
					this.getArticleDetailLoading = false
				} catch (e) {
					this.getArticleDetailLoading = false
					this.$message.error('获取失败')
				}
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .detail-background {
        background: rgba(0, 0, 0, 0.8);
        .detail-container-wrap {
            padding: 5px 0;
            width: 100%;
            min-height: 100vh;

            .detail-container {
                background: rgba(255, 255, 255, 0.95);
                border-radius: 15px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                max-width: 800px;
                margin: 30px auto;
                .header {
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .date-tag {
                        .post-meta-divider {
                            color: rgba(255, 255, 255, 0.6);
                            margin: 0 5px;
                        }
                        margin-top: 15px;
                        font-size: 12px;
                        .publish-date, .tag, .category {
                            font-size: 12px;
                            cursor: pointer;
                        }
                        .publish-date, .tag, .category {
                            margin-left: 5px;
                        }

                    }
                    .title {
                        margin: 5px 0;
                        font-size: 20px;
                        color: rgba(0, 0, 0, 0.6);
                    }
                }
                .content{
                    padding: 40px;
                }
            }
        }

    }
</style>
