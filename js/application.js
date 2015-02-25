/*global Reveal, document, math, difference, logarithm*/
(function(Reveal, numbers, difference){
    'use strict';

    var model = new numbers.Model(137);
    var actions = {
        'a-log-table': function(id){
            var container = document.getElementById(id + '-editable');
            new numbers.EditableView(model, container);
            new logarithm.LogTableView(model, document.getElementById(id), {
                'dataTransformer': function(number){
                    return [number.toFixed(2), Math.log(number).toFixed(4)];
                }
            });
        },
        'a-inverse-log-table': function(id){
            var container = document.getElementById(id + '-editable');
            var setter = function(){
                var digits = Math.floor(Math.log10(model.n));
                var target = model.n / Math.pow(10, digits);
                return Math.pow(Math.E, target);
            };
            var logModel = new numbers.Model(setter());
            model.on('n', function(){ logModel.set(setter()); });
            new numbers.EditableView(model, container);
            new logarithm.LogTableView(logModel, document.getElementById(id), {
                'dataTransformer': function(number){
                    return [number.toFixed(2), Math.log(number).toFixed(4)];
                }
            });
        },
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
        'a-squares': function(id){
            var container = document.getElementById(id);
            var model = new difference.Model([1,2,3,4,5,6].map(function(x){
                return Math.pow(x,2);
            }));
            new difference.View(model, container, { 'rows': 1 });
        },
        'first-difference': function(id){
            var container = document.getElementById(id);
            var model = new difference.Model([1,2,3,4,5,6].map(function(x){
                return Math.pow(x,2);
            }));
            new difference.View(model, container, { 'rows': 2 });
        },
        'second-difference': function(id){
            var container = document.getElementById(id);
            var model = new difference.Model([1,2,3,4,5,6].map(function(x){
                return Math.pow(x,2);
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
