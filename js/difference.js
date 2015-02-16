/*global window, document*/
(function($){
    'use strict';

    var differencor = function(current){
        return function(result, number){
            result.push(number - current);
            current = number;
            return result;
        };
    };
    var difference = function(values){
        var reducer = differencor(values[0]);
        return values.slice(1).reduce(reducer, []);
    };
    var allZero = function(values){
        return values.reduce(function(result, value){ return result && value === 0; }, true);
    };

    var Model = $.Model = function(values){
        this.values = values;
    };
    Model.prototype.table = function(){
        var result = []; var current = this.values.slice(0);
        while(!allZero(current)) {
            result.push(current);
            current = difference(current);
        }
        return result;
    };

    var domTable = function(data){
        var domTable = document.createElement('table');
        data.forEach(function(row, index){
            addRow(domTable, row, index);
        });
        return domTable;
    };
    var addRow = function(domTable, row, start){
        domTable.appendChild(domRow(row, start));
    };
    var domRow = function(row, start){
        var domRow = document.createElement('tr');
        var index = 0;
        while (index++ < start) {
            addCell(domRow, '&nbsp;');
        }
        row.forEach(function(data){
            addCell(domRow, data);
            addCell(domRow, '&nbsp;');
        });
        return domRow;
    };
    var addCell = function(domRow, data){
        domRow.appendChild(domCell(data));
    };
    var domCell = function(data){
        var domCell = document.createElement('td');
        domCell.innerHTML = data;
        return domCell;
    };

    var View = $.View = function(model, container){
        this.model = model;
        this.container = container;
        this.update();
    };
    View.prototype.update = function(){
        var container = this.container;
        container.appendChild(domTable(this.model.table()));
    };
})(window.difference = window.difference || {});
