$(function() {
    $('.services__item__title').click(function() {
        if ($(this).next('.services__item__about').is(':visible')){ 
            $(this).next('.services__item__about').slideUp("slow");
        } else {
            $(".services__item__about").slideUp("slow"); 
            $(this).next(".services__item__about").slideDown("slow");
        }
    })
});