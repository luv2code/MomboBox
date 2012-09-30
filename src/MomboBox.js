/*
 * MomboBox
 * https://github.com/luv2code/MomboBox
 *
 * Copyright (c) 2012 Matthew Taylor
 * Licensed under the MIT, GPL licenses.
 */

(function($) {
    var defaults = {
        data: []
    };
    // Collection method.
    $.fn.momboBox = function(options) {
        var options = $.extend({}, defaults, options);
        return this.each(function() {
            if(this.nodeName !== 'INPUT') {
                throw new Error("the momboBox plugin only works on input elements");
            }
            var $input = $(this);
            this.momboBox = {
                data: options.data
            };
        });
    };

}(jQuery));
