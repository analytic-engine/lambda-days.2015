;(function(util, undefined){
    /* A custom extend function */
    util.extend = function(){
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
})(window.util = window.util || {})
