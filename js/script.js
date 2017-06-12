
var Main = (function($){
    function activateAssetLink(){
        if(!$){
            throw new Error('jQuery is needed.')
        }

        var assetLink = $('.sidebar-nav a').first(),
            displayStatusSymbol = assetLink.find('span'),
            extraLinksWrapper = assetLink.next();

        assetLink.on('click', function(e){
            if(!$(this).hasClass('active')){
                return undefined;
            }

            if(!extraLinksWrapper.is(':visible')){
                showExtraLinks(extraLinksWrapper, displayStatusSymbol);
            }
            else{
                hideExtraLinks(extraLinksWrapper, displayStatusSymbol);
            }
            e.preventDefault();
        });
    }

    function showExtraLinks(wrapper, symbol){
        wrapper.slideDown();
        symbol.html('&#8722;');
    }


    function hideExtraLinks(wrapper, symbol){
        wrapper.slideUp();
        symbol.html('&#43;');
    }


    function animate(elem, style, unit, from, to, time, prop) {
        if (!elem) {
            return;
        }
        var start = new Date().getTime(),
            timer = setInterval(function () {
                var step = Math.min(1, (new Date().getTime() - start) / time);
                if (prop) {
                    elem[style] = (from + step * (to - from))+unit;
                } else {
                    elem.style[style] = (from + step * (to - from))+unit;
                }
                if (step === 1) {
                    clearInterval(timer);
                }
            }, 25);
        if (prop) {
            elem[style] = from+unit;
        } else {
            elem.style[style] = from+unit;
        }
    }

    function scrollTo(elemId){
        var target = document.getElementById(elemId);
        animate(document.scrollingElement ||
            document.documentElement, "scrollTop", "", 0, target.offsetTop, 1000, true);
        return false;
    }


    return {
        activateAssetLink: activateAssetLink,
        scrollTo: scrollTo
    }
}(jQuery))


$(function() {
    Main.activateAssetLink();
});




