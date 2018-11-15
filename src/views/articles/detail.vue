<template lang="html">
    <div class="detail-container-wrap">
        <div v-if="Object.keys(detail).length" class="detail-container">
            <header class="header">
                <h4 class="title">{{detail.title}}</h4>
                <span class="date">时间：{{formatTimestamp(Number(detail.publishAt) /1000)}}</span>
                <span class="tag">标签：{{detail.tag.name}}</span>
            </header>
            <Markdown :content="content"/>
        </div>
    </div>

</template>

<script>
	import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
	import { getArticleDetail } from '@/api/article'
	import formatTimestamp from '@/utils/formatTimestamp'
	import Markdown from '@/components/Markdown'

	export default {
		components: {
			Markdown
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
    /*@import '@/styles/markdown.css';*/
    .detail-container-wrap {
        background: rgba(255, 255, 255, 0.9);
        padding: 5px;
        width: 100%;
        min-height: 100vh;
        .detail-container {
            display: flex;
            flex-direction: column;
            justify-content: center;

            max-width: 800px;
            margin: 0 auto;
            .header {
                border-left: 4px solid #219a54;
                padding-left: 20px;
                .title {
                    margin: 5px 0;
                }
                .date {
                    font-size: 12px;
                    color: #9e9e9e;
                }
                .tag {
                    font-size: 12px;
                    color: #9e9e9e;
                    margin-left: 50px;
                }
            }
        }
    }
</style>
