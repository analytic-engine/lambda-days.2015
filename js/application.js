/*global Reveal, document, math, difference*/
(function(Reveal, numbers, difference){
    'use strict';

    var model = new numbers.Model(137);
    var actions = {
        'a-number': function(id){
            var container = document.getElementById(id);
            new numbers.RegularView(model, container);
        },
        'a-representation': function(id){
            var container = document.getElementById(id);
            new numbers.RepresentationView(model, container, { representation: numbers.multiplication });
        },
        'a-power': function(id){
            var container = document.getElementById(id);
            new numbers.RepresentationView(model, container);
        },
        'a-punchcard': function(id){
            var container = document.getElementById(id + '-editable');
            new numbers.EditableView(model, container);
            new numbers.PunchcardView(model, document.getElementById(id));
        },
        'a-difference': function(id){
            var container = document.getElementById(id);
            var model = new difference.Model([1,2,3,4,5,6].map(function(x){
                return Math.pow(x,3);
            }));
            new difference.View(model, container);
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
})(Reveal, math, difference);
