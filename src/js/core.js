(function(){

	'use strict';

	/*=include column_manager.js */
	/*=include column.js */
	/*=include row_manager.js */
	/*=include row.js */
	/*=include cell.js */

	window.Tabulator = {

			columnManager:null, // hold Column Manager
			rowManager:null, //hold Row Manager

			config:{ //config object for holding all table setup options

			},

	 		//setup options
	 		options: {

	 		},

	 		//constructor
	 		_create: function(){
	 			var self = this,
	 			element = this.element;

	 			self.columnManager = new ColumnManager(self.config);
	 			self.rowManager = new RowManager(self.config);

	 			self.columnManager.setRowManager(self.rowManager);
	 			self.rowManager.setColumnManager(self.columnManager);


	 			if(element.is("table")){
	 				self._parseTable();
	 			}else{
	 				self._buildElement();
	 			}
	 		},

	 		//build tabulator element
	 		_buildElement: function(){
	 			var self = this,
	 			element = this.element;

	 			options.tableBuilding();

	 			self._configureTable();

	 			element.addClass("tabulator").attr("role", "grid");
	 			element.empty();

	 			element.append(self.columnManager.getElement());

	 			element.append(self.rowManager.getElement());
	 		},

	 		//configure the table
	 		_configureTable: function(){
	 			var config = this.config;

	 			config.options = this.options;

	 			config.element = this.element;

	 			//setup persistent layout storage if needed
	 			if(config.options.persistentLayout){
	 				//determine persistent layout storage type
	 				config.options.persistentLayout = config.options.persistentLayout !== true ?  config.options.persistentLayout : (typeof window.localStorage !== 'undefined' ? "local" : "cookie");

	 				//set storage tag
	 				config.options.persistentLayoutID = "tabulator-" + (config.options.persistentLayoutID ? config.options.persistentLayoutID : self.element.attr("id") ? self.element.attr("id") : "");
	 			}

	 			//set column min width
	 			config.options.colMinWidth = isNaN(config.options.colMinWidth) ? config.options.colMinWidth : config.options.colMinWidth + "px";

	 			//set table height
	 			if(config.options.height){
	 				config.options.height = isNaN(config.options.height) ? config.options.height : config.options.height + "px";
	 				element.css({"height": config.options.height});
	 			}
	 		},



	 		//set options
	 		_setOption: function(option, value){
	 			var self = this;

	 		},

	 		//alert user that the plugin they are trying to use is missing
	 		missingPlugin:function(plugin){
	 			console.error("Tabulator Plugin Not Installed: " + plugin);
	 		},

	 		//deconstructor
	 		_destroy: function(){
	 			var element = this.element;

	 			element.empty();

	 			element.removeClass("tabulator");
	 		},
	 };


	 /*=include extensions_enabled.js */

 })();