define(["dojo/topic"], function(topic) {
    /*
    * Custom Javascript to be executed while the application is initializing goes here
    */
    var getParameterByName = function(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    // The application is ready
    topic.subscribe("tpl-ready", function(){
        /*
        * Custom Javascript to be executed when the application is ready goes here
        */

        if(getParameterByName("hideTitle") != null){
            document.getElementById('headerDesktop').style.display='none';
            var currentHeight = $("body").height()
            $("#contentPanel").height(currentHeight);
            $("#mainStagePanelInner").height(currentHeight);
        }
        var activeSection = getParameterByName("activeSection");
        if(activeSection != null){
            activeSection = parseInt(activeSection);
            $(`.entry:nth-child(${activeSection})`).click();
        }

        $('#toggleLegendBtn').click(function(){
            var opacity = 1, translate = 0;
            $(this).toggleClass('active');
            // $("#descLegendPanel").toggleClass('hide');
            if(!$(this).hasClass('active')){
                opacity = 0;
                translate = 500;
                $(this).text('Show exercises');
            }else{
                $(this).text('Hide exercises');
            }
            $("#descLegendPanel").css("opacity", opacity);
            $("#descLegendPanel").css("transform",`translate(${translate}px)`);
        });
    });
});
