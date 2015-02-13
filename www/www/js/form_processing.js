function isWorker(sid) {
	var result = false;
	switch(sid.charAt(0)) {
	case 'W':
		result = true;
		break;
	default:
	case 'M':

		break;

	}

	return result;
}

function isMember(sid) {
	var result = false;
	switch(sid.charAt(0)) {
	case 'M':
		result = true;
		break;
	default:
	case 'W':

		break;

	}
	return result;
}

function hide_signin_form() {
	$('#login_form').slideUp();
	$('#firstmenu').show();
	$('#signin_check_bar').show();
}

function show_signin_form() {
	$('#login_form').slideDown();
	$('#firstmenu').hide();
	$('#signin_check_bar').hide();
}

function load_appointment_form() {
	var appointment_location = $('#appointment_location_switch').val();
	//										alert(customer_profile.address);
	//	alert(customer_profile.location);
	$('#appointment_address').val(customer_profile.location);

	$('#appointment_siteler_id').val(siteler_id);
	$('#appointment_username').val(signin_uname);
	$('#appointment_password').val(signin_upass);
	fillServiceOption("member");
	appointment_service_change();
	//$('#appointment_service_type').val("Sedan Basic");
	//$('#appointment_price').val("24.95");
	var v1make, v1model, v1color, v1plate;
	var v2make, v2model, v2color, v2plate;
	//	alert(siteler_id);

	var car1 = customer_profile.v1color + " " + customer_profile.v1make + "/" + customer_profile.v1model;
	$('#appointment_make').val(customer_profile.v1make);
	$('#appointment_model').val(customer_profile.v1model);
	$('#appointment_color').val(customer_profile.v1color);
	$('#appointment_plate').val(customer_profile.v1license);
	//alert(car1);
	if (car1 == "")
		car1 = "undefined";
	$('#appointment_vehicle_select1').text(car1);

	var car2 = customer_profile.v2color + " " + customer_profile.v2make + "/" + customer_profile.v2model;

	if (car2 !== '')
		$('#appointment_vehicle_select2').text(car2);

};
function appointment_location_switch_handler() {
	var appointment_location = $('#appointment_location_switch').val();
	if (appointment_location == 'home') {
		$('#appointment_address').val(customer_profile.address);

	} else {
		$('#appointment_address').val(customer_profile.location);

	}
}

function appointment_vehicle_change() {
	var index = $('#vehicle_select').val();
	switch(index) {
	case "1":
		$('#appointment_make').val(customer_profile.v1make);
		$('#appointment_model').val(customer_profile.v1model);
		$('#appointment_color').val(customer_profile.v1color);
		$('#appointment_plate').val(customer_profile.v1license);
		break;
	case "2":
		$('#appointment_make').val(customer_profile.v2make);
		$('#appointment_model').val(customer_profile.v2model);
		$('#appointment_color').val(customer_profile.v2color);
		$('#appointment_plate').val(customer_profile.v2license);
		break;
	}
}

function appointment_service_change() {
	var index = $('#service_select').val();
	service_type = service_list[index].abbr;
	service_price = service_list[index].price;
	total_charge = parseFloat(service_price) - parseFloat(discount_amount);
	//alert(service_price);
	//alert(discount_amount);

	//	app.showAlert(service_list[index].fullname);

	$('#appointment_service_type').val(service_list[index].abbr);
	//$('#appointment_price').val(total_charge);
	$('#appointment_total_price').val(total_charge);
	$('#appointment_service_fullname').val(service_list[index].fullname);
	//alert($('#appointment_service_type').val());

}

function reschedule_appointmnet_page(appid)
{
	app.showAlert("under construction");
}
