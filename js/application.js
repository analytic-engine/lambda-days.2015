/*global Reveal, document, numbers, console*/
(function(Reveal, numbers){
    'use strict';

    var actions = {
        'a-number': function(id){
            var model = new numbers.Model(137);
            var span = document.getElementById(id);
            new numbers.RegularView(model, span);
            console.log(id);
        }
    };

    var events = { /* use to keep track which slides have rendered */ };
    function handleEvent(event){
        if (!events[event.type]) {
            events[event.type] = true;
            actions[event.type](event.type);
        }
    }
    for (var key in actions) {
        Reveal.addEventListener(key, handleEvent);
    }
})(Reveal, numbers);
