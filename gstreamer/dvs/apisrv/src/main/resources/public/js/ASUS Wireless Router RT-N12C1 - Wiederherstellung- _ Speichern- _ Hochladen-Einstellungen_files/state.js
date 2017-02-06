//For operation mode;
sw_mode = '1';
productid = 'RT-N12C1';
usb_disk_support = '0';
RF5G_support = '';
SW_MODE = '1';
SSID_REPEATER = '';
SOFT_SWMODE_SUPPORT = '0';
PARENTAL_CONTROL_SUPPORT = '1';
NEW_FIRMWARE_VER = '2.1.1.1.33';

var uptimeStr = "Sun, 05 Feb 2017 18:27:41 +0100(160527 secs since boot)";
var timezone = uptimeStr.substring(26,31);
var boottime = parseInt(uptimeStr.substring(32,38));
var newformat_systime = uptimeStr.substring(8,11) + " " + uptimeStr.substring(5,7) + " " + uptimeStr.substring(17,25) + " " + uptimeStr.substring(12,16);  //Ex format: Jun 23 10:33:31 2008
var systime_millsec = Date.parse(newformat_systime); // millsec from system
var JS_timeObj = new Date(); // 1970.1.1

var test_page = 0;
var testEventID = "";
var dr_surf_time_interval = 5;	// second
var show_hint_time_interval = 1;	// second

var wan_route_x = "";
var wan_nat_x = "";
var wan_proto = "";

// Dr. Surf {
// for detect if the status of the machine is changed. {
var manually_stop_wan = "";

// original status {
var old_ifWANConnect = 0;
var old_qos_ready = 1;
var old_wan_link_str = "";
var old_detect_dhcp_pppoe = "";
var old_wan_status_log = "";
var old_detect_wan_conn = "";
var old_wan_ipaddr_t = "";

var old_disk_status = "";
var old_mount_status = "";
var old_printer_sn = "";
var old_wireless_clients = "";
// original status }

// new status {
var new_ifWANConnect = 0;
var new_wan_link_str = "";
var new_detect_dhcp_pppoe = "";
var new_wan_status_log = "";
var new_detect_wan_conn = "";
var new_wan_ipaddr_t = "";

var new_disk_status = "";
var new_mount_status = "";
var new_printer_sn = "";
var new_wireless_clients = "";
// new status }

var id_of_check_changed_status = 0;

function unload_body(){
	disableCheckChangedStatus();
	no_flash_button();
	
	return true;
}

function enableCheckChangedStatus(flag){
	var seconds = this.dr_surf_time_interval*1000;
	
	disableCheckChangedStatus();
	
	if(old_wan_link_str == ""){
		seconds = 1;
		id_of_check_changed_status = setTimeout("get_changed_status('initial');", seconds);
	}
	else
		id_of_check_changed_status = setTimeout("get_changed_status();", seconds);
}

function disableCheckChangedStatus(){
	clearTimeout(id_of_check_changed_status);
	id_of_check_changed_status = 0;
}

function check_if_support_dr_surf(){
	if($("helpname"))
		return 1;
	else
		return 0;
}

function compareWirelessClient(target1, target2){
	if(target1.length != target2.length)
		return (target2.length-target1.length);
	
	for(var i = 0; i < target1.length; ++i)
		for(var j = 0; j < 3; ++j)
			if(target1[i][j] != target2[i][j])
					return 1;
	
	return 0;
}

function check_changed_status(flag){
	if(this.test_page == 1 || wan_route_x == "IP_Bridged" || sw_mode == "2")
		return;
	
	if(flag == "initial"){
		// for the middle of index.asp.
		if(location.pathname == "/" || location.pathname == "/index.asp"){
			if(old_detect_wan_conn == "1")
					showMapWANStatus(1);
			else if(old_detect_wan_conn == "2")
					showMapWANStatus(2);
			else if(old_wan_ipaddr_t == "0.0.0.0")
				showMapWANStatus(0);
			else
				showMapWANStatus(0);
		}
		
		// Dr. Surf -- stop crying.
/*	if(old_ifWANConnect == 0) // WAN port is not plugged. 
			parent.showDrSurf("1");
		else if(old_qos_ready == 0)
			parent.showDrSurf("40");
		else if(old_wan_link_str == "Disconnected"){
			// PPPoE, PPTP, L2TP
			if(wan_proto != "dhcp" && wan_proto != "static"){
				if(old_wan_status_log.indexOf("Failed to authenticate ourselves to peer") >= 0)
					parent.showDrSurf("2_1");
				else if(old_detect_dhcp_pppoe == "no-respond")
					parent.showDrSurf("2_2");
				else
					parent.showDrSurf("5");
			}
			// dhcp, static
			else
				parent.showDrSurf("5");
		}
		else if(old_detect_wan_conn != "1")
			parent.showDrSurf("2_2");
		else 
			parent.showDrSurf("0_0"); // connection is ok.
*/		
		enableCheckChangedStatus();
		
		return;
	}
	
	// for the middle of index.asp.
	if(location.pathname == "/" || location.pathname == "/index.asp"){
		if(new_detect_wan_conn == "1")
			showMapWANStatus(1);
		else if(new_detect_wan_conn == "2")
			showMapWANStatus(2);
		else if(new_wan_ipaddr_t == "0.0.0.0")
			showMapWANStatus(0);
		else
			showMapWANStatus(0);
	}
	
	// Dr.Surf.	
	var diff_number = compareWirelessClient(old_wireless_clients, new_wireless_clients);
	
	if(old_ifWANConnect != new_ifWANConnect){ // if WAN port is plugged.
		old_ifWANConnect = new_ifWANConnect;
		
		if(new_ifWANConnect == 1)
			parent.showDrSurf("0_2");	// not plugged -> plugged
		else
			parent.showDrSurf("1");	// plugged -> not plugged
	}	
	else if(old_detect_wan_conn != new_detect_wan_conn){
		if(new_detect_wan_conn == "1")
			parent.showDrSurf("0_0");
		else if(new_detect_wan_conn == "0")
			parent.showDrSurf("2_2");
		else
			parent.showDrSurf("2_3");
		old_detect_wan_conn = new_detect_wan_conn;
	}	
	else if(diff_number != 0){
		old_wireless_clients = new_wireless_clients;
		
		if(diff_number >= 0)
			parent.showDrSurf("11");
		else
			parent.showDrSurf("12");
	}
	else if(old_disk_status != new_disk_status){
		old_disk_status = new_disk_status;
		
		parent.showDrSurf("20");
	}
	else if(parseInt(old_mount_status) < parseInt(new_mount_status)){
		old_mount_status = new_mount_status;
		
		parent.showDrSurf("21");
	} //lock Add 2009.04.01	
	else if(old_printer_sn != new_printer_sn){
		old_printer_sn = new_printer_sn;
	
		parent.showDrSurf("30");
	} //lock modified 2009.04.01
	else if(old_wan_link_str != new_wan_link_str){
		old_wan_link_str = new_wan_link_str;
		
		if(new_wan_link_str == "Disconnected"){
			old_detect_dhcp_pppoe = new_detect_dhcp_pppoe;
			
			// PPPoE, PPTP, L2TP
			if(wan_proto != "dhcp" && wan_proto != "static"){
				if(old_wan_status_log != new_wan_status_log){ // PPP serial change!
					old_wan_status_log = new_wan_status_log;
					
					if(new_wan_status_log.length > 0){
						if(new_wan_status_log.indexOf("Failed to authenticate ourselves to peer") >= 0)
							parent.showDrSurf("2_1");
						else
							parent.showDrSurf("2_2");
					}
					else if(new_detect_dhcp_pppoe == "no-respond")
						parent.showDrSurf("2_2");
					else
						parent.showDrSurf("5");
				}
				else if(new_detect_dhcp_pppoe == "no-respond")
					parent.showDrSurf("2_2");
				else
					parent.showDrSurf("3");
			}
			// dhcp, static
			else{
				if(new_detect_dhcp_pppoe == "no-respond")
					parent.showDrSurf("2_2");
				else if(new_detect_dhcp_pppoe == "error")
					parent.showDrSurf("3");
				else
					parent.showDrSurf("5");
			}
		}
		else if(new_detect_wan_conn != "1")
			parent.showDrSurf("2_2");
		else
			parent.showDrSurf("0_1");
	}
	
	enableCheckChangedStatus();
}

function get_changed_status(flag){
	if(location.pathname == "/Advanced_FirmwareUpgrade_Content.asp") return;

	document.titleForm.action = "/result_of_get_changed_status.asp";
	
	if(flag == "initial")
		document.titleForm.flag.value = flag;
	else
		document.titleForm.flag.value = "";
	
	document.titleForm.submit();
}

function initial_change_status(manually_stop_wan,
															 ifWANConnect,
														   wan_link_str,
														   detect_dhcp_pppoe,
														   wan_status_log,
														   disk_status,
														   mount_status,
														   printer_sn,
														   wireless_clients,
														   qos_ready,
															 detect_wan_conn,
															 wan_ipaddr_t
														   ){
	this.manually_stop_wan = manually_stop_wan;
	this.old_ifWANConnect = ifWANConnect;
	this.old_wan_link_str = wan_link_str;
	this.old_detect_dhcp_pppoe = detect_dhcp_pppoe;
	this.old_wan_status_log = wan_status_log;
	this.old_printer_sn = printer_sn;
	this.old_wireless_clients = wireless_clients;
	this.old_qos_ready = qos_ready;
	this.old_detect_wan_conn = detect_wan_conn;
	this.old_wan_ipaddr_t = wan_ipaddr_t;
}

function set_changed_status(manually_stop_wan,
														ifWANConnect,
														wan_link_str,
														detect_dhcp_pppoe,
														wan_status_log,
														disk_status,
														mount_status,
														printer_sn,
														wireless_clients,
														detect_wan_conn,
														wan_ipaddr_t		
														){
	this.manually_stop_wan = manually_stop_wan;
	this.new_ifWANConnect = ifWANConnect;
	this.new_wan_link_str = wan_link_str;
	this.new_detect_dhcp_pppoe = detect_dhcp_pppoe;
	this.new_new_wan_status_log = wan_status_log;
	this.new_printer_sn = printer_sn;
	this.new_wireless_clients = wireless_clients;
	this.new_detect_wan_conn = detect_wan_conn;
	this.new_wan_ipaddr_t = wan_ipaddr_t;
}
// for detect if the status of the machine is changed. }

function set_Dr_work(flag){
	if(flag != "help"){
		$("Dr_body").onclick = function(){
				showDrSurf();
			};
		
		$("Dr_body").onmouseover = function(){
				showDrSurf();
			};
		
		$("Dr_body").onmouseout = function(){
				showDrSurf();
			};
	}
	else{
		$("Dr_body").onclick = function(){
				showDrSurf(null, "help");
			};
		
		$("Dr_body").onmouseover = function(){
				showDrSurf(null, "help");
			};
		
		$("Dr_body").onmouseout = function(){
				showDrSurf(null, "help");
			};
	}
}

var slowHide_ID_start = 0;
var slowHide_ID_mid = 0;

function clearHintTimeout(){
	if(slowHide_ID_start != 0){
		clearTimeout(slowHide_ID_start);
		slowHide_ID_start = 0;
	}
	
	if(slowHide_ID_mid != 0){
		clearTimeout(slowHide_ID_mid);
		slowHide_ID_mid = 0;
	}
}

function showHelpofDrSurf(hint_array_id, hint_show_id){
	var seconds = this.show_hint_time_interval*1000;
	
	if(!$("eventDescription")){
		setTimeout('showHelpofDrSurf('+hint_array_id+', '+hint_show_id+');', 100);
		return;
	}
	
	disableCheckChangedStatus();
	clearHintTimeout();
	
	if(typeof(hint_show_id) == "number" && hint_show_id > 0)
		clicked_help_string = "<span>"+helptitle[hint_array_id][hint_show_id][0]+"</span><br>"+helpcontent[hint_array_id][hint_show_id];
	$("eventDescription").innerHTML = clicked_help_string;
	
	set_Dr_work("help");
	$("eventLink").onclick = function(){};
	showtext($("linkDescription"), "");
	
	$("drsword").style.filter = "alpha(opacity=100)";
	$("drsword").style.opacity = 1;	
	$("drsword").style.visibility = "visible";
	
	$("wordarrow").style.filter	= "alpha(opacity=100)";
	$("wordarrow").style.opacity = 1;	
	$("wordarrow").style.visibility = "visible";
	
	slowHide_ID_start = setTimeout("slowHide(100);", seconds);
}

var current_eventID = null;
var now_alert = new Array(3);

var alert_event0_0 = new Array("Verbindung ist aufgebaut.", "", "");
var alert_event0_1 = new Array("Verbindung wurde neu aufgebaut.", "Seite aktualisieren", refreshpage);
var alert_event0_2 = new Array("Kabel wurde an WAN-Port angeschlossen.", "Seite aktualisieren", refreshpage);
var alert_event1 = new Array("Das Ethernet-Kabel ist nicht angeschlossen.", "Schauen Sie sich die Diagnose an.", drdiagnose);
var alert_event2_1 = new Array("PPPoE- oder PPTP-Authentisierung fehlgeschlagen.", "Schauen Sie sich die Diagnose an.", drdiagnose);
var alert_event2_2 = new Array("Externer Server antwortet nicht.", "Schauen Sie sich die Diagnose an.", drdiagnose);
var alert_event2_3 = new Array("Neuerkennung Ihres Verbindungsstatus", "", drdiagnose);
var alert_event3 = new Array("DHCP Ihres Internetanbieters funktioniert nicht richtig.", "Schauen Sie sich die Diagnose an.", drdiagnose);
var alert_event4 = new Array("Internetverbindung fehlgeschlagen. Die IP-Adresse des Routers ist mit der IP-Adresse des Gateways identisch.", "Schauen Sie sich die Diagnose an.", drdiagnose);  //wan_gateway & lan_ipaddr;
var alert_event5 = new Array("1. Sie haben die WAN-Verbindung offensichtlich manuell gestoppt.<br>2. Sie haben eine falsche dynamische oder statische IP-Adresse fur Ihren RT-N12C1 festgelegt.", "Schauen Sie sich die Diagnose an.", drdiagnose);

var alert_event10 = new Array("Einige Drahtlos-Clients wurden mit dem RT-N12C1 verbunden oder davon getrennt. ", "Schauen Sie sich die Diagnose an.", drdiagnose);
var alert_event11 = new Array("Einige Wireless-Clients wurden mit dem RT-N12C1 verbunden.", "Schauen Sie sich die Diagnose an.", drdiagnose);
var alert_event12 = new Array("Einige Wireless-Clients wurden vom RT-N12C1 getrennt.", "Schauen Sie sich die Diagnose an.", drdiagnose);
var alert_event20 = new Array("Der Status des USB-Laufwerks im RT-N12C1 hat sich geandert.", "Schauen Sie sich die Diagnose an.", drdiagnose);
var alert_event21 = new Array("Das Laufwerk im RT-N12C1 ist eingebunden, Zugriff ist moglich.", "Schauen Sie sich die Diagnose an.", drdiagnose);
var alert_event30 = new Array("Der Status des USB-Druckers im RT-N12C1 hat sich geandert.", "Schauen Sie sich die Diagnose an.", drdiagnose);
var alert_event40 = new Array("Die Bandbreitenverwaltung arbeitet, das System kann jedoch die Uplink-Geschwindigkeit nicht erkennen. Stellen Sie die Uplink-Geschwindigkeit bitte manuell ein.", "Schauen Sie sich die Diagnose an.", drdiagnose);

function showDrSurf(eventID, flag){
	var seconds = this.show_hint_time_interval*1000;
	var temp_eventID;
	
	// for test
	if(this.testEventID != "")
		eventID = this.testEventID;
	
	if(eventID){
		this.current_eventID = eventID;
		temp_eventID = eventID;
	}
	else
		temp_eventID = this.current_eventID;
	
	if(!temp_eventID || temp_eventID.length <= 0){
		id_of_check_changed_status = setTimeout("enableCheckChangedStatus();", 1000);
		return;
	}
	
	disableCheckChangedStatus();
	clearHintTimeout();
	
	if(flag != "help"){
		now_alert[0] = eval("alert_event"+temp_eventID+"[0]");
		if(temp_eventID != "5")
			showtext($("eventDescription"), now_alert[0]);
		else if(this.manually_stop_wan == "1")
			showtext($("eventDescription"), "Sie haben die WAN-Verbindung offensichtlich manuell gestoppt.");
		else
			showtext($("eventDescription"), "Sie haben eine falsche dynamische oder statische IP-Adresse fur Ihren RT-N12C1 festgelegt.");
		
		now_alert[1] = eval("alert_event"+temp_eventID+"[1]");
		if(now_alert[1] != ""){
			now_alert[2] = eval("alert_event"+temp_eventID+"[2]");
			
			$("eventLink").onclick = function(){
					now_alert[2](temp_eventID);
				};
			
			showtext($("linkDescription"), now_alert[1]);
		}
	}
	
	$("drsword").style.filter = "alpha(opacity=100)";
	$("drsword").style.opacity = 1;	
	$("drsword").style.visibility = "visible";
	
	$("wordarrow").style.filter	= "alpha(opacity=100)";
	$("wordarrow").style.opacity = 1;	
	$("wordarrow").style.visibility = "visible";
	
	slowHide_ID_start = setTimeout("slowHide(100);", seconds);
}

function slowHide(filter){
	clearHintTimeout();
	
	$("drsword").style.filter = "alpha(opacity="+filter+")";
	$("drsword").style.opacity = filter*0.01;
	$("wordarrow").style.filter	= "alpha(opacity="+filter+")";
	$("wordarrow").style.opacity = filter*0.01;
	
	filter -= 5;
	if(filter <= 0){
		hideHint();
		
		enableCheckChangedStatus();
	}
	else
		slowHide_ID_mid = setTimeout("slowHide("+filter+");", 100);
}

function hideHint(){
	if(this.current_eventID){
		now_alert[0] = eval("alert_event"+this.current_eventID+"[0]");
		showtext($("eventDescription"), now_alert[0]);
		
		now_alert[1] = eval("alert_event"+this.current_eventID+"[1]");
		if(now_alert[1] != ""){
			now_alert[2] = eval("alert_event"+this.current_eventID+"[2]");
			
			$("eventLink").onclick = function(){
					now_alert[2](current_eventID);
				};
			
			showtext($("linkDescription"), now_alert[1]);
		}
	}
	
	$("drsword").style.visibility = "hidden";
	$("wordarrow").style.visibility = "hidden";
}

function drdiagnose(eventID){
	if(!check_if_support_dr_surf()){
		alert("Don't yet support Dr. Surf!");
		return;
	}
	
	if($('statusIcon'))
		$('statusIcon').src = "/images/iframe-iconDr.gif";
	
	if(typeof(openHint) == "function")
		openHint(0, 0);
	
	showtext($('helpname'), "Dr. Surf’s Diagnose");
	
	if($("hint_body"))
		$("hint_body").style.display = "none";
	
	$("statusframe").style.display = "block";
	$('statusframe').src = "/device-map/diagnose"+eventID+".asp";
}
// Dr. Surf }

var banner_code, menu_code="", menu1_code="", menu2_code="", tab_code="", footer_code;

function show_banner(L3){// L3 = The third Level of Menu

	var banner_code = "";
		
	// for chang language
	banner_code +='<form method="post" name="titleForm" id="titleForm" action="/start_apply.htm" target="hidden_frame">\n';
	banner_code +='<input type="hidden" name="current_page" value="">\n';
	banner_code +='<input type="hidden" name="sid_list" value="LANGUAGE;">\n';
	banner_code +='<input type="hidden" name="action_mode" value=" Apply ">\n';
	banner_code +='<input type="hidden" name="preferred_lang" value="">\n';
	banner_code +='<input type="hidden" name="flag" value="">\n';
	banner_code +='</form>\n';
	
	banner_code +='<div class="banner1" align="center"></div>\n';
	banner_code +='<table width="983" border="0" align="center" cellpadding="0" cellspacing="0">\n';
	banner_code +='<tr>\n';
	banner_code +='<td class="top-logo"><a href="/"><div id="modelName">RT-N12C1</div></a></td>\n';
	
	banner_code +='<td class="top-message">\n';
	//banner_code +='<span class="top-messagebold">Zeit: </span><span class="time" id="systemtime"></span><br/>\n';
	banner_code +='<span class="top-messagebold">2.4G: </span><input class="top_ssid" type="text" value="" id="elliptic_ssid" readonly=readonly>';
	banner_code +='<span class="top-messagebold" id="index-ssid-5g-title">5G: </span><input class="top_ssid" type="text" value="" id="elliptic_ssid_5g" readonly=readonly><br/>';
	banner_code +='<span class="top-messagebold">Firmware-Version: </span><a href="/Advanced_FirmwareUpgrade_Content.asp"><span id="firmver" class="time"></span></a>&nbsp&nbsp<br/>\n';
	banner_code +='<span class="top-messagebold" title="Der RT-N12C1 unterstutzt drei Betriebsmodi fur unterschiedliche Einsatzbedingungen. Bitte wahlen Sie den Modus, der am besten zu Ihrer Situation passt.">Betriebsmodus: </span><a href="/OperationMode.asp"><span id="sw_mode_span" class="time"></span></a>\n';
	banner_code +='</td>\n';
	
	banner_code +='<td class="top-message"width="150">\n';
	banner_code +='<span class="top-messagebold">Sprache:</span><br>\n';
	banner_code +='<select name="select_lang" id="select_lang" class="top-input" onchange="change_language();">\n';
	banner_code +='<option value="EN">English</option>\n<option value="TW">繁體中文</option>\n<option value="CN">简体中文</option>\n<option value="CZ">Česky</option>\n<option value="PL">Polski</option>\n<option value="RU">Pусский</option>\n<option value="DE" selected>Deutsch</option>\n<option value="FR">Français</option>\n<option value="TR">Türkçe</option>\n<option value="TH">ไทย</option>\n<option value="MS">Malaysia</option>\n';
	banner_code +='</select>\n';
	banner_code +='<input type="button" id="change_lang_btn" class="button" value="OK" onclick="submit_language();" style="float:right; margin:5px 10px 0 0;" disabled=disabled>\n';
	
	banner_code +='</td>\n';
	banner_code +='<td class="top-message" width="120">\n';
	banner_code +='<div id="logout_btn" class="buttonquit"><a style="text-decoration:none;" href="javascript:;" onclick="logout();">Abmelden</a></div>\n';
	banner_code +='<div id="reboto_btn" class="buttonquit"><a style="text-decoration:none;" href="javascript:;" onclick="reboot();">Neustart</a></div>\n';
	banner_code +='</td>\n';
	
// Dr. Surf {
	banner_code += '<td id="Dr_body" class="top-message" width="40">\n';
	
	banner_code += '<div id="dr" class="dr"></div>\n';
	banner_code += '<div id="drsword" class="drsword">\n';
	banner_code += '<span id="eventDescription"></span>\n';
	banner_code += '<br>\n';
	banner_code += '<a id="eventLink" href="javascript:void(0);"><span id="linkDescription"></span></a>\n';
	banner_code += '</div>\n';
	banner_code += '<div id="wordarrow" class="wordarrow"><img src="/images/wordarrow.png"></div>\n';
	
	banner_code += '&nbsp;</td>\n';
// Dr. Surf }
	
	banner_code +='<td width="11"><img src="images/top-03.gif" width="11" height="78" /></td>\n';
	banner_code +='</td></tr></table>\n';
	
	if(L3 == 0) 		// IF Without Level 3 menu, banner style will use top.gif.
		banner_code +='<div id="banner3" align="center"><img src="images/top.gif" width="983" height="19" /></div>\n';
	else
		banner_code +='<div id="banner3" align="center"><img src="images/top-advance.gif" width="983" height="19" /></div>\n';

	$("TopBanner").innerHTML = banner_code;
	
	show_loading_obj();
	
	if(location.pathname == "/" || location.pathname == "/index.asp"){
		if(wan_route_x != "IP_Bridged")
			id_of_check_changed_status = setTimeout('hideLoading();', 3000);
	}
	else
		id_of_check_changed_status = setTimeout('hideLoading();', 1);
	
	//show_time();
	show_top_status();
	set_Dr_work();
}

//Level 3 Menu
var tabtitle = new Array(7);
tabtitle[0] = new Array("", "2.4G Allgemein", "5G Allgemein", "WPS", "Brucke", "Wireless-MAC-Filter", "RADIUS-Einstellungen", "2.4G Professional", "5G Professional");
tabtitle[1] = new Array("", "LAN-IP", "DHCP-Server", "Route");
tabtitle[2] = new Array("", "Internetverbindung", "QoS", "Portauslosung", "Virtueller Server", "DMZ", "DDNS");
tabtitle[3] = new Array("", "Netzwerkumgebung-Freigabe", "FTP-Freigabe", "Sonstige Einstellungen");
tabtitle[4] = new Array("", "Allgemein", "URL-Filter", "MAC-Filter", "LAN-zu-WAN-Filter");
tabtitle[5] = new Array("", "System", "Firmware-Aktualisierung", "Wiederherstellung- / Speichern- / Hochladen-Einstellungen");
tabtitle[6] = new Array("", "Allgemeines Protokoll", "DHCP-Nutzungen", "Wireless-Protokoll", "Portweiterleitung", "Routingtabelle");

//Level 3 Tab title
var tablink = new Array(7);
tablink[0] = new Array("", "Advanced_Wireless_Content.asp", "Advanced_Wireless_Content_5g.asp",  "Advanced_WWPS_Content.asp", "Advanced_WMode_Content.asp", "Advanced_ACL_Content.asp", "Advanced_WSecurity_Content.asp", "Advanced_WAdvanced_Content.asp", "Advanced_WAdvanced_Content_5g.asp");
tablink[1] = new Array("", "Advanced_LAN_Content.asp", "Advanced_DHCP_Content.asp", "Advanced_GWStaticRoute_Content.asp");
tablink[2] = new Array("", "Advanced_WAN_Content.asp", "Advanced_QOSUserSpec_Content.asp", "Advanced_PortTrigger_Content.asp", "Advanced_VirtualServer_Content.asp", "Advanced_Exposed_Content.asp", "Advanced_ASUSDDNS_Content.asp");
tablink[3] = new Array("", "Advanced_AiDisk_samba.asp", "Advanced_AiDisk_ftp.asp", "Advanced_AiDisk_others.asp");
tablink[4] = new Array("", "Advanced_BasicFirewall_Content.asp", "Advanced_URLFilter_Content.asp", "Advanced_MACFilter_Content.asp", "Advanced_Firewall_Content.asp");
tablink[5] = new Array("", "Advanced_System_Content.asp", "Advanced_FirmwareUpgrade_Content.asp", "Advanced_SettingBackup_Content.asp");
tablink[6] = new Array("", "Main_LogStatus_Content.asp", "Main_DHCPStatus_Content.asp", "Main_WStatus_Content.asp", "Main_IPTStatus_Content.asp", "Main_RouteStatus_Content.asp");

//Level 2 Menu
menuL2_title = new Array("", "Wireless", "LAN", "WAN", "USB-Anwendung", "Firewall", "Administration", "Systemprotokoll");
/* First item of Level 2 Menu */
menuL2_link  = new Array("", tablink[0][1], tablink[1][1], tablink[2][1], tablink[3][1], tablink[4][1], tablink[5][1], tablink[6][1]);
//Level 1 Menu in Gateway, Router mode
menuL1_title = new Array("", "Netzwerkkarte", "Betriebsmodus", "AiDisk", "EzQoS-<br/> Bandbreite-<br/> Management", "Parental Control", "<br/>Erweiterte Einstellungen");
menuL1_link = new Array("", "index.asp", "OperationMode.asp", "aidisk.asp", "EZQoS.asp", "ParentalControl.asp", "as.asp");

function show_menu(L1, L2, L3){

	if(PARENTAL_CONTROL_SUPPORT != "1" || sw_mode != "1"){
		menuL1_link[5] = ""; //Parental control
		menuL1_title[5] = ""; //Parental control
	}
	else{
		tabtitle[4].splice(3,1); //remove MAC filter
		tablink[4].splice(3,1); //remove MAC filter
	}

	if(usb_disk_support == "0"){
		tabtitle[3].splice(1,3);//remove USB
		tablink[3].splice(1,3);
		menuL2_link[4] = "";    //remove USB
		menuL2_title[4] = "";
		menuL1_link[3] = "";    //remove USB
		menuL1_title[3] = "";		

	}


	/* remove AiDisk, only Router mode supported AiDisk */
	if(sw_mode != "1"){
		menuL1_link[3] = "";
		menuL1_title[3] = "";		
	}

	if(RF5G_support != "1"){
		tabtitle[0].splice(8,1);//remove RF5G
		tablink[0].splice(8,1);
	}

	if( sw_mode == "1" ){
		// remove WDS
		tabtitle[0].splice(4,1);
		tablink[0].splice(4,1);
	}

	if(RF5G_support != "1"){
		tabtitle[0].splice(2,1);//remove RF5G
		tablink[0].splice(2,1);
	}

	if(sw_mode == "2" || sw_mode == "3"){
		
		if(sw_mode == "2"){
			/* do not use this options */
			tabtitle[0].splice(1,8);// nothing
			tablink[0].splice(1,8); // nothing
			menuL2_title[1]= "";    // nothing
			menuL2_link[1] = "";    // nothing
		}
		if(sw_mode == "3"){
			if(RF5G_support != "1"){
				tabtitle[0].splice(3,1);// remove WDS
				tablink[0].splice(3,1); // remove WDS
				tabtitle[0].splice(2,1);// remove WPS
				tablink[0].splice(2,1); // remove WPS
			}else{
				tabtitle[0].splice(4,1);// remove WDS
				tablink[0].splice(4,1); // remove WDS
				tabtitle[0].splice(3,1);// remove WPS
				tablink[0].splice(3,1); // remove WPS
			}
		}		
		tabtitle[1].splice(2,2);//LAN
		tabtitle[2].splice(1,6);//WAN
		tabtitle[4].splice(1,4);//firewall
		tabtitle[6].splice(2,1);//log
		tabtitle[6].splice(3,2);//log

		tablink[1].splice(2,2);
		tablink[1][1] = "Advanced_APLAN_Content.asp";
		tablink[2].splice(1,6);
		tablink[4].splice(1,4);
		tablink[6].splice(2,1);
		tablink[6].splice(3,2);
		
		menuL2_link[3] = "";
		menuL2_link[5] = "";
		menuL2_title[3] = "";
		menuL2_title[5] = "";
		
		menuL1_link[4] = "";  //remove EzQoS;
		menuL1_title[4] = "";
		
		menuL2_link[2] = tablink[1][1];
		menuL2_link[7] = tablink[6][1];
	}
	
	for(i = 1; i <= menuL1_title.length-1; i++){
		if(menuL1_title[i] == "")
			continue;
		else if(L1 == i && L2 <= 0){
		  menu1_code += '<div class="m'+i+'_r" id="option'+i+'">'+menuL1_title[i]+'</div>\n';
		}
		else{
		  menu1_code += '<div class="menu" id="option'+i+'"><a href="'+menuL1_link[i]+'" title="'+menuL1_link[i]+'">'+menuL1_title[i]+'</a></div>\n';	
		}
	}
	
	$("mainMenu").innerHTML = menu1_code;
	
	if(L2 != -1){
		for(var i = 1; i <= menuL2_title.length-1; ++i){
			if(menuL2_title[i] == "")
			{
				continue;
			}
			else if(L2 == i)
			{
				/* Class style for selected item */
				menu2_code += '<div class="thissubmenu">'+menuL2_title[i]+'</div>\n';
			}
			else
			{
				/* Class style for un-selected item */
				menu2_code += '<div class="submenu"><a href="'+menuL2_link[i]+'">'+menuL2_title[i]+'</a></div>\n';
			}
		}
	}
	menu2_code += '<div><img src="images/m-button-07end.gif" width="187" height="47" /></div>\n';
	$("subMenu").innerHTML = menu2_code;
	
	if(L3){
		tab_code = '<table border="0" cellspacing="0" cellpadding="0"><tr>\n';
		for(var i = 1; i < tabtitle[L2-1].length; ++i){
			if(tabtitle[L2-1][i] == "")
				continue;
			else if(L3 == i)
				tab_code += '<td class=\"b1\">'+ tabtitle[L2-1][i] +'</td>\n';
			else
				tab_code += '<td class=\"b2\"><a href="' +tablink[L2-1][i]+ '">'+ tabtitle[L2-1][i] +'</a></td>\n';
		}
		tab_code += '</tr></table>\n';
		
		$("tabMenu").innerHTML = tab_code;
	}
	else
		$("tabMenu").innerHTML = "";//*/
}

function show_footer(){
	footer_code = '<div align="center" class="bottom-image"></div>\n';
	footer_code +='<div align="center" class="copyright">2011 ASUSTek Computer Inc. Alle Rechte vorbehalten.</div>\n';
	
	$("footer").innerHTML = footer_code;
	
	if($("helpname"))
		showtext($("helpname"), "Hilfe");
	if($("hint_body"))
		showtext($("hint_body"), "In der Hilfe finden Sie Richtlinien und Informationen zur Nutzung der Router-Funktionen.  Klicken Sie auf die <a class=\"hintstyle\" style=\"background-color:#7aa3bd\">gelb und blau unterstrichenen verlinkten Worter.</a> zum Aufrufen der Hilfe.");
	flash_button();
}

var ssid2 = "";
var ssid2_5g = "";
function show_top_status(){
	// show SSID in the top-middle block
	ssid2 = decodeURIComponent("Biene-Julia");	
	ssid2_5g = decodeURIComponent("");	
	
	if(ssid2.length > 7){
		ssid2 = ssid2.substring(0,6) + "...";
		$("elliptic_ssid").title = decodeURIComponent("Biene-Julia");
	}	
	
	if(ssid2_5g.length > 0){
		if(ssid2_5g.length > 7){
			ssid2_5g = ssid2_5g.substring(0,6) + "...";
			$("elliptic_ssid_5g").title = decodeURIComponent("");
		}	
	}else{
		$("index-ssid-5g-title").style.visibility = "hidden";
	}
	
	$("elliptic_ssid").value = ssid2;	
	if(ssid2_5g.length > 0){
		$("elliptic_ssid_5g").value = ssid2_5g;	
	}
	showtext($("firmver"), NEW_FIRMWARE_VER);

	
	if(sw_mode == "1")  // Show operation mode in banner, Lock add at 2009/02/19
		$("sw_mode_span").innerHTML = "Router";
	else if(sw_mode == "2")
		$("sw_mode_span").innerHTML = "Repeater";
	else if(sw_mode == "3")
		$("sw_mode_span").innerHTML = "AP";	

	if(sw_mode == "2"){
		/* Config 2G ssid for repeater mode */
		if(ssid2.length > 7){
			ssid2 = ssid2.substring(0, 6) + "...";
		}	
		$("elliptic_ssid").value = ssid2;	
		$("elliptic_ssid").title = decodeURIComponent("");
	
		/* Hidden 5G ssid */
		$("elliptic_ssid_5g").style.visibility = "hidden";
		$("index-ssid-5g-title").style.visibility = "hidden";
	}
	
}

function show_time(){	
	JS_timeObj.setTime(systime_millsec); // Add millsec to it.	
	JS_timeObj3 = JS_timeObj.toString();	
	JS_timeObj3 = checkTime(JS_timeObj.getHours()) + ":" +
				  			checkTime(JS_timeObj.getMinutes()) + ":" +
				  			checkTime(JS_timeObj.getSeconds());
	$('systemtime').innerHTML ="<a href='/Advanced_System_Content.asp'>" + JS_timeObj3 + "</a>";
	systime_millsec += 1000;		
	
	stime_ID = setTimeout("show_time();", 1000);
}

function checkTime(i)
{
if (i<10) 
  {i="0" + i}
  return i
}

function show_loading_obj(){
	var obj = $("Loading");
	var code = "";
	
	code +='<table cellpadding="5" cellspacing="0" id="loadingBlock" class="loadingBlock" align="center">\n';
	code +='<tr>\n';
	code +='<td width="20%" height="80" align="center"><img src="/images/loading.gif"></td>\n';
	code +='<td><span id="proceeding_main_txt">Bitte warten, </span><span id="proceeding_txt" style="color:#FFFFCC;"></span></td>\n';
	code +='</tr>\n';
	code +='</table>\n';
	code +='<!--[if lte IE 6.5]><iframe class="hackiframe"></iframe><![endif]-->\n';
	
	obj.innerHTML = code;
}

var nav;

if(navigator.appName == 'Netscape')
	nav = true;
else{
	nav = false;
	document.onkeydown = MicrosoftEventHandler_KeyDown;
}

function MicrosoftEventHandler_KeyDown(){
	return true;
}

function submit_language(){
	if($("select_lang").value != $("preferred_lang").value){
		showLoading();
		
		with(document.titleForm){
			action = "/start_apply.htm";
			
			if(location.pathname == "/")
				current_page.value = "/index.asp";
			else
				current_page.value = location.pathname;
			
			preferred_lang.value = $("select_lang").value;
			flag.value = "set_language";
			
			submit();
		}
	}
	else
		alert("No change LANGUAGE!");
}

function change_language(){
	if($("select_lang").value != $("preferred_lang").value)
		$("change_lang_btn").disabled = false;
	else
		$("change_lang_btn").disabled = true;
}

function logout(){
	if(confirm('Mochten Sie sich wirklich abmelden?')){
		setTimeout('location = "Logout.asp";', 1);
	}
}

function reboot(){
	if(confirm("Der Neustart des Routers braucht etwa 90 Sekunden. Mochten Sie den Router wirklich neu starten?")){
 		 if(window.frames["statusframe"] && window.frames["statusframe"].stopFlag == 0){
  		 window.frames["statusframe"].stopFlag = 1;
  		 //alert(window.frames["statusframe"].stopFlag);
 		 }
		showLoading(60);
		setTimeout("location.href = '/index.asp';", 60000);
		$("hidden_frame").src = "Reboot.asp";
	}
}

function kb_to_gb(kilobytes){
	if(typeof(kilobytes) == "string" && kilobytes.length == 0)
		return 0;
	
	return (kilobytes*1024)/(1024*1024*1024);
}

function simpleNum(num){
	if(typeof(num) == "string" && num.length == 0)
		return 0;
	
	return parseInt(kb_to_gb(num)*1000)/1000;
}

function simpleNum2(num){
	if(typeof(num) == "string" && num.length == 0)
		return 0;
	
	return parseInt(num*1000)/1000;
}

function simpleNum3(num){
	if(typeof(num) == "string" && num.length == 0)
		return 0;
	
	return parseInt(num)/1024;
}

function $(){
	var elements = new Array();
	
	for(var i = 0; i < arguments.length; ++i){
		var element = arguments[i];
	if(typeof element == 'string')
		element = document.getElementById(element);
		
		if(arguments.length == 1)
			return element;
		
		elements.push(element);
	}
	
	return elements;
}

function getElementsByName_iefix(tag, name){
	var tagObjs = document.getElementsByTagName(tag);
	var objsName;
	var targetObjs = new Array();
	var targetObjs_length;
	
	if(!(typeof(name) == "string" && name.length > 0))
		return [];
	
	for(var i = 0, targetObjs_length = 0; i < tagObjs.length; ++i){
		objsName = tagObjs[i].getAttribute("name");
		
		if(objsName && objsName.indexOf(name) == 0){
			targetObjs[targetObjs_length] = tagObjs[i];
			++targetObjs_length;
		}
	}
	
	return targetObjs;
}

function getElementsByClassName_iefix(tag, name){
	var tagObjs = document.getElementsByTagName(tag);
	var objsName;
	var targetObjs = new Array();
	var targetObjs_length;
	
	if(!(typeof(name) == "string" && name.length > 0))
		return [];
	
	for(var i = 0, targetObjs_length = 0; i < tagObjs.length; ++i){
		if(navigator.appName == 'Netscape')
			objsName = tagObjs[i].getAttribute("class");
		else
			objsName = tagObjs[i].getAttribute("className");
		
		if(objsName == name){
			targetObjs[targetObjs_length] = tagObjs[i];
			++targetObjs_length;
		}
	}
	
	return targetObjs;
}

function showtext(obj, str){
	if(obj)
		obj.innerHTML = str;//*/
}

function showhtmlspace(ori_str){
	var str = "", head, tail_num;
	
	head = ori_str;
	while((tail_num = head.indexOf(" ")) >= 0){
		str += head.substring(0, tail_num);
		str += "&nbsp;";
		
		head = head.substr(tail_num+1, head.length-(tail_num+1));
	}
	str += head;
	
	return str;
}

// A dummy function which just returns its argument. This was needed for localization purpose
function translate(str){
	return str;
}

function trim(val){
	val = val+'';
	for (var startIndex=0;startIndex<val.length && val.substring(startIndex,startIndex+1) == ' ';startIndex++);
	for (var endIndex=val.length-1; endIndex>startIndex && val.substring(endIndex,endIndex+1) == ' ';endIndex--);
	return val.substring(startIndex,endIndex+1);
}

function IEKey(){
	return event.keyCode;
}

function NSKey(){
	return 0;
}

function is_string(o){
	if(!nav)
		keyPressed = IEKey();
	else
		keyPressed = NSKey();
	
	if(keyPressed == 0)
		return true;
	else if(keyPressed >= 0 && keyPressed <= 126)
		return true;
	
	alert('Ungultiges Zeichen!');
	return false;
}

function validate_string(string_obj, flag){
	if(string_obj.value.charAt(0) == '"'){
		if(flag != "noalert")
			alert('Diese Zeichenfolge darf nicht beginnen mit ["]');
		
		string_obj.value = "";
		string_obj.focus();
		
		return false;
	}
	else{
		invalid_char = "";
		
		for(var i = 0; i < string_obj.value.length; ++i){
			if(string_obj.value.charAt(i) < ' ' || string_obj.value.charAt(i) > '~'){
				invalid_char = invalid_char+string_obj.value.charAt(i);
			}
		}
		
		if(invalid_char != ""){
			if(flag != "noalert")
				alert("Diese Zeichenfolge darf nicht enthalten: '"+invalid_char+"' !");
			string_obj.value = "";
			string_obj.focus();
			
			return false;
		}
	}
	
	return true;
}

function validate_hex(obj){
	var obj_value = obj.value
	var re = new RegExp("[^a-fA-F0-9]+","gi");
	
	if(re.test(obj_value))
		return false;
	else
		return true;
}

function validate_psk(psk_obj){
	var psk_length = psk_obj.value.length;
	
	if(psk_length < 8){
		alert("Der gemeinsam genutzte Schlussel sollte langer als sieben und kurzer als 64 Zeichen oder Hexadezimalzeichen sein. Wenn Sie dieses Feld nicht ausfullen, weist das System [00000000] als Schlussel zu.");
		psk_obj.value = "00000000";
		psk_obj.focus();
		psk_obj.select();
		
		return false;
	}
	
	if(psk_length > 64){
		alert("Der gemeinsam genutzte Schlussel sollte langer als sieben und kurzer als 64 Zeichen oder Hexadezimalzeichen sein.");
		psk_obj.value = psk_obj.value.substring(0, 64);
		psk_obj.focus();
		psk_obj.select();
		
		return false;
	}
	
	if(psk_length >= 8 && psk_length <= 63 && !validate_string(psk_obj)){
		alert("Der gemeinsam genutzte Schlussel sollte langer als sieben und kurzer als 64 Zeichen oder Hexadezimalzeichen sein.");
		psk_obj.value = "00000000";
		psk_obj.focus();
		psk_obj.select();
		
		return false;
	}
	
	if(psk_length == 64 && !validate_hex(psk_obj)){
		alert("Der gemeinsam genutzte Schlussel sollte langer als sieben und kurzer als 64 Zeichen oder Hexadezimalzeichen sein.");
		psk_obj.value = "00000000";
		psk_obj.focus();
		psk_obj.select();
		
		return false;
	}
	
	return true;
}

function validate_wlkey_5g(key_obj){
	var wep_type = document.form.wl1_wep_x.value;
	var iscurrect = true;
	var str = "Bitte geben Sie den richtigen WEP-Schlussel ein.";
	
	if(wep_type == "0")
		iscurrect = true;	// do nothing
	else if(wep_type == "1"){
		if(key_obj.value.length == 5 && validate_string(key_obj)){
			document.form.wl1_key_type.value = 1; /*Lock Add 11.25 for ralink platform*/
			iscurrect = true;
		}
		else if(key_obj.value.length == 10 && validate_hex(key_obj)){
			document.form.wl1_key_type.value = 0; /*Lock Add 11.25 for ralink platform*/
			iscurrect = true;
		}
		else{
			str += "(5 ASCII-Zeichen oder 10 Hexadezimalzeichen)";
			
			iscurrect = false;
		}
	}
	else if(wep_type == "2"){
		if(key_obj.value.length == 13 && validate_string(key_obj)){
			document.form.wl1_key_type.value = 1; /*Lock Add 11.25 for ralink platform*/
			iscurrect = true;
		}
		else if(key_obj.value.length == 26 && validate_hex(key_obj)){
			document.form.wl1_key_type.value = 0; /*Lock Add 11.25 for ralink platform*/
			iscurrect = true;
		}
		else{
			str += "(13 ASCII-Zeichen oder 26 Hexadezimalzeichen)";
			
			iscurrect = false;
		}
	}
	else{
		alert("System error!");
		iscurrect = false;
	}
	
	if(iscurrect == false){
		alert(str);
		
		key_obj.focus();
		key_obj.select();
	}
	
	return iscurrect;
}

function validate_wlkey(key_obj){
	var wep_type = document.form.wl_wep_x.value;
	var iscurrect = true;
	var str = "Bitte geben Sie den richtigen WEP-Schlussel ein.";
	
	if(wep_type == "0")
		iscurrect = true;	// do nothing
	else if(wep_type == "1"){
		if(key_obj.value.length == 5 && validate_string(key_obj)){
			document.form.wl_key_type.value = 1; /*Lock Add 11.25 for ralink platform*/
			iscurrect = true;
		}
		else if(key_obj.value.length == 10 && validate_hex(key_obj)){
			document.form.wl_key_type.value = 0; /*Lock Add 11.25 for ralink platform*/
			iscurrect = true;
		}
		else{
			str += "(5 ASCII-Zeichen oder 10 Hexadezimalzeichen)";
			
			iscurrect = false;
		}
	}
	else if(wep_type == "2"){
		if(key_obj.value.length == 13 && validate_string(key_obj)){
			document.form.wl_key_type.value = 1; /*Lock Add 11.25 for ralink platform*/
			iscurrect = true;
		}
		else if(key_obj.value.length == 26 && validate_hex(key_obj)){
			document.form.wl_key_type.value = 0; /*Lock Add 11.25 for ralink platform*/
			iscurrect = true;
		}
		else{
			str += "(13 ASCII-Zeichen oder 26 Hexadezimalzeichen)";
			
			iscurrect = false;
		}
	}
	else{
		alert("System error!");
		iscurrect = false;
	}
	
	if(iscurrect == false){
		alert(str);
		
		key_obj.focus();
		key_obj.select();
	}
	
	return iscurrect;
}

function checkDuplicateName(newname, targetArray){
	var existing_string = targetArray.join(',');
	existing_string = ","+existing_string+",";
	var newstr = ","+trim(newname)+",";
	
	var re = new RegExp(newstr, "gi");
	var matchArray = existing_string.match(re);
	
	if(matchArray != null)
		return true;
	else
		return false;
}

function alert_error_msg(error_msg){
	alert(error_msg);
	refreshpage();
}

function refreshpage(seconds){
	if(typeof(seconds) == "number")
		setTimeout("refreshpage()", seconds*1000);
	else
		location.href = location.href;
}

function hideLinkTag(){
	if(document.all){
		var tagObjs = document.all.tags("a");
		
		for(var i = 0; i < tagObjs.length; ++i)
			tagObjs(i).outerHTML = tagObjs(i).outerHTML.replace(">"," hidefocus=true>");
	}
}

function buttonOver(o){	//Lockchou 1206 modified
	o.style.color = "#FFFFFF";
	o.style.background = "url(/images/bgaibutton.gif) #ACCCE1";
	o.style.cursor = "hand";
}

function buttonOut(o){	//Lockchou 1206 modified
	o.style.color = "#000000";
	o.style.background = "url(/images/bgaibutton0.gif) #ACCCE1";
}

function flash_button(){
	if(navigator.appName.indexOf("Microsoft") < 0)
		return;
	
	var btnObj = getElementsByClassName_iefix("input", "button");
	
	for(var i = 0; i < btnObj.length; ++i){
		btnObj[i].onmouseover = function(){
				buttonOver(this);
			};
		
		btnObj[i].onmouseout = function(){
				buttonOut(this);
			};
	}
}

function no_flash_button(){
	if(navigator.appName.indexOf("Microsoft") < 0)
		return;
	
	var btnObj = getElementsByClassName_iefix("input", "button");
	
	for(var i = 0; i < btnObj.length; ++i){
		btnObj[i].onmouseover = "";
		
		btnObj[i].onmouseout = "";
	}
}

function gotoprev(formObj){
	var prev_page = formObj.prev_page.value;
	
	if(prev_page == "/")
		prev_page = "/index.asp";
	
	if(prev_page.indexOf('QIS') < 0){
		formObj.action = prev_page;
		formObj.target = "_parent";
		formObj.submit();
	}
	else{
		formObj.action = prev_page;
		formObj.target = "";
		formObj.submit();
	}
}

function add_option(selectObj, str, value, selected){
	var tail = selectObj.options.length;
	
	if(typeof(str) != "undefined")
		selectObj.options[tail] = new Option(str);
	else
		selectObj.options[tail] = new Option();
	
	if(typeof(value) != "undefined")
		selectObj.options[tail].value = value;
	else
		selectObj.options[tail].value = "";
	
	if(selected == 1)
		selectObj.options[tail].selected = selected;
}

function free_options(selectObj){
	if(selectObj == null)
		return;
	
	for(var i = selectObj.options.length-1; i >= 0; --i){
		selectObj.options[i].value = null;
		selectObj.options[i] = null;
	}
}

function blocking(obj_id, show){
	var state = show?'block':'none';
	
	if(document.getElementById)
		$(obj_id).style.display = state;
	else if(document.layers)
		document.layers[obj_id].display = state;
	else if(document.all)
		document.all[obj_id].style.display = state;
}

function inputCtrl(obj, flag){
	if(flag == 0){
		obj.disabled = true;
		obj.style.backgroundColor = "#CCCCCC";		
		if(obj.type == "radio" || obj.type == "checkbox")
			obj.style.backgroundColor = "#C0DAE4";
	}
	else{
		obj.disabled = false;
		obj.style.backgroundColor = "#FFF";
		if(obj.type == "radio" || obj.type == "checkbox")
			obj.style.backgroundColor = "#C0DAE4";
	}
}

function popupWindow(w,u){
	disableCheckChangedStatus();
	
	winW_H();
	
	$(w).style.width = winW+"px";
	$(w).style.height = winH+"px";
	$(w).style.visibility = "visible";
	
	$('popupframe').src = u;
}
function hidePop(flag){
	if(flag != "apply")
		enableCheckChangedStatus();

	$('popupframe').src = "";
	$('OverlayMask').style.visibility = "hidden";
}
