<template>
    <div class="articles-item-container">
        <h1>
            <a class="title"
               @click="$router.push({name:'Detail',params:{id:article._id}})">
                {{article.title}}
            </a>
        </h1>
        <div class="date-tag">
            <span class="icon fa fa-calendar">
                <span class="publish-date">{{formatTimestamp(Number(article.publishAt)/1000)}}</span>
            </span>
            <span class="post-meta-divider">|</span>
            <span class="icon fa fa-envelope">
                <a class="category"
                   @click="$router.push({path: `/categories/${article.category._id}`,query:{name:article.category.name}})"
                >{{article.category.name}}</a>
            </span>
            <span class="tagIcon post-meta-divider">|</span>
            <span class="tagIcon icon fa fa-tags">
                <a
                    class="tag"
                    @click="$router.push({ path:`/tags/${article.tag._id}` })"
                >
                    {{article.tag.name}}
                </a>
            </span>
            <span class="post-meta-divider">|</span>
            <span class="fa fa-eye">
                阅读次数 {{article.viewCount}}
            </span>
        </div>
        <article ref="content" class="content">
        </article>
        <a class="read-more" @click="$router.push({name:'Detail',params:{id:article._id}})">阅读全文 »</a>
    </div>
</template>

<script>
	import formatTimestamp from '@/utils/formatTimestamp'

	export default {

		props: [
			'article',
			'index'
		],
		data () {
			return {}
		},
		computed: {},
		created () {
			this.$nextTick(function () {
				this.$refs.content.innerHTML = this.article.htmlValue
			})
		},
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
        margin-bottom: 70px;
        color: rgba(255, 255, 255, 0.6);
        .title {
            display: inline-block;
            color: #555;
            border-bottom: none;
            line-height: 1.2;
            vertical-align: top;
            font-size: 24px;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.7);
            cursor: pointer;
        }
        .title:hover {
            color: rgba(255, 255, 255, 0.9);
        }
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
                /*color: #ddd*/
            }
            .publish-date, .tag, .category {
                /*margin-right: 15px;*/
                margin-left: 5px;
            }
            .icon {
                /*margin-right: 10px;*/
            }
        }
        .content {
            max-width: 700px;
            height: 40px;
            font-size: 14px;
            overflow: hidden;
            margin-top: 15px;
        }
        .read-more {
            font-size: 14px;
            margin-top: 30px;
            display: inline-block;
            /*color: #ddd;*/
            cursor: pointer;
            border-bottom: 2px solid rgba(255, 255, 255, 0.6);
        }
        .read-more:hover {
            font-size: 15px;
            color: rgba(255, 255, 255, 0.9);
            border-bottom: 2px solid rgba(255, 255, 255, 0.9);

        }
    }

    @media screen and (max-width: 768px) {
        .tagIcon {
            display: none;
        }

    }
</style>
