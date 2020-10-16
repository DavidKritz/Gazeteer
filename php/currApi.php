<?php
	$executionStartTime = microtime(true) / 1000;
	$apikey = '9cedcaaa376c42a28f14d907eb3cb4f1';

	//$url = 'https://openexchangerates.org/api/latest.json?app_id=' . $api-key . '&base=' $_REQUEST['currency'];
	//url='http://api.geonames.org/countryInfoJSON?formatted=true&lang=en' . '&country=' . $_REQUEST['country'] . '&username=flightltd&style=full';
	//$url = 'https://openexchangerates.org/api/latest.json?app_id=' . $apikey . '&base=GBP' . '&symbols=USD,GBP,EUR,YEN,RUB,RIM';
	$url = 'https://openexchangerates.org/api/historical/2015-02-16.json?app_id=9cedcaaa376c42a28f14d907eb3cb4f1&base=USD&symbols=GBP,EUR,JPY,RUB,CNY';

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);
	header('Content-Type: application/json; charset=UTF-8');
	$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "mission saved";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $decode;

	echo json_encode($output); 

?>
