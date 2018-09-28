# Odoo 12.0 - Technical Training - Module 3
===========================================

# Creating a new view

## Scenario

The tasks in this module are sequentially dependant. The goal of this module is
to learn how to create a new view, from scratch.

The marketing department want to be able to look at the customer data, displayed
on a map view, to be able to better target them. So, we will create a new view
type.

The arch should look like this:

    <map latitude="some_field" longitude="some_other_field">
        <field name="field1"/>
        <field name="field2"/>
        <template>
            <div>... <t t-esc="record.field1"/>
            </div>
        </template>
    </map>

In this code, the latitude and longitude attributes should describe a float field.
The template tag is a small qweb template, which should be rendered on a marker
at the corresponding record location.  The field tags determine which fields
should be fetched.


## Task 1: hello world view

Goals:
------
- understand how to add a new view type in python
- understand initial plumbing for a view
- use view registry

Description:
------------
- Start with the initial code from awesome_map
- install the awesome_map module
- read it and understand what each file is doing
- add a map view to the customer main action
- install base_geolocalize (if not already installed) and geolocalize a few
  customers
- modify the renderer to display a message 'hello world'

Resources:
----------
* [View architecture](https://www.odoo.com/documentation/12.0/reference/javascript_reference.html#views)
* [Creating a new view from scratch](https://www.odoo.com/documentation/12.0/reference/javascript_cheatsheet.html#creating-a-new-view-from-scratch)


## Task 2: fetching data

Goals:
------
- work with the AbstractModel api
- fetch data
- understand what AbstractView api

Description:
------------
We need data to display! We need to load data in the MapModel.

- parse arch in the MapView class, extract latitude and longitude fields and
  give them to the model
- load data for the current context/domain/groupby, read latitude/longitude
  and other fields
- display in the renderer a JSON.stringified version of the data loaded by the
  model, to check that the data is properly transmitted to the renderer.

Resources:
----------
* [AbstractModel API](https://github.com/odoo/odoo/blob/57decbbed6d3d8899b09a58361ae9b30d39a9c03/addons/web/static/src/js/views/abstract_model.js)


## Task 3: use an external library (leaflet)

Goals:
------
- start integrating a library
- lazy load assets
- understand main entry point of AbstractRenderer

Description:
------------
- add leaflet css/js assets to the dependency handling of the MapView (lazy
  loading)
- implement a basic render method in the renderer, which displays a map view.

Resources:
----------
- [Leaflet library](https://leafletjs.com/)
- [AbstractRenderer](https://github.com/odoo/odoo/blob/57decbbed6d3d8899b09a58361ae9b30d39a9c03/addons/web/static/src/js/views/abstract_renderer.js)


## Task 4: connect renderer with proper data

Goals:
------
- display current data in the map view

Description:
------------
- Use the leaflet API to add markers to each data point currently loaded
- render the proper template for each data point


## Task 5: make sure data is synchronized with search view

Goals:
------
- understand the flow of control with search view
- understand main entry points in AbstractController (update)

Description:
------------
- change the search view and see that the map view is not updated
- make it work, by implementing the proper method

Resources:
----------
- [AbstractController API](https://github.com/odoo/odoo/blob/57decbbed6d3d8899b09a58361ae9b30d39a9c03/addons/web/static/src/js/views/abstract_controller.js)


## Task 6: switch to the form view when clicking on marker

Goals:
------
- learn how to switch to a form view for a specific record id

Description:
------------
- add an event handler in the proper place
- when clicking on a pin, it should switch to a form view


## Task 7: implement custom control panel buttons

Goals:
------
- add buttons to the control panel

Description:
------------
- add two custom buttons in the control panel, clicking on them should zoom in
  or out of the map view


