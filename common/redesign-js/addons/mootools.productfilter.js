/**
 * @author bengazzard
 */




(function($){

	this.Filter = new Class({
		Implements : [Events, Options],
		initialize : function(elements){
			this.elements = elements;
		},
		_initFilterObj :function(){
			this.elements.each(function(element, index){
				if ($type(element.retrieve('data'))==false) {

					element.store('data', new Hash(JSON.decode(element.get('title'))));
					element.removeProperty('title');
				}
			}.bind(this));
		},
		_initSortObj : function(keys){
			this.elements.each(function(element, index){
				if ($type(element.retrieve('data'))==false) {
					var hash = new Hash(JSON.decode(element.get('title')));
				} else {
					var hash = element.retrieve('data');
				}
				keys.each(function(value, index){
					element.store(value, hash[value]);
				});		
			}.bind(this));
		}
	}); 
	
	this.Filter.implement({
		setFilter: function(filter){	
			this.filter = new Hash(filter);
			
			this.elements.each(function(element, index){
				var arrTests = [];
				
				element.retrieve('data').each(function(value, key){
					if ($type(this.filter[key]) != 'null' || value != '') {
						arrTests.push(this[key].run([this.filter[key], value]))
					}
				}.bind(this));
				
				element.store('visible', arrTests);
				
			}.bind(this));

			this.filterComplete();
		},
		filterComplete: function(){
			this.elements.each(function(element, index){
			
				if((!element.retrieve('visible').contains(false))){
					element.setStyles({
						//'display':'block',
						'position':'relative',
						'left':''
					});		
				} else {
					element.setStyles({
						//'display':'none',
						'position':'absolute',
						'left':'-9999px'
					});	
				}
			
			})
		},
		filter_brands: function(formvalue, handsetvalue){
			return (formvalue == handsetvalue || formvalue == 'All') ? true : false;
		}, 
		filter_price: function(formvalue, handsetvalue){
			
			if(formvalue == 'All'){
				return true;
			} else {
				var arrvalues = formvalue.split('-')

				if(arrvalues.length > 1){
					return (handsetvalue.toFloat() >= arrvalues[0].toFloat() && handsetvalue.toFloat() <= arrvalues[1].toFloat()) ? true : false;
				} else {
					return (handsetvalue.toFloat() >= arrvalues[0].toFloat()) ? true : false;
				}
			}
			
		}, 
		filter_camera: function(formvalue, handsetvalue){
			return (formvalue == handsetvalue.toBool()) ? true : false;
		},
		filter_multimedia: function(formvalue, handsetvalue){
			return (formvalue == handsetvalue.toBool()) ? true : false;
		}, 
		filter_internet: function(formvalue, handsetvalue){
			return (formvalue == handsetvalue.toBool()) ? true : false;
		}, 
		filter_email: function(formvalue, handsetvalue){
			return (formvalue == handsetvalue.toBool()) ? true : false;
		}, 
		filter_touchscreen: function(formvalue, handsetvalue){
			return (formvalue == handsetvalue.toBool()) ? true : false;
		}, 
		filter_gps: function(formvalue, handsetvalue){
			return (formvalue == handsetvalue.toBool()) ? true : false;
		}, 
		filter_style: function(formvalue, handsetvalue){
			return (formvalue == handsetvalue || formvalue == 'All') ? true : false;
		}
	});
	
	this.Filter.implement({
		setSort: function(filter){
			var hash = new Hash(filter);
			this.key = hash.getKeys()[0];
			this.dir = hash.getValues()[0];

			var arr = this.elements;
						
			switch(this.key){
				case 'filter_price' : arr.sort(this.sortNumeric.bind(this)); break;
				case 'filter_brands' : arr.sort(this.sortLiteral.bind(this)); break;
			}		
			
			arr.each(function(element, index){ element.inject($('handsets')); });
		},
		sortNumeric : function(a,b){
			var objA = a.retrieve('data');
			var objB = b.retrieve('data');
			return (this.dir == 'up') ? objB[this.key].toFloat() - objA[this.key].toFloat() : objA[this.key].toFloat() - objB[this.key].toFloat();
		},
		sortLiteral : function(a,b){
			var objA = a.retrieve('data');			
			var objB = b.retrieve('data');
			if(this.dir == 'up'){
				return (objA[this.key] < objB[this.key]) - (objB[this.key] < objA[this.key]); 
			} else {
				return (objB[this.key] < objA[this.key]) - (objA[this.key] < objB[this.key]); 
			}
		}
	});

	this.SortInterface = new Class({
		Extends: this.Filter,
		options: {
			elements: $$('.phone')
		},
		initialize : function(element, options){
			this.setOptions(options);
			this.parent(this.options.elements);
			
			var form = element;
				
			var arrForm = ['input[type="radio"]', 'input[type="checkbox"]', 'select'];
			var arrElements = [];

			arrForm.each(function(value){
				arrElements.combine(form.getElements(value))
			});
		
			this.filters = $$(arrElements);
			this._assignEvents();
			this._initSortObj();
		},
		_initSortObj: function(){ 
			var keys = this.filters.get('title')
			keys = keys.unique();
			this.parent(keys); 
		},
		_assignEvents: function(){
			this.filters.each(function(element, index){
				switch(element.get('tag')){
					case 'select':
						element.addEvent('change', this._selectHandler.bindWithEvent(this));
						break; 
				}
			}.bind(this));
		},
		_selectHandler : function(event){
			if($(event.target).get('value')=='0') return;
			
			var value = $(event.target).get('value').split('-');
			var obj = {}
			obj[value[0]] = value[1]
			this.setSort(obj)
		}
	});


	this.FilterInterface = new Class({
		Extends: this.Filter,
		options: {
			elements : $$('.phone')
		},
		initialize: function(element, options){
			this.setOptions(options);
			this.parent(this.options.elements);
			
			var form = element;

			var arrForm = ['input[type="radio"]', 'input[type="checkbox"]', 'select'];
			var arrElements = [];

			arrForm.each(function(value){
				arrElements.combine(form.getElements(value))
			});
		
			this.filters = $$(arrElements);
			this.update = $(this.options.update)
			this.filter = new Hash({});
			this._assignEvents();
			this._initFilterObj();
			
			this.update.set('html', this.options.elements.length)
			
		},
		_initFilterObj: function(){
			this.parent();

			var keys = this.filters.get('name')
			keys = keys.unique();

			keys.each(function(value, index){
				var element = $$('input[name="'+value+'"]')[0];
				switch(element.get('type')){
					case 'radio':
						$$('input[name="' + element.get('name') + '"]').each(function(elements, index){
							if(elements.get('checked')){
								this.filter[elements.get('name')] = elements.get('value');
							}
						}.bind(this));
						break; 
					case 'checkbox':
						if(element.get('checked')) this.filter[element.get('name')] = element.get('checked');
						break;
				}
			}.bind(this));			
			
		},
		_assignEvents : function(){
			this.filters.each(function(element, index){
				switch(element.get('type')){
					case 'radio':
						element.addEvent('click', this._radioHandler.bindWithEvent(this));
						break; 
					case 'checkbox':
						element.addEvent('click', this._checkboxHandler.bindWithEvent(this));
						break; 
				}
			}.bind(this));

			$('clear-filter').addEvent('click', this._resetFormHandler.bindWithEvent(this))
		},
		_radioHandler : function(event){
			$$('input[name="' + event.target.get('name') + '"]').each(function(element, index){
				if(element.get('checked')){
					this.filter[element.get('name')] = element.get('value');
				}
			}.bind(this));
			this.setFilter(this.filter);
			this._getActive();
		},
		_checkboxHandler : function(event){
			this.filter[event.target.get('name')] = event.target.get('checked');
			//this._initFilterObj();
			this.setFilter(this.filter);
			this._getActive();
		},
		_resetFormHandler : function(event){
			event.stop();
			this.elements.each(function(element, index){
				element.setStyles({
					'position':'relative',
					'left':''
				});	
			});
			
			this.filters.each(function(element, index){
				if(element.get('type')=='radio' && element.get('value')=='All'){
					element.set('checked', 'checked');
				} else {
					element.removeProperty('checked');
				}		
			})
			
			this._initFilterObj();
			
			this._getActive();
		},
		_getActive: function(){
			var active = 0;
			this.elements.each(function(element, index){
				if(element.getStyle('left') != '-9999px'){
					active += 1;
				}
			});
			this.update.set('html', active);
			
			if(active == 0){
				$('no-phones').setStyle('display','block');	
			} else {
				$('no-phones').setStyle('display','none');	
			}
		}
	});
	
	Element.implement({
		filtering: function(options){
			return new FilterInterface(this, options);
		},
		sort: function(options){
			return new SortInterface(this, options);
		}
	});

})(document.id);