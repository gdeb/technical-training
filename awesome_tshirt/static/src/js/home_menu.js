
odoo.define('awesome_tshirt.HomeMenu', function (require) {
"use strict";

var HomeMenu = require('web_enterprise.HomeMenu');

HomeMenu.include({
    /**
     * Overrides to load the custom message to display.
     *
     * @override
     */
    willStart: function () {
        var self = this;
        var superDef = this._super.apply(this, arguments);
        var messageDef = this._rpc({
            route: '/awesome_tshirt/bafienistalkingtoyou',
        }).then(function (message) {
            self.message = message;
        });
        return $.when(superDef, messageDef);
    },
    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    /**
     * @override
     * @private
     */
    _render: function () {
        this._super.apply(this, arguments);
        var $message = $('<div>', {
            class: 'p-2 alert-warning',
        }).text(this.message);
        this.$el.prepend($message);
    },
});

});
