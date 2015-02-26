/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var base_url = "http://www.pineconetassel.com/sitelertest/";
var worker_signedin = false;
var customer_signedin = false;
var customer_uname;
var customer_upass;
var worker_uname;
var worker_upass;
var uname_record;
var upass_record;
var siteler_id;
var cdata;
//object for customer profile
var xcm = new Object();
var xcp = new Object();
//object for worker profile
var xwm = new Object();
var xwp = new Object();





var db;

var droptable = false;



var app = {
	// Application Constructor
	initialize : function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents : function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicity call 'app.receivedEvent(...);'
	onDeviceReady : function() {
	
		console.log(navigator.notification);
      //  console.log(FileTransfer);
		var map = plugin.google.maps.Map.getMap();

  		//loadPage(map, "welcome");
  		// loadPage(map, "marker1");

    	loadPage(map, "jobmap");

	//	load_worker_job_map();

		app.receivedEvent('deviceready');
							
							
	//	window.location = '#worker_menu_page';

	},

	// Update DOM on a Received Event
	receivedEvent : function(id) {

		var parentElement = document.getElementById(id);
		console.log('Received Event: ' + id);

	},

	showAlert : function(message, title) {
		if (navigator.notification) {
			navigator.notification.alert(message, null, title, 'OK');
		} else {
			alert( title ? (title + ": " + message) : message);
		}
	},
	
	

};
