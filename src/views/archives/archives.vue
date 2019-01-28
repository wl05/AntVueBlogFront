<template>
    <div class="index" :style="bagStyle">
        <Spin v-if="fetchArticleLoading"/>
        <div v-else class="archives-list-container">
            <timeline
                timeline-theme="rgba(0,0,0,0.3)"
            >
                <div v-for="(value, key) in formatedArticles" class="item-container" :key="key">
                    <timeline-title
                        icon-size="large"
                        font-color="#555"
                    >
                        {{value.year}}
                    </timeline-title>
                    <timeline-item
                        icon-size="small"
                        :key="index"
                        v-for="(item,index) in value.value"
                        font-color="rgb(0,0,0)"
                    >
                        <div class="article-item" @click="$router.push({name:'Detail',params:{id:item._id}})">
                            <span class="date">{{item.date}}</span>
                            <span class="title">{{item.title}}</span>
                        </div>
                    </timeline-item>
                </div>
            </timeline>
            <div class="pagination">
                <el-pagination
                    v-if="count>pageLimit"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="pageSize"
                    :page-size="pageLimit"
                    layout="total, prev, pager, next"
                    :total="count"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
  import { fetchArticle } from '@/api/article'
  import formatYearAndDate from '@/utils/formatYearAndDate'
  import Spin from '@/components/Spin'
  import { randomNumImg, randomNum } from '@/utils/randomNumImg'
  import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'

  export default {
    data () {
      return {
        fetchArticleLoading : false,
        pageSize : 1,
        pageLimit : 15,
        count : 0,
        articles : []
      }
    },
    components : {
      Spin,
      Timeline,
      TimelineItem,
      TimelineTitle
    },
    computed : {
      formatedArticles () {
        let articles = [ ...this.articles ]
        return this.formatArticles(articles)
      },
      bagStyle : function () {
        return randomNumImg(randomNum())
      }
    },
    created () {
      this.fetchArticle(this.pageSize, this.pageLimit)
    },
    methods : {
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
      formatArticles (articles) {
        for (let article of articles) {
          article.year = formatYearAndDate(Number(article.publishAt) / 1000)[ 0 ]
          article.date = formatYearAndDate(Number(article.publishAt) / 1000)[ 1 ]
        }
        let data = []
        try {
          for (let i = 0; i < articles.length; i++) {
            let existValue = data.find((val) => val.year === articles[ i ].year)
            if (existValue) {
              existValue.value.push({
                _id : articles[ i ]._id,
                date : articles[ i ].date,
                title : articles[ i ].title
              })
            } else {
              data.push({
                year : articles[ i ].year,
                value : [
                  {
                    _id : articles[ i ]._id,
                    date : articles[ i ].date,
                    title : articles[ i ].title
                  }
                ]
              })
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
    .index {
        height: 100vh;
        overflow: scroll;
        padding-top: 45px;
        box-sizing: border-box;
        .archives-list-container {
            border-radius: 5px;
            margin-top: 30px;
            background: rgba(255, 255, 255, 0.9);
            padding: 40px;
            max-width: 800px;
            margin: 30px auto;
            .key {
                font-size: 20px;
            }
            .article-item {
                cursor: pointer;
            }
            .timeline-title {
                font-size: 30px;
                font-weight: 700;
                color: rgba(0, 0, 0, 0.6);
            }
            .article-item {
                .date {
                    margin-right: 15px;
                    font-size: 12px;
                    color: #282828;
                }
                .title {
                    font-size: 16px;
                    font-weight: 400;
                    color: #333;
                }
            }
        }
    }

    @media screen and (max-width: 768px) {
        .index {
            padding-top: 31px;
            .archives-list-container {
                padding: 40px 10px;
                border-radius: 0;
                .pagination {
                    overflow: scroll;
                }
            }
        }
    }
</style>
