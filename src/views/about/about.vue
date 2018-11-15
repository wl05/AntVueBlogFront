<template lang="html">
    <div class="about-container-wrap">
        <div class="about-container">
            <img
                class="about-item avatar"
                width="200"
                height="200"
                :src="avatarUrl"
            />
            <p class="about-item">
                汪乐
            </p>
            <p class="about-item">
                nickName： ANT
            </p>
            <p class="about-item">
                qq： 2929712050@qq.com
            </p>
            <p class="about-item">
                Github: <a href="https://github.com/antbaobao"> https://github.com/antbaobao</a>
            </p>
            <p class="about-item">
                爱好： 养龟、动漫、打代码
            </p>
            <p class="about-item">
                目前坐标： 新加坡
            </p>
        </div>
    </div>

</template>

<script>
	import avatarUrl from '@/assets/about.jpeg'

	export default {
		components: {},
		data () {
			return {
				avatarUrl
			}
		},
		computed: {},
		mounted () {
		},
		methods: {}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .about-container-wrap {
        /*background: rgba(255, 255, 255, 0.95);*/
        /*padding: 5px;*/
        width: 100%;
        min-height: 100vh;
        color: #ddd;
        .about-container {
            max-width: 800px;
            margin: 0 auto;
            margin-top: 160px;
            background: rgba(0, 0, 0, 0.9);
            padding: 25px;
            border-radius: 5px;

            .about-item {
                padding: 10px;
                margin: 0 auto;
                text-align: center;
                display: block;
            }
            .avatar {
                border-radius: 100%;
            }
        }
    }
</style>
