var source = $("#customer-schedule-template").html();
var customer_schedule_templat = Handlebars.compile(source);
//worker_schedule_templatsource = $("#worker-schedule-template").html();
//var worker_schedule_templat = Handlebars.compile(source);
/**
 * Change the embed page view.
 * @param {Object} map
 * @param {String} pageName
 */

function autotab(current, to, pattern, message) {
	var haserror = false;
	//alert(current.value);
	if (!current.value.match(pattern) && !current.value.length == 0) {
		app.showAlert(message, "ERROR");
		haserror = true;
		current.focus()
	}
	if (current.value.length == current.getAttribute("maxlength") && !haserror) {
		to.focus();
	}
}

function addMarker(map, latLng) {
	map.addMarker({
		'position' : latLng,
		'title' : "i am here",
		'icon' : 'www/images/red-1.png'

	}, function(marker) {
		marker.showInfoWindow();
	});
}

function addIconMarker(map, latLng) {

	map.addMarker({
		'position' : latLng,
		'title' : 'job site',
		'icon' : 'www/images/red-1.png'
	});
}

function showMyLocation(map) {

	var success = function(location) {
		myLocation = location.latLng;

		addMarker(map, myLocation);

	};

	var error = function(result) {

	};

	map.getMyLocation({
		enableHighAccuracy : true
	}, success, error);
}

function getMyLocation() {

	var success = function(location) {
		myLocation = location.latLng;
	};

	var error = function(result) {

	};

	map.getMyLocation({
		enableHighAccuracy : true
	}, success, error);
}

/**
 * The side menu overlays above the map, but it's not the children of the map div.
 * In this case, you must call map.setClickable(false) to be able to click the side menu.
 */
function onSideMenuClose() {
	map.setClickable(true);
}

function onSideMenuOpen() {
	map.setClickable(false);
}

function qrScanner() {
	var qrcode;

	cordova.plugins.barcodeScanner.scan(function(result) {

		$('#qrcode_result').val(result.text);

		qrcode = result.text;
		app.showAlert("qrcode=" + qrcode, "SCAN RESULT");

		load_customer_schedule_qr(qrcode);
	}, function(error) {
		//var message =
		app.showAlert("Scanning failed: " + error, "FAILURE");
	});

	return false;
}

function loadDivHtml(divname, htmlName) {
	$(document).trigger("pageLeave", map);
	$.get("./pages/" + htmlName + ".html", function(html) {
		//	alert(divname);
		$("#" + divname).html(html);
		$.mobile.activePage.trigger("create");
	});
}

function loadPage(map, pageName) {
	//	alert("start loadpage"+pageName);

	$(document).trigger("pageLeave", map);
	$.get("./pages/" + pageName + ".html", function(html) {
		//	alert("get loadpage"+pageName);

		$("#container").html(html);
		$.mobile.activePage.trigger("create");

		// PrettyPrint
		// @refer https://code.google.com/p/google-code-prettify/
		if ( typeof prettyPrint === "function") {
			prettyPrint();
		}
		if (map) {//xt added
			map.clear();
			map.off();

			// Embed a map into the div tag.
			//alert
			console.log(navigator.notification);
			//  console.log(FileTransfer);
			map = plugin.google.maps.Map.getMap();
			var div = $("#map_canvas")[0];
			if (div) {
				map.setDiv(div);
			}
		}//xt added
		// Execute the code
		setTimeout(function() {
			$(document).trigger("pageLoad", map);
		}, 2000);
	});
}

function searchJob(qrcode, div) {
	var text;
	text = "Owner: Customer 1\n";
	text += "service: Sedan Basic $20.00\n";
	text += "Make: Honda, Model: Accord, Year: 2014\n";
	text += "LIC# 1234\n";
	text += "Date: 2014-11-30 8:00Am~12:00pm\n";

	//alert(text);

	$('#' + div).val(text);

}

function get_signin_status() {

	db.transaction(function(tx) {

		tx.executeSql("SELECT location as loc, status as st, remember as rem, utype as type FROM login_status WHERE id = 1", [], function(tx, res) {

			signin_status = res.rows.item(0).st;
			signin_locationcheck = res.rows.item(0).loc;
			signin_remember = res.rows.item(0).rem;
			signin_utype = res.rows.item(0).type;

			//signin_status = 2;

			//signin_utype = 'customer';
			//res.rows.item(0).type;
			//signin_utype = 'worker';
			//res.rows.item(0).type;
			//signin_utype = 'unknown';//res.rows.item(0).type;

			//	alert(signin_status + '/' + signin_locationcheck + '/' + signin_remember + '/' + signin_utype);

		}, function(e) {
			console.log("ERROR: " + e.message);
			app.showAlert(e.message, "DATABASE ERROR");
		});

	});
}

var state_name = {

	"AL" : "Alabama",
	"AK" : "Alaska",
	"AZ" : "Arizona",
	"AR" : "Arkansas",
	"CA" : "California",
	"CO" : "Colorado",
	"CT" : "Connecticut",
	"DE" : "Delaware",
	"DC" : "District of Columbia",
	"FL" : "Florida",
	"GA" : "Georgia",
	"HI" : "Hawaii",
	"ID" : "Idaho",
	"IL" : "Illinois",
	"IN" : "Indiana",
	"IA" : "Iowa",
	"KS" : "Kansas",
	"KY" : "Kentucky",
	"LA" : "Louisiana",
	"ME" : "Maine",
	"MD" : "Maryland",
	"MA" : "Massachusetts",
	"MI" : "Michigan",
	"MN" : "Minnesota",
	"MS" : "Mississippi",
	"MO" : "Missouri",
	"MT" : "Montana",
	"NE" : "Nebraska",
	"NV" : "Nevada",
	"NH" : "New Hampshire",
	"NJ" : "New Jersey",
	"NM" : "New Mexico",
	"NY" : "New York",
	"NC" : "North Carolina",
	"ND" : "North Dakota",
	"OH" : "Ohio",
	"OK" : "Oklahoma",
	"OR" : "Oregon",
	"PA" : "Pennsylvania",
	"RI" : "Rhode Island",
	"SC" : "South Carolina",
	"SD" : "South Dakota",
	"TN" : "Tennessee",
	"TX" : "Texas",
	"UT" : "Utah",
	"VT" : "Vermont",
	"VA" : "Virginia",
	"WA" : "Washington",
	"WV" : "West Virginia",
	"WI" : "Wisconsin",
	"WY" : "Wyoming"

}

/*
var city_list = {
"CA" : ["ATHERTON", "BELMONT", "CAMPBELL", "CUPERTINO", "DALY CITY", "EAST PALO ALTO", "FOSTER CITY", "FREMONT", "GILROY", "LOS ALTOS", "LOS GATOS", "MENLO PARK", "MILPITAS", "MOUNTAIN VIEW", "PALO ALTO", "REDWOOD CITY", "SAN CARLOS", "SAN FRANCISCO", "SAN JOSE", "SAN MATEO", "SANTA CLARA", "SARATOGA", "SOUTH SAN FRANCISCO", "SUNNYVALE", "WOODSIDE"],
"NY" : ["EAST MEADOW", "WEST BURY"]
};
*/

//alert(vehicle_color[0]);
//alert(vehicle_make['Ford'][0]);

/*function updateCityList() {
 var state_selected = $('#service_state').val();
 //$('#service_city').empty();
 $('#service_city option').remove();
 $.each(city_list[state_selected], function(i, city) {
 if(city ==="SAN FRANCISCO")
 $('#service_city').append($("<option selected></option>").attr("value", city).text(city));

 else
 $('#service_city').append($("<option></option>").attr("value", city).text(city));

 });

 }
 */

function fillServiceOption(type) {
	//alert(type);

	switch(type) {
	case 'one-time':
		$('#otc_service_select option').remove();

		$.each(service_list, function(i, item) {
			var text = item.abbr + ":  $" + item.price;

			if (i === 0)
				$('#otc_service_select').append($("<option selected></option>").attr("value", i).text(text));
			
else
				$('#otc_service_select').append($("<option></option>").attr("value", i).text(text));

		});

		break;
	case 'member':

		$('#service_select option').remove();

		$.each(service_list, function(i, item) {
			var text = item.abbr + ":  $" + item.price;
			//alert(item.abbr);
			$('#service_select').append($("<option></option>").attr("value", i).text(text));

		});
		break;
	}
}

function fillOption(name, list) {
	//	var state_selected = $('#service_state').val();

	$('#' + name + ' option').remove();

	$.each(list, function(i, item) {

		$('#' + name).append($("<option></option>").attr("value", item).text(item));

	});

}

function fillOption2_1(name, list) {
	//	var state_selected = $('#service_state').val();

	$('#' + name + ' option').remove();

	$.each(list, function(item) {

		$('#' + name).append($("<option></option>").attr("value", item).text(item));

	});

}

function updateOption2_2() {
	fillOption2_2('otc_v1model', vehicle_make, 'Ford');

}

function fillOption2_2(name, list, item) {
	//var list2-2 = list[item];

	$('#' + name + ' option').remove();
	//alert(list[item][0]);
	$.each(list[item], function(i, item) {

		$('#' + name).append($("<option></option>").attr("value", item).text(item));

	});

}

function check_signin_status() {
	return signin_status;
}

function show_become_worker_page() {

}

function becomeWorkerClick() {
	//alert(signin_status+'/'+signin_locationcheck+'/'+signin_remember+'/'+signin_utype);

	if (signin_locationcheck) {
		//	app.showAlert("Siteler is professional and certified car wash & detailing technician and earns up to $100 per hour. Please carefully fill the form and start your career with Siteler!", "INFO");

		app.showConfirm("Siteler is professional and certified car wash & detailing technician and earns up to $100 per hour. Please carefully fill the form and start your career with Siteler!", "Join Siteler", ["yes, please", "already a Siteler"], null, show_signin_form);

		window.location = '#become_worker_page';

	} else {
		//app.showAlert("Please check out our service area. If your area is not listed and want to expand our service to you area, please contact Siteler cs@SitelerWash.com. Thank you.", "INFO");
		//window.location = '#check_service_area_page';
	}
}

//check the location first, if not covered, go to contact us page
//if
function enter_make_appointment_page() {
	//alert(signin_status + '/' + signin_locationcheck + '/' + signin_remember + '/' + signin_utype);

	if (signin_locationcheck) {
		if ((signin_status != 0) && (signin_utype != 'customer')) {
			onetimeAppointmentClick();
			return;
		}

		app.showConfirm("Do you want to sign up an membership to enjoy a 5%~ 50% discount?", "Appointment", ["yes, please", "already a member"], becomeMemberClick, onetimeAppointmentClick);

	} else {

		app.showAlert("Please check out our service area. If your area is not currenly listed, please contact Siteler cs@SitelerWash.com. Thank you.", "INFO");
		window.location = '#check_service_area_page';

	};

}

function enter_become_member_page() {
	//alert(signin_status + '/' + signin_locationcheck + '/' + signin_remember + '/' + signin_utype);

	if (signin_locationcheck) {

		switch(signin_status) {
		case 0:
			//not sign up yet
			app.showConfirm("Do you want to sign up an membership to enjoy a 5%~ 50% discount?", "Appointment", ["yes, please", "already a member"], becomeMemberClick, show_signin_form);
			break;
		case 1:
			//signed up but not sign in
			app.showAlert("Please Sign in to enjoy a 5%~ 50% discount ", "INFO");
			window.location = '#welcome_page';
			break;
		case 2:
			//already sign in
			app.showAlert("Already registerd. Please Sign in to enjoy a 5%~ 50% discount ", "INFO");
			window.location = '#welcome_page';
			break;
		}

	} else {
		app.showAlert("Please check out our service area. If your area is not currenly listed, please contact Siteler cs@SitelerWash.com. Thank you.", "INFO");
		window.location = '#check_service_area_page';
	};

}

function enter_signin_page() {
	//alert(signin_status + '/' + signin_locationcheck + '/' + signin_remember + '/' + signin_utype);
	// $('#remember_me_switch').val(signin_remember);

	if (signin_locationcheck) {

		switch(signin_status) {
		case 0:
			//not sign up yet
			//	hide_signin_form();
			//show_signin_form()

			app.showConfirm("Do you want to sign up an membership to enjoy a 5%~ 50% discount?", "Sign up", ["yes, please", "already signed up"], becomeMemberClick, show_signin_form);

			break;
		case 1:
		case 2:

			break;

		}
		show_signin_form();
	} else {
		app.showAlert("Please check out our service area. If your area is not currenly listed, please contact Siteler cs@SitelerWash.com. Thank you.", "INFO");
		window.location = '#check_service_area_page';
	};

}

//menu actions

function sign_out() {

	signin_status = 1;

	db.transaction(function(tx) {

		//var timestamp = new Date().getTime() / 1000;

		tx.executeSql("UPDATE OR REPLACE login_status SET status=? WHERE id=1", [signin_status], function(tx, res) {
			window.location = "#welcome_page";
		}, function(e) {
			console.log("ERROR: " + e.message);
			app.showAlert("login_status update" + e.message, "DATABASE ERROR");
		});

	});
}

function worker_QR_scanner() {
	//alert("worker_onsite_chekin_page");
	//alert(siteler_id);
	//alert(appmt_id);
	window.location = "#worker_onsite_QRScanner_page";

}worker_QR_scanner


function get_job_direction() {
	//alert("get_job_direction");
	loadPage(map, "job_direction");
	window.location = "#worker_get_direction_page";
}

function leave_job_map() {
	if (map)
		map.remove();
	window.location = "#worker_page";
}

function worker_edit_profile() {

	window.location = "#worker_edit_profile_page";

}

function worker_check_schedule(status) {
	load_worker_schedule(status);

}

function worker_check_ballance(divname) {

	//alert(appmt_id);
	var postData = 'sitelerID=' + siteler_id;

	//alert(postData);

	var phpurl = base_url + 'worker_check_account.php';
	//alert(phpurl);

	var request = $.ajax({
		url : phpurl,
		type : "POST",
		data : postData,
		dataType : "json"
	});

	request.done(function(data) {

		//alert(data);

		if (data === null) {
			app.showAlert("No earning data", "INFO");

		} else {
			var worker_earning_source = $("#worker-earning-template").html();
			var worker_earning_template = Handlebars.compile(worker_earning_source);

			$('#' + divname).html(worker_earning_template(data));
		}

	});

	request.fail(function(jqXHR, textStatus) {
		app.showAlert("Request failed: " + textStatus, "ERROR");
	});

}

function contact_us(type) {
	//alert(type);

	if (type === 'member') {
		window.location = "#member_contact_us_page";
	} else
		window.location = "#contact_us_page";

}

function customer_make_appointment() {

	window.location = "#customer_appointment_page";

}

function customer_edit_profile() {

	window.location = "#customer_edit_profile_page";

}

function customer_check_status() {

	load_customer_schedule();
	//window.location = "#customer_check_schedule_page";

}

function onetimeAppointmentClick() {
	//alert(service_list[0].abbr);
	fillServiceOption("one-time");

	app.showAlert("One time customer won’t be eligible for the membership prices. We would suggest you take 1-2 minutes to register as a member and save at least 5% right away for your first purchase.", "INFO");
	//	load_onetime_appointment_form();
	fillOption('otc_v1color', color_list);
	fillOption2_1('otc_v1make', vehicle_make);
	fillOption2_2('otc_v1model', vehicle_make, 'Ford');
	window.location = '#siteler_onetime_appointment_page';
};

function becomeMemberClick() {
	//	alert(customer_signedin);
	fillOption('xcm_v1color', color_list);
	fillOption2_1('xcm_v1make', vehicle_make);
	fillOption2_2('xcm_v1model', vehicle_make, 'Ford');

	//	app.showAlert("As a regular Siteler services user, Siteler member has $50 initial deposit in the account and is always eligible for 5-50% discount.", "INFO");
	app.showConfirm("As a regular Siteler services user, Siteler member has $50 initial deposit in the account and is always eligible for 5-50% discount. Do you want to proceed?", "Membership", ["yes, please", "already signed up"], becomeMember, show_signin_form);

};

function updateXcm_v1make() {
	var make = $('#xcm_v1make').val();
//	alert(make);

}

function resetPasswordClick() {
	//	alert(customer_signedin);
	//	app.showAlert("As a regular Siteler services user, Siteler member has $50 initial deposit in the account and is always eligible for 5-50% discount.", "INFO");
	app.showConfirm("Reset your password?", "Login", null, resetPassword, gobackHomePage);

};

function resetPassword() {
	app.showAlert("Under Construction");
}

function becomeMember() {
	//	app.showAlert("One time customer won’t be eligible for the membership prices. We would suggest you take 1-2 minutes to register as a member and save at least 5% right away for your first purchase.", "INFO");
	//	load_onetime_appointment_form();
	window.location = '#customer_member_page';
};

function gobackHomePage() {

	window.location = '#welcome_page';

}

function onsiteLocInfo(lat, lon, date, slotid, type) {
	//var lat1;
	var suc = function(p) {
		lat = p.coords.latitude;
		lon = p.coords.longitude;
		date = new Date(p.timestamp);

		var postData = {slotid:slotid,
					latitude: lat,
					longitude : lon,
					timestamp: date,
					sid: siteler_id
					
					};
					
		var location = "job location: \nlatitude= " + lat + "; longitude=" + lon + "\n timestamp:" + date;
	//	alert(slotid+siteler_id);
	//	alert(location);
		switch(type) {
		case 'checkin':
				app.showAlert(location, "checkin");

				var phpurl = base_url + 'slotid_checkin.php';
				var request = $.ajax({
					url : phpurl,
					type : "POST",
					data : postData,
					dataType : "json"
				});

				request.done(function(response) {
					
	
				//	if(response.status == 'ok')
						load_worker_schedule('assigned');

				});

				request.fail(function(jqXHR, textStatus) {
					app.showAlert("Request failed: " + textStatus, "ERROR");
				});

			break;
		case 'checkout':
				app.showAlert(location, "checkout");

				var phpurl = base_url + 'slotid_checkout.php';
				var request = $.ajax({
					url : phpurl,
					type : "POST",
					data : postData,
					dataType : "json"
				});

				request.done(function(response) {
					load_worker_schedule('checkedin');

					//if(response.status == 'ok')
				});

				request.fail(function(jqXHR, textStatus) {
					app.showAlert("Request failed: " + textStatus, "ERROR");
				});

			
			break;
		default:
	//	alert('nothing');
			break;
		}

	};
	var locFail = function() {
		var massage = "GPS location failure";
		app.showAlert(massage, "ERROR");
	};

	navigator.geolocation.getCurrentPosition(suc, locFail);

}

/*
 function readGPSdata() {
 //var lat1;

 var suc = function(p) {
 mylat = p.coords.latitude;
 mylng = p.coords.longitude;
 mydate = new Date(p.timestamp);
 //alert(lat);
 };
 var locFail = function() {
 var massage = "GPS location failure";
 app.showAlert(massage, "ERROR");
 };

 navigator.geolocation.getCurrentPosition(suc, locFail);

 }
 */

function onsiteCheckIn(slotid) {

	//	$('#onsitecheckin_btn').button('disable');
	//	$('#onsitecheckout_btn').button('enable');
	var lat;
	var lon;
	var date;
	//alert(slotid);
	//="2014-12-01 10:00am";
	onsiteLocInfo(lat, lon, date, slotid, 'checkin');
	//alert("job location: latitude= "+lat+"; longitude="+lon+"<br>Start time:"+date);

}

function onsiteCheckOut(slotid) {

	//	$('#onsitecheckin_btn').button('disable');
	//	$('#onsitecheckout_btn').button('disable');
	var lat;
	var lon;
	var date;
//	alert("check out id"+slotid);

	onsiteLocInfo(lat, lon, date, slotid, 'checkout');
	//alert("job location: latitude= "+lat+"; longitude="+lon+"<br>End time:"+date);
}

function enter_check_schedule() {
	//alert("")
	//	siteler_id = 'M0000160';
	//alert(appmt_id);
	var postData = 'appid=' + appmt_id;
	//alert(postData);

	var phpurl = base_url + 'customer_check_appointment.php';
	//$("#customer_schedule").html(customer_schedule_templat(data));

	var request = $.ajax({
		url : phpurl,
		type : "POST",
		data : postData,
		dataType : "json"
	});

	request.done(function(data) {
		if (data === null) {
			app.showAlert("No appointment scheduled", "INFO");
			$('#onetime_customer_rating_form').hide();

		} else {
			$('#onetime_customer_rating_form').show();

			$("#customer_appointment_status").html(customer_schedule_templat(data));
		}

	});

	request.fail(function(jqXHR, textStatus) {
		app.showAlert("Request failed: " + textStatus, "ERROR");
	});

	window.location = '#customer_check_status_page';
}

/////////////////////////////////
function load_rating_page(appid) {
	//alert(appid);
	//appid = 55;
	$('#customer_rating_appid').val(appid);
	window.location = '#customer_rating_dialog_page';
}

////////////////////////////////

function load_car_make_list() {

	var phpurl = base_url + 'test_car_make.php';

	var request = $.ajax({
		url : phpurl,
		type : "POST",
		data : null,
		dataType : "json"
	});

	request.done(function(data) {
		if (data === null) {
			app.showAlert("No car make list", "INFO");
		} else {
			vehicle_make = data;
			//alert("car make ready");
		}

	});

	request.fail(function(jqXHR, textStatus) {
		app.showAlert("Request failed: " + textStatus, "ERROR");
	});

}

function load_customer_schedule() {
	//siteler_id = 'M0000160';
	var postData = 'sid=' + siteler_id;
	//alert(postData);

	var phpurl = base_url + 'customer_check_schedule.php';
	//$("#customer_schedule").html(customer_schedule_templat(data));

	var request = $.ajax({
		url : phpurl,
		type : "POST",
		data : postData,
		dataType : "json"
	});

	request.done(function(data) {
		if (data === null) {
			app.showAlert("No appointment scheduled", "INFO");
		} else {
			$("#customer_schedule").html(customer_schedule_templat(data));
		}

	});

	request.fail(function(jqXHR, textStatus) {
		app.showAlert("Request failed: " + textStatus, "ERROR");
	});

	window.location = "#customer_check_schedule_page";

}

function load_customer_schedule_qr(code) {
	//code = 'M0000219';
	var postData = 'sid=' + code;
	//alert(postData);

	var source = $("#worker-schedule-template").html();

	var worker_schedule_templat = Handlebars.compile(source);

	var phpurl = base_url + 'worker_check_customer_job.php';

	var request = $.ajax({
		url : phpurl,
		type : "POST",
		data : postData,
		dataType : "json"
	});

	request.done(function(data) {
		if (data === null) {
			app.showAlert("No appointment assigned", "INFO");
		} else {
			$("#customer_joblist_qr").html(worker_schedule_templat(data));
		}

	});

	request.fail(function(jqXHR, textStatus) {
		app.showAlert("Request failed: " + textStatus, "ERROR");
	});

	window.location = "#worker_onsite_QRScanner_page";

}

function load_service_list() {

	//alert("load_service_list");
	var phpurl = base_url + 'get_service.php';
	//$("#customer_schedule").html(customer_schedule_templat(data));

	var request = $.ajax({
		url : phpurl,
		type : "POST",
		//	data : postData,
		dataType : "json"
	});

	request.done(function(data) {

		service_list = data.service;

	});

	request.fail(function(jqXHR, textStatus) {
		app.showAlert("Request failed: " + textStatus, "ERROR");
	});

	//window.location = "#customer_check_schedule_page";

}

/*
 function checkCustomerPromotion() {
 app.showAlert("No Promotion Appliable", "Promotion");
 $('#promotion_rate').val(10);
 }
 */

function checkCustomerPromotion() {

	//alert("load_service_list");
	var phpurl = base_url + 'get_promotion.php';
	postData = {
		company_ID : customer_company_id,
		customer_ID : siteler_id,
		service_type : service_type,
		promotion_code : prom_code
	};

	var request = $.ajax({
		url : phpurl,
		type : "POST",
		data : postData,
		dataType : "json"
	});

	request.done(function(data) {
		//alert(data);
		discount_amount = data.discount_amount;
		appointment_service_change();
		app.showAlert(data.discount_message, "INFO");
		//alert(discount_amount);
		$('#promotion_amount').val(discount_amount);
	});

	request.fail(function(jqXHR, textStatus) {
		app.showAlert("Request failed: " + textStatus, "ERROR");
	});

	//window.location = "#customer_check_schedule_page";

}

/*
 function load_customer_ballence() {
 alert("load_customer_ballence");
 window.location = "#customer_ballance_page";
 }
 */

function load_worker_schedule(status) {

	var postData = {
		sid : siteler_id,
		status : status
	};

	var phpurl = base_url + 'worker_check_schedule.php';

	var source = $("#worker-schedule-template").html();

	var worker_schedule_templat = Handlebars.compile(source);

	var request = $.ajax({
		url : phpurl,
		type : "POST",
		data : postData,
		dataType : "json"
	});

	request.done(function(data) {
		//alert(data);
		if (data === null)
			switch(status) {
			case 'assigned':
				app.showAlert("There is no outstanding job assigned to you", "Info");
				$('#worker_assigned_joblist').empty();

				window.location = "#worker_assigned_joblist_page";

				break;
			case 'checkedin':
				app.showAlert("There is no checked-in job in your list", "Info");
				$('#worker_checkedin_joblist').empty();
				window.location = "#worker_checkedin_joblist_page";
				break;
			case 'completed':
				app.showAlert("There is no completed job in your list", "Info");
				$('#worker_completed_joblist').empty();

				window.location = "#worker_completed_joblist_page";
				break;
			}
		
else {
			switch(status) {
			case 'assigned':
				$("#worker_assigned_joblist").html(worker_schedule_templat(data));
				window.location = "#worker_assigned_joblist_page";

				break;
			case 'checkedin':
				$("#worker_checkedin_joblist").html(worker_schedule_templat(data));
				window.location = "#worker_checkedin_joblist_page";
				break;
			case 'completed':
				$("#worker_completed_joblist").html(worker_schedule_templat(data));
				window.location = "#worker_completed_joblist_page";
				break;
			}

		}

	});

	request.fail(function(jqXHR, textStatus) {

		app.showAlert("Request failed: " + textStatus, "ERROR");
	});

}

function load_job_detail(slotid, status) {

	var postData = 'slotid=' + slotid;
	//	alert(postData);
	// alert(postData);

	var phpurl = base_url + 'worker_get_job_detail.php';

	var source;

	switch(status) {
	case 'assigned':
		source = $("#checkin_job-detail-template").html();
		break;

	case 'checkedin':
		source = $("#checkout_job-detail-template").html();

		break;

	case 'completed':
	default:
		source = $("#complete_job-detail-template").html();
		break;

	};

	var worker_job_detail_templat = Handlebars.compile(source);

	var request = $.ajax({
		url : phpurl,
		type : "POST",
		data : postData,
		dataType : "json"
	});

	request.done(function(data) {
		$("#job_owner_detail").html(worker_job_detail_templat(data));
	});

	request.fail(function(jqXHR, textStatus) {
		app.showAlert("Request failed: " + textStatus, "ERROR");
	});

	window.location = "#worker_check_schedule_job_page";

}

function load_worker_statement() {
	//alert("load_customer_ballence");
	window.location = "#worker_view_account_page";
}

/*
function checkCustomerPromotion() {
app.showAlert("No Promotion Appliable", "Promotion");
$('#promotion_rate').val(10);
}
*/

/*
function updateCustomerPromotion() {

var postData = 'sid=' + siteler_id;
//	alert(postData);
//alert(postData);
var phpurl = base_url + 'update_customer_promotion.php';

var source = $("#customer-promotion-template").html();

var customer_promotion_template = Handlebars.compile(source);

var data = {
promotions : [{
daterange : "1 Jan 2015 - 31 Jan 2015",
class : [{
type : "Gold Member",
desc : "3 services in last quater",
rate : "10%"
}, {
type : "Silver Member",
desc : "2 services in last quater",
rate : "5%"

}, {
type : "Group",
desc : "Yahoo,Google, Facebook",
rate : "15%"

}]
}, {
daterange : "1 Feb 2015 - 25 Feb 2015",
class : [{
type : "Gold Member",
desc : "3 services in last quater",
rate : "20%"
}, {
type : "Silver Member",
desc : "2 services in last quater",
rate : "25%"

}, {
type : "Group",
desc : "Yahoo",
rate : "35%"

}]
}]
};

$("#customer_promotion").html(customer_promotion_template(data));
app.showAlert("The discount rate is only valid when you book the appointment today.", "Info");

/*
var request = $.ajax({
url : phpurl,
type : "POST",
data : postData,
dataType : "json"
});

request.done(function(data) {
//alert("promotion")
$("#customer_promotion").html(cutomer-promotion-template(data));
});

request.fail(function(jqXHR, textStatus) {
app.showAlert("Request failed: " + textStatus, "ERROR");
});
*/
//window.location = "#customer_promotion_page";

//}

//this function is called after the customer successfully post their "become_customer_member_form"
//all the form fiels except credit card info will be stored into many db tables

function updateCustomerProfileTables() {

	xcm.uname = $('#xcm_uname').val();
	xcm.upass = $('#xcm_upass').val();
	xcm.fname = $('#xcm_fname').val();
	xcm.lname = $('#xcm_lname').val();

	//alert(xcm.fname);

	/*	db.transaction(function(tx) {

	 var timestamp = new Date().getTime() / 1000;

	 tx.executeSql("UPDATE OR REPLACE users SET sID=?, uName = ?, uPass=?, fName=?, lName=?, uDate=? WHERE uType = 'customer'", [xcm.siteler_id, xcm.uname, xcm.upass, xcm.fname, xcm.lname, parseInt(timestamp)], function(tx, res) {

	 }, function(e) {
	 console.log("ERROR: " + e.message);
	 app.showAlert("users" + e.message, "ERROR");
	 });

	 });
	 */
	xcm.workemail = $('#xcm_workemail').val();
	xcm.registeremail = $('#xcm_registeremail').val();

	xcm.workph1 = $('#xcm_workph1').val();
	xcm.workph2 = $('#xcm_workph2').val();
	xcm.workph3 = $('#xcm_workph3').val();

	xcm.workph = xcm.workph1 + "-" + xcm.workph2 + "-" + xcm.workph3;

	xcm.cellph1 = $('#xcm_cellph1').val();
	xcm.cellph2 = $('#xcm_cellph2').val();
	xcm.cellph3 = $('#xcm_cellph3').val();

	xcm.cellph = xcm.cellph1 + "-" + xcm.cellph2 + "-" + xcm.cellph3;

	xcm.homeph1 = $('#xcm_homeph1').val();
	xcm.homeph2 = $('#xcm_homeph2').val();
	xcm.homeph3 = $('#xcm_homeph3').val();

	xcm.homeph = xcm.homeph1 + "-" + xcm.homeph2 + "-" + xcm.homeph3;
	/*
	 db.transaction(function(tx) {

	 tx.executeSql("UPDATE OR REPLACE contacts SET uwEmail = ?, upEmail=?, uwPhone=?, ucPhone=?, uhPhone=? WHERE uType = 'customer'", [xcm.workemail, xcm.registeremail, xcm.workph, xcm.cellph, xcm.homeph], function(tx, res) {

	 }, function(e) {
	 console.log("ERROR: " + e.message);
	 app.showAlert("contacts" + e.message, "ERROR");
	 });

	 });
	 */
	xcm.company = $('#xcm_company').val();
	xcm.company_street = $('#xcm_company_street').val();
	xcm.company_city = $('#xcm_company_city').val();
	xcm.company_state = $('#xcm_company_state').val();
	xcm.company_zip = $('#xcm_company_zip').val();

	xcm.home_street = $('#xcm_street').val();
	xcm.home_city = $('#xcm_city').val();
	xcm.home_state = $('#xcm_state').val();
	xcm.home_zip = $('#xcm_zip').val();
	/*
	 db.transaction(function(tx) {

	 tx.executeSql("UPDATE OR REPLACE workaddress SET uCompany = ?, ucStreet=?, ucCity=?, ucState=?, ucZip=? WHERE uType = 'customer'", [xcm.company, xcm.company_street, xcm.company_city, xcm.company_state, xcm.company_zip], function(tx, res) {

	 }, function(e) {
	 console.log("ERROR: " + e.message);
	 app.showAlert("address" + e.message, "ERROR");
	 });

	 });

	 db.transaction(function(tx) {

	 tx.executeSql("UPDATE OR REPLACE homeaddress SET uhStreet=?, uhCity=?, uhState=?, uhZip=? WHERE uType = 'customer'", [xcm.home_street, xcm.home_city, xcm.home_state, xcm.home_zip], function(tx, res) {

	 }, function(e) {
	 console.log("ERROR: " + e.message);
	 app.showAlert("address" + e.message, "ERROR");
	 });

	 });
	 */
	xcm.creditcard = $('#xcm_creditcard').val();
	xcm.cvv = $('#xcm_cvv').val();
	xcm.exp_month = $('#xcm_exp_month').val();
	xcm.exp_year = $('#xcm_exp_year').val();

	xcm.v1make = $('#xcm_v1make').val();
	xcm.v1model = $('#xcm_v1model').val();
	xcm.v1color = $('#xcm_v1color').val();
	xcm.v1license = $('#xcm_v1license').val();

	xcm.v2make = $('#xcm_v2make').val();
	xcm.v2model = $('#xcm_v2model').val();
	xcm.v2color = $('#xcm_v2color').val();
	xcm.v2license = $('#xcm_v2license').val();
	/*
	 db.transaction(function(tx) {

	 tx.executeSql("UPDATE OR REPLACE vehicles SET vMake = ?, vModel=?, vColor=?, vLicense=? WHERE id = 1", [xcm.v1make, xcm.v1model, xcm.v1color, xcm.v1license], function(tx, res) {

	 }, function(e) {
	 console.log("ERROR: " + e.message);
	 app.showAlert("address" + e.message, "ERROR");
	 });

	 tx.executeSql("UPDATE OR REPLACE vehicles SET vMake = ?, vModel=?, vColor=?, vLicense=? WHERE id = 2", [xcm.v2make, xcm.v2model, xcm.v2color, xcm.v2license], function(tx, res) {

	 }, function(e) {
	 console.log("ERROR: " + e.message);
	 app.showAlert(e.message, "ERROR");
	 });

	 });
	 */
}

function updateWorkerEditProfileTables() {

	//alert("updateWorkerEditProfileTables");
}

function updateCustomerEditProfileTables() {

	xcm.uname = $('#xcp_uname').val();
	xcm.upass = $('#xcp_upass').val();
	xcm.fname = $('#xcp_fname').val();
	xcm.lname = $('#xcp_lname').val();

	//alert(xcm.fname);

	/*	db.transaction(function(tx) {

	 var timestamp = new Date().getTime() / 1000;

	 tx.executeSql("UPDATE OR REPLACE users SET sID=?, uName = ?, uPass=?, fName=?, lName=?, uDate=? WHERE uType = 'customer'", [xcm.siteler_id, xcm.uname, xcm.upass, xcm.fname, xcm.lname, parseInt(timestamp)], function(tx, res) {

	 }, function(e) {
	 console.log("ERROR: " + e.message);
	 app.showAlert("users" + e.message, "ERROR");
	 });

	 });
	 */
	xcm.workemail = $('#xcp_workemail').val();
	xcm.registeremail = $('#xcp_registeremail').val();

	xcm.workph1 = $('#xcp_workph1').val();
	xcm.workph2 = $('#xcp_workph2').val();
	xcm.workph3 = $('#xcp_workph3').val();

	xcm.workph = xcm.workph1 + "-" + xcm.workph2 + "-" + xcm.workph3;

	xcm.cellph1 = $('#xcp_cellph1').val();
	xcm.cellph2 = $('#xcp_cellph2').val();
	xcm.cellph3 = $('#xcp_cellph3').val();

	xcm.cellph = xcm.cellph1 + "-" + xcm.cellph2 + "-" + xcm.cellph3;

	xcm.homeph1 = $('#xcp_homeph1').val();
	xcm.homeph2 = $('#xcp_homeph2').val();
	xcm.homeph3 = $('#xcp_homeph3').val();

	xcm.homeph = xcm.homeph1 + "-" + xcm.homeph2 + "-" + xcm.homeph3;
	/*
	 db.transaction(function(tx) {

	 tx.executeSql("UPDATE OR REPLACE contacts SET uwEmail = ?, upEmail=?, uwPhone=?, ucPhone=?, uhPhone=? WHERE uType = 'customer'", [xcm.workemail, xcm.registeremail, xcm.workph, xcm.cellph, xcm.homeph], function(tx, res) {

	 }, function(e) {
	 console.log("ERROR: " + e.message);
	 app.showAlert("contacts" + e.message, "ERROR");
	 });

	 });
	 */
	xcm.company = $('#xcp_company').val();
	xcm.company_street = $('#xcp_company_street').val();
	xcm.company_city = $('#xcp_company_city').val();
	xcm.company_state = $('#xcp_company_state').val();
	xcm.company_zip = $('#xcp_company_zip').val();

	xcm.home_street = $('#xcp_street').val();
	xcm.home_city = $('#xcp_city').val();
	xcm.home_state = $('#xcp_state').val();
	xcm.home_zip = $('#xcp_zip').val();
	/*
	 db.transaction(function(tx) {

	 tx.executeSql("UPDATE OR REPLACE workaddress SET uCompany = ?, ucStreet=?, ucCity=?, ucState=?, ucZip=? WHERE uType = 'customer'", [xcm.company, xcm.company_street, xcm.company_city, xcm.company_state, xcm.company_zip], function(tx, res) {

	 }, function(e) {
	 console.log("ERROR: " + e.message);
	 app.showAlert("address" + e.message, "ERROR");
	 });

	 });

	 db.transaction(function(tx) {

	 tx.executeSql("UPDATE OR REPLACE homeaddress SET uhStreet=?, uhCity=?, uhState=?, uhZip=? WHERE uType = 'customer'", [xcm.home_street, xcm.home_city, xcm.home_state, xcm.home_zip], function(tx, res) {

	 }, function(e) {
	 console.log("ERROR: " + e.message);
	 app.showAlert("address" + e.message, "ERROR");
	 });

	 });
	 */
	xcm.creditcard = $('#xcp_creditcard').val();
	xcm.cvv = $('#xcp_cvv').val();
	xcm.exp_month = $('#xcp_exp_month').val();
	xcm.exp_year = $('#xcp_exp_year').val();

	xcm.v1make = $('#xcp_v1make').val();
	xcm.v1model = $('#xcp_v1model').val();
	xcm.v1color = $('#xcp_v1color').val();
	xcm.v1license = $('#xcp_v1license').val();

	xcm.v2make = $('#xcp_v2make').val();
	xcm.v2model = $('#xcp_v2model').val();
	xcm.v2color = $('#xcp_v2color').val();
	xcm.v2license = $('#xcp_v2license').val();
	/*
	 db.transaction(function(tx) {

	 tx.executeSql("UPDATE OR REPLACE vehicles SET vMake = ?, vModel=?, vColor=?, vLicense=? WHERE id = 1", [xcm.v1make, xcm.v1model, xcm.v1color, xcm.v1license], function(tx, res) {

	 }, function(e) {
	 console.log("ERROR: " + e.message);
	 app.showAlert("address" + e.message, "ERROR");
	 });

	 tx.executeSql("UPDATE OR REPLACE vehicles SET vMake = ?, vModel=?, vColor=?, vLicense=? WHERE id = 2", [xcm.v2make, xcm.v2model, xcm.v2color, xcm.v2license], function(tx, res) {

	 }, function(e) {
	 console.log("ERROR: " + e.message);
	 app.showAlert(e.message, "ERROR");
	 });

	 });
	 */
}

//this function is called when the customer want to update profile.
// the edit profile form will be filled from data obtained from database

function updateWorkerProfileForm() {
	var postData = 'sid=' + siteler_id;

	var phpurl = base_url + 'get_worker_profile.php';

	var request = $.ajax({
		url : phpurl,
		type : "POST",
		data : postData,
		dataType : "json"
	});

	request.done(function(response) {
		worker_profile = response;
		for (var k in worker_profile) {
			var id = 'xwp_' + k;
			$('#' + id).val(worker_profile[k]);
			//alert(k);
			//alert(id+"/"+worker_profile[k]);
		}
		//app.showAlert(response.message, "Result");
	});

	request.fail(function(jqXHR, textStatus) {
		app.showAlert("Request failed: " + textStatus, "ERROR");
	});

}

//this function is called when the customer want to update profile.
// the edit profile form will be filled from data obtained from database

function updateCustomerProfileForm() {

	var postData = 'sid=' + siteler_id;

	//alert(postData);

	var phpurl = base_url + 'get_customer_profile.php';

	var request = $.ajax({
		url : phpurl,
		type : "POST",
		data : postData,
		dataType : "json"
	});

	request.done(function(response) {
		customer_profile = response;
		for (var k in customer_profile) {
			var id = 'xcp_' + k;
			$('#' + id).val(customer_profile[k]);
			//alert(k);
			//	alert(id+"/"+customer_profile[k]);
		}
		//app.showAlert(response.message, "Result");

		load_appointment_form();
	});

	request.fail(function(jqXHR, textStatus) {
		app.showAlert("Request failed: " + textStatus, "ERROR");
	});

	window.location = "#customer_edit_profile_page";
}

//update uesr table from the become_worker_form

function updateWorkerProfileTables() {
	//	app.showAlert("updateWorkerProfileTables under construction", "ERROR");

	xwm.uname = $('#xwm_uname').val();
	xwm.upass = $('#xwm_upass').val();
	xwm.fname = $('#xwm_fname').val();
	xwm.lname = $('#xwm_lname').val();

	/*	db.transaction(function(tx) {

	 var timestamp = new Date().getTime() / 1000;

	 tx.executeSql("UPDATE OR REPLACE users SET sID=?, uName = ?, uPass=?, fName=?, lName=?, uDate=? WHERE uType = 'worker'", [xwm.siteler_id, xwm.uname, xwm.upass, xwm.fname, xwm.lname, parseInt(timestamp)], function(tx, res) {

	 }, function(e) {
	 console.log("ERROR: " + e.message);
	 app.showAlert("users" + e.message, "ERROR");
	 });

	 });
	 */
	xwm.email = $('#xwm_email').val();

	xwm.cellph1 = $('#xwm_mobile1').val();
	xwm.cellph2 = $('#xwm_mobile1').val();
	xwm.cellph3 = $('#xwm_mobile1').val();

	xwm.cellph = xwm.cellph1 + "-" + xwm.cellph2 + "-" + xwm.cellph3;
	/*
	 db.transaction(function(tx) {

	 tx.executeSql("UPDATE OR REPLACE contacts SET upEmail=?, ucPhone=? WHERE uType = 'worker'", [xwm.email, xwm.cellph], function(tx, res) {

	 }, function(e) {
	 console.log("ERROR: " + e.message);
	 app.showAlert("contacts" + e.message, "ERROR");
	 });

	 });
	 */
	xwm.home_street = $('#xwm_street').val();
	xwm.home_city = $('#xwm_city').val();
	xwm.home_state = $('#xwm_state').val();
	xwm.home_zip = $('#xwm_zip').val();

	//alert(xwm.home_state);
	/*
	 db.transaction(function(tx) {

	 tx.executeSql("UPDATE OR REPLACE homeaddress SET uhStreet=?, uhCity=?, uhState=?, uhZip=? WHERE uType = 'customer'", [xwm.home_street, xwm.home_city, xwm.home_state, xwm.home_zip], function(tx, res) {

	 }, function(e) {
	 console.log("ERROR: " + e.message);
	 app.showAlert("address" + e.message, "ERROR");
	 });

	 });
	 */
	/*	xwm.creditcard = $('#xwm_creditcard').val();
	 xwm.cvv = $('#xwm_cvv').val();
	 xwm.exp_month = $('#xwm_exp_month').val();
	 xwm.exp_year = $('#xwm_exp_year').val();
	 */

}

function loadMyLocation() {

}

function updateMembershipCard() {

	/*	db.transaction(function(tx) {
	 tx.executeSql("select uDate as date, uType as type from users", [], function(tx, res) {
	 //app.showAlert(res.rows.length,'Reresult');

	 var i;
	 for ( i = 0; i < res.rows.length; i++)
	 alert(res.rows.item(i).date + "/" + res.rows.item(i).type);

	 }, function(e) {
	 console.log("ERROR: " + e.message);
	 alert("ERROR: " + e.message);
	 });
	 });*/

	app.showAlert("updateMembershipCard, under construction", "Warning");

};

function updateSigninStatusTables() {
	db.transaction(function(tx) {

		//var timestamp = new Date().getTime() / 1000;

		tx.executeSql("UPDATE OR REPLACE login_status SET status=?, uType=?, location=?, remember=? WHERE id = 1", [signin_status, signin_utype, signin_locationcheck, signin_remember], function(tx, res) {

		}, function(e) {
			console.log("ERROR: " + e.message);
			app.showAlert(e.message, "ERROR");
		});

	});
}


$('form').submit(function() {

	var landmarkID = $(this).parent().attr('data-landmark-id');

	var postData = $(this).serialize();
	//	alert(postData);

	switch(landmarkID) {

	case 'check_service_area_form':
		var phpurl = base_url + 'test_zip.php';
		service_city = $('#service_city').val();
		cervice_state = $('#service_state').val();
		serviec_zip = $('#service_zip').val();
		alert
		var postData = {
			mode : "check",
			state : cervice_state,
			city : service_city,
			zip : serviec_zip
		};

		var request = $.ajax({

			dataType : "json",
			url : phpurl,
			type : "POST",
			data : postData
		});

		request.done(function(data) {

			switch(data.status) {
			case 'ok':

				signin_locationcheck = 1;
				//location covered.

			//	alert(data.message);
				db.transaction(function(tx) {
					//var timestamp = new Date().getTime() / 1000;

					//tx.executeSql("UPDATE OR REPLACE login_status SET location=? WHERE id = '1' ", [1, parseInt(timestamp)], function(tx, res) {

					tx.executeSql("UPDATE OR REPLACE login_status SET location=? WHERE id = '1' ", [signin_locationcheck], function(tx, res) {

					}, function(e) {
						console.log("ERROR: " + e.message);
						app.showAlert("users" + e.message, "DATABASE ERROR");
					});

				});

				db.transaction(function(tx) {

					tx.executeSql("UPDATE OR REPLACE workaddress SET ucCity=?, ucState=?, ucZip=? WHERE uType = 'check'", [service_city, cervice_state, serviec_zip], function(tx, res) {

					}, function(e) {
						console.log("ERROR: " + e.message);
					//	app.showAlert("address" + e.message, "ERROR");
					});

				});
				window.location = "#welcome_page";

				break;
			case 'fail':
			default:

				signin_locationcheck = 0;
				//location not corvered

			//	alert(data.message);

				db.transaction(function(tx) {
					//var timestamp = new Date().getTime() / 1000;

					//tx.executeSql("UPDATE OR REPLACE login_status SET location=? WHERE id = '1' ", [1, parseInt(timestamp)], function(tx, res) {

					tx.executeSql("UPDATE OR REPLACE login_status SET location=? WHERE id = '1' ", [signin_locationcheck], function(tx, res) {

					}, function(e) {
						console.log("ERROR: " + e.message);
						app.showAlert("users" + e.message, "DATABASE ERROR");
					});

				});

				window.location = "#contact_us_page";

				break;
			}

		});

		request.fail(function(jqXHR, textStatus) {
			//app.showAlert("Request failed: " + textStatus, "ERROR");
			//alert("fail");
		});

		//window.location = '#welcome_page';

		break;
	case 'become_worker_form':
		//	alert("become_worker_form");
		var phpurl = base_url + 'become_worker.php';

		$.ajax({
			type : 'POST',
			data : postData,
			url : phpurl,
			success : function(data) {
				//alert(data);

				var response = JSON.parse(data);

				app.showAlert(response.message, "Result");

				if (response.status == "ok") {

					xwm.siteler_id = response.sid;

					//	updateWorkerProfileTables();

					//window.location = '#welcome_page';

				}

				window.location = '#welcome_page';

			},
			error : function() {
				//console.log(data);
				app.showAlert('There was an error in registration form', 'ERROR');
			}
		});

		break;

	//	alert(postData);


	case 'worker_check_schedule_form':
		//alert("worker_check_schedule_form");

		$.ajax({
			type : 'POST',
			data : postData,
			url : base_url + 'worker_check_schedule.php',
			success : function(data) {
				console.log(data);
			//	alert(data);
				if (data == "ok") {
					window.location = "#worker_menu_page";

				} else
					app.showAlert("username/password does not match our records, please sign up an account or sign in again.", "ERROR");
			},
			error : function() {
				console.log(data);
			//	alert('There was an error adding your comment');
			}
		});

		break;

	case 'worker_check_account_form':
		//alert("worker_check_account_form");

		$.ajax({
			type : 'POST',
			data : postData,
			url : base_url + 'worker_check_account.php',
			success : function(data) {
				console.log(data);
			//	alert(data);
				if (data == "ok")
					window.location = "#worker_menu_page";
				else
					app.showAlert("username/password does not match our records, please sign up an account or sign in again.", "ERROR");
			},
			error : function() {
				console.log(data);
			//	alert('There was an error adding your comment');
			}
		});

		break;

	case 'edit_worker_profile_form':
		//alert("edit_worker_profile_form");

		var phpurl = base_url + 'customer_edit_profile.php';

		$.ajax({
			type : 'POST',
			data : postData,
			url : phpurl,
			success : function(data) {

				var response = JSON.parse(data);

				if (response.status == "ok") {
					app.showAlert(response.message, "Result");

					//	updateWorkerEditProfileTables();

					window.location = "#worker_menu_page";
				}
			},
			error : function() {
				console.log(data);
				//	alert('There was an error adding your comment');
				app.showAlert('There was an error adding your comment', "ERROR");
			}
		});

		break;

	case 'login_form':
		signin_uname = $('#login_uname').val();
		signin_upass = $('#login_upassword').val();
		alert(postData);
		//	alert(siteler_id);

		var phpurl = base_url + 'user_login.php';

		var request = $.ajax({
			url : phpurl,
			type : "POST",
			data : postData,
			dataType : "json"
		});

		request.done(function(response) {
			//alert(data);
			if (response.status == "ok") {
				siteler_id = response.sid;
				signin_status = 2;
				//alert(siteler_id);
				updateSigninStatusTables();

				if (isMember(siteler_id)) {
					load_membershipcard_form();
					load_service_list();

					updateCustomerProfileForm();
					//load_appointment_form();

					hide_signin_form();
					window.location = "#customer_page";
				} else {
					updateWorkerProfileForm();
					worker_check_ballance('worker_earning');
					window.location = "#worker_page";

				}

				return;

			} else
				app.showAlert("username/password does not match our records, please sign up an account or sign in again.", "ERROR");

		});

		request.fail(function(jqXHR, textStatus) {
			app.showAlert("Request failed: " + textStatus, "ERROR");
		});

		break;

	case 'one-time_appointment_form':

		load_car_make_list();

		var phpurl = base_url + 'onetime_appointment.php';
		//	alert(postData);

		$.ajax({
			type : 'POST',
			data : postData,
			url : phpurl,
			success : function(data) {
				//alert(data);
				var response = JSON.parse(data);
				app.showAlert(response.message, "Result");
				appmt_id = response.id;
				// appointment

				window.location = "#payment_page";

			},
			error : function() {
			//	alert('There was an error adding your make_appointment form, try again');
			}
		});

		break;

	case 'contact_us_form':

		var phpurl = base_url + 'sendemail.php';
		//alert(postData);
		//alert(phpurl);

		$.ajax({
			type : 'POST',
			data : postData,
			url : phpurl,
			success : function(data) {
				//alert(data);
				var response = JSON.parse(data);
				app.showAlert(response.message, "Result");

				window.location = "#welcome_page";

			},
			error : function() {
				app.showAlert('There is a network error! Please try again', "ERROR");
			}
		});

		break;

	case 'member_contact_us_form':

		var phpurl = base_url + 'member_sendemail.php';
		//alert(postData);

		//	alert(signin_uname);
		//	alert(siteler_id);

		var msg = $('#member_commments').val();
		//	alert(msg);

		postData = {
			sid : siteler_id,
			email : signin_uname,
			comments : msg
		}

		var request = $.ajax({
			url : phpurl,
			type : "POST",
			data : postData,
			dataType : "json"
		});

		request.done(function(response) {
			//alert(data);
			app.showAlert(response.message, "Result");
			if (isMember(siteler_id))
				window.location = "#customer_page";
			else
				window.location = "#worker_page";
		});

		request.fail(function(jqXHR, textStatus) {
			app.showAlert("Request failed: " + textStatus, "ERROR");
		});

		break;

	case 'make_appoinmtment_form':

		var phpurl = base_url + 'member_make_appointment.php';
	//	alert(postData);

		$.ajax({
			type : 'POST',
			data : postData,
			url : phpurl,
			success : function(data) {
				//alert(data);
				var response = JSON.parse(data);
				app.showAlert(response.message, "Result");
				appmt_id = response.id;
				// appointment

				//window.location = "#customer_menu_page";
				window.location = "#payment_page";

			},
			error : function() {
			//	alert('There was an error adding your make_appointment form, try again');
			}
		});

		break;

	case 'edit_customer_profile_form':

		//alert("sid"+siteler_id);

		var phpurl = base_url + 'customer_edit_profile.php';

		$.ajax({
			type : 'POST',
			data : postData,
			url : phpurl,
			success : function(data) {

				var response = JSON.parse(data);

				if (response.status == "ok") {
					app.showAlert(response.message, "Result");

					//	updateCustomerEditProfileTables();

					window.location = "#customer_menu_page";
				}
			},
			error : function() {
				console.log(data);
				//	alert('There was an error adding your comment');
				app.showAlert('There was an error adding your comment', "ERROR");
			}
		});

		break;


	case 'customer_rating_form':
		var phpurl = base_url + 'customer_rating.php';
		//alert(appmt_id);

		//	customer_rating = $('#otc_rating').val();
		//	alert(customer_rating);
		//	alert(postData);

		var request = $.ajax({
			url : phpurl,
			type : "POST",
			data : postData,
			dataType : "json"
		});

		request.done(function(response) {
			//alert(data);
			app.showAlert(response.message, "Result");
		});

		request.fail(function(jqXHR, textStatus) {
			app.showAlert("Request failed: " + textStatus, "ERROR");
		});

		break;

	case 'become_customer_member_form':
		//	app.showAlert("become_customer_member_form","Form");
		var phpurl = base_url + 'become_member.php';
	//	alert(postData);

		var request = $.ajax({
			url : phpurl,
			type : "POST",
			data : postData
		});

		request.done(function(data) {
		//	alert(data);

			var response = JSON.parse(data);

			app.showAlert(response.message, "Result");

			if (response.status == "ok") {

				xcm.siteler_id = response.sid;

				//	updateCustomerProfileTables();

			}

			window.location = '#welcome_page';

		});

		request.fail(function(jqXHR, textStatus) {
			app.showAlert("Request failed: " + textStatus, "ERROR");
		});

		break;

	default:
		break;

	}

	return false;
});

