var helptitle = new Array(19);
// Wireless
helptitle[0] = [["", ""],
				["SSID", "wl_ssid"],
				["SSID verbergen", "wl_closed"],				
				["Kanal", "wl_channel"],
				["Wireless-Modus", "wl_gmode"],
				["Authentisierungs methode", "wl_auth_mode"],
				["WPA-Verschlusselung", "wl_crypto"],
				["WPA Pre-Shared Key", "wl_wpa_psk"],
				["Asus-Kennwort", "wl_phrase_x"],
				["WEP-Verschlusselung", "wl_wep_x"],
				["Schlusselindex", "wl_key"],
				["Netzwerkschlussel-Rotationsintervall", "wl_wpa_gtk_rekey"],
				["WEP-Schlussel", "wl_asuskey1"],
				["WEP-Schlussel", "wl_asuskey1"],
				["Kanalbandbreite", "wl_nbw_cap"],
				["Erweiterter Kanal", "HT_EXTCHA"],
				["Wireless-Geschwindigkeit", "wireless_speed_mode"],
				["Wireless-Geschwindigkeit", "wireless_speed_mode"],	
				["Wireless-Geschwindigkeit", "wireless_speed_mode"],	
				["Wireless-Geschwindigkeit", "wireless_speed_mode"],
				["WPA Pre-Shared Key", "wl_wpa_psk"]
				];
helptitle[1] = [["", ""],
				["AP-Modus", "wl_mode_x"],
				["Kanal", "wl_channel"],
				["Wireless-Brucke aktivieren", "wl_wdsapply_x"]];
helptitle[2] = [["", ""],
				["Server-IP-Adresse", "wl_radius_ipaddr"],
				["Serverport", "wl_radius_port"],
				["Geheimes Verbindungskennwort", "wl_radius_key"]];
helptitle[3] = [["", ""],
				["Funkmodul aktivieren", "wl_radio_x"],
				["Datum zur Funkmodulaktivierung", "wl_radio_date_x_"],
				["Uhrzeit zur Funkmodulaktivierung", "wl_radio_time_x_"],
				["", ""],//["AfterBurner aktivieren", "wl_afterburner"],
				["AP isoliert festlegen", "wl_ap_isolate"],
				["Datenrate (Mbps)", "wl_rate"],
				["Multicast-Rate (Mbps)", "wl_mrate"],
				["Basisrateneinstellung", "wl_rateset"],
				["Fragmentierungsschwellwert", "wl_frag"],
				["RTS-Schwellwert", "wl_rts"],
				["DTIM-Intervall", "wl_dtim"],
				["Bakenintervall", "wl_bcn"],
				["Frame-Bursting aktivieren", "wl_frameburst"],
				["WMM aktivieren?", "wl_wme"],
				["WMM, Keine Bestatigung aktivieren?", "wl_wme_no_ack"],
				["Paket-Aggregation aktivieren", "PktAggregate"],
				["WMM APSD aktivieren", "APSDCapable"],
				["WMM DLS aktivieren", "DLSCapable"],
				["Greenfield aktivieren", "wl_mimo_preamble"],
				["Preamble Type", "wl_plcphdr"] // 20
				];
// LAN
helptitle[4] = [["", ""],
				["IP-Adresse", "lan_ipaddr"],
				["Subnetzmaske", "lan_netmask"],
				["Standardgateway", "lan_gateway"]];
helptitle[5] = [["", ""],
			 	["DHCP-Server aktivieren", "dhcp_enable_x"],
				["Domanenname des RT-N12C1", "lan_domain"],
				["IP-Pool-Startadresse", "dhcp_start"],
				["IP-Pool-Endadresse", "dhcp_end"],
				["Nutzungszeit", "dhcp_lease"],
				["Standardgateway", "dhcp_gateway_x"],
				["DHCP-IP-Adresse", "dhcp_dns1_x"],
				["WINS-Server", "dhcp_wins_x"],
				["Manuelle Zuweisung aktivieren", "dhcp_static_x"]];
helptitle[6] = [["", ""],
				["Netzwerk/Host-IP", "sr_ipaddr_x_0"],
				["Netzmaske", "sr_netmask_x_0"],
				["Gateway", "sr_gateway_x_0"],
				["Metrisch ", "sr_matric_x_0"],
				["Schnittstelle", "sr_if_x_0"]];
// WAN
helptitle[7] = [["", ""],
				["IP-Adresse", "wan_ipaddr"],
				["Subnetzmaske", "wan_netmask"],
				["Standardgateway", "wan_gateway"],
				["Benutzername", "wan_pppoe_username"],
				["Kennwort", "wan_pppoe_passwd"],
				["Leerlauftrennungszeit in Sekunden: Trennung nach Inaktivitatsdauer (in Sekunden):", "wan_pppoe_idletime"],
				["MTU", "wan_pppoe_mtu"],
				["MRU", "wan_pppoe_mru"],
				["Servicename", "wan_pppoe_service"],
				["Zugriffskonzentratorname", "wan_pppoe_ac"],
				["PPPoE-Relais aktivieren", "wan_pppoe_relay_x"],
				["Automatisch mit DNS-Server verbinden", "wan_dnsenable_x"],
				["DNS-Server 1", "wan_dns1_x"],
				["DNS-Server 2", "wan_dns2_x"],
				["Hostname", "wan_hostname"],
				["MAC-Adresse", "wan_hwaddr_x"],
				["PPTP-Optionen", "wan_pptp_options_x"],
				["Zusatzliche PPPD-Optionen", "wan_pppoe_options_x"],
				["Heart-Beat- oder PPTP/L2TP-Server (VPN)", "wan_heartbeat_x"],
				["Starcraft (Battle.Net)", "sp_battle_ips"],
				["IPTV STB-Port auswahlen", "wan_stb_x"]];
//Firewall
helptitle[8] = [["", ""],
				["Protokollierte Pakettypen", "fw_log_x"],
				["Web-Zugriff uber WAN aktivieren", "misc_http_x"],
				["Port zum Web-Zugriff uber WAN", "misc_httpport_x"],
				["Auf LPR-Anfragen uber WAN reagieren", "misc_lpr_x"],
				["Auf Ping-Anfragen uber WAN reagieren", "misc_ping_x"],
				["Firewall aktivieren", "fw_enable_x"],
				["DoS-Schutz aktivieren", "fw_dos_x"]];
helptitle[9] = [["", ""],
				["Datum zum Aktivieren des URL-Filters", "url_date_x_"],
				["Uhrzeit zum Aktivieren des URL-Filters", "url_time_x_"]];
helptitle[10] = [["", ""],
				["Datum zum Aktivieren des LAN-zu-WAN-Filters", "filter_lw_date_x_"],
				["Uhrzeit zum Aktivieren des LAN-zu-WAN-Filters", "filter_lw_time_x_"],
				["Nicht spezifizierte Pakete werden", "filter_lw_default_x"],
				["Gefilterte ICMP-Pakettypen", "filter_lw_icmp_x"],
				["LAN-zu-WAN-Filter aktivieren ", "fw_lw_enable_x"]];
//Administration
helptitle[11] = [["", ""],
				["Externer Protokollserver", "log_ipaddr"],
				["Zeitzone", "time_zone"],
				["NTP-Server", "ntp_server0"],
				["Neues Kennwort", "http_passwd2"],
				["Neues Kennwort erneut eingeben", "v_password2"]];
//Log
helptitle[12] = [["", ""],
				["Bootzeit", "system_now_time"],
				["Druckermodell", ""],
				["Druckerstatus", ""],
				["Aktiver Benutzer", ""]];
//WPS
helptitle[13] = [["", ""],
				["WPS aktivieren", ""],
				["WPS-Methode", ""],
				["Client-PIN-Code", ""],
				["AP-PIN-Code", ""]];
//UPnP
helptitle[14] = [["", ""],
				["UPnP-Medienserver", ""]];
//AiDisk Wizard
helptitle[15] = [["", ""],
				["<a href='../Advanced_AiDisk_ftp.asp' target='_parent' hidefocus='true'>USB-Anwendung</a>", ""],
				["Erstellung der Zugriffsrechte", ""],
				["Einrichtung von DDNS-Services", ""],
				["Einrichtung von freigegebenen Laufwerken", ""]];

helptitle[16] = [["", ""],
				["Uber EzQoS", ""]];
//Others in the USB application
helptitle[17] = [["", ""],
				["Maximum angemeldeter Benutzer", "st_max_user"],
				["Geratename", "computer_name"],
				["Arbeitsgruppe", "st_samba_workgroup"],
				["Download Master aktivieren", "apps_dl"],
				["Download-Freigabe aktivieren", "apps_dl_share"],
				["UPnP aktivieren", "upnp_enable"],
				["Initialskript", "run_prog"],
				["Sprache am FTP-Server", "ftp_lang"],
				["Seeding", "apps_seed"],
				["Maximum Upload Rate", "apps_upload_max"]];
// MAC filter
helptitle[18] = [["", ""],
				["MAC-Filtermodus", "macfilter_enable_x"],
				["Portbereich", ""],
				["Quell-IP/Ziel-IP", ""],
				["Zielport", ""]];
// Setting
helptitle[19] = [["", ""],
				["Werkseinstellungen", ""],
				["Einstellungen speichern", ""],
				["Einstellungen wiederherstellen", ""]];
// QoS
helptitle[20] = [["", ""],
				["Gemessene Uplink-Geschwindigkeit", ""],
				["Manuelle Uplink-Geschwindigkeit", "qos_manual_ubw"]];
// HSDPA
helptitle[21] = [["", ""],
				["HSDPA-Modus", "hsdpa_mode"],
				["PIN-Code", "pin_code"],
				["APN-Service (optional)", "private_apn"],
				["HSDPAMTU", "wan_hsdpa_mtu"],
				["HSDPAMRU", "wan_hsdpa_mru"],
				["DNS-Server 1", "wan2_dns1_x"],
				["DNS-Server 2", "wan2_dns2_x"]];

helptitle[22] = [["", ""],
								 ["Router(Router mode)", ""],
								 ["Repeater(Repeater-Modus)", ""],
								 ["AP(Access-Point-Modus)", ""]];

/* Wireless 5G */
helptitle[23] = [["", ""],
				["SSID", "wl_ssid"],
				["SSID verbergen", "wl_closed"],				
				["Kanal", "wl_channel"],
				["Wireless-Modus", "wl_gmode"],
				["Authentisierungs methode", "wl_auth_mode"],
				["WPA-Verschlusselung", "wl_crypto"],
				["WPA Pre-Shared Key", "wl_wpa_psk"],
				["Asus-Kennwort", "wl_phrase_x"],
				["WEP-Verschlusselung", "wl_wep_x"],
				["Schlusselindex", "wl_key"],
				["Netzwerkschlussel-Rotationsintervall", "wl_wpa_gtk_rekey"],
				["WEP-Schlussel", "wl_asuskey1"],
				["WEP-Schlussel", "wl_asuskey1"],
				["Kanalbandbreite", "wl_nbw_cap"],
				["Erweiterter Kanal", "HT_EXTCHA"],
				["Wireless-Geschwindigkeit", "wireless_speed_mode"],
				["Wireless-Geschwindigkeit", "wireless_speed_mode"],	
				["Wireless-Geschwindigkeit", "wireless_speed_mode"],	
				["Wireless-Geschwindigkeit", "wireless_speed_mode"],
				["WPA Pre-Shared Key", "wl_wpa_psk"]
				];
var helpcontent = new Array(19);
helpcontent[0] = new Array("",
						   "Zur Zuweisung einer Identifizierungszeichenfolge Ihrer Wireless-Verbindung mit bis zu 32 Zeichen.",
						   "Wenn Sie [Ja] wahlen, wird Ihre SSID bei Standortabfragen von Wireless-Clients nicht angezeigt; diese konnen sich nur mit der SSID des AP mit Ihrem Asus Wireless-Router verbinden. ",						   
						   "Der Funkkanal fur den Wireless-Betrieb.",
						   "Auf dieser Seite könne Sie jede dieser Optionen für den Wireless-Modus Ihrer 802.11n-Schnittstelle auswählen:<p>[Auto]: Ermöglicht 802.11n-, 802.11g- und 802.11b-Clients die Verbindung mit Ihrem Gerät.</p><p>[n Only]: Maximale Leistung, erlaubt aber keine Verbindung von 802.11g- und 802.11b-Clients mit Ihrem Gerät.</p><p>Markieren Sie [b/g Protection], um den b/g-Schutz für 11g- oder 11b-Datenverkehr zu aktivieren.</p>",
						   "Dieses Feld aktiviert Authentisierungsmethoden fur Wireless-Clients.",
						   "WPA-Verschlusselung zur Datenverschlusselung aktivieren.",
						   "Der gemeinsam genutzte Schlussel sollte langer als sieben und kurzer als 64 Zeichen oder Hexadezimalzeichen sein. Wenn Sie dieses Feld nicht ausfullen, weist das System [00000000] als Schlussel zu.",
						   "Zur automatischen Erzeugung von vier WEP-Schlusseln wahlen Sie [WEP, 64 Bit] oder [WEP, 128 Bit] im Feld WEP-Verschlusselung.",
						   "Aktiviert die WEP-Verschlusselung zur Verschlusselung von Daten.",
						   "Zum Festlegen des WEP-Schlussels zur Verschlusselung Ihrer Daten in Wireless-Netzwerken.",
						   "Dieses Feld gibt das Intervall (in Sekunden) zum Wechseln einer WPA-Schlusselgruppe an. Wenn Sie [0] (Null) eingeben, wird der Schlussel nicht in bestimmten Abstanden gewechselt.",
						   "5 ASCII-Zeichen oder 10 Hexadezimalzeichen",
						   "13 ASCII-Zeichen oder 26 Hexadezimalzeichen",
						   "Die Auswahl einer größeren Bandbreite bietet Ihnen eine höhere Übertragungsgeschwindigkeit.",
						   "Auswahl des erweiterten Kanals, der im 20/40MHz-Kanalbandbreitenmodus benutzt wird. 802.11n benutzt den erweiterten Kanal, um höhere Geschwindigkeiten zu erzielen.",
						   "802.11b-Modus, die Wireless-Geschwindigkeit beträgt bis zu 11Mbps.",
						   "Legacy-Modus – bis zu 54Mbps für ein 802.11 b/g-Netzwerk.",
						   "Standardmodus - Im 2,4 Ghz-Frequenzband sind Wi-Fi-zertifizierte Produkte n-Produkte so konfiguriert, dass sie standardmäßig in 20 Mhz-Kanälen arbeiten und die Geschwindigkeit bis zu 144 Mbps beträgt.",
						   "Leistungsmodus – Benutzt eine 20/40MHz gemeinsame Bandbreite, um den Wireless-Durchsatz zu maximieren. Wenn Sie mit der Wireless-Stabilität Probleme bekommen, wählen Sie bitte den Standardmodus.",
						   "Geben Sie einen Netzwerkschlüssel von 8 bis 63 Zeichen (Buchstaben, Zahlen oder Kombinationen daraus) ein. Wenn Sie keine Netzwerksicherheit einrichten wollen, lassen Sie die Felder für den Netzwerkschlüssel leer. Die Standard-Wireless-Sicherheit ist WPA-Auto-Personal  TKIP+AES - TKIP+AES.");
helpcontent[1] = new Array("",
						   "Zum Deaktivieren der Wireless-Bruckenfunktion wahlen Sie [Nur AP]. Wahlen Sie [Nur WDS], wenn Sie Verbindungen mit lokalen Wireless-Stationen unterbinden mochten. Wahlen Sie [Hybrid] zum Aktivieren der Wireless-Bruckenfunktion, wenn sich Wireless-Statione",
						   "Der Funkkanal fur den Wireless-Betrieb.",
						   "Wahlen Sie [Ja], wenn Sie den RT-N12C1 mit anderen in der externen Bruckenliste aufgefuhrten APs verbinden mochten.");
helpcontent[2] = new Array("",
						   "Die IP-Adresse des RADIUS-Servers fur 802.1X-Wireless-Authentisierung und dynamische WEP-Schlusselableitung.",
						   "Die UDP-Portnummer zur Verbindung mit dem RADIUS-Server.",
						   "Das Kennwort zur Verbindung mit dem RADIUS-Server.");
helpcontent[3] = new Array("",
						   "Mit [Ja] aktivieren Sie das Funkmodul.",
						   "Dieses Feld legt fest, an welchen Tagen die Wireless-Funktion aktiviert wird.",
						   "Dieses Feld legt fest, zu welchen Zeiten die Wireless-Funktion aktiviert wird.",						   
						   "Wenn AfterBurner aktiviert wurde, wird beim Einsatz von Wireless-Karten mit AfterBurner-Funktion die Übertragungsleistung bei der Verbindung mit dem Router verbessert. Der AfterBurner-Modus setzt voraus: [Authentisierungsmethode] auf [Offenes System oder gemeinsam genutzter Schlüssel], [AP-Modus] auf [Nur AP], [Anonym zulassen] auf [Nein] eingestellt.",
						   "Wählen Sie [Ja], um die Verbindung zwischen den drahtlosen mobilen Clients zu verhindern.",
						   "In diesem Feld konnen Sie die Ubertragungsrate auswahlen. Wir empfehlen die Einstellung [Auto] fur maximale Leistung.",
							 "Hier wahlen Sie die Multicast-Ubertragungsrate aus. Fur maximale Leistung empfehlen wir die Einstellung [Auto].",
							 "Dieses Feld gibt an, welche Basisraten ein Wireless-Client unterstutzen muss.",
						   "Der Fragmentierungsschwellwert legt die Frame-Größe von eingehenden Meldungen (von 256 – 2346 Bytes) fest, die als Fragmentierungsgrenze verwendet wird. Bei zu hoher Frame-Größe nimmt die Zuverlässigkeit der Übertragung durch Störungen ab. Bei zu kleiner Frame-Größe leidet die Übertragungsgeschwindigkeit.",
						   "In Umgebungen mit hohem Storungspotenzial und bei einer grosen Anzahl von Clients vermindern Sie den RTS-Wert (Request To Send) zur Verbesserung der Ubertragungsleistung.",
						   "DTIM (Delivery Traffic Indication Message) ist im Bakenpaket enthalten. Das DTIM-Intervall (1 – 255) steht fur den Zeitraum zum Aufwecken von Wireless-Clients aus dem Schlafmodus. Der Standardwert lautet 1.",
						   "Das Bakenintervall definiert den Zeitraum, der zwischen den einzelnen Baken verstreicht. Der Standardwert ist 100 (Einheit: Millisekunden). Ein niedriges Bakenintervall kann die Ubertragungsleistung in kritischen Umgebungen und bei Roaming-Clients verbess",
						   "Zur Leistungsverbesserung aktivieren Sie Frame-Bursting mit der Auswahl [Aktivieren].",
						   "WMM (Wi-Fi Multimedia) aktivieren Sie, wenn Sie die Leistung von Multimedia-Anwendungen in Ihrem Wireless-Netzwerk verbessern mochten.",
						   "[Keine Bestatigung] ist eine Bestatigungsrichtlinie auf MAC-Ebene. Wenn aktiviert, ergibt sich ein besserer Durchsatz, der jedoch mit hoheren Fehlerraten in storungstrachtigen HF-Umgebungen erkauft wird.",
						   "Die Auswahl von [Aktivieren] aktiviert die Paket-Aggregation, um die gelieferte Bandbreite in Ihrem Netzwerk zu erhöhen.",
						   "WMM APSD aktivieren/deaktivieren (Automatic Power Save Delivery).",
						   "WMM DLS aktivieren/deaktivieren (Direct Link Setup).",
						   "Die Auswahl von [Green Field] aktiviert Greenfield, um das Netzwerk zu veranlassen, frühere Standards zu ignorieren. ",
						   "The Preamble type defines the length of the CRC (Cyclic Redundancy Check) block which is a technique for detecting data transmission errors. We suggest that you configure all wireless devices to the same type. Short preambles improve throughput but all clients in the wireless network must support this capacity if selected.");	//20
helpcontent[4] = new Array("",
						   "Die LAN-IP-Adresse des RT-N12C1. Der Standardwert lautet 192.168.1.1.",
						   "Die LAN-Subnetzmaske des RT-N12C1. Der Standardwert lautet 255.255.255.0.",
						   "Dies ist die IP-Adresse des Standardgateways fur den Zugriffspunkt");
helpcontent[5] = new Array("",
							 "Der DHCP-Server dient zur automatischen Administration und Zuweisung von IP-Adressen fur LAN-Clients.",
							 "Der Domanenname fur Clients, die IP-Adressen vom DHCP-Server abfragen.",
							 "Die erste Adresse im Pool, die vom DHCP-Server im LAN zugewiesen werden kann.",
							 "Dieses Feld definiert die letzte Adresse im Pool, die vom DHCP-Server im LAN zugewiesen werden kann.",
							 "Die Verbindungszeit mit der aktuellen, dynamischen IP-Adresse.",
							 "Dieses Feld gibt die IP-Adresse des Gateways in Ihrem LAN an. Wenn Sie dieses Feld leer lassen, wird die IP-Adresse des RT-N12C1 zugewiesen.",
							 "Dieses Feld gibt die IP-Adresse des DNS zum Abruf durch Clients vom DHCP-Server an. Wenn Sie dieses Feld leer lassen, wird die DNS-Anfrage vom RT-N12C1 bearbeitet.",
							 "Der Windows Internet Naming Service verwaltet die Interaktion von PCs mit dem Internet. Wenn Sie einen WINS-Server nutzen, geben Sie die IP-Adresse des Servers hier an.",
							 "Enable the manual assigned IP function that DHCP server can assign fixed IP to the client have specified MAC address.");
helpcontent[6] = new Array("",
						   "Dies steht fur das Zielnetzwerk oder einen Host mit einer Routerregel. Also kann dies eine Hostadresse wie 「192.168.123.11」 oder eine Netzwerkadresse wie 「192.168.0.0」 sein.",
						   "Zeigt an, wie viele Bits fur Netzwerk-ID und Subnetz-ID verwendet werden. Beispiel: Falls die Netzwerkmaske in Dezimalschreibweise 255.255.255.0 lautet, ist die Netzmaske 24 Bit lang. Wenn das Ziel ein Host ist, sollte seine Netzmaske 32 Bit verwenden.",
						   "Steht fur die IP-Adresse des Gateways, zu dem Pakete geroutet werden. Der angegebene Gateway muss zuerst erreichbar sein. Das bedeutet, dass Sie im Voraus eine statische Route zum Gateway einrichten mussen.",
						   "Metrik ist ein Wert, mit dem Entfernungen im Netzwerk beschrieben werden",
						   "Netzwerkschnittstelle, auf welche die Routerregel zutrifft.");
//WAN
helpcontent[7] = new Array("",
							 "Dies ist die IP-Adresse des RT-N12C1, wie sie im externen Netzwerk erscheint. Wenn Sie diese auf 0.0.0.0 einstellen, bezieht der RT-N12C1 die IP-Adresse automatisch vom DHCP-Server.",
							 "Dies ist die Subnetzmaske des RT-N12C1, wie sie im externen Netzwerk erscheint.",
							 "Dies ist die IP-Adresse des Standardgateways, die eine Verbindung zwischen dem RT-N12C1 und dem externen Netzwerk oder Host ermoglicht.",
							 "Dieses Feld steht nur dann zur Verfugung, wenn Sie den WAN-Verbindungstyp auf PPPoE, PPTP oder L2TP einstellen.",
							 "Dieses Feld steht nur dann zur Verfugung, wenn Sie den WAN-Verbindungstyp auf PPTP einstellen.",
							 "Dieses Feld ist optional und ermöglicht die Konfiguration des Trennens Ihrer Internetverbindung nach Ablauf einer bestimmten Zeit. Ein Wert von Null steht für unbegrenzte Inaktivitätszeit. Wenn [Nur senden] markiert ist, werden Daten aus dem Internet bei der Bestimmung der Inaktivitätszeit ignoriert. Wenn [Nur senden] markiert ist, wirken sich Internetaktivitäten (zum Beispiel das Herunterladen von Daten) nicht auf die Bestimmung der Inaktivitätszeit aus.",
							 "Diese Abkurzung steht fur Maximum Transmission Unit (maximale Sendeeinheit) von PPPoE-Paketen.",
							 "Diese Abkurzung steht fur Maximum Receive Unit (maximale Empfangseinheit) von PPPoE-Paketen.",
							 "Dieses Feld ist optional und muss eventuell bei bestimmten Internetanbietern angegeben werden. Fragen Sie Ihren Internetanbieter, ob und womit dieses Feld ausgefullt werden muss.",
							 "Dieses Feld ist optional und muss eventuell bei bestimmten Internetanbietern angegeben werden. Fragen Sie Ihren Internetanbieter, ob und womit dieses Feld ausgefullt werden muss.",
							 "[PPPoE-Relais aktivieren] ermoglicht Stationen im LAN die Einrichtung individueller PPPoE-Verbindungen, die durch den NAT gereicht werden.",
							 "Dieses Feld ermoglicht Ihnen den automatischen Abruf der DNS-IP-Adresse uber das externe Netzwerk.",
							 "Dieses Feld zeigt die IP-Adresse des DNS, mit dem sich der RT-N12C1 verbindet.",
							 "Dieses Feld zeigt die IP-Adresse des DNS, mit dem sich der RT-N12C1 verbindet.",
							 "In diesem Feld konnen Sie dem RT-N12C1 einen Hostnamen zuweisen. Dies wird gewohnlich von Ihrem Internetanbieter gefordert.",
							 "In diesem Feld konnen Sie eine eindeutige MAC-Adresse fur den RT-N12C1 zur Verbindung mit dem Internet angeben. Dies wird gewohnlich von Ihrem Internetanbieter gefordert.",
							 "Diese Option muss eventuell bei bestimmten Internetanbietern angegeben werden. Fragen Sie Ihren Internetanbieter, ob und womit dieses Feld ausgefullt werden muss.",
							 "Diese Option muss eventuell bei bestimmten Internetanbietern angegeben werden. Fragen Sie Ihren Internetanbieter, ob und womit dieses Feld ausgefullt werden muss.",
							 "Bitte geben Sie den Servernamen oder die Server-IP des Authentisierungsservers fur den BigPond-Service an.",
							 "Wahlen Sie Ja, wenn mehrere Spieler im LAN gleichzeitig Starcraft spielen konnen sollen.",
							 "Choose the LAN port to bridge to WAN port. If you have another device to connect to WAN but your ISP only provide one WAN link, you can specify some LAN port to receive packets from WAN port. For example, you can connect your IPTV Set-top box to the specified port and get signal and IP from service provider directly.");
//Firewall
helpcontent[8] = new Array("",
						   "Dieses Feld gibt an, welche Arten von Paketen bei der Kommunikation zwischen LAN und WAN protokolliert werden.",
						   "Diese Funktion ermoglicht die Konfiguration des RT-N12C1 uber das Internet. Wenn Sie im Modus Heim-Gateway arbeiten, greifen Sie bitte uber Port 8080 (Beispiel: http://Ihre-WAN-IP:8080) auf den RT-N12C1 zu.",
						   "Legt den Port fest, der zur Konfiguration des RT-N12C1 uber das Internet verwendet wird. Der Standardport ist 8080.",
						   "Ermoglicht die Reaktion des RT-N12C1 auf LPR-Anfragen uber WAN.",
						   "Diese Funktion ermoglicht die Reaktion auf Ping-Anfragen vom WAN.",
						   "Beim Aktivieren der Firewall-Funktion wird Folgendes deaktiviert: Web-Zugriff uber das WAN.",
						   "Enable the function to protect RT-N12C1 from DoS (Denial of Service).");
helpcontent[9] = new Array("",
						   "Dieses Feld definiert das Datum, zu dem der URL-Filter aktiviert wird.",
						   "Dieses Feld definiert die Uhrzeit, zu welcher der URL-Filter aktiviert wird.");
helpcontent[10] = new Array("",
							"Dieses Feld definiert das Datum, zu dem der LAN-zu-WAN-Filter aktiviert wird.",
							"Dieses Feld definiert den Zeitpunkt, zu dem der LAN-zu-WAN-Filter aktiviert wird.",
							"Wählen Sie entweder White List oder Black List, um für die in der Filtertabelle festgelegten Clients die LAN zu WAN-Pakete zu akzeptieren oder zu verwerfen.",
							"Dieses Feld definiert eine Liste mit LAN-zu-WAN-ICMP-Pakettypen, die gefiltert werden. Ein Beispiel: Wenn Sie ICMP-Pakete vom Typ Echo (Typ 8) und Echoantwort (Typ 0) filtern mochten, mussen Sie eine Zeichenfolge aus mit Leerzeichen getrennten Ziffern ein",
							"Wahlen Sie [Ja] zur Aktivierung eines Filters, der eine spezielle IP oder einen Port zur Steuerung von ankommenden oder abgehenden Paketen nutzt.");
//Administration
helpcontent[11] = new Array("",
							"In diesem Feld konnen Sie einen externen Server zur Aufzeichnung von Protokollmeldungen des RT-N12C1 angeben. Wenn Sie dieses Feld leer lassen, zeichnet das System bis zu 1024 Meldungen im RT-N12C1 auf.",
							"Die Zeitzone Ihres Standortes.",
							"Zur Synchronisierung Ihrer Systemzeit mit einem NTP-Server.",
							"Passwort erlaubt nur die Eingabe 16 Zeichen!",
							"Passwort erlaubt nur die Eingabe 16 Zeichen!");
//Log
helpcontent[12] = new Array("",
							"Verstrichene Zeit seit Systemstart",
							"An den RT-N12C1 angeschlossener Drucker.",
							"Aktueller Status des Druckers",
							"Die IP-Adresse des Benutzers, der den jeweiligen Drucker nutzt.");
//WPS
helpcontent[13] = new Array("",
							"Die Auswahl von Ja ermoglicht Wi-Fi Protected Setup (WPS) zur Vereinfachung von Verbindungen mit beliebigen Geraten im Wireless-Netzwerk. WPS unterstutzt die Authentisierung von Offenes System, Gemeinsamer Schlussel, WPA-Personal, WPA2-Personal. Nicht unt",
							"Bei der Auswahl von PIN (Personliche Identifizierungsnummer) mussen Sie eine Zahl zum Aufbau einer Wireless-Verbindung eingeben. Wahlen Sie PBC (Push Button Configuration – Schaltflache-Konfiguration) wenn Sie eine Wireless-Verbindung durch Anklicken eine",
							"Geben Sie den PIN-Code als achtstellige Zahl ein und klicken Sie auf [Verbinden].",
							"Merken Sie sich den PIN-Code des AP (identisch mit dem PIN-Code am Boden des RT-N12C1).<p>Geben Sie diesen PIN-Code in das WPS-Dienstprogramm am Client ein; das Dienstprogramm konfiguriert die Wireless-Sicherheitseinstellungen des RT-N12C1.<p>");
//UPnP
helpcontent[14] = new Array("",
							"Der RT-N12C1 unterstutzt UPnP-Standards. Sie konnen dies aktivieren und anderen UPnP-Geraten wie PS3 oder digitalen Medienplayern den Zugriff auf Multimediadateien des USB-Laufwerks erlauben.");
//AiDisk Wizard
helpcontent[15] = new Array("",
							"Zur erweiterten Konfiguration der Dateifreigabe.",
							"Der RT-N12C1 bietet Ihnen drei Typen von Zugriffsrechten auf freigegebene Ressourcen:<p> a) Uneingeschrankte Zugriffsrechte, mit denen jeder Anwender auf Ihr USB-Laufwerk im FTP-Server zugreifen kann.<p> <p>b) Beschrankte Zugriffsrechte, mit denen der <p><a href='../Advanced_AiDisk_ftp.asp' target='_parent' hidefocus='true'>Weitere Konfigurationsmoglichkeiten</a></p><!--span style='color:#CC0000'>P. S.: Die Kontenverwaltung arbeitet nicht mit NTFS-Partitionen.</span-->",
							"Asus DDNS erstellt einen Domanennamen mit einer dynamischen IP-Adresse. <p>Falls Sie weitere Einstellungen des DDNS-Services konfigurieren mussen: <a href='/Advanced_ASUSDDNS_Content.asp' target='_top'>DDNS</a></p>",
							"<a href='../Advanced_AiDisk_samba.asp' target='_top'>Network Neighborhood Share</a>: Sie können den Samba-Server professionell ausführen.<br/><a href='../Advanced_AiDisk_ftp.asp' target='_top'> FTP Share</a>: Sie können den FTP-Server professionell ausführen.");
//EzQoS
helpcontent[16] = new Array("",
							"EZQoS bietet vier Typen popularer Internetanwendungen und ermoglicht die einfache Konfiguration von Quality of Service-Einstellungen (QoS). QoS verbessert die Internet-Downloadgeschwindigkeit und ermoglicht Einstellungsanderungen in unterschiedlichen Szen<p>Zur professionelleren und detaillierteren Konfiguration bitte aufrufen:<a href='/Advanced_QOSUserSpec_Content.asp'>Bandbreitenmanagement – Benutzerdefinierter Service</a></p>");
//Others in the USB application
helpcontent[17] = new Array("",
							"Dies bezeichnet die maximale Anzahl von gleichzeitigen Verbindungen bei Netzwerkumgebung oder FTP-Server. Einige FTP-Clients konnen mehr als eine Verbindung aufbauen. Eine zu niedrige Einstellung verhindert die Anmeldung.",
							"Dies ist der Name des RT-N12C1, der aus Standardzeichen einschlieslich Buchstaben (A – Z, a – z), Ziffern (0 – 9), Leerzeichen, Unterstrichen (_) und Bindestrichen (-) bestehen kann. Das erste und letzte Zeichen darf kein Leerzeichen sein. Wenn Sie ein",
							"Dies ist der Gruppenname des RT-N12C1 in der Netzwerkumgebung, der aus Standardzeichen einschlieslich Buchstaben (A – Z, a – z), Ziffern (0 – 9), Leerzeichen, Unterstrichen (_) und Bindestrichen (-) bestehen kann. Das erste und letzte Zeichen darf kein",
							"Mit diesem Feld konnen Sie Download Master aktivieren oder deaktivieren.",
							"Dieses Feld ermoglicht die Freigabe von heruntergeladenen Daten im Internet.",
							"Mit diesem Feld konnen Sie UPnP aktivieren oder deaktivieren.",
							"Sie konnen die Skriptdatei in der ersten Partition Ihres USB-Laufwerks speichern und ihren Dateinamen hier eingeben. Der RT-N12C1 fuhrt dieses Skript bei der Einbindung des USB-Laufwerks durch das System aus.",
							"Choose the correct language settings which is suitable for your file encoding.",
							"Enable the seeding option, RT-N12C1 will remain seeding after finish downloading.",
							"Input value between 0 to 999. The default value is 0 that stands for there is no upload limit.");
// MAC filter
helpcontent[18] = new Array("",
							"Im Akzeptieren-Modus akzeptiert der RT-N12C1 nur Clients, deren MAC-Adressen in der Liste aufgefuhrt sind. Im Abweisen-Modus weist der RT-N12C1 samtliche Clients ab, deren MAC-Adressen in der Liste aufgefuhrt sind.",
							"For source or destination port range, you can input a specific port, such as \"95\", or ports within a range, such as \"103:315\", \">100\", or \"<65535\".",
							"For source or destination IP address, you can input a specific IP address, such as \"192.168.122.1\", or IP addresses within one subnet, such as \"192.168.123.*\", or \"192.168.*.*\", or all IP addresses as \"*.*.*.*\".",
							"For source or destination port range, you can input a specific port, such as \"95\", or ports within a range, such as \"103:315\", \">100\", or \"<65535\".");
// Setting
helpcontent[19] = new Array("",
							"Durch Anklicken von [Werkseinstellungen] setzen Sie den Router wieder auf den Auslieferungszustand zuruck und loschen samtliche aktuellen Einstellungen. Warten Sie den Neustart des Routers ab. ",
							"Zum Speichern der aktuellen Einstellungen des RT-N12C1 in eine Datei klicken Sie auf die [Speichern]-Schaltflache. (Hinweis: Wenn Sie die aktuellen Einstellungen in einer Datei speichern, werden diese ebenfalls im Flash-Speicher gesichert.)",
							"Geben Sie den Pfad und den Namen der Einstellungendatei an. Anschliesend klicken Sie zum Ubertragen der Datei in den RT-N12C1 auf [Hochladen]. Bitte warten Sie den Neustart des RT-N12C1 ab; dies dauert etwa 90 Sekunden.");
// QoS
helpcontent[20] = new Array("",
							"Dies ist die gemessene Uplink-Geschwindigkeit beim Aufbau der WAN-Verbindung. Diese kann den Idealwert Ihres Internetanbieters unterschreiten.",
							"Falls die gemessene Uplink-Geschwindigkeit nicht richtig sein sollte, konnen Sie diese hier manuell angeben.");
// HSDPA
helpcontent[21] = new Array("",
							"Wählen Sie den HSDPA-Modus umfassend zu Anforderungen und Umgebung. Vier Modi können ausgewählt werden: Ausfallsicherung, Ausgewogen, Immer hoch und Immer niedrig.",
							"Bitte geben Sie den PIN-Code Ihrer SIM-Karte ein. Dies ist eine Zahl mit 4 – 7 Stellen. Falls Sie den PIN-Code nicht kennen, wenden Sie sich bitte an Ihren Internetanbieter.",
							"Falls Sie den APN-Servicenamen nicht kennen, wenden Sie sich bitte an Ihren Internetanbieter.",
							"HSDPADiese Abkurzung steht fur Maximum Transmission Unit (maximale Sendeeinheit) von PPPoE-Paketen.",
							"HSDPADiese Abkurzung steht fur Maximum Receive Unit (maximale Empfangseinheit) von PPPoE-Paketen.",
							"Dieses Feld zeigt die IP-Adresse des DNS, mit dem sich der RT-N12C1 verbindet.",
							"Dieses Feld zeigt die IP-Adresse des DNS, mit dem sich der RT-N12C1 verbindet.");
							
helpcontent[22] = new Array("",
														"Im Router/IP-Sharing-Modus verbindet der RT-N12C1 die Clients über PPPoE, PPTP, L2TP, automatische, PPTP, L2TP oder statische IP. In diesen Modus stellt der RT-N12C1 den Clients im LAN Wireless-Funksignal-, NAT-, Firewall- und IP-Sharing-Funktionen zur Verfügung.Schließen sie bitte dieses Fenster und beenden sie die Konfiguration der Einstellungen. Öffnen Sie ein neues Fenster, um sich mit dem Internet zu verbinden.",
														"Im Repeater-Modus erweitert der RT-N12C1 Ihre Wireless-Netzwerkabdeckung. In diesen Modus deaktiviert der RT-N12C1 automatisch die NAT-, Firewall- und IP-Sharing-Funktionen.Schließen sie bitte dieses Fenster und beenden sie die Konfiguration der Einstellungen. Öffnen Sie ein neues Fenster, um sich mit dem Internet zu verbinden.",
														"Im Access-Point-Modus können Sie sich über ein Ethernet-Kabel mit dem Router verbinden und eine Wireless-Verbindung zu Ihren Netzwerk erstellen. Dies ermöglicht allen Clients in Ihren Netzwerk sich mit dem Internet zu verbinden, jedoch sind in diesen Modus NAT-, Firewall- und IP-Sharing-funktionen deaktiviert.Wir empfehlen Ihnen, das Asus-Dienstprogramm/Gerateerkennung zur Suche nach der IP des AP zu verwenden.");

/* Wireless 5G */
helpcontent[23] = new Array("",
						   "Zur Zuweisung einer Identifizierungszeichenfolge Ihrer Wireless-Verbindung mit bis zu 32 Zeichen.",
						   "Wenn Sie [Ja] wahlen, wird Ihre SSID bei Standortabfragen von Wireless-Clients nicht angezeigt; diese konnen sich nur mit der SSID des AP mit Ihrem Asus Wireless-Router verbinden. ",						   
						   "Der Funkkanal fur den Wireless-Betrieb.",
						   "This item allows you to select any of these options for the Wireless Mode of your 802.11n interface. <p>[Auto]: Allows 802.11n, 802.11a clients to connect to RT-N12C1.</p><p>[n Only]: Maximizes performance, but does not allow 802.11a clients to connect to your device.</p>",
						   "Dieses Feld aktiviert Authentisierungsmethoden fur Wireless-Clients.",
						   "WPA-Verschlusselung zur Datenverschlusselung aktivieren.",
						   "Der gemeinsam genutzte Schlussel sollte langer als sieben und kurzer als 64 Zeichen oder Hexadezimalzeichen sein. Wenn Sie dieses Feld nicht ausfullen, weist das System [00000000] als Schlussel zu.",
						   "Zur automatischen Erzeugung von vier WEP-Schlusseln wahlen Sie [WEP, 64 Bit] oder [WEP, 128 Bit] im Feld WEP-Verschlusselung.",
						   "Aktiviert die WEP-Verschlusselung zur Verschlusselung von Daten.",
						   "Zum Festlegen des WEP-Schlussels zur Verschlusselung Ihrer Daten in Wireless-Netzwerken.",
						   "Dieses Feld gibt das Intervall (in Sekunden) zum Wechseln einer WPA-Schlusselgruppe an. Wenn Sie [0] (Null) eingeben, wird der Schlussel nicht in bestimmten Abstanden gewechselt.",
						   "5 ASCII-Zeichen oder 10 Hexadezimalzeichen",
						   "13 ASCII-Zeichen oder 26 Hexadezimalzeichen",
						   "Die Auswahl einer größeren Bandbreite bietet Ihnen eine höhere Übertragungsgeschwindigkeit.",
						   "Auswahl des erweiterten Kanals, der im 20/40MHz-Kanalbandbreitenmodus benutzt wird. 802.11n benutzt den erweiterten Kanal, um höhere Geschwindigkeiten zu erzielen.",
						   "802.11b-Modus, die Wireless-Geschwindigkeit beträgt bis zu 11Mbps.",
						   "Legacy-Modus – bis zu 54Mbps für ein 802.11 b/g-Netzwerk.",
						   "Standardmodus - Im 2,4 Ghz-Frequenzband sind Wi-Fi-zertifizierte Produkte n-Produkte so konfiguriert, dass sie standardmäßig in 20 Mhz-Kanälen arbeiten und die Geschwindigkeit bis zu 144 Mbps beträgt.",
						   "Leistungsmodus – Benutzt eine 20/40MHz gemeinsame Bandbreite, um den Wireless-Durchsatz zu maximieren. Wenn Sie mit der Wireless-Stabilität Probleme bekommen, wählen Sie bitte den Standardmodus.",
						   "Geben Sie einen Netzwerkschlüssel von 8 bis 63 Zeichen (Buchstaben, Zahlen oder Kombinationen daraus) ein. Wenn Sie keine Netzwerksicherheit einrichten wollen, lassen Sie die Felder für den Netzwerkschlüssel leer. Die Standard-Wireless-Sicherheit ist WPA-Auto-Personal  TKIP+AES - TKIP+AES.");

var clicked_help_string = "In der Hilfe finden Sie Richtlinien und Informationen zur Nutzung der Router-Funktionen.  Klicken Sie auf die <a class=\"hintstyle\" style=\"background-color:#7aa3bd\">gelb und blau unterstrichenen verlinkten Worter.</a> zum Aufrufen der Hilfe.";

function openHint(hint_array_id, hint_show_id, flag){
	$('helpicon').style.display = "none";
	$('hintofPM').style.display = "";
	
	showtext($('helpname'), "Hilfe");
	
	if($("statusframe")){
		$("statusframe").src = "";
		$("statusframe").style.display = "none";
	}
	
	$("hint_body").style.display = "";
	
	if(typeof(hint_show_id) == "number" && hint_show_id > 0){
		$('hint_body').style.display = "";
		$("statusframe").style.display = "none";
		
		showtext($('helpname'), "Hilfe");
		
		clicked_help_string = "<span>"+helptitle[hint_array_id][hint_show_id][0]+"</span><br>"+helpcontent[hint_array_id][hint_show_id];
		
		showtext($('hint_body'), clicked_help_string);
	}
	
	if(hint_array_id == 14
			|| hint_array_id == 15
			|| hint_array_id == 16)
		return;
	
	if(flag != "false")
		document.hint_form.scrollIntoView("true");
}

function closeHint(){
	$('helpicon').style.display = "";
	$('hintofPM').style.display = "none";
}

function enable_auto_hint(group_num, all_hint_num){
	var obj_name = "";
	var input_objs = new Array();
	var select_objs = new Array();
	
	for(var i = 1; i <= all_hint_num; ++i){
		obj_name = helptitle[group_num][i][1];
		input_objs = getElementsByName_iefix("input", obj_name);
		select_objs = getElementsByName_iefix("select", obj_name);
		
		if(input_objs.length > 0)
			for(var j = 0; j < input_objs.length; ++j){
				var temp_class_name = input_objs[j].hint_order;
				
				input_objs[j].hint_order = i;
				input_objs[j].onmouseup = function(){
						openHint(group_num, parseInt(this.hint_order), "false");
					};
			}
		
		if(select_objs.length > 0)
			for(var j = 0; j < select_objs.length; ++j){
				var temp_class_name = select_objs[j].hint_order;
				
				select_objs[j].hint_order = i;
				select_objs[j].onmouseup = function(){
						openHint(group_num, parseInt(this.hint_order), "false");
					};
			}
	}
}

function disable_auto_hint(group_num, all_hint_num){
	var obj_name = "";
	var input_objs = new Array();
	var select_objs = new Array();
	
	for(var i = 1; i <= all_hint_num; ++i){
		obj_name = helptitle[group_num][i][1];
		input_objs = getElementsByName_iefix("input", obj_name);
		select_objs = getElementsByName_iefix("select", obj_name);
		
		if(input_objs.length > 0)
			for(var j = 0; j < input_objs.length; ++j){
				var temp_class_name = input_objs[j].hint_order;
				
				input_objs[j].hint_order = i;
				input_objs[j].onfocus = function(){};
			}
		
		if(select_objs.length > 0)
			for(var j = 0; j < select_objs.length; ++j){
				var temp_class_name = select_objs[j].hint_order;
				
				select_objs[j].hint_order = i;
				select_objs[j].onfocus = function(){};
			}
	}
}
