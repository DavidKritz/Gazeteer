$('#getLocAdd').click(function () {
     
    var latLong = $('#latitude').val() + ',' + $('#longitude').val();
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
            $('#formatted').html(results['formatted'])
            $('#houseNumber').html(results['houseNumber']);
            $('#street').html(results['street']);
            $('#city').html(results['city']);
            $('#state').html(results['state']);
            $('#country').html(results['country']);
            $('#countryCode').html(results['countryCode']);
            

        },
        error: function (jqXHR, textStatus, errorThrown) {
            // your error code
            console.log(errorThrown);
            console.log(textStatus);
            console.log(jqXHR);
        }
    });
});
