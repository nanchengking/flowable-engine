/*
 * Activiti app component part of the Activiti project
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */


/**
 * Init namespaces
 */
if(!ORYX) {var ORYX = {};}
if(!ORYX.Core) {ORYX.Core = {};}
if(!ORYX.Core.StencilSet) {ORYX.Core.StencilSet = {};}

/**
 * Class Stencil
 * uses Prototpye 1.5.0
 * uses Inheritance
 */
ORYX.Core.StencilSet.ComplexPropertyItem = Clazz.extend({

	/**
	 * Constructor
	 */
	construct: function(jsonItem, namespace, property) {
		arguments.callee.$.construct.apply(this, arguments);

		if(!jsonItem) {
			throw "ORYX.Core.StencilSet.ComplexPropertyItem(construct): Parameter jsonItem is not defined.";
		}
		if(!namespace) {
			throw "ORYX.Core.StencilSet.ComplexPropertyItem(construct): Parameter namespace is not defined.";
		}
		if(!property) {
			throw "ORYX.Core.StencilSet.ComplexPropertyItem(construct): Parameter property is not defined.";
		}
		
		this._jsonItem = jsonItem;
		this._namespace = namespace;
		this._property = property;
		this._items = new Hash();
		this._complexItems = new Hash();
		
		//init all values
		if(!jsonItem.name) {
			throw "ORYX.Core.StencilSet.ComplexPropertyItem(construct): Name is not defined.";
		}
		
		if(!jsonItem.type) {
			throw "ORYX.Core.StencilSet.ComplexPropertyItem(construct): Type is not defined.";
		} else {
			jsonItem.type = jsonItem.type.toLowerCase();
		}
		
		if(jsonItem.type === ORYX.CONFIG.TYPE_CHOICE) {
			if(jsonItem.items && jsonItem.items instanceof Array) {
				jsonItem.items.each((function(item) {
					this._items[item.value] = new ORYX.Core.StencilSet.PropertyItem(item, namespace, this);
				}).bind(this));
			} else {
				throw "ORYX.Core.StencilSet.Property(construct): No property items defined."
			}
		} else if(jsonItem.type === ORYX.CONFIG.TYPE_COMPLEX) {
			if(jsonItem.complexItems && jsonItem.complexItems instanceof Array) {
				jsonItem.complexItems.each((function(complexItem) {
					this._complexItems[complexItem.id] = new ORYX.Core.StencilSet.ComplexPropertyItem(complexItem, namespace, this);
				}).bind(this));
			} else {
				throw "ORYX.Core.StencilSet.Property(construct): No property items defined."
			}
		}
	},

	/**
	 * @param {ORYX.Core.StencilSet.PropertyItem} item
	 * @return {Boolean} True, if item has the same namespace and id.
	 */
	equals: function(item) {
		return (this.property().equals(item.property()) &&
			this.name() === item.name());
	},

	namespace: function() {
		return this._namespace;
	},

	property: function() {
		return this._property;
	},

	name: function() {
		return ORYX.Core.StencilSet.getTranslation(this._jsonItem, "name");
	},
	
	id: function() {
		return this._jsonItem.id;
	},
	
	type: function() {
		return this._jsonItem.type;
	},
	
	optional: function() {
		return this._jsonItem.optional;
	},
	
	width: function() {
		return this._jsonItem.width;
	},
	
	value: function() {
		return this._jsonItem.value;
	},
	
	items: function() {
		return this._items.values();
	},
	
	complexItems: function() {
		return this._complexItems.values();
	},
	
	disable: function() {
		return this._jsonItem.disable;
	}
});