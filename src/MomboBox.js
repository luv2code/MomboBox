/*
 * MomboBox
 * https://github.com/luv2code/MomboBox
 *
 * Copyright (c) 2012 Matthew Taylor
 * Licensed under the MIT, GPL licenses.
 */

(function($) {
    function render(tmpl, value, token) {
        return tmpl.replace('{'+token+'}', value);
    }
    var defaults = {
        data: [],
        templates: {
            buttonTemplate: '<button class="mombobutton">↓</button>',
            itemTemplate: '<a class="item">{item}</a>',
            menuTemplate: '<div class="mombomenu">{menu}</div>',
            render: render
        },
        cssClasses: {
            matchingClass: 'match',
            selectedClass: 'selected'
        }
    };
    // Collection method.
    $.fn.momboBox = function(options) {
        return this.each(function() {
            if(this.nodeName !== 'INPUT') {
                throw new Error("the momboBox plugin only works on input elements");
            }
            var momboBox = this.momboBox = $.extend({}, defaults, options),
                menuContent = '',
                $input = $(this),
                $button = $(momboBox.templates.buttonTemplate).insertAfter($input),
                $menu,
                offset = $input.offset(),
                top = offset.top + $input.outerHeight(),
                left = offset.left;
            $.each(momboBox.data, function (index, item) {
                menuContent+= momboBox.templates.render(momboBox.templates.itemTemplate, item, 'item');
            });
            $menu = $(momboBox.templates.render(momboBox.templates.menuTemplate, menuContent, 'menu'))
                .insertAfter($button)
                .offset({top:top, left:left})
                .hide();
            ComboBox({input:$input.get(0), menu:$menu.get(0), button:$button.get(0)});
        });
    };

}(jQuery));
