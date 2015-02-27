;(function(math, undefined){
    /* Tidbits of mathematical utility */
    math.div = function(a,b){
        return Math.floor(a/b);
    }

    math.digits = function(n, b){
        var b = b || 10;
        var q = math.div(n, b);
        if (q > 0){
            return math.digits(math.div(n, b), b).concat([n % b]);
        }
        return [n];
    };
})(window.math = window.math || {})
