var Menu = {
  
    el: {
      ham: $('.hamburger-container'),
      menuTop: $('.hamburger__line--top'),
      menuMiddle: $('.hamburger__line--middle'),
      menuBottom: $('.hamburger__line--bottom')
    },
    
    init: function() {
      Menu.bindUIactions();
    },
    
    bindUIactions: function() {
      
        Menu.el.ham.on('click', function(event) {
            Menu.activateMenu(event);
            event.preventDefault();
        }); // end event click
    },
    
    activateMenu: function() {
      Menu.el.menuTop.toggleClass('line-top-click');
      Menu.el.menuMiddle.toggleClass('line-middle-click');
      Menu.el.menuBottom.toggleClass('line-bottom-click'); 
    }
  };
  
  Menu.init();

  $('.hamburger-container').click(function() {
    $('.menu-list').toggleClass('menu-list--hide');
  });

const overlayBlog = createOverlay();
const contentBlogTitle = overlayBlog.querySelector(".contentBlogTitle");
const contentBlogText = overlayBlog.querySelector(".contentBlogText");
    
function createOverlay() {   
    const overlayElement = document.createElement('div');
    overlayElement.classList.add('overlayBlog');
    const template = document.querySelector('#overlayTemplateBlog');
    overlayElement.innerHTML = template.innerHTML;
    
    const closeElement = overlayElement.querySelector(".closeBlogModal");
    closeElement.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector('.blog').removeChild(overlayElement);
        $("body").css("overflow", "auto");
    });

    overlayElement.addEventListener("click", e => {
        if (e.target == overlayElement) {
          closeElement.click();
        }
    });

    return overlayElement;
}

$('.btnReadMore').each(function() {
    $(this).click(function(e) {
        e.preventDefault();
        document.querySelector('.blog').appendChild(overlayBlog);
        $("body").css("overflow", "hidden");
        var z = this;
        var popParent = z.parentNode;
        const title = popParent.querySelector(".blog__title__name");
        const text = popParent.querySelector(".blog__abstract");
        contentBlogTitle.textContent = title.innerHTML;
        contentBlogText.textContent = text.innerHTML;
    })
}); 

$(".menu__link").each(function() {
    $(this).click(function() {
        var id  = $(this).attr('href'),
            top = $(id).offset().top - 70 + 'px';
        $('body,html').animate({scrollTop: top},  1000);
    })    
});

$(".first-page__btn").each(function() {
    $(this).click(function() {
        var id  = $(this).attr('href'),
            top = $(id).offset().top - 70 + 'px';
        $('body,html').animate({scrollTop: top},  1000);
    })    
});

$('.form__btn').click(function(event) {
    event.preventDefault();

});


ymaps.ready(initMap);    
function initMap(){ 
    var myMap = new ymaps.Map("map", {
        center: [42.964645, 47.550190],

        zoom: 16,
        controls: ['zoomControl'],
        behaviors: ['drag']
    }); 

    var placemark = new ymaps.Placemark([42.964633, 47.550335], {});

        myMap.geoObjects.add(placemark);
}