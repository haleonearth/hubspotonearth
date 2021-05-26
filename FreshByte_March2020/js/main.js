(function() {
  
  var links = document.querySelectorAll('a');
  Array.prototype.slice.call(links).forEach(function(link, index) {
    if(!links[index].hasAttribute('target')) {
      links[index].setAttribute('target' , '_self');
    }
  });
  

  var images = document.querySelectorAll('img');
  Array.prototype.slice.call(images).forEach(function(img, index) {
    if( images[index].hasAttribute('src')) {
      images[index].setAttribute('src' , images[index].getAttribute('src').split('?')[0]);
    }
  });
  
  
  var menuLinks = document.querySelectorAll('.custom-menu-primary .hs-menu-wrapper > ul li a');
  
  Array.prototype.slice.call(menuLinks).forEach(function(ancor) {
    var span = document.createElement('SPAN');
    var textNode = ancor.childNodes[0];
    ancor.parentElement.classList.add(toArray(ancor.textContent).join('').split(' ').join('-').toLowerCase().replace('/', '').replace('&', '').replace('(', '').replace(')', ''));
    span.appendChild(textNode);
    ancor.innerHTML = typeof span === 'string' ? span : span.outerHTML;
  });
  
  function toArray(obj) {
    var array = [];
    for (var i = obj.length >>> 0; i--;) { 
      array[i] = obj[i];
    }
    return array;
  }

  var backContainer = document.createElement('li');
  var allToggles = document.querySelectorAll(".header--toggle")
  var navToggle = document.querySelector(".header__navigation--toggle")
  var allElements = document.querySelectorAll(".header--element, .header--toggle" )
  var bdy = document.querySelector("body");

  var mobileWrap = document.querySelector(".header__navigation.header--element.visible-phone .custom-menu-primary.cm-visible-phone");

  var taskList = document.querySelectorAll('.custom-menu-primary.cm-visible-phone .hs-menu-wrapper ul ul');
  var mainChildWrapper = document.querySelector('.custom-menu-primary.cm-visible-phone .hs-menu-wrapper > ul');

  var childMenu = document.querySelectorAll('.custom-menu-primary.cm-visible-phone .hs-menu-wrapper > ul li.hs-item-has-children > a');
  Array.prototype.slice.call(childMenu).forEach(function (ele) {
    ele.insertAdjacentHTML('afterend', '<div class="child-trigger"></div>');
  });

  var childTrigger = document.querySelectorAll('.child-trigger');
  
  var mainChild = document.querySelector('.custom-menu-primary.cm-visible-phone .hs-menu-wrapper > ul');
  var lis = document.querySelectorAll('.custom-menu-primary .hs-menu-wrapper > ul li.hs-item-has-children');
  
  var childMenu = document.querySelectorAll('.custom-menu-primary.cm-visible-phone .hs-menu-wrapper > ul li.hs-item-has-children > ul.hs-menu-children-wrapper');
  Array.prototype.slice.call(childMenu).forEach(function (ele) {
    ele.insertAdjacentHTML('afterbegin', '<li class="back-menu-item"><a class="back-item"><span class="wsite-menu-mobile-arrow"></span><span class="wsite-menu-back">Back</span></a></li>');
  });

  Array.prototype.slice.call(childTrigger).forEach(function (ele, index) {
    ele.addEventListener('click', function (e) {
      var hasClass = ele.parentElement.classList.contains('slideChildren');
      if (!hasClass) {
        var el = lis[0];
        while(el) {
          if (el.children[2] !== e.target.nextElementSibling) {
            el.classList.remove('slideChildren');
            el.parentElement.classList.remove('slideParent');
          }
          el = el.nextElementSibling;
        }
        ele.parentElement.classList.toggle('slideChildren');
        ele.nextElementSibling.classList.toggle('slideChildren');
        ele.parentElement.parentElement.classList.toggle('slideParent');
      } else {
        ele.parentElement.classList.remove('slideChildren');
        ele.nextElementSibling.classList.remove('slideChildren');
        ele.parentElement.parentElement.classList.remove('slideParent');
      }

    });
  });
  
  var dlBackLI = document.querySelectorAll('.custom-menu-primary ul li.back-menu-item > a');
  Array.prototype.slice.call(dlBackLI).forEach(function(bck, index) {
    bck.addEventListener('click', function(e) {
      e.preventDefault();
      bck.parentElement.parentElement.classList.remove('slideChildren');
      bck.parentElement.parentElement.parentElement.classList.remove('slideChildren');
      bck.parentElement.parentElement.parentElement.parentElement.classList.remove('slideParent');
    });
  });

  function toggleNav(event) {
    bdy.classList.toggle('mobile-open');
    setTimeout(function() {
      bdy.classList.toggle('menu-loaded');
    }, 300);

    mainChildWrapper.classList.remove('slideParent');

    // remove back classes
    Array.prototype.slice.call(taskList).forEach(function(rmv){
      rmv.classList.remove('slideChildren');
      rmv.classList.remove('slideParent');
    });
    Array.prototype.slice.call(lis).forEach(function(rmv){
      rmv.classList.remove('slideChildren');
    });
    
    event.stopPropagation();
  }

  if(navToggle !== null) {
    navToggle.addEventListener('click', toggleNav);
  }



  function remAlClas(){
    this.classList.remove('mobile-open');    
    this.classList.remove('menu-loaded');
  }

  function stopEve(event){
    event.stopPropagation();
  }

  if (mobileWrap) {
    mobileWrap.addEventListener('click', stopEve);
  }
  bdy.addEventListener('click', remAlClas);


  // ============  Back to top 
  var backToTopButton = document.querySelector(".back-to-top");
  backToTopButton.addEventListener("click", smoothScrollBackToTop);

  function smoothScrollBackToTop() {
    const targetPosition = 0;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 750;
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
      if (progress < duration) window.requestAnimationFrame(step);
    }
  }
  function easeInOutCubic(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t + b;
    t -= 2;
    return c/2*(t*t*t + 2) + b;
  };

})();