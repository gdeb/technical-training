odoo.define('awesome_tshirt.order_kanban_view', function (require) {
"use strict";

var core = require('web.core');
var KanbanController = require('web.KanbanController');
var KanbanView = require('web.KanbanView');
var view_registry = require('web.view_registry');

var _lt = core._lt;
var QWeb = core.qweb;


var OrderKanbanController = KanbanController.extend({
    events: {
        'click .o_customer': '_onCustomerClicked',
    },

    /**
     * @override
     */
    willStart: function () {
        var def1 = this._super.apply(this, arguments);
        var def2 = this._loadCustomers();
        return $.when(def1, def2);
    },
    /**
     * @override
     */
    start: function () {
        this.$el.addClass('o_order_kanban_view');
        return this._super.apply(this, arguments);
    },

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    /**
     * @override
     */
    reload: function (params) {
        if (this.activeCustomerID) {
            params = params || {};
            params.domain = [['customer_id', '=', this.activeCustomerID]];
        }
        var def1 = this._super(params);
        var def2 = this._loadCustomers();
        return $.when(def1, def2);
    },

    //--------------------------------------------------------------------------
    // Private
    //--------------------------------------------------------------------------

    /**
     * @private
     * @returns {Deferred}
     */
    _loadCustomers: function () {
        var self = this;
        return this._rpc({
            route: '/web/dataset/search_read',
            model: 'res.partner',
            fields: ['display_name'],
            domain: [['']],
        }).then(function (result) {
            self.customers = result.records;
        });
    },
    /**
     * @override
     */
    _update: function () {
        var self = this;
        return this._super.apply(this, arguments).then(function () {
            self.$('.o_kanban_view').prepend(QWeb.render('OrderKanban.CustomerList', {
                activeCustomerID: self.activeCustomerID,
                customers: self.customers,
            }));
        });
    },

    //--------------------------------------------------------------------------
    // Handlers
    //--------------------------------------------------------------------------

    /**
     * @private
     * @param {MouseEvent} ev
     */
    _onCustomerClicked: function (ev) {
        this.activeCustomerID = $(ev.currentTarget).data('id');
        this.reload();
    },
});

var OrderKanbanView = KanbanView.extend({
    config: _.extend({}, KanbanView.prototype.config, {
        Controller: OrderKanbanController,
    }),
    display_name: _lt('Order Kanban'),
    icon: 'fa-th-list',
});

view_registry.add('order_kanban_view', OrderKanbanView);

});
