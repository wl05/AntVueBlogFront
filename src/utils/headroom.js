(function () {
  window.headroom = function (element, height = 100) {
    var top1 = 0;
    var top2 = 0;
    var nav = element;
    var scrollFunc = function () {
      console.log('111')
      top2 = document.body.scrollTop || document.documentElement.scrollTop;
      if (top2 - top1 > 0) {
        nav.style = `top:-${height}px;left:0; transition:0.3s;`
      } else if (top2 - top1 < 0) {
        nav.style = "top:0;left:0; transition:0.3s;"
      }
      top1 = top2
    }

    function onScroll () {
      requestAnimationFrame(scrollFunc);
    }

    window.addEventListener('scroll', onScroll, false);
  }
})()
