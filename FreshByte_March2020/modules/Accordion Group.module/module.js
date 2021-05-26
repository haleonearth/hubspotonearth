var acc = document.querySelectorAll(".acc-group-item-title");
var slideTransition = 500;

Array.prototype.slice.call(acc).forEach(function(ele, index) {
  ele.addEventListener("click", function() {    
    var isActive = ele.parentElement.classList.contains("active");
    if (!isActive) {
      var siblings = Array.prototype.filter.call(ele.parentElement.parentElement.children, function(child){
        return child !== ele;
      });

      Array.prototype.slice.call(siblings).forEach(function(el, i) {
        el.classList.remove('active');
        var _display1 = window.getComputedStyle(el.children[1], null).display;
        _display1 !== 'none' ? slideUp(el.children[1], slideTransition) : null;
      });

      var _display = window.getComputedStyle(ele.nextElementSibling, null).display;
      var panel = ele.nextElementSibling;

      ele.parentElement.classList.add("active"); 
      if (_display === 'none') {
        slideDown(panel, slideTransition);
      }
    }
  });
});

function slideUp(element, timing) {
  element.style.transitionProperty = 'height, margin, padding';
  element.style.transitionDuration = timing + 'ms';
  element.style.boxSizing = 'border-box';
  element.style.height = element.offsetHeight + 'px';
  element.offsetHeight;
  element.style.overflow = 'hidden';
  element.style.height = 0;
  element.style.paddingTop = 0;
  element.style.paddingBottom = 0;
  element.style.marginTop = 0;
  element.style.marginBottom = 0;
  window.setTimeout(function() {
    element.style.display = 'none';
    element.style.removeProperty('height');
    element.style.removeProperty('padding-top');
    element.style.removeProperty('padding-bottom');
    element.style.removeProperty('margin-top');
    element.style.removeProperty('margin-bottom');
    element.style.removeProperty('overflow');
    element.style.removeProperty('transition-duration');
    element.style.removeProperty('transition-property');
  }, timing);
}

function slideDown(element, timing) {
  element.style.removeProperty('display');
  var display = window.getComputedStyle(element).display;
  if (display === 'none') {
    display = 'block';
  }
  element.style.display = display;
  var height = element.offsetHeight;
  element.style.overflow = 'hidden';
  element.style.height = 0;
  element.style.paddingTop = 0;
  element.style.paddingBottom = 0;
  element.style.marginTop = 0;
  element.style.marginBottom = 0;
  element.offsetHeight;
  element.style.transitionProperty = 'height, margin, padding';
  element.style.transitionDuration = timing + 'ms';
  element.style.height = height + 'px';
  element.style.removeProperty('padding-top');
  element.style.removeProperty('padding-bottom');
  element.style.removeProperty('margin-top');
  element.style.removeProperty('margin-bottom');
  window.setTimeout(function() {
    element.style.removeProperty('height');
    element.style.removeProperty('overflow');
    element.style.removeProperty('transition-duration');
    element.style.removeProperty('transition-property');
  }, timing);
}