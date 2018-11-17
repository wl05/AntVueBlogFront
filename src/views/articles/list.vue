<template>
    <div class="articles-list-container">
        <Spin v-if="fetchArticleLoading"/>
        <item
            v-for="(item,index) in articles"
            :key="item._id"
            :article="item"
            :index="index+1"
        />
        <div class="pagination">
            <!--<el-pagination-->
            <!--background-->
            <!--@size-change="handleSizeChange"-->
            <!--@current-change="handleCurrentChange"-->
            <!--:current-page="pageSize"-->
            <!--:page-sizes="[10, 20, 30, 40]"-->
            <!--:page-size="pageLimit"-->
            <!--layout="total, sizes, prev, pager, next, jumper"-->
            <!--:total="count">-->
            <!--</el-pagination>-->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pageSize"
                :page-size="pageLimit"
                layout="total, prev, pager, next"
                :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
	import { fetchArticle, deleteArticle } from '@/api/article'
	import formatTimestamp from '@/utils/formatTimestamp'
	import item from './components/item'
	import Spin from '@/components/Spin'

	export default {
		data () {
			return {
				fetchArticleLoading: false,
				pageSize: 1,
				pageLimit: 10,
				count: 0,
				articles: [],
				loadMoreLoading: false
			}
		},
		components: {
			item,
			Spin
		},
		created () {
			this.fetchArticle(this.pageSize, this.pageLimit)
		},
		methods: {
			formatTimestamp (timestamp) {
				return formatTimestamp(timestamp)
			},
			handleSizeChange (val) {
				this.pageLimit = val
				this.fetchArticle(this.pageSize, val)
				console.log(`每页 ${val} 条`)
			},
			handleCurrentChange (val) {
				this.pageSize = val
				this.fetchArticle(val, this.pageLimit)
				console.log(`当前页: ${val}`)
			},
			async fetchArticle (pageSize, pageLimit) {
				this.fetchArticleLoading = true
				try {
					const result = await fetchArticle({pageSize, pageLimit})
					this.fetchArticleLoading = false
					if (result.data.code) {
						this.$message.error('获取列表失败')
					} else {
						this.articles = result.data.data.article
						this.count = result.data.data.count
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
        background: rgba(0, 0, 0, 0.9);
        min-height: 800px;
        margin-bottom: 60px;
        padding: 15px;
        max-width: 800px;
        margin: 30px auto;

    }


</style>
