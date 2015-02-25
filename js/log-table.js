/*global window, document, util*/
;(function($, extend){
    'use strict';

    function range(low, high) {
        var result = [];
        for (var number = low; number < high; number++){
            result.push(number);
        }
        return result;
    }

    function addCell(row, data){
        var cell = document.createElement('td');
        row.appendChild(cell);
        cell.innerHTML = data;
    }

    function addRow(table, data){
        var row = document.createElement('tr');
        table.appendChild(row);
        data.forEach(function(cellData){
            addCell(row, cellData);
        });
    }

    var LogTableView = $.LogTableView = function(model, container, options){
        this.options = extend(options || {}, {
            'rows': 10,
            'delta': 0.01,
            'dataTransformer': function(number){ return [number.toFixed(2)]; }
        });
        this.model = model;
        this.container = container;
        this.model.on('n', this.update.bind(this));
        this.update();
    };
    LogTableView.prototype.update = function(){
        var table = this.table();
        table.innerHTML = '';
        range(0, this.options.rows)
            .map(function(index){
                return index - this.options.rows/2;
            }.bind(this))
            .map(function(offset){
                return offset * this.options.delta;
            }.bind(this))
            .map(function(delta){
                return this.model.n + delta;
            }.bind(this))
            .forEach(function(number){
                addRow(table, this.options.dataTransformer(number));
            }.bind(this));
    };
    LogTableView.prototype.table = function(){
        if (!this._table){
            var table = this._table = document.createElement('table');
            this.container.appendChild(table);
        }
        return this._table;
    };

})(window.logarithm = window.logarithm || {}, util.extend);
