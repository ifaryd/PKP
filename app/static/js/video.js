    
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var players = {};


    

    function onYouTubeIframeAPIReady() {
        $(document).ready(function () {
            var iframes = document.querySelectorAll('.videos-slideshow iframe');


            for (i = 0, len = iframes.length; i < len; i++) {
                if (iframes[i].id) {
                    players[iframes[i].id] = new YT.Player(iframes[i].id, {
                        events: {
                            'onStateChange' : onPlayerStateChange
                        }
                    });
                }
               
            } 
            
        });
        
    }


    function onPlayerStateChange(event) {
        var $videoCycleContainer = $('.videos-slideshow');
        switch (event.data) {
            case -1:
            case 1:
            case 3:
                $videoCycleContainer.cycle('pause');
            break;
            case 2:
                $videoCycleContainer.cycle('resume');
            break;
        }
       
    }
   
