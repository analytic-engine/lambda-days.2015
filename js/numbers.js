/*global Object, window, ns, math*/
(function($, Observable){
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
})(window.numbers = window.numbers || {}, ns.Observable, math);
