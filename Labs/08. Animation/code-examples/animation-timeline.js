$(document).ready(function () {

    // 1. Initializare obiecte
    var element = $('#element');
    var bg = $('#bg');
    var logo = $('#logolong');

    // 2. Descriere timeline
    var timeline =
    [   
        { "object": bg, "start": 0, "duration": 1500, "properties": { top: 0} },
        { "object": element, "start": 750, "duration": 1250, "properties": { left: 200, top: 70} },
        { "object": logo, "start": 1800, "duration": 750, "properties": { left: 10, top: 15} },
        { "object": element, "start": 3600, "duration": 800, "properties": { opacity: 0} },
        { "object": logo, "start": 3600, "duration": 800, "properties": { left: 800} },
        { "object": bg, "start": 4200, "duration": 1200, "properties": { left:'190px', top:'100px', width:'10px', height:'10px', opacity:0} }
    ];

    // 3. Executie timeline
    timeline.forEach(function (element) {

    	// !!! element nu este "var element = $('#element');"

       var requiredDelay = element.start;
         /*timeline.forEach(function (innerElement) {
            if (innerElement.object === element.object) {
                requiredDelay -= innerElement.duration;
            }
        });*/

        element.object.delay(requiredDelay).animate(
            element.properties,
            element.duration,
            function () { });
    });
});