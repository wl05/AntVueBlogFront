<template>
    <div v-comment="options"></div>
</template>
<script>
    // 引入依赖项
    import Gitment from 'gitment'

    export default {
        name : 'top-gitment',
        props : [ 'options' ],
        directives : {
            // 自定义指令
            comment : {
                bind : function (el, binding) {
                    const gitment = new Gitment({
                        id : binding.value.id + '',
                        owner : binding.value.owner,
                        repo : binding.value.repo,
                        oauth : {
                            client_id : binding.value.oauth.client_id,
                            client_secret : binding.value.oauth.client_secret
                        },
                        theme : binding.value.theme
                    })
                    gitment.render(el)
                }
            }
        }
    }
</script>
<style>
    @import '~gitment/style/default.css'
</style>
