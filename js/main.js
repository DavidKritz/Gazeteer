// JavaScript source code
var map = L.map('map', { zoomControl: false });
var $lat;
var $lon;
var $countryName;
var $countryCode;
var $country;
$(window).on('load', function () {
    if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function () {
            $(this).remove();
        });
    }
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	function success(pos) {
		var crd = pos.coords;

		console.log('Your current position is:');
		console.log(`Latitude : ${crd.latitude}`);
		console.log(`Longitude: ${crd.longitude}`);
		console.log(`More or less ${crd.accuracy} meters.`);
		$lat = crd.latitude;
		$lon = crd.longitude;
		getLocAdd($lat, $lon);
	}

	function error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	navigator.geolocation.getCurrentPosition(success, error, options);
});

function fillMap($lat, $lon) {
	map = L.map('map').setView([$lat, $lon], 6);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 8,
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

};

$(function () {
	var countryOptions;
	$.getJSON('countries.json', function (result) {
		$.each(result, function (i, country) {
			 
			countryOptions += "<option value='"
				+ country.code +
				"'>"
				+ country.name +
				"</option>";
		});
		$('#country').html(countryOptions);
	});
});

function getcCode() {
	console.log('on change');
	var $cc = $('#country').val();
	var $c = $cc ? $cc : $countryCode;
	console.log($c);
	$.ajax({
		url: "php/getCountryInfo.php",
		type: 'POST',
		dataType: 'json',
		data: {
			country: $c

		},
		success: function (result) {

			console.log(result);

			if (result.status.name == "ok") {
				$countryName = result['data'][0]['countryName'];
				var $lon = (result['data'][0]['west'] + result['data'][0]['east']) / 2;
				var $lat = (result['data'][0]['north'] + result['data'][0]['south']) / 2;

				$(function () {
					map.setView([$lat, $lon], 6);
					map.fitBounds([
						[result['data'][0]['north'], result['data'][0]['west']],
						[result['data'][0]['south'], result['data'][0]['east']]
					]);

					L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
						maxZoom: 12,
						attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					}).addTo(map);

					var shortCCode = result['data'][0]['countryCode'];
					var $longCCode = getCountryCode(shortCCode);

					$.ajax({
						url: "php/getCountryParms.php",
						type: 'POST',
						dataType: 'json',
						data: {
							country: $longCCode

						},
						success: function (result) {
							console.log('back from country parms');
							console.log(result['data']);

							if (result.status.name == "ok") {
								$country = result['data'];
								console.log('before applying borders');
								console.log($country);
								L.geoJson($country).addTo(map);

							}
						},
						error: function (jqXHR, textStatus, errorThrown) {
							// your error code
							console.log(errorThrown);
							console.log(textStatus);
							console.log(jqXHR);
						}
					});

						$('#capital').html(result['data'][0]['capital']),
						$('#population').html(result['data'][0]['population']),
						$('#area').html(result['data'][0]['areaInSqKm']),
						$('#currency').html(result['data'][0]['currencyCode']),
						$('#countryName').html(result['data'][0]['countryName'])
					//}]


				});


			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});
};

function getCountryCode($countryCode) {

	var $iso3 = ['AFG', 'ALA', 'ALB', 'DZA', 'ASM', 'AND', 'AGO', 'AIA', 'ATA', 'ATG', 'ARG', 'ARM', 'ABW', 'AUS', 'AUT', 'AZE', 'BHS', 'BHR', 'BGD', 'BRB', 'BLR', 'BEL', 'BLZ', 'BEN', 'BMU', 'BTN', 'BOL', 'BIH', 'BWA', 'BVT', 'BRA', 'IOT', 'VGB', 'BRN', 'BGR', 'BFA', 'BDI', 'KHM', 'CMR', 'CAN', 'CPV', 'CYM', 'CAF', 'TCD', 'CHL', 'CHN', 'CXR', 'CCK', 'COL', 'COM', 'COG', 'COD', 'COK', 'CRI', 'CIV', 'HRV', 'CUB', 'CYP', 'CZE', 'DNK', 'DJI', 'DMA', 'DOM', 'ECU', 'EGY', 'SLV', 'GNQ', 'ERI', 'EST', 'ETH', 'FLK', 'FRO', 'FJI', 'FIN', 'FRA', 'GUF', 'PYF', 'ATF', 'GAB', 'GMB', 'GEO', 'DEU', 'GHA', 'GIB', 'GRC', 'GRL', 'GRD', 'GLP', 'GUM', 'GTM', 'GGY', 'GIN', 'GNB', 'GUY', 'HTI', 'HMD', 'VAT', 'HND', 'HKG', 'HUN', 'ISL', 'IND', 'IDN', 'IRN', 'IRQ', 'IRL', 'IMN', 'ISR', 'ITA', 'JAM', 'JPN', 'JEY', 'JOR', 'KAZ', 'KEN', 'KIR', 'PRK', 'KOR', 'KWT', 'KGZ', 'LAO', 'LVA', 'LBN', 'LSO', 'LBR', 'LBY', 'LIE', 'LTU', 'LUX', 'MAC', 'MKD', 'MDG', 'MWI', 'MYS', 'MDV', 'MLI', 'MLT', 'MHL', 'MTQ', 'MRT', 'MUS', 'MYT', 'MEX', 'FSM', 'MDA', 'MCO', 'MNG', 'MNE', 'MSR', 'MAR', 'MOZ', 'MMR', 'NAM', 'NRU', 'NPL', 'NLD', 'ANT', 'NCL', 'NZL', 'NIC', 'NER', 'NGA', 'NIU', 'NFK', 'MNP', 'NOR', 'OMN', 'PAK', 'PLW', 'PSE', 'PAN', 'PNG', 'PRY', 'PER', 'PHL', 'PCN', 'POL', 'PRT', 'PRI', 'QAT', 'REU', 'ROU', 'RUS', 'RWA', 'SHN', 'KNA', 'LCA', 'SPM', 'VCT', 'BLM', 'MAF', 'WSM', 'SMR', 'STP', 'SAU', 'SEN', 'SRB', 'SYC', 'SLE', 'SGP', 'SVK', 'SVN', 'SLB', 'SOM', 'ZAF', 'SGS', 'SSD', 'ESP', 'LKA', 'SDN', 'SUR', 'SJM', 'SWZ', 'SWE', 'CHE', 'SYR', 'TWN', 'TJK', 'TZA', 'THA', 'TLS', 'TGO', 'TKL', 'TON', 'TTO', 'TUN', 'TUR', 'TKM', 'TCA', 'TUV', 'UGA', 'UKR', 'ARE', 'GBR', 'USA', 'URY', 'UMI', 'UZB', 'VUT', 'VEN', 'VNM', 'VIR', 'WLF', 'ESH', 'YEM', 'ZMB', 'ZWE'];

	var $iso2 = ['AF', 'AX', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BA', 'BW', 'BV', 'BR', 'IO', 'VG', 'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'CI', 'HR', 'CU', 'CY', 'CZ', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MK', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'AN', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RE', 'RO', 'RU', 'RW', 'SH', 'KN', 'LC', 'PM', 'VC', 'BL', 'MF', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'SS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SZ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UY', 'UM', 'UZ', 'VU', 'VE', 'VN', 'VI', 'WF', 'EH', 'YE', 'ZM', 'ZW'];

	var $idx = $iso2.indexOf($countryCode);
	return $iso3[$idx];

}
$(function () {
	var countryOptions;
	$.getJSON('js/countries.json', function (result) {
		$.each(result, function (key, country) {
			countryOptions += '<option value="'
				+ country.code + '">'
				+ country.name + '</option>';

		});
		$('#country').html(countryOptions);
	});
});
$(document).ready(function () {
	$("#myBtn3").click(function () {
		$.ajax({
			url: "php/currApi.php",
			type: 'GET',
			dataType: 'json',
			data: {
				currency: window._currency_
			},
			success: function (result) {

				console.log(result.data.rates);

				if (result.status.name == "ok") {
					$('#gbp').html(result.data.rates.GBP);
					$('#eur').html(result.data.rates.EUR);
					$('#rub').html(result.data.rates.RUB);
					$('#jpy').html(result.data.rates.JPY);
					$('#ren').html(result.data.rates.CNY);
					$("#myModal3").modal();

				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				// your error code
				console.log(errorThrown);
				console.log(textStatus);
				console.log(jqXHR);

			}
		});
	});
});
$(document).ready(function () {
	$("#myBtn1").click(function () {
		if ($countryName == null) {
			alert('Please select country from list for Wiki info');
			return;
		}

		var $name = $countryName.replace(' ', '_');
		console.log($name);
		$.ajax({
			url: "php/wikiApi.php",
			type: 'GET',
			dataType: 'json',
			data: {
				countryname: $name
			},
			success: function (result) {

				console.log(result);

				if (result.status.name == "ok") {
					$('#modal1').html(result.data.extract);
					$("#myModal1").modal();

				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				// your error code
				console.log(errorThrown);
				console.log(textStatus);
				console.log(jqXHR);
				$('#modal1').html('Wikipedia has nothing so say about this country.');
				$("#myModal1").modal();

			}
		});
	});
});
function getLocAdd () {

	var latLong = $lat + ',' + $lon;
	console.log(latLong);
	$.ajax({
		url: "php/geolocate.php",
		type: 'POST',
		dataType: 'json',
		data: {
			q: latLong,
			lang: 'en'
		},

		success: function (results) {
			console.log(results);
			$countryCode = results['countryCode'];
			$countryName = results['countryName'];
			getcCode();

		},
		error: function (jqXHR, textStatus, errorThrown) {
			// your error code
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});
};

