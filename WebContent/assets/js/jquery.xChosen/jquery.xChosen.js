/* jshint indent: 4 */
void function (global, factory) {
    'use strict';

    if (typeof Object.create !== 'function') {
        Object.create = function (object) {
            function F() {}

            F.prototype = object;
            return new F();
        };
    }

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }

}(this, function ($) {
    'use strict';

    var xChosen = {
        init: function ($target, options) {
            this.options = options;

            this._id = Date.now();

            this.$target = $target.hide();
            this.$children = $target.children('option');
            this.isMultiple = this.$target.is('[multiple]');

            this.listenEvents();
            this.launchEvent('beforeInit');

            this.launchEvent('beforeShow');
            this.showContainer();
            this.launchEvent('afterShow');

            this.showModal();
            this.launchEvent('afterInit');
        },

        listenEvents: function () {
            var $window = $(window);
            $window.on({
                'xChosen:afterShow': $.proxy(this.handleDeletion, this),
                'xChosen:afterInit': $.proxy(this.handleModal, this),
                'xChosen:onModalOpen': $.proxy(this.handleSelection, this),
                'xChosen:onChange': $.proxy(this.responseChange, this)
            });
        },

        launchEvent: function (eventName, eventData) {
            var event = $.Event('xChosen:' + eventName);
            this.$target.trigger(event, eventData);

            if (typeof this.options[eventName] === 'function') {
                this.options[eventName].call(this, event, eventData);
            }
        },

        extractItems: function () {
            var options = this.options;

            return this.$children.map(function () {
                var value = this.value;
                var isSelected = (function (self) {
                    if (self.getAttribute('selected') === "") {
                        return true;
                    } else {
                        return !!self.getAttribute('selected');
                    }
                })(this);


                return $('<' + options.itemTagName + '/>', {
                    'text': this.innerText,
                    'class': ['x-item', isSelected ? ' selected' : ''].join('')
                })
                    .data('x', { selected: isSelected, value: value })
                    .attr({
                        'data-x-selected': isSelected,
                        'data-x-value': value
                    });
            });
        },

        getItemsWith: function (condition) {
            return this.extractItems().filter(function () {
                return this.data('x')['selected'] === condition;
            });
        },

        getAllItems: function () {
            return $.merge(this.getItemsWith(true), this.getItemsWith(false));
        },

        showContainer: function () {
            this.$target.next('.x-wrapper').remove();

            this.$wrapper = $('<' + this.options.wrapperTagName + '>', {
                'class': this.options.wrapperClassName
            }).insertAfter(this.$target);

            this.$container = $('<' + this.options.containerTagName + '>', {
                'class': this.options.containerClassName
            }).appendTo(this.$wrapper);

            this.getItemsWith(true).prependTo(this.$container);

            this.$modalOpen = $('<span class="x-open"></span>')
                .text(this.options.openText)
                .appendTo(this.$container);
        },

        handleDeletion: function () {
            var self = this;
            self.$container.off('click');
            self.$container.on('click', '.x-item', function () {
                var $item = $(this);
                self.launchEvent('onChange', {
                    isToggle: false,
                    value: $item.data('x')['value'],
                    _id: self._id
                });
                $item.remove();
            });
        },

        handleSelection: function () {
            var self = this;
            self.$modalList.off('click');
            self.$modalList.on('click', '.x-item', function () {
                var $item = $(this);
                var state = $item.data('x-selected');
                self.launchEvent('onChange', {
                    isToggle: true,
                    value: $item.data('x')['value'],
                    _id: self._id
                });

                if (self.isMultiple) {
                    $item.toggleClass('selected')
                        .attr('data-x-selected', !state)
                        .data('x-selected', !state);
                } else {
                    self.$modalList.find('.x-item').removeClass('selected')
                        .attr('data-x-selected', false)
                        .data('x-selected', false);

                    $item.addClass('selected')
                        .attr('data-x-selected', true)
                        .data('x-selected', true);
                }
            });
        },

        responseChange: function (event, data) {
            if (data._id === this._id) {
                var child = this.$children.filter(function () {
                    return this.value === data.value;
                });

                if (this.isMultiple) {
                    child.attr('selected', function (idx, val) {
                        return !val;
                    });
                } else {
                    this.$children.attr('selected', false);
                    child.attr('selected', data.isToggle);
                }
            }
        },

        getBackdrop: function () {
            var self = this;
            var backdrop = $('.x-backdrop').filter(function () {
                return $(this).data('_id') === self._id;
            });
            return backdrop.length === 0 ? undefined : backdrop;
        },

        showModal: function () {
            if (this.getBackdrop() === undefined) {
                $('<div class="x-backdrop"></div>')
                    .appendTo('body')
                    .data('_id', this._id)
                    .after(
                        $('<div class="x-modal"></div>')
                            .append($('<ul class="x-list"></ul>'))
                    );
            }

            this.$backdrop = this.getBackdrop();
            this.$modal = this.$backdrop.next('.x-modal');
            this.$modalList = this.$modal.find('.x-list');
            this.$modalClose = $('<span class="x-close"></span>')
                .text(this.options.closeText)
                .appendTo(this.$modal);
        },

        handleModal: function () {
            var self = this;
            $.each(['$modalOpen', '$backdrop', '$modalClose'], function (i) {
                self[this].off('click');
                self[this].on('click', function () {
                    self.updateListIn(i === 0 ? '$modalList' : '$container');
                    self.launchEvent(i === 0 ? 'onModalOpen' : 'onModalClose');
                    self.toggleModal();
                });
            });
        },

        updateListIn: function (where) {
            this[where].find('.x-item').remove();
            if (where === '$container') {
                this.getItemsWith(true).prependTo(this[where]);
            } else {
                this.getAllItems().prependTo(this[where]);
            }
        },

        toggleModal: function () {
            this.$backdrop.fadeToggle(200);
            this.$modal.slideToggle(200);
        }
    };

    $.fn.xChosen = function (options) {
        options = $.extend({}, $.fn.xChosen.defaults, options);
        return this.each(function () {
            Object.create(xChosen).init($(this), options);
        });
    };

    $.fn.xChosen.defaults = {
        wrapperTagName: 'div',
        wrapperClassName: 'x-wrapper',
        containerTagName: 'ul',
        containerClassName: 'x-container',
        itemTagName: 'li',
        openText: '打开选择窗口',
        closeText: '关闭选择窗口',
        beforeInit: function () {},
        beforeShow: function () {},
        afterShow: function () {},
        afterInit: function () {},
        onModalOpen: function () {},
        onModalClose: function () {},
        onChange: function () {}
    };
});
