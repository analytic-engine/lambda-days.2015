/*global Reveal, document, numbers*/
(function(Reveal, numbers){
    'use strict';

    var model = new numbers.Model(137);
    var actions = {
        'a-number': function(id){
            var span = document.getElementById(id);
            new numbers.RegularView(model, span);
        },
        'a-representation': function(id){
            var span = document.getElementById(id);
            new numbers.RepresentationView(model, span, { representation: numbers.multiplication });
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
