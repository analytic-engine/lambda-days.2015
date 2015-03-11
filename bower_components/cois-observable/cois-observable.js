;(function(ns, undefined){
    var preconditions = [
	{
	    'predicate': function(callback){ return callback != undefined; },
	    'message': 'observer is undefined'
	},
	{
	    'predicate': function(callback){ return typeof callback == 'function'; },
	    'message': 'observer is not a function'
	}
    ];

    var Observable = ns.Observable = function(){
	this.observers = {};
    };
    Observable.prototype.on = function(event, callback){
	preconditions.forEach(function(precondition){
	    if (!precondition.predicate(callback)){
		throw new Error(precondition.message);
	    }
	});
	(this.observers[event] = this.observers[event] || []).push(callback);
    };
    Observable.prototype.signal = function(event){
	var args = Array.prototype.slice.call(arguments, 1);
	(this.observers[event] || []).forEach(function(observer){
	    observer.apply(this, args);
	}.bind(this));
    };
})(window.ns = window.ns || {})
