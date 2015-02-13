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

    var Representation = $.RepresentationView = function(model, container){
        this.model = model;
        this.container = container;
        this.model.on('n', this.update.bind(this));
        this.update(this.model.n);
    };
    Representation.prototype.update = function(n){
        var digits = math.digits(n, 10);
        var content = digits.map(function(digit, index){
            var power = digits.length - 1 - index;
            return [digit, power];
        }).map(function(pair){
            return [
                pair[0],
                '&times;',
                '10',
                '<sup>',
                pair[1],
                '</sup>'
            ].join('');
        }).join('+');
        this.container.innerHTML = content;
    };
})(window.numbers = window.numbers || {}, ns.Observable, math);
