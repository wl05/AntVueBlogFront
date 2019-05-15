<!--<template>-->
  <!--<ul-->
    <!--class="menu-container"-->
    <!--ref="menu-container"-->
  <!--&gt;-->
    <!--<li class="menu-container__item" data-index="/categories">-->
      <!--<a :class="['menu-item-text',index==='/categories' ? 'activeClass' : '' ]">-->
        <!--<span class="fa fa-fw fa-th"></span>-->
        <!--分类-->
      <!--</a>-->
    <!--</li>-->
    <!--<li class="menu-container__item" data-index="/archives">-->
      <!--<a :class="['menu-item-text',index==='/archives' ? 'activeClass' : '' ]">-->
        <!--<span class="fa fa-fw fa-archive"></span>-->
        <!--归档-->
      <!--</a>-->
    <!--</li>-->
    <!--<li class="menu-container__item" data-index="/tags">-->
      <!--<a :class="['menu-item-text',index==='/tags' ? 'activeClass' : '' ]">-->
        <!--<span class="fa fa-fw fa-tags"></span>-->
        <!--标签-->
      <!--</a>-->
    <!--</li>-->
    <!--<li class="menu-container__item" data-index="/about">-->
      <!--<a :class="['menu-item-text',index==='/about' ? 'activeClass' : '' ]">-->
        <!--<span class="fa fa-fw fa-user"></span>-->
        <!--关于我-->
      <!--</a>-->
    <!--</li>-->
  <!--</ul>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
  <!--data () {-->
    <!--return {-->
      <!--index: ''-->
    <!--}-->
  <!--},-->
  <!--methods: {-->
    <!--handleSelect (e) {-->
      <!--console.log(e)-->
    <!--}-->
  <!--},-->
  <!--mounted () {-->
    <!--this.$refs[ 'menu-container' ].addEventListener('click', function (e) {-->
      <!--var x = e.target-->
      <!--if (x.nodeName.toLowerCase() === 'li') {-->
        <!--console.log('The color is ' + x.innerHTML)-->
      <!--}-->
    <!--},true)-->
  <!--}-->
<!--}-->
<!--</script>-->
<!--<style>-->
  <!--.menu-container {-->
    <!--display: flex;-->
    <!--flex-direction: column;-->
    <!--width: 880px;-->
  <!--}-->

  <!--.menu-container__item {-->
    <!--list-style-type: none;-->
    <!--flex: 1;-->
    <!--min-width: 50px;-->
  <!--}-->
<!--</style>-->
