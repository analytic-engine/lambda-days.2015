/*global Object, window, ns, math*/
(function($, Observable, math){
    'use strict';

    var Model = $.Model = function(n){
        Observable.call(this);
        this.set(n);
    };
    Model.prototype = Object.create(Observable.prototype);
    Model.prototype.constructor = Model;
    Model.prototype.set = function(n){
        this.n = n;
        this.signal('n', n);
    };

    var View = $.RegularView = function(model, container){
        this.model = model;
        this.container = container;
        this.model.on('n', this.update.bind(this));
        this.update(this.model.n);
    };
    View.prototype.update = function(n){
        this.container.innerText = n;
    };

    $.multiplication = function(base, power){
        return [ Math.pow(base, power) ];
    };
    $.power = function(base, power){
        return [ base, '<sup>', power, '</sup>' ];
    };

    var extend = function(){
        var result = {};
        Array.prototype.slice.call(arguments).forEach(function(argument){
            for (var key in argument) {
                if (!(key in result)) {
                    result[key] = argument[key];
                }
            }
        });
        return result;
    };

    var Representation = $.RepresentationView = function(model, container, options){
        this.options = extend(options || {}, { base: 10, representation: $.power });
        this.model = model;
        this.container = container;
        this.model.on('n', this.update.bind(this));
        this.update(this.model.n);
    };
    Representation.prototype.update = function(n){
        var digits = math.digits(n, this.options.base);
        var content = digits.map(function(digit, index){
            var power = digits.length - 1 - index;
            return [digit, power];
        }).map(function(pair){
            return [
                pair[0],
                '&times;'
            ].concat(this.options.representation(this.options.base, pair[1])).join('');
        }.bind(this)).join('+');
        this.container.innerHTML = content;
    };
})(window.numbers = window.numbers || {}, ns.Observable, math);
