const animation = (element, className) => {
  const viewHeight = window.innerHeight || document.documentElement.clientHeight
  if (element.getBoundingClientRect().top < viewHeight) {
    addClass(element, className)
  }
  
  function lazyload () {
    let distance = viewHeight - element.getBoundingClientRect().top
    if (distance >= 0) {
      addClass(element, className)
    }
  }
  
  window.addEventListener('scroll', lazyload, true)
}

function hasClass (elements, cName) {
  return !!elements.className.match(new RegExp('(\\s|^)' + cName + '(\\s|$)')) // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
}

function addClass (elements, cName) {
  if (!hasClass(elements, cName)) {
    elements.className += ' ' + cName
  }
  
}

export default animation
