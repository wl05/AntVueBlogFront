<template>
    <div class="category-container-wrap">
        <div class="category-container">
            <h1 class="title">
                Categories
            </h1>
            <Spin v-if="listLoading"/>
            <p class="count">
                目前共{{list.length}}个分类
            </p>
            <ul class="items">
                <li
                    v-for="(item,index) in list"
                    :key="index"
                    class="item"
                    @click="$router.push({path: `/categories/${item._id}`,query:{name:item.name}})"
                >
                    <a>{{item.name}}</a>
                    (<span>{{item.total}}</span>)
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
	import { getList, countCategotres } from '@/api/category'
	import Spin from '@/components/Spin'

	export default {
		data () {
			return {
				list: [],
				listLoading: false,
			}
		},
		components: {
			Spin
		},
		created () {
			this.countCategotres()
		},

		methods: {
			async countCategotres () {
				this.listLoading = true
				try {
					const result = await countCategotres()
					this.listLoading = false
					if (result.data.code) {
						this.$message.error('获取列表失败')
					} else {
						this.list = result.data.data
					}
				} catch (e) {
					this.listLoading = false
					this.$message.error('出错了')
				}
			}
		}
	}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
    .category-container-wrap {
        color: rgba(255, 255, 255, 0.6);
        .category-container {
            width: 800px;
            margin: 0 auto;
            background: rgba(0, 0, 0, 0.9);
            margin-top: 30px;
            border-radius: 15px;
            padding: 40px;
            .count {
                font-family: Lato, "PingFang SC", "Microsoft YaHei", sans-serif;
                text-align: center;
            }
            .items {
                display: flex;
                padding: 20px;
                flex-direction: column;
                .item {
                    padding: 10px;
                    cursor: pointer;
                }
            }
            .title {
                font-size: 26px;
                font-weight: 400;
                text-align: center;
                padding: 20px;
            }
        }
    }
</style>
