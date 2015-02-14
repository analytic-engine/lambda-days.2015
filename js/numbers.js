/*global Object, window, document, ns, math*/
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

    var EditableView = $.EditableView = function(model, container, options){
        Observable.call(this);
        this.options = extend(options || {}, { editing : false });
        this.model = model;
        this.container = container;
        this.editing = false;
        this.on('mode changed', this.visibility.bind(this));
        this.model.on('n', this.update.bind(this));
        this.visibility();
        this.update(this.model.n);
    };
    EditableView.prototype = Object.create(Observable.prototype);
    EditableView.prototype.constructor = EditableView;
    EditableView.prototype.toggleEditing = function(){
        this.setEditing(!this.editing);
    };
    EditableView.prototype.startEditing = function(){
        this.setEditing(true);
    };
    EditableView.prototype.stopEditing = function(){
        this.setEditing(false);
    };
    EditableView.prototype.setEditing = function(editing){
        this.editing = editing;
        this.signal('mode changed', this.editing);
    };
    EditableView.prototype.visibility = function(){
        this.view().setAttribute('style', 'display: ' + (this.editing ? 'none' : 'inline'));
        this.input().setAttribute('style', 'display: ' + (this.editing ? 'inline' : 'none'));
    };
    EditableView.prototype.update = function(n){
        this.view().innerText = n;
        this.input().value = n;
    };
    EditableView.prototype.view = function(){
        if (!this._view){
            var element = this._view = document.createElement('span');
            this.container.appendChild(element);
            element.addEventListener('click', this.startEditing.bind(this));
        }
        return this._view;
    };
    EditableView.prototype.input = function(){
        if (!this._input){
            var element = this._input = document.createElement('input');
            element.setAttribute('size', 3);
            element.setAttribute('class', 'editable number input');
            this.container.appendChild(element);
            var action = this.stopEditing.bind(this);
            ['blur', 'change'].forEach(function(event){
                element.addEventListener(event, action);
            });
            element.addEventListener('change', function(){
                var n = this.model.n;
                try {
                    this.model.set(parseInt(element.value));
                } catch (_) {
                    this.model.set(n);
                }
            }.bind(this));
        }
        return this._input;
    };
})(window.numbers = window.numbers || {}, ns.Observable, math);
