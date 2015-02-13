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

/**
 * For debug purpose, catch JavaScript errors.
 */
window.onerror = function(message, file, line) {
	var error = [];
	error.push('---[error]');
	if ( typeof message == "object") {
		var keys = Object.keys(message);
		keys.forEach(function(key) {
			error.push('[' + key + '] ' + message[key]);
		});
	} else {
		error.push(line + ' at ' + file);
		error.push(message);
	}
	app.showAlert(error.join("\n"),"ERROR");
};

//global

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
var map;
//object for customer profile
var xcm = new Object();
var xcp = new Object();
//object for worker profile
var xwm = new Object();
var xwp = new Object();

var signin_status;
//sign in or not
var signin_locationcheck;
//location covered or not
var signin_remember;
//remember or not
var signin_utype;
//usertype

var signin_uname;
var signin_upass;
var worker_profile;
var customer_profile;

var map;
var db;
var city_list;
var myLocation;
var service_list = [{
	"abbr" : "ES",
	"fullname" : "Exterior Wash & Showroom",
	"price" : "34.95"
}, {
	"abbr" : "ESIS",
	"fullname" : "Exterior Wash & Showroom Interior Cleaning & Shampoo",
	"price" : "54.95"
}, {
	"abbr" : "EXIS",
	"fullname" : "Exterior Wash & Wax Interior Cleaning & Shampoo",
	"price" : "64.95"
}, {
	"abbr" : "ED",
	"fullname" : "Exterior Detail w\/ Interior Cleaning & Shampoo",
	"price" : "149.95"
}, {
	"abbr" : "ID",
	"fullname" : "Interior Detail w\/ Exterior Wash & Showroom",
	"price" : "149.95"
}, {
	"abbr" : "EID",
	"fullname" : "Interior & Exterior Complete Detail",
	"price" : "269.95"
}];
//default
//var mylat, mylng, mydate;
var color_list = ["Red", "White", "Black", "Blue", "Green", "Silver", "Other"];

//default car list
var vehicle_make = {
	"Acura" : ["CL", "Integra", "Legend", "MDX", "NSX", "RDX", "RL", "RSX", "SLX", "TL", "TSX", "Vigor", "ZDX"],
	"Alfa Romeo" : ["164", "Spider"],
	"Aptera" : ["2e", "Typ-1", "Type-1h"],
	"Aston Martin" : ["DB9", "DB9 Volante", "DBS", "Rapide", "V12 Vantage", "V8 Vantage", "V8 Vantage S", "Vanquish S", "Vantage", "Virage"],
	"Audi" : ["100", "200", "80", "90", "A3", "A4", "A5", "A6", "A7", "A8", "Allroad", "Cabriolet", "Coupe Quattro", "Q5", "Q7", "Quattro", "R8", "riolet", "RS 4", "RS 6", "RS4", "RS6", "S4", "S5", "S6", "S8", "TT", "V8"],
	"Bentley" : ["Arnage", "Azure", "Azure T", "Brooklands", "Continental", "Continental Flying Spur", "Continental GT", "Continental GTC", "Continental Super", "Mulsanne"],
	"BMW" : ["1 Series", "3 Series", "325", "330", "5 Series", "525", "530", "545", "550", "6 Series", "645", "650", "7 Series", "745", "750", "760", "8 Series", "Alpina B7", "M", "M Roadster", "M3", "M5", "M6", "X3", "X5", "X5 M", "X6", "X6 M", "Z3", "Z4", "Z4 M", "Z4 M Roadster", "Z8"],
	"Bugatti" : ["Veyron"],
	"Buick" : ["Century", "Coachbuilder", "Electra", "Enclave", "Estate", "Hearse", "LaCrosse", "LeSabre", "Lucerne", "Park Avenue", "Rainier", "Reatta", "Regal", "Rendezvous", "Riviera", "Roadmaster", "Skylark", "Terraza", "Verano"],
	"Cadillac" : ["Allante", "Brougham", "Catera", "CTS", "CTS-V", "DeVille", "DTS", "Eldorado", "Escalade", "Escalade ESV", "Escalade EXT", "Fleetwood", "Seville", "Sixty Special", "SRX", "STS", "STS-V", "XLR", "XLR-V"],
	"Chevrolet" : ["1500", "2500", "3500", "APV", "Astro", "Avalanche", "Avalanche 1500", "Avalanche 2500", "Aveo", "Beretta", "Blazer", "Camaro", "Caprice", "Caprice Classic", "Cavalier", "Classic", "Cobalt", "Cobalt SS", "Colorado", "Corsica", "Corvette", "Cruze", "Equinox", "Express", "Express 1500", "Express 2500", "Express 3500", "G-Series 1500", "G-Series 2500", "G-Series 3500", "G-Series G10", "G-Series G20", "G-Series G30", "HHR", "HHR Panel", "Impala", "Impala SS", "K5 Blazer", "Lumina", "Lumina APV", "Malibu", "Malibu Maxx", "Metro", "Monte Carlo", "Prizm", "S10", "S10 Blazer", "Silverado", "Silverado 1500", "Silverado 2500", "Silverado 3500", "Silverado 3500HD", "Silverado Hybrid", "Sonic", "Sportvan G10", "Sportvan G20", "Sportvan G30", "SSR", "Suburban", "Suburban 1500", "Suburban 2500", "Tahoe", "Tracker", "Trailblazer", "Traverse", "Uplander", "Venture", "Volt"],
	"Chrysler" : ["200", "300", "300C", "300M", "Aspen", "Cirrus", "Concorde", "Crossfire", "Crossfire Roadster", "Fifth Ave", "Grand Voyager", "Imperial", "LeBaron", "LHS", "New Yorker", "Pacifica", "Prowler", "PT Cruiser", "Sebring", "Town & Country", "Voyager"],
	"Corbin" : ["Sparrow"],
	"Daewoo" : ["Lanos", "Leganza", "Nubira"],
	"Daihatsu" : ["Charade", "Rocky"],
	"Dodge" : ["Avenger", "Caliber", "Caravan", "Challenger", "Charger", "Colt", "D150", "D150 Club", "D250", "D250 Club", "D350", "D350 Club", "Dakota", "Dakota Club", "Daytona", "Durango", "Dynasty", "Grand Caravan", "Intrepid", "Journey", "Magnum", "Monaco", "Neon", "Nitro", "Ram", "Ram 1500", "Ram 1500 Club", "Ram 2500", "Ram 2500 Club", "Ram 3500", "Ram 3500 Club", "Ram 50", "Ram Van 1500", "Ram Van 2500", "Ram Van 3500", "Ram Van B150", "Ram Van B250", "Ram Van B350", "Ram Wagon B150", "Ram Wagon B250", "Ram Wagon B350", "Ramcharger", "Shadow", "Spirit", "Sprinter", "Stealth", "Stratus", "Viper", "Viper RT\/10"],
	"Eagle" : ["Premier", "Summit", "Talon", "Vision"],
	"Ferrari" : ["430 Scuderia", "458 Italia", "599 GTB Fiorano", "612 Scaglietti", "California", "F430", "F430 Spider", "FF"],
	"FIAT" : ["500"],
	"Fiat" : ["Nuova 500"],
	"Foose" : ["Hemisfear"],
	"Ford" : ["Aerostar", "Aspire", "Bronco", "Bronco II", "C-MAX Hybrid", "Club Wagon", "Contour", "Crown Victoria", "E-350 Super Duty", "E-350 Super Duty Van", "E-Series", "E150", "E250", "E350", "Econoline E150", "Econoline E250", "Econoline E350", "Edge", "Escape", "Escort", "Escort ZX2", "Excursion", "Expedition", "Expedition EL", "Explorer", "Explorer Sport", "Explorer Sport Trac", "F-250 Super Duty", "F-350 Super Duty", "F-Series", "F-Series Super Duty", "F150", "F250", "F350", "F450", "Festiva", "Fiesta", "Five Hundred", "Flex", "Focus", "Focus ST", "Freestar", "Freestyle", "Fusion", "GT", "GT500", "Lightning", "LTD Crown Victoria", "Mustang", "Probe", "Ranger", "Taurus", "Taurus X", "Tempo", "Th!nk", "Thunderbird", "Transit Connect", "Windstar", "ZX2"],
	"Geo" : ["Metro", "Prizm", "Storm", "Tracker"],
	"GMC" : ["1500", "1500 Club Coupe", "2500", "2500 Club Coupe", "3500", "3500 Club Coupe", "Acadia", "Canyon", "Envoy", "Envoy XL", "Envoy XUV", "EV1", "Jimmy", "Rally Wagon 1500", "Rally Wagon 2500", "Rally Wagon 3500", "Rally Wagon G2500", "Rally Wagon G3500", "Safari", "Savana", "Savana 1500", "Savana 2500", "Savana 3500", "Savana Cargo Van", "Sierra", "Sierra 1500", "Sierra 2500", "Sierra 2500HD", "Sierra 3500", "Sierra 3500HD", "Sierra Denali", "Sierra Hybrid", "Sonoma", "Sonoma Club", "Sonoma Club Coupe", "Suburban 1500", "Suburban 2500", "Terrain", "Vandura 1500", "Vandura 2500", "Vandura 3500", "Vandura G1500", "Vandura G2500", "Vandura G3500", "Yukon", "Yukon Denali", "Yukon XL", "Yukon XL 1500", "Yukon XL 2500"],
	"Holden" : ["Monaro", "VS Commodore"],
	"Honda" : ["Accord", "Accord Crosstour", "Civic", "Civic GX", "Civic Si", "CR-V", "CR-Z", "Crosstour", "del Sol", "Element", "FCX Clarity", "Fit", "Insight", "Odyssey", "Passport", "Pilot", "Prelude", "Ridgeline", "S2000"],
	"HUMMER" : ["H1", "H2", "H3T"],
	"Hummer" : ["H2 SUT", "H2 SUV", "H3"],
	"Hyundai" : ["Accent", "Azera", "Elantra", "Entourage", "Equus", "Excel", "Genesis", "Genesis Coupe", "HED-5", "Santa Fe", "Scoupe", "Sonata", "Tiburon", "Tucson", "Veloster", "Veracruz", "XG300", "XG350"],
	"Infiniti" : ["EX", "FX", "G", "G25", "G35", "G37", "I", "IPL G", "J", "JX", "M", "Q", "QX", "QX56"],
	"Isuzu" : ["Amigo", "Ascender", "Axiom", "Hombre", "Hombre Space", "i-280", "i-290", "i-350", "i-370", "i-Series", "Impulse", "Oasis", "Rodeo", "Rodeo Sport", "Space", "Stylus", "Trooper", "VehiCROSS"],
	"Jaguar" : ["S-Type", "X-Type", "XF", "XJ", "XJ Series", "XK", "XK Series"],
	"Jeep" : ["Cherokee", "Comanche", "Commander", "Compass", "Grand Cherokee", "Liberty", "Patriot", "Wrangler"],
	"Kia" : ["Amanti", "Borrego", "Carens", "Forte", "Mentor", "Mohave\/Borrego", "Optima", "Rio", "Rio5", "Rondo", "Sedona", "Sephia", "Sorento", "Soul", "Spectra", "Spectra5", "Sportage"],
	"Lamborghini" : ["Aventador", "Countach", "Diablo", "Gallardo", null, null, null],
	"Land Rover" : ["Defender", "Defender 110", "Defender 90", "Defender Ice Edition", "Discovery", "Discovery Series II", "Freelander", "LR2", "LR3", "LR4", "Range Rover", "Range Rover Classic", "Range Rover Evoque", "Range Rover Sport", "Sterling"],
	"Lexus" : ["CT", "ES", "GS", "GX", "HS", "IS", "IS F", "IS-F", "LFA", "LS", "LS Hybrid", "LX", "RX", "RX Hybrid", "SC"],
	"Lincoln" : ["Aviator", "Blackwood", "Continental", "Continental Mark VII", "LS", "Mark LT", "Mark VII", "Mark VIII", "MKS", "MKT", "MKX", "MKZ", "Navigator", "Navigator L", "Town Car", "Zephyr"],
	"Lotus" : ["Elan", "Elise", "Esprit", "Evora", "Exige"],
	"Maserati" : ["228", "430", "Coupe", "Gran Sport", "GranSport", "GranTurismo", "Karif", "Quattroporte", "Spyder"],
	"Maybach" : ["57", "57S", "62", "Landaulet"],
	"Mazda" : ["323", "626", "929", "B-Series", "B-Series Plus", "B2500", "CX-5", "CX-7", "CX-9", "Familia", "Mazda2", "Mazda3", "Mazda5", "Mazda6", "Mazda6 5-Door", "Mazda6 Sport", "Mazdaspeed 3", "Mazdaspeed6", "Miata MX-5", "Millenia", "MPV", "MX-3", "MX-5", "MX-6", "Navajo", "Protege", "Protege5", "RX-7", "RX-8", "Tribute"],
	"McLaren" : ["MP4-12C"],
	"Mercedes-Benz" : ["190E", "300CE", "300D", "300E", "300SD", "300SE", "300SL", "300TE", "400E", "400SE", "400SEL", "500E", "500SEC", "500SEL", "500SL", "600SEC", "600SEL", "600SL", "C-Class", "CL-Class", "CL65 AMG", "CLK-Class", "CLS-Class", "E-Class", "G-Class", "G55 AMG", "GL-Class", "GLK-Class", "M-Class", "R-Class", "S-Class", "SL-Class", "SL65 AMG", "SLK-Class", "SLK55 AMG", "SLR McLaren", "SLS AMG", "SLS-Class", "Sprinter", "Sprinter 2500", "Sprinter 3500", "W201"],
	"Mercury" : ["Capri", "Cougar", "Grand Marquis", "Marauder", "Mariner", "Milan", "Montego", "Monterey", "Mountaineer", "Mystique", "Sable", "Topaz", "Tracer", "Villager"],
	"MINI" : ["Clubman", "Cooper", "Cooper Clubman", "Cooper Countryman", "Countryman", "MINI"],
	"Mitsubishi" : ["3000GT", "Challenger", "Chariot", "Diamante", "Eclipse", "Endeavor", "Expo", "Expo LRV", "Galant", "GTO", "i-MiEV", "L300", "Lancer", "Lancer Evolution", "Mighty Max", "Mighty Max Macro", "Mirage", "Montero", "Montero Sport", "Outlander", "Outlander Sport", "Pajero", "Precis", "Raider", "RVR", "Sigma", "Truck", "Tundra"],
	"Morgan" : ["Aero 8"],
	"Nissan" : ["200SX", "240SX", "300ZX", "350Z", "350Z Roadster", "370Z", "Altima", "Armada", "Cube", "Datsun\/Nissan Z-car", "Frontier", "GT-R", "JUKE", "Leaf", "Maxima", "Murano", "NV1500", "NV2500", "NV3500", "NX", "Pathfinder", "Pathfinder Armada", "Quest", "Rogue", "Sentra", "Stanza", "Titan", "Versa", "Xterra"],
	"Oldsmobile" : ["88", "98", "Achieva", "Alero", "Aurora", "Bravada", "Ciera", "Custom Cruiser", "Cutlass", "Cutlass Cruiser", "Cutlass Supreme", "Intrigue", "LSS", "Regency", "Silhouette", "Toronado"],
	"Other" : ["Other"],
	"Panoz" : ["Esperante"],
	"Peugeot" : ["207"],
	"Plymouth" : ["Acclaim", "Breeze", "Colt", "Colt Vista", "Grand Voyager", "Laser", "Neon", "Prowler", "Sundance", "Voyager"],
	"Pontiac" : ["6000", "Aztek", "Bonneville", "Daewoo Kalos", "Firebird", "Firebird Formula", "Firefly", "G3", "G5", "G6", "G8", "Grand Am", "Grand Prix", "Grand Prix Turbo", "GTO", "LeMans", "Montana", "Montana SV6", "Monterey", "Solstice", "Sunbird", "Sunfire", "Torrent", "Trans Sport", "Turbo Firefly", "Vibe"],
	"Porsche" : ["911", "928", "944", "968", "Boxster", "Carrera GT", "Cayenne", "Cayman", "Panamera"],
	"Ram" : ["1500", "2500", "3500", "C\/V", "Dakota"],
	"Rolls-Royce" : ["Ghost", "Phantom"],
	"Saab" : ["9-2X", "9-3", "9-4X", "9-5", "9-7X", "900", "9000"],
	"Saturn" : ["Astra", "Aura", "Ion", "L-Series", "Outlook", "Relay", "S-Series", "Sky", "VUE"],
	"Scion" : ["FR-S", "iQ", "tC", "xA", "xB", "xD"],
	"Smart" : ["Fortwo"],
	"Spyker" : ["C8 Double 12 S", "C8 Laviolette", "C8 Spyder", "C8 Spyder Wide Body"],
	"Spyker Cars" : ["C8"],
	"Subaru" : ["Alcyone SVX", "B9 Tribeca", "Baja", "BRZ", "Forester", "Impreza", "Impreza WRX", "Justy", "Legacy", "Loyale", "Outback", "Outback Sport", "SVX", "Tribeca", "XT"],
	"Suzuki" : ["Aerio", "Daewoo Lacetti", "Daewoo Magnus", "Equator", "Esteem", "Forenza", "Grand Vitara", "Kizashi", "Reno", "Samurai", "Sidekick", "SJ", "Swift", "SX4", "Verona", "Vitara", "X-90", "XL-7", "XL7"],
	"Tesla" : ["Model S", "Roadster"],
	"Toyota" : ["4Runner", "Avalon", "Camry", "Camry Hybrid", "Camry Solara", "Celica", "Corolla", "Cressida", "Echo", "FJ Cruiser", "Highlander", "Highlander Hybrid", "Ipsum", "Land Cruiser", "Matrix", "MR2", "Paseo", "Previa", "Prius", "Prius c", "Prius Plug-in", "Prius Plug-in Hybrid", "Prius v", "RAV4", "Sequoia", "Sienna", "Solara", "Supra", "T100", "T100 Xtra", "Tacoma", "Tacoma Xtra", "Tercel", "Tundra", "TundraMax", "Venza", "Xtra", "Yaris"],
	"Volkswagen" : ["Cabriolet", "CC", "Corrado", "Eos", "Eurovan", "Fox", "GLI", "Golf", "Golf III", "GTI", "Jetta", "Jetta III", "New Beetle", "Passat", "Phaeton", "R32", "Rabbit", "rio", "riolet", "Routan", "Tiguan", "Touareg", "Touareg 2", "Type 2"],
	"Volvo" : ["240", "740", "850", "940", "960", "C30", "C70", "S40", "S60", "S70", "S80", "S90", "V40", "V50", "V70", "V90", "XC60", "XC70", "XC90"]
}

//var customer_rating = ["5 stars", "4 stars","3 stars","2 stars", "1 start"];

var customer_company_id = 0;
var service_type;
var service_price = 0;
var discount_amount = 0;
var total_charge = 0;
var prom_code = '0000';
var appmt_id = 0;
// appointment id
var service_city;
var cervice_state;
var serviec_zip;

var droptable = false;

function readGPSdata() {
	//var lat1;

	var suc = function(p) {
		mylat = p.coords.latitude;
		mylng = p.coords.longitude;
		mydate = new Date(p.timestamp);
	//	alert(mylat);
	};
	var locFail = function() {
		var massage = "GPS location failure";
		app.showAlert(massage, "ERROR");
	};

	navigator.geolocation.getCurrentPosition(suc, locFail);

}

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
		app.receivedEvent('deviceready');

		console.log(navigator.notification);
		//  console.log(FileTransfer);
		//  console.log(FileTransfer);

		console.log(navigator.notification);
		//  console.log(FileTransfer);
		//alert(siteler_id);

		map = plugin.google.maps.Map.getMap();

		/*
		 $("#menulist").panel({
		 "close": onSideMenuClose,
		 "open": onSideMenuOpen
		 });

		 */
		$("#worker_menulist").panel({
			"close" : onSideMenuClose,
			"open" : onSideMenuOpen
		});

		$("#customer_menulist").panel({
			"close" : onSideMenuClose,
			"open" : onSideMenuOpen
		});

		//loadPage(map, "welcome_mapOptions");

		db = window.sqlitePlugin.openDatabase({
			name : "DB"
		});

		db.transaction(function(tx) {

			if (droptable)
				tx.executeSql('DROP TABLE IF EXISTS login_status');

			tx.executeSql('SELECT count(*) as cnt FROM sqlite_master WHERE type="table" AND name="login_status"', [], function(tx, res) {
				//alert("login_status count"+res.rows.item(0).cnt);

				if (res.rows.item(0).cnt === 0) {

					//utype: ["unknown","customer","worker"],
					//location: 0 -not in service area, 1 in service area
					//status: 0 -not sign up yet, 1 -signed up but not signed in, 2-signed in
					//remember: 0 - not remember, 1-remember login
					//appmntId: the latest appointmnt ID
					//uDate: the last login/out time

					//

					tx.executeSql('CREATE TABLE IF NOT EXISTS login_status (id integer primary key, uType text, location integer, status integer, remember integer, appmntId integer, uDate integer)');

					//var timestamp = new Date().getTime() / 1000;

					tx.executeSql("INSERT INTO login_status (id,  location, status, remember,appmntId, utype) VALUES (?,?,?,?,?,?)", [1, 0, 0, 0, 0 - 1, 'unknown'], function(tx, res) {

					}, function(e) {
						console.log("ERROR: " + e.message);
						app.showAlert(e.message, "DATABASE ERROR");
					});
				}

			});

			if (droptable)
				tx.executeSql('DROP TABLE IF EXISTS users');

		/*	tx.executeSql('SELECT count(*) as cnt FROM sqlite_master WHERE type="table" AND name="users"', [], function(tx, res) {
				//alert("users"+res.rows.item(0).cnt);
 
				if (res.rows.item(0).cnt === 0) {
					tx.executeSql('CREATE TABLE IF NOT EXISTS users (id integer primary key, sID text, uName text, uPass text, fName text, lName text, uDate integer, uType text)');

					var timestamp = new Date().getTime() / 1000;

					tx.executeSql("INSERT INTO users (uType, uDate) VALUES (?,?)", ["customer", parseInt(timestamp)], function(tx, res) {

					}, function(e) {
						console.log("ERROR: " + e.message);
						app.showAlert(e.message, "ERROR");
					});

					tx.executeSql("INSERT INTO users (uType, uDate) VALUES (?,?)", ["worker", parseInt(timestamp)], function(tx, res) {

					}, function(e) {
						console.log("ERROR: " + e.message);
						app.showAlert(e.message, "ERROR");
					}); 

				} 

			}); */

		/*	db.transaction(function(tx) {
				tx.executeSql("SELECT uName as uname, uPass as upass from users WHERE uType = 'worker'", [], function(tx, res) {
					worker_uname = res.rows.item(0).uname;
					worker_upass = res.rows.item(0).upass;
				}, function(e) {
					console.log("ERROR: " + e.message);
					app.showAlert(e.message, "ERROR");
				});
			});

			db.transaction(function(tx) {
				tx.executeSql("SELECT uName as uname, uPass as upass from users WHERE uType = 'customer'", [], function(tx, res) {
					customer_uname = res.rows.item(0).uname;
					customer_upass = res.rows.item(0).upass;

				}, function(e) {
					console.log("ERROR: " + e.message);
				});
			});
*/
		});

	/*	db.transaction(function(tx) {
			if (droptable)
				tx.executeSql('DROP TABLE IF EXISTS contacts');

			tx.executeSql('SELECT count(*) as cnt FROM sqlite_master WHERE type="table" AND name="contacts"', [], function(tx, res) {
				//alert("contacts"+res.rows.item(0).cnt);

				if (res.rows.item(0).cnt === 0) {
					tx.executeSql('CREATE TABLE IF NOT EXISTS contacts (id integer primary key, uType text, uwEmail text, upEmail text, uwPhone text, ucPhone text,uhPhone text)');

					tx.executeSql("INSERT INTO contacts (uType) VALUES (?)", ["customer"], function(tx, res) {

					}, function(e) {
						console.log("ERROR: " + e.message);
						app.showAlert(e.message, "ERROR");
					});

					tx.executeSql("INSERT INTO contacts (uType) VALUES (?)", ["worker"], function(tx, res) {

					}, function(e) {
						console.log("ERROR: " + e.message);
						app.showAlert(e.message, "ERROR");
					});

				}

			});

		});

		db.transaction(function(tx) {

			if (droptable)
				tx.executeSql('DROP TABLE IF EXISTS homeaddress');

			tx.executeSql('SELECT count(*) as cnt FROM sqlite_master WHERE type="table" AND name="homeaddress"', [], function(tx, res) {
				//alert("homeaddress"+res.rows.item(0).cnt);

				if (res.rows.item(0).cnt === 0) {
					tx.executeSql('CREATE TABLE IF NOT EXISTS homeaddress (id integer primary key, uType text, uhStreet text,uhCity text,uhState text,uhZip text)');

					tx.executeSql("INSERT INTO homeaddress (uType) VALUES (?)", ["customer"], function(tx, res) {

					}, function(e) {
						console.log("ERROR: " + e.message);
						app.showAlert(e.message, "ERROR");
					});

					tx.executeSql("INSERT INTO homeaddress (uType) VALUES (?)", ["worker"], function(tx, res) {

					}, function(e) {
						console.log("ERROR: " + e.message);
						app.showAlert(e.message, "ERROR");
					});

				}

			});

		});

		db.transaction(function(tx) {
			if (droptable)
				tx.executeSql('DROP TABLE IF EXISTS workaddress');

			tx.executeSql('SELECT count(*) as cnt FROM sqlite_master WHERE type="table" AND name="workaddress"', [], function(tx, res) {
				//	alert("workaddress"+res.rows.item(0).cnt);

				if (res.rows.item(0).cnt === 0) {
					tx.executeSql('CREATE TABLE IF NOT EXISTS workaddress (id integer primary key, uType text, uCompany text, ucStreet text,ucCity text,ucState text,ucZip text)');

					tx.executeSql("INSERT INTO workaddress (uType) VALUES (?)", ["customer"], function(tx, res) {

					}, function(e) {
						console.log("ERROR: " + e.message);
						app.showAlert(e.message, "ERROR");
					});

					//for location check
					tx.executeSql("INSERT INTO workaddress (uType) VALUES (?)", ["check"], function(tx, res) {

					}, function(e) {
						console.log("ERROR: " + e.message);
						app.showAlert(e.message, "ERROR");
					});
				}

			});

		});

		db.transaction(function(tx) {

			if (droptable)
				tx.executeSql('DROP TABLE IF EXISTS vehicles');

			tx.executeSql('SELECT count(*) as cnt FROM sqlite_master WHERE type="table" AND name="vehicles"', [], function(tx, res) {
				//alert("vehicles"+res.rows.item(0).cnt);

				if (res.rows.item(0).cnt === 0) {
					tx.executeSql('CREATE TABLE IF NOT EXISTS vehicles (id integer primary key, vMake text, vModel text,vColor text,vLicense text)');

					tx.executeSql("INSERT INTO vehicles (vMake) VALUES (?)", [" "], function(tx, res) {

					}, function(e) {
						console.log("ERROR: " + e.message);
						app.showAlert(e.message, "ERROR");
					});
					tx.executeSql("INSERT INTO vehicles (vMake) VALUES (?)", [" "], function(tx, res) {

					}, function(e) {
						console.log("ERROR: " + e.message);
						app.showAlert(e.message, "ERROR");
					});

				}

			});

		});
*/
		//	load_worker_job_map();

		get_signin_status();

		//	   map = plugin.google.maps.Map.getMap();
		//var st='NY';

		//alert(state_name[st]);

		$("li[action]").click(function() {
			$("#menulist").panel("close");

			// Map.clear() method removes all mark-ups, such as marker.
			map.clear();

			// Map.off() method removes all event listeners.
			map.off();

			var action = $(this).attr("action");
			loadPage(map, action);

		});

		$("li[menu_action]").click(function() {
			$("#customer_menulist").panel("close");
			var menu_action = $(this).attr("menu_action");
			//alert(menu_action); //menu_action();
			switch(menu_action) {

			case 'customer_make_appointment':
				customer_make_appointment();
				break;

			case 'customer_edit_profile':
				customer_edit_profile();
				break;

			case 'customer_check_ballance':
				customer_check_ballance();
				break;

			case 'member_contact_us':
				contact_us('member');
				break;

			case 'customer_check_schedule':
				load_customer_schedule();
				break;

			case 'sign_out':

				sign_out();
				break;

			default:
				break;
			}
		});

		$("li[menu_action]").click(function() {

			$("#worker_menulist").panel("close");
			var menu_action = $(this).attr("menu_action");
			//alert(menu_action);

			if (map)
				map.remove();

			switch(menu_action) {
			case 'worker_QR_scanner':
				worker_QR_scanner();
				break;

			case 'worker_checkedin_joblist':
				//worker_onsite_checkin();
				worker_check_schedule('checkedin');
				break;

			case 'worker_completed_joblist':
				//worker_onsite_checkout();
				worker_check_schedule('completed');

				break;

			case 'get_job_direction':
				get_job_direction();
				break;

			case 'worker_edit_profile':
				worker_edit_profile();
				break;

			case 'worker_assigned_joblist':
				worker_check_schedule('assigned');
				break;

			case 'worker_check_ballance':
				worker_check_ballance('worker_earning1');
				window.location = "#worker_view_account_page";
				break;

			case 'member_contact_us':
				contact_us('member');
				break;

			case 'sign_out':

				sign_out();
				break;

			default:
				break;
			}

		});

		getMyLocation();

		//	window.location = '#customer_page';

	},

	// Update DOM on a Received Event
	receivedEvent : function(id) {

		var parentElement = document.getElementById(id);
		console.log('Received Event: ' + id);
		app.initPaymentUI();
	},

	///// Paypal function from testpaypal_tracy

	initPaymentUI : function() {
		var clientIDs = {
			"PayPalEnvironmentProduction" : "AZxefRBsoEL7Kn3M5ImPyhHCMOow5kHU6mnhyOK4Rr8ip9nXC_NO8poT2GOr",
			"PayPalEnvironmentSandbox" : "YOUR_SANDBOX_ID"
		};
		PayPalMobile.init(clientIDs, app.onPayPalMobileInit);
	},
	/*
	 onSuccesfulPayment: function(payment) {
	 str ="http://sitelerwash.pineconetassel.com";

	 console.log("payment success: " + JSON.stringify(payment, null, 4));
	 //var newdata = JSON.parse(payment);
	 //alert(newdata["response"].create_time);
	 if (window.XMLHttpRequest){
	 xmlhttp = new XMLHttpRequest();
	 } else {
	 xmlhttp=new ActiveXObject("AD0DB.Connection");
	 }
	 xmlhttp.onreadystatechange = function(){
	 if (xmlhttp.readystate == 4 && xmlhttp.status == 200 ){
	 }}
	 xmlhttp.open("GET","poststatus.php?q="+str,true);
	 xmlhttp.send();
	 //alert("connected");
	 $.ajax({
	 url:'http://sitelerwash.pineconetassel.com/poststatus.php',
	 method: 'POST',
	 success:function(msg){
	 alert(msg);
	 }
	 });
	 },
	 */

	onSuccesfulPayment : function(payment) {
		str = "http://sitelerwash.pineconetassel.com";
		//alert("payment success");
		//alert(JSON.stringify(payment, null, 4));
		var test = JSON.stringify(payment, null, 4);
		var jsontest = JSON.parse(test);
		//app.showAlert(jsontest.response.id);
		//console.log("payment success: " + JSON.stringify(payment, null, 4));
		//alert( appmt_id);
		$.ajax({
			type : 'POST',
			data : {
				siteler_ID : siteler_id,
				uname : customer_uname,
				appointment_id : appmt_id,
				transaction_id : jsontest.response.id
			},
			url : 'http://www.pineconetassel.com/sitelertest/app_confirm_payment.php',
			success : function(data) {

				var response = JSON.parse(data);

				if (response.status == "ok") {

					app.showAlert(response.message, "Confirmation");

				}

			},
			error : function() {
				//console.log(data);
				app.showAlert('There was an error in registration form', 'ERROR');
			}
		});

		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		} else {
			xmlhttp = new ActiveXObject("AD0DB.Connection");
		}
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readystate == 4 && xmlhttp.status == 200) {
			}
		}
		xmlhttp.open("GET", "poststatus.php?q=" + str, true);
		xmlhttp.send();
		//alert("connected");
		$.ajax({
			url : 'http://sitelerwash.pineconetassel.com/poststatus.php',
			method : 'POST',
			data : {
				appointment_id : appmt_id
			},
			success : function(msg) {
				app.showAlert(msg,"Payment");
			}
		});
	},

	onAuthorizationCallback : function(authorization) {
		console.log("authorization: " + JSON.stringify(authorization, null, 4));
	},

	createPayment : function() {
		// for simplicity use predefined amount
		var price = "1.28";
		var paymentDetails = new PayPalPaymentDetails(price, "0.00", "0.00");
		var payment = new PayPalPayment(price, "USD", "Siteler Inc", "Sale", paymentDetails);
		return payment;
	},

	createPaymentPromo : function() {
		// for simplicity use predefined amount
		var price = "1.16";
		var paymentDetails = new PayPalPaymentDetails(price, "0.00", "0.00");
		var payment = new PayPalPayment(price, "USD", "Siteler Inc", "Sale", paymentDetails);
		return payment;
	},

	configuration : function() {
		// for more options see `paypal-mobile-js-helper.js`
		var config = new PayPalConfiguration({
			merchantName : "Siteler Inc",
			merchantPrivacyPolicyURL : "https://mytestshop.com/policy",
			merchantUserAgreementURL : "https://mytestshop.com/agreement"
		});
		return config;
	},

	onPrepareRender : function() {
		// buttons defined in index.html
		//  <button id="buyNowBtn"> Buy Now !</button>
		//  <button id="buyInFutureBtn"> Pay in Future !</button>
		//  <button id="profileSharingBtn"> ProfileSharing !</button>
		var buyNowBtn = document.getElementById("buyNowBtn");
		//   var buyInFutureBtn = document.getElementById("buyInFutureBtn");
		//  var profileSharingBtn = document.getElementById("profileSharingBtn");

		buyNowBtn.onclick = function(e) {
			// single payment
			PayPalMobile.renderSinglePaymentUI(app.createPayment(), app.onSuccesfulPayment, app.onUserCanceled);
		};

		/*  buyInFutureBtn.onclick = function(e) {
		 // future payment
		 PayPalMobile.renderSinglePaymentUI(app.createPaymentPromo(), app.onSuccesfulPayment,
		 app.onUserCanceled);
		 };

		 profileSharingBtn.onclick = function(e) {
		 // profile sharing
		 PayPalMobile.renderProfileSharingUI(["profile", "email", "phone",
		 "address", "futurepayments", "paypalattributes"
		 ], app.onAuthorizationCallback, app.onUserCanceled);
		 };
		 */
	},

	onPayPalMobileInit : function() {
		// must be called
		// use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
		PayPalMobile.prepareToRender("PayPalEnvironmentProduction", app.configuration(), app.onPrepareRender);
	},

	onUserCanceled : function(result) {
		console.log(result);
	},

	///////////end paypal function //////////////

	showAlert : function(message, title) {
		if (navigator.notification) {
			navigator.notification.alert(message, null, title, 'OK');
		} else {
			alert( title ? (title + ": " + message) : message);
		}
	},

	showConfirm : function(message, title, button, yes_callback, no_callback) {
		if(button == null)
			button = ['Yes', 'No'];
			
		function onConfirm(buttonIndex) {
			//var result = false;
			switch(buttonIndex) {
			case 1:
				yes_callback();
				break;
			case 2:
			default:
				no_callback()
				break;
			}
			//alert(result);
			//return result;
		};

		if (navigator.notification) {
			//navigator.notification.alert(message, null, title, 'OK');
			navigator.notification.confirm(message, onConfirm, title, button);
		} else {
			if (comfirm( title ? (title + ": " + message) : message)) {
				callback();
			};
		}
	}
};

