/**
*	Adrian added custom JS Script
*/
$(document).ready(function(){

	var mainUrl = 'https://'+location.hostname;
	var params = findGetParameters();
	var addUrl = mainUrl + '/cart/add.js';
	var removeUrl = mainUrl + '/cart/clear.js';
	var getUrl = mainUrl + '/cart.js';
	var baseUrl = location.href.split('?')[0];


	/**
	*	If there're products, it adds to cart and redirect
	* 	to base URL again
	*/
	if (baseUrl.indexOf('myshopify') === -1 && params[0].indexOf('q=') === -1) {
		if (params[0][0] && params[0][0].length > 0) {
			params = params.map(function(element) {
				element = element.split(",");
				element = element.map(value => value = value.split(':'));
				return element;
			})[0];

			for (var i = 0; i < params.length; i++) {
				$.post(addUrl, { 
					quantity: params[i][1], 
					id: params[i][0] 
				});
			}

			window.location.href = baseUrl;
		}
	}


	/**
	*	Get cart elements on language change
	*/
	$('#desktop-languages-switcher').change(onChangeLanguage);

	function onChangeLanguage() {
		$.getJSON(getUrl, function({ items }){
			if (items) {
				var prefix = $('#desktop-languages-switcher').find('option:selected').text().toLowerCase();
				var comma = '';
				var initializer = '?';
				var LangSelector = (prefix === 'en') ? ( '' ) : ( prefix + '.' );
				var newURL = baseUrl
					.replace('es.', '')
					.replace('de.', '')
					.replace('fr.', '')
					.replace('www.', 'www.'+LangSelector);
				
				$.each(items, function(){
					newURL += initializer + this.variant_id + ':' + this.quantity + comma;
					comma = ',';
					initializer = '';
				});
				
				window.location.href = newURL;
			}
		});
	}


	/**
	*	Get URL parameters from http request
	*/
	function findGetParameters() {
        var result = null,
            tmp = [];
        var items = location.search.substr(1).split("&");

        return items;
    }

});