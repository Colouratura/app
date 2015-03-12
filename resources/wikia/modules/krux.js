/*global Krux,define*/
window.Krux || ((Krux = function () {
	Krux.q.push(arguments);
}).q = []);

define('wikia.krux', ['wikia.window'], function (win) {
	'use strict';

	var maxNumberOfKruxSegments = 27;

	function load(confid) {
		require([
			'ext.wikia.adEngine.adContext',
			'ext.wikia.adEngine.adLogicPageParams'
		], function (
			adContext,
			adLogicPageParams
		) {
			var params, value, k, m, src, s;

			if (adContext.getContext().targeting.enableKruxTargeting) {
				// Export page level params, so Krux can read them
				params = adLogicPageParams.getPageLevelParams();
				Object.keys(params).forEach(function (key) {
					value = params[key];
					if (value) {
						win['kruxDartParam_' + key] = value.toString();
					}
				});

				k = document.createElement('script');
				k.type = 'text/javascript';
				k.async = true;
				src = (m = location.href.match(/\bkxsrc=([^&]+)\b/)) && decodeURIComponent(m[1]);
				k.src = src || (location.protocol === 'https:' ? 'https:' : 'http:') + '//cdn.krxd.net/controltag?confid=' + confid;
				s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(k, s);
			}
		});
	}

	function getParams(n) {
		var k = 'kx' + n;
		if (win.localStorage) {
			return win.localStorage[k] || '';
		} else {
			return '';
		}
	}

	function getSegments() {
		var segments = getParams('segments');

		if (segments) {
			return segments.slice(0, maxNumberOfKruxSegments);
		}

		return [];
	}

	function getUser() {
		return getParams('user');
	}

	return {
		load: load,
		getSegments: getSegments,
		getUser: getUser
	};
});
