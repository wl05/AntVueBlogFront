<template>
    <div class="articles-item-container">
        <h1>
            <a class="title" @click="$router.push({name:'Detail',params:{id:article._id}})">
                {{article.title}}
            </a>
        </h1>
        <div class="date-tag">
            <span class="publish-date">{{formatTimestamp(Number(article.publishAt)/1000)}}</span>
            <span class="tag">{{article.tag.name}}</span>
        </div>
        <article ref="content" class="content">
        </article>
        <a class="read-more" @click="$router.push({name:'Detail',params:{id:article._id}})">» 阅读全文 »</a>
    </div>
</template>

<script>
	import formatTimestamp from '@/utils/formatTimestamp'

	export default {

		props: [
			'article'
		],
		data () {
			return {}
		},
		computed: {},
		created () {
			this.$nextTick(function () {

				// console.log(typeof div, Object.keys(div))

				this.$refs.content.innerHTML = this.article.htmlValue
			})
			// console.log('======', this.article)
		},
		// beforeCreate () {
		// 	console.log(this.article)
		// },
		methods: {
			formatTimestamp (timestamp) {
				return formatTimestamp(timestamp)
			},
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

    .articles-item-container {
        padding: 25px;
        margin-bottom: 40px;
        color: #ddd;
        .title {
            display: inline-block;
            color: #555;
            border-bottom: none;
            line-height: 1.2;
            vertical-align: top;
            font-size: 22px;
            font-weight: 400;
            color: #ddd;
            cursor: pointer;
        }
        .date-tag {
            margin-top: 15px;
            .publish-date, .tag {
                font-size: 12px;
                /*color: #ddd*/
            }
            .publish-date {
                margin-right: 15px;
            }
        }
        .content {
            width: 700px;
            height: 40px;
            font-size: 14px;
            overflow: hidden;
            margin-top: 15px;
        }
        .read-more {
            font-size: 14px;
            margin-top: 20px;
            display: inline-block;
            /*color: #ddd;*/
            cursor: pointer;
        }

    }
</style>
