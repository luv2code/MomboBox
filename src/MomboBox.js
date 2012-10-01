/*
 * MomboBox
 * https://github.com/luv2code/MomboBox
 *
 * Copyright (c) 2012 Matthew Taylor
 * Licensed under the MIT, GPL licenses.
 */

(function($) {
    var defaults = {
        data: [],
        templates: {
            buttonTemplate: '<button class="mombobutton">↓</button>',
            itemTemplate: '<a class="item">{item}</a>',
            menuTemplate: '<div class="mombomenu"></div>',
            render: function(tmpl, value, token) {
                return tmpl.replace('{'+token+'}', value);
            }
        },
        cssClasses: {
            matchingItem: 'match',
            selectedItem: 'selected',
            item: 'item',
            menu: 'mombomenu'
        },
        flags: {
            customItems:true,
            saveCustomItems:true,
            hideUnmatchedItems:true
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
                $items,
                $input = $(this),
                origValue = $input.val(),
                origValGet = $input.val,
                $button = $(momboBox.templates.buttonTemplate).insertAfter($input),
                $menu,
                offset = $input.offset(),
                top = offset.top + $input.outerHeight(),
                left = offset.left,
                renderMenu = function () {
                    $.each(momboBox.data, function (index, item) {
                        menuContent+= momboBox.templates.render(momboBox.templates.itemTemplate, item, 'item');
                    });
                    $menu.empty();
                    $items = $(menuContent).appendTo($menu);
                };
            $input.val = function (value, soft) {
                if(typeof value === 'string') {
                    origValue = !soft ? value : origValue;
                    return origValGet.call($input, value);
                } else {
                    return origValGet.call($input);
                }
            };
            //set up the elements
            $menu = $(momboBox.templates.menuTemplate)
                .insertAfter($button)
                .offset({top:top, left:left})
                .on('click', '.' + momboBox.cssClasses.item, function (ev) {
                    $input.val($(ev.target).text());
                    $menu.fadeOut('fast');
                    $items.removeClass(momboBox.cssClasses.matchingItem);
                })
                .on('mouseover', '.' + momboBox.cssClasses.item, function (ev) {
                    $items.removeClass(momboBox.cssClasses.selectedItem);
                    $(ev.target).addClass(momboBox.cssClasses.selectedItem);
                })
                .hide();

            renderMenu();

            //event bindings
            $(document).on('click',function () {
                if(!(
                    $input.is(':momboFocus') ||
                    $button.is(':momboFocus')
                )) {
                    $menu.fadeOut('fast');
                }
            });
            $button.on('click', function () {
                $input.focus();
            });

            $input
                .on('focus', function () {
                    $input.select();
                    $menu.show();
                })
                .on('keydown', function (ev) {
                    var $selected = $items.siblings('.' + momboBox.cssClasses.selectedItem),
                        index = 0,
                        last = $items.length - 1,
                        value,
                        top;
                    if(ev.which !== 27) {
                        $menu.show();
                    }
                    $selected.toggleClass(momboBox.cssClasses.selectedItem + ' ' + momboBox.cssClasses.matchingItem);
                    switch(ev.which) {
                        case 38 : //up arrow key
                            if($selected.length > 0) {
                                $items.each(function (i, item) {
                                    if(item === $selected.get(0)) {
                                        index = i === 0 ? last : index;
                                        value = $($items[index]).addClass(
                                            momboBox.cssClasses.selectedItem + ' ' +
                                            momboBox.cssClasses.matchingItem
                                        ).text();
                                        top = $($items[index]).position().top;
                                    }
                                    index = i;
                                });
                            } else {
                                value = $items.last().addClass(
                                    momboBox.cssClasses.selectedItem + ' ' +
                                    momboBox.cssClasses.matchingItem
                                ).text();
                                top = $items.last().position().top;
                            }
                            $input.val(value, true);
                            $menu.scrollTop(top);
                            break;
                        case 40 : //down arrow key
                            if($selected.length > 0) {
                                $items.each(function (i, item) {
                                    index = i + 1;
                                    if(item === $selected.get(0)) {
                                        index = i === last ? 0 : index;
                                        value = $($items[index]).addClass(
                                            momboBox.cssClasses.selectedItem + ' ' +
                                            momboBox.cssClasses.matchingItem
                                        ).text();
                                        top = $($items[index]).position().top;
                                    }
                                });
                            } else {
                                value = $items.last().addClass(
                                    momboBox.cssClasses.selectedItem + ' ' +
                                    momboBox.cssClasses.matchingItem
                                ).text();
                                top = $items.first().position().top;
                            }
                            $input.val(value, true);
                            $menu.scrollTop(top);
                            break;
                        case 27 : //escape
                            $menu.fadeOut('fast');
                            $input.val(origValue);
                            break;
                        case 9 : //tab
                            $menu.fadeOut('fast');
                            break;

                    }
                })
                .on('keyup', function (ev) {
                    var $match, rgx = new RegExp('('+$input.val()+')', 'i');
                    switch(ev.which) {
                        case 13 :
                            $match = $items.siblings('.' + momboBox.cssClasses.matchingItem);
                            if($match.length > 0) {
                                $input.val($match.first().text());
                                $menu.fadeOut('fast');
                            } else {
                                momboBox.data.push($input.val());
                                renderMenu();
                                $menu.scrollTop($items.last().position().top);
                            }
                            break;
                        default :
                            if(ev.which !== 38 && ev.which !== 40) {
                                $items.each(function (i, item) {
                                    var $item = $(item), text = $item.text();
                                    if(rgx.test(text)) {
                                        $item.addClass(momboBox.cssClasses.matchingItem);
                                    } else {
                                        $item.removeClass(momboBox.cssClasses.matchingItem);
                                    }
                                });
                                $match = $items.siblings('.' + momboBox.cssClasses.matchingItem).first();
                                if($match.length > 0) {
                                    $menu.scrollTop($match.position().top);
                                }
                            }
                            break;
                    }
                });
        });
    };
    $.expr[':'].momboFocus = function(elem) {
        return elem === document.activeElement && (elem.type || elem.href);
    };
}(jQuery));
