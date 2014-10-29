/*global describe, it, expect, modules*/
ddescribe('AdConfig2Late', function () {
	'use strict';

	var uaIE8 = [
		'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0;',
		'GTB7.4; InfoPath.2; SV1; .NET CLR 3.3.69573; WOW64; en-US)'
	].join('');

	function mockAdContext(targeting, providers, opts) {
		var defaultTargeting = { pageType: 'article' };
		return {
			getContext: function () {
				return {
					opts: opts || {},
					targeting: targeting || defaultTargeting,
					providers: providers || {},
					forceProviders: {}
				};
			}
		};
	}


	it('getProvider returns Liftium if it can handle it', function () {
		var adProviderNullMock = {name: 'NullMock'},
			adProviderEvolveMock = {name: 'EvolveMock', canHandleSlot: function () {return true;}},
			adProviderDirectGpt = {name: 'DirectGpt', canHandleSlot: function () {return true;}},
			adProviderRemnantGpt = {name: 'RemnantGpt', canHandleSlot: function () {return false;}},
			adProviderTaboola = {name: 'Taboola', canHandleSlot: function () {return true;}},
			adProviderLiftiumMock = {name: 'LiftiumMock', canHandleSlot: function () {return true;}},
			adProviderSevenOneMedia = {name: 'SevenOneMediaMock', canHandleSlot: function () {return true;}},
			logMock = function () {},
			windowMock = {},
			instantGlobalsMock = {},
			geoMock = { getCountryCode: function () { return 'PL'; } },
			adConfig;

		adConfig = modules['ext.wikia.adEngine.adConfigLate'](
			logMock,
			windowMock,
			instantGlobalsMock,
			geoMock,
			mockAdContext(),
			adProviderEvolveMock,
			adProviderLiftiumMock,
			adProviderDirectGpt,
			adProviderRemnantGpt,
			adProviderTaboola,
			adProviderNullMock,
			adProviderSevenOneMedia
		);

		expect(adConfig.getProviderList(['foo'])[0]).toBe(adProviderLiftiumMock, 'adProviderLiftiumMock');
	});

	it('getProvider returns Null if Liftium cannot handle it', function () {
		var adProviderNullMock = {name: 'NullMock'},
			adProviderEvolveMock = {name: 'EvolveMock', canHandleSlot: function () {return false;}},
			adProviderDirectGpt = {name: 'DirectGpt', canHandleSlot: function () {return true;}},
			adProviderRemnantGpt = {name: 'RemnantGpt', canHandleSlot: function () {return false;}},
			adProviderTaboola = {name: 'Taboola', canHandleSlot: function () {return true;}},
			adProviderLiftiumMock = {name: 'LiftiumMock', canHandleSlot: function () {return false;}},
			adProviderSevenOneMedia = {name: 'SevenOneMediaMock', canHandleSlot: function () {return true;}},
			logMock = function () {},
			windowMock = {},
			instantGlobalsMock = {},
			geoMock = { getCountryCode: function () { return 'PL'; } },
			adConfig;

		adConfig = modules['ext.wikia.adEngine.adConfigLate'](
			logMock,
			windowMock,
			instantGlobalsMock,
			geoMock,
			mockAdContext(),
			adProviderEvolveMock,
			adProviderLiftiumMock,
			adProviderDirectGpt,
			adProviderRemnantGpt,
			adProviderTaboola,
			adProviderNullMock,
			adProviderSevenOneMedia
		);

		expect(adConfig.getProviderList(['foo'])[0]).toBe(adProviderNullMock, 'adProviderNullMock');
	});

	it('getProvider returns SevenOneMedia if it can handle it (for wgAdDriverUseSevenOneMedia) Poland', function () {
		var adProviderNullMock = {name: 'NullMock'},
			adProviderEvolveMock = {name: 'EvolveMock', canHandleSlot: function () {return true;}},
			adProviderDirectGpt = {name: 'DirectGpt', canHandleSlot: function () {return true;}},
			adProviderRemnantGpt = {name: 'RemnantGpt', canHandleSlot: function () {return false;}},
			adProviderTaboola = {name: 'Taboola', canHandleSlot: function () {return true;}},
			adProviderLiftiumMock = {name: 'LiftiumMock', canHandleSlot: function () {return true;}},
			adProviderSevenOneMedia = {name: 'SevenOneMediaMock', canHandleSlot: function () {return true;}},
			logMock = function () {},
			windowMock = {},
			instantGlobalsMock = {},
			geoMock = { getCountryCode: function () { return 'PL'; } },
			adConfig;

		adConfig = modules['ext.wikia.adEngine.adConfigLate'](
			logMock,
			windowMock,
			instantGlobalsMock,
			geoMock,
			mockAdContext(null, {sevenOneMedia: true}),
			adProviderEvolveMock,
			adProviderLiftiumMock,
			adProviderDirectGpt,
			adProviderRemnantGpt,
			adProviderTaboola,
			adProviderNullMock,
			adProviderSevenOneMedia
		);

		expect(adConfig.getProviderList(['foo'])[0]).toBe(adProviderSevenOneMedia, 'adProviderSevenOneMediaMock');
	});

	it('getProvider returns RemnantGpt when adContext.providers.remnantGpt = true', function () {
		var adProviderNullMock = {name: 'NullMock'},
			adProviderEvolveMock = {name: 'EvolveMock', canHandleSlot: function () {return true;}},
			adProviderDirectGpt = {name: 'DirectGpt', canHandleSlot: function () {return true;}},
			adProviderRemnantGpt = {name: 'RemnantGpt', canHandleSlot: function () {return true;}},
			adProviderTaboola = {name: 'Taboola', canHandleSlot: function () {return true;}},
			adProviderLiftiumMock = {name: 'LiftiumMock', canHandleSlot: function () {return true;}},
			adProviderSevenOneMedia = {name: 'SevenOneMediaMock', canHandleSlot: function () {return true;}},
			logMock = function () {},
			windowMock = {},
			instantGlobalsMock = {},
			geoMock = { getCountryCode: function () { return 'XX'; } },
			adConfig;

		adConfig = modules['ext.wikia.adEngine.adConfigLate'](
			logMock,
			windowMock,
			instantGlobalsMock,
			geoMock,
			mockAdContext(null, {remnantGpt: true}),
			adProviderEvolveMock,
			adProviderLiftiumMock,
			adProviderDirectGpt,
			adProviderRemnantGpt,
			adProviderTaboola,
			adProviderNullMock,
			adProviderSevenOneMedia
		);

		expect(adConfig.getProviderList(['foo'])[0]).toBe(adProviderRemnantGpt, 'adProviderRemnantGpt');
	});

	it('getProvider returns RemnantGpt when adContext.providers.remnantGpt = false and country in instantGlobals.wgAdDriverAlwaysCallDartInCountries', function () {
		var adProviderNullMock = {name: 'NullMock'},
			adProviderEvolveMock = {name: 'EvolveMock', canHandleSlot: function () {return true;}},
			adProviderDirectGpt = {name: 'DirectGpt', canHandleSlot: function () {return true;}},
			adProviderRemnantGpt = {name: 'RemnantGpt', canHandleSlot: function () {return true;}},
			adProviderTaboola = {name: 'Taboola', canHandleSlot: function () {return true;}},
			adProviderLiftiumMock = {name: 'LiftiumMock', canHandleSlot: function () {return true;}},
			adProviderSevenOneMedia = {name: 'SevenOneMediaMock', canHandleSlot: function () {return true;}},
			logMock = function () {},
			windowMock = {},
			instantGlobalsMock = {wgAdDriverAlwaysCallDartInCountries: ['XX']},
			geoMock = { getCountryCode: function () { return 'XX'; } },
			adConfig;

		adConfig = modules['ext.wikia.adEngine.adConfigLate'](
			logMock,
			windowMock,
			instantGlobalsMock,
			geoMock,
			mockAdContext(),
			adProviderEvolveMock,
			adProviderLiftiumMock,
			adProviderDirectGpt,
			adProviderRemnantGpt,
			adProviderTaboola,
			adProviderNullMock,
			adProviderSevenOneMedia
		);

		expect(adConfig.getProviderList(['foo'])[0]).toBe(adProviderRemnantGpt, 'adProviderRemnantGpt');
	});

	it('getProvider returns SevenOneMedia if it can handle it (for wgAdDriverUseSevenOneMedia) Australia', function () {
		var adProviderNullMock = {name: 'NullMock'},
			adProviderEvolveMock = {name: 'EvolveMock', canHandleSlot: function () {return true;}},
			adProviderDirectGpt = {name: 'DirectGpt', canHandleSlot: function () {return true;}},
			adProviderRemnantGpt = {name: 'RemnantGpt', canHandleSlot: function () {return false;}},
			adProviderTaboola = {name: 'Taboola', canHandleSlot: function () {return true;}},
			adProviderLiftiumMock = {name: 'LiftiumMock', canHandleSlot: function () {return true;}},
			adProviderSevenOneMedia = {name: 'SevenOneMediaMock', canHandleSlot: function () {return true;}},
			logMock = function () {},
			windowMock = {},
			instantGlobalsMock = {},
			geoMock = { getCountryCode: function () { return 'AU'; } },
			adConfig;

		adConfig = modules['ext.wikia.adEngine.adConfigLate'](
			logMock,
			windowMock,
			instantGlobalsMock,
			geoMock,
			mockAdContext(null, {sevenOneMedia: true}),
			adProviderEvolveMock,
			adProviderLiftiumMock,
			adProviderDirectGpt,
			adProviderRemnantGpt,
			adProviderTaboola,
			adProviderNullMock,
			adProviderSevenOneMedia
		);

		expect(adConfig.getProviderList(['foo'])[0]).toBe(adProviderSevenOneMedia, 'adProviderSevenOneMediaMock');
	});

	it('getProvider returns Null for 71M disaster recovery with wgAdDriverUseSevenOneMedia', function () {
		var adProviderNullMock = {name: 'NullMock'},
			adProviderEvolveMock = {name: 'EvolveMock', canHandleSlot: function () {return true;}},
			adProviderDirectGpt = {name: 'DirectGpt', canHandleSlot: function () {return true;}},
			adProviderRemnantGpt = {name: 'RemnantGpt', canHandleSlot: function () {return false;}},
			adProviderTaboola = {name: 'Taboola', canHandleSlot: function () {return true;}},
			adProviderLiftiumMock = {name: 'LiftiumMock', canHandleSlot: function () {return true;}},
			adProviderSevenOneMedia = {name: 'SevenOneMediaMock', canHandleSlot: function () {return true;}},
			logMock = function () {},
			windowMock = {},
			instantGlobalsMock = {wgSitewideDisableSevenOneMedia: true},
			geoMock = { getCountryCode: function () { return 'PL'; } },
			adConfig;

		adConfig = modules['ext.wikia.adEngine.adConfigLate'](
			logMock,
			windowMock,
			instantGlobalsMock,
			geoMock,
			mockAdContext(null, {sevenOneMedia: true}),
			adProviderEvolveMock,
			adProviderLiftiumMock,
			adProviderDirectGpt,
			adProviderRemnantGpt,
			adProviderTaboola,
			adProviderNullMock,
			adProviderSevenOneMedia
		);

		expect(adConfig.getProviderList(['foo'])[0]).toBe(adProviderNullMock, 'adProviderNullMock');
	});

	it('getProvider returns Liftium for 71M disaster recovery without wgAdDriverUseSevenOneMedia', function () {
		var adProviderNullMock = {name: 'NullMock'},
			adProviderEvolveMock = {name: 'EvolveMock', canHandleSlot: function () {return true;}},
			adProviderDirectGpt = {name: 'DirectGpt', canHandleSlot: function () {return true;}},
			adProviderRemnantGpt = {name: 'RemnantGpt', canHandleSlot: function () {return false;}},
			adProviderTaboola = {name: 'Taboola', canHandleSlot: function () {return true;}},
			adProviderLiftiumMock = {name: 'LiftiumMock', canHandleSlot: function () {return true;}},
			adProviderSevenOneMedia = {name: 'SevenOneMediaMock', canHandleSlot: function () {return true;}},
			logMock = function () {},
			windowMock = {},
			instantGlobalsMock = {wgSitewideDisableSevenOneMedia: true},
			geoMock = { getCountryCode: function () { return 'PL'; } },
			adConfig;

		adConfig = modules['ext.wikia.adEngine.adConfigLate'](
			logMock,
			windowMock,
			instantGlobalsMock,
			geoMock,
			mockAdContext(),
			adProviderEvolveMock,
			adProviderLiftiumMock,
			adProviderDirectGpt,
			adProviderRemnantGpt,
			adProviderTaboola,
			adProviderNullMock,
			adProviderSevenOneMedia
		);

		expect(adConfig.getProviderList(['foo'])[0]).toBe(adProviderLiftiumMock, 'adProviderLiftiumMock');
	});

	it('getProvider returns Null for IE8 with wgAdDriverUseSevenOneMedia', function () {
		var adProviderNullMock = {name: 'NullMock'},
			adProviderEvolveMock = {name: 'EvolveMock', canHandleSlot: function () {return true;}},
			adProviderDirectGpt = {name: 'DirectGpt', canHandleSlot: function () {return true;}},
			adProviderRemnantGpt = {name: 'RemnantGpt', canHandleSlot: function () {return false;}},
			adProviderTaboola = {name: 'Taboola', canHandleSlot: function () {return true;}},
			adProviderLiftiumMock = {name: 'LiftiumMock', canHandleSlot: function () {return true;}},
			adProviderSevenOneMedia = {name: 'SevenOneMediaMock', canHandleSlot: function () {return true;}},
			logMock = function () {},
			windowMock = {navigator: {userAgent: uaIE8}},
			instantGlobalsMock = {},
			geoMock = { getCountryCode: function () { return 'PL'; } },
			adConfig;

		adConfig = modules['ext.wikia.adEngine.adConfigLate'](
			logMock,
			windowMock,
			instantGlobalsMock,
			geoMock,
			mockAdContext(null, {sevenOneMedia: true}),
			adProviderEvolveMock,
			adProviderLiftiumMock,
			adProviderDirectGpt,
			adProviderRemnantGpt,
			adProviderTaboola,
			adProviderNullMock,
			adProviderSevenOneMedia
		);
		expect(adConfig.getProviderList(['foo'])[0]).toBe(adProviderNullMock, 'adProviderSevenOneMediaMock');
	});

	it('getProvider returns Liftium for IE8 without wgAdDriverUseSevenOneMedia', function () {
		var adProviderNullMock = {name: 'NullMock'},
			adProviderEvolveMock = {name: 'EvolveMock', canHandleSlot: function () {return true;}},
			adProviderDirectGpt = {name: 'DirectGpt', canHandleSlot: function () {return true;}},
			adProviderRemnantGpt = {name: 'RemnantGpt', canHandleSlot: function () {return false;}},
			adProviderTaboola = {name: 'Taboola', canHandleSlot: function () {return true;}},
			adProviderLiftiumMock = {name: 'LiftiumMock', canHandleSlot: function () {return true;}},
			adProviderSevenOneMedia = {name: 'SevenOneMediaMock', canHandleSlot: function () {return true;}},
			logMock = function () {},
			windowMock = {navigator: {userAgent: uaIE8}},
			instantGlobalsMock = {},
			geoMock = { getCountryCode: function () { return 'PL'; } },
			adConfig;

		adConfig = modules['ext.wikia.adEngine.adConfigLate'](
			logMock,
			windowMock,
			instantGlobalsMock,
			geoMock,
			mockAdContext(),
			adProviderEvolveMock,
			adProviderLiftiumMock,
			adProviderDirectGpt,
			adProviderRemnantGpt,
			adProviderTaboola,
			adProviderNullMock,
			adProviderSevenOneMedia
		);
		expect(adConfig.getProviderList(['foo'])[0]).toBe(adProviderLiftiumMock, 'adProviderLiftiumMock');
	});

	it('getProvider returns Liftium without AbTest', function () {
		var adProviderNullMock = {name: 'NullMock'},
			adProviderEvolveMock = {name: 'EvolveMock', canHandleSlot: function () {return true;}},
			adProviderDirectGpt = {name: 'DirectGpt', canHandleSlot: function () {return true;}},
			adProviderRemnantGpt = {name: 'RemnantGpt', canHandleSlot: function () {return false;}},
			adProviderTaboola = {name: 'Taboola', canHandleSlot: function () {return true;}},
			adProviderLiftiumMock = {name: 'LiftiumMock', canHandleSlot: function () {return true;}},
			adProviderSevenOneMedia = {name: 'SevenOneMediaMock', canHandleSlot: function () {return true;}},
			logMock = function () {},
			windowMock = {wgAdDriverUseSevenOneMedia: false},
			instantGlobalsMock = {},
			geoMock = { getCountryCode: function () { return 'PL'; } },
			adConfig;

		adConfig = modules['ext.wikia.adEngine.adConfigLate'](
			logMock,
			windowMock,
			instantGlobalsMock,
			geoMock,
			mockAdContext(),
			adProviderEvolveMock,
			adProviderLiftiumMock,
			adProviderDirectGpt,
			adProviderRemnantGpt,
			adProviderTaboola,
			adProviderNullMock,
			adProviderSevenOneMedia
		);

		expect(adConfig.getProviderList(['foo'])[0]).toBe(adProviderLiftiumMock, 'adProviderLiftiumMock');
	});

	it('getProvider returns DirectGpt for wgAdDriverUseDartForSlotsBelowTheFold for given slots', function () {
		var adProviderNullMock = {name: 'NullMock'},
			adProviderEvolveMock = {name: 'EvolveMock', canHandleSlot: function () {return true;}},
			adProviderDirectGpt = {name: 'DirectGpt', canHandleSlot: function () {return true;}},
			adProviderRemnantGpt = {name: 'RemnantGpt', canHandleSlot: function () {return false;}},
			adProviderTaboola = {name: 'Taboola', canHandleSlot: function () {return true;}},
			adProviderLiftiumMock = {name: 'LiftiumMock', canHandleSlot: function () {return true;}},
			adProviderSevenOneMedia = {name: 'SevenOneMediaMock', canHandleSlot: function () {return true;}},
			logMock = function () {},
			windowMock = {},
			instantGlobalsMock = {},
			geoMock = { getCountryCode: function () {return 'US';} },
			adConfig;

		adConfig = modules['ext.wikia.adEngine.adConfigLate'](
			logMock,
			windowMock,
			instantGlobalsMock,
			geoMock,
			mockAdContext(null, null, {useDartForSlotsBelowTheFold: true}),
			adProviderEvolveMock,
			adProviderLiftiumMock,
			adProviderDirectGpt,
			adProviderRemnantGpt,
			adProviderNullMock,
			adProviderSevenOneMedia
		);

		expect(adConfig.getProviderList(['foo'])[0]).not.toBe(adProviderDirectGpt, 'adProviderDirectGpt');
		expect(adConfig.getProviderList(['MODAL_INTERSTITIAL'])[0]).not.toBe(adProviderDirectGpt, 'adProviderDirectGpt');
		expect(adConfig.getProviderList(['LEFT_SKYSCRAPER_3'])[0]).toBe(adProviderDirectGpt, 'adProviderDirectGpt');
		expect(adConfig.getProviderList(['PREFOOTER_LEFT_BOXAD'])[0]).toBe(adProviderDirectGpt, 'adProviderDirectGpt');
		expect(adConfig.getProviderList(['PREFOOTER_RIGHT_BOXAD'])[0]).toBe(adProviderDirectGpt, 'adProviderDirectGpt');
	});

	it('getProvider returns Liftium for truthy wgAdDriverUseDartForSlotsBelowTheFold within other verticals for given slots', function () {
		var adProviderNullMock = {name: 'NullMock'},
			adProviderEvolveMock = {name: 'EvolveMock', canHandleSlot: function () {return true;}},
			adProviderDirectGpt = {name: 'DirectGpt', canHandleSlot: function () {return true;}},
			adProviderRemnantGpt = {name: 'RemnantGpt', canHandleSlot: function () {return false;}},
			adProviderTaboola = {name: 'Taboola', canHandleSlot: function () {return true;}},
			adProviderLiftiumMock = {name: 'LiftiumMock', canHandleSlot: function () {return true;}},
			adProviderSevenOneMedia = {name: 'SevenOneMediaMock', canHandleSlot: function () {return true;}},
			logMock = function () {},
			windowMock = {wgAdDriverUseDartForSlotsBelowTheFold: 'any truthy value', cscoreCat: "Lifestyle"},
			instantGlobalsMock = {},
			geoMock = { getCountryCode: function () {return 'US';} },
			adConfig;

		adConfig = modules['ext.wikia.adEngine.adConfigLate'](
			logMock,
			windowMock,
			instantGlobalsMock,
			geoMock,
			mockAdContext(),
			adProviderEvolveMock,
			adProviderLiftiumMock,
			adProviderDirectGpt,
			adProviderRemnantGpt,
			adProviderTaboola,
			adProviderNullMock,
			adProviderSevenOneMedia
		);

		expect(adConfig.getProviderList(['foo'])[0]).not.toBe(adProviderDirectGpt, 'adProviderDirectGpt');
		expect(adConfig.getProviderList(['MODAL_INTERSTITIAL'])[0]).not.toBe(adProviderDirectGpt, 'adProviderDirectGpt');
		expect(adConfig.getProviderList(['LEFT_SKYSCRAPER_3'])[0]).not.toBe(adProviderDirectGpt, 'adProviderDirectGpt');
		expect(adConfig.getProviderList(['PREFOOTER_LEFT_BOXAD'])[0]).not.toBe(adProviderDirectGpt, 'adProviderDirectGpt');
		expect(adConfig.getProviderList(['PREFOOTER_RIGHT_BOXAD'])[0]).not.toBe(adProviderDirectGpt, 'adProviderDirectGpt');

	});
	it('getProvider returns Taboola US wikis on article pages when wgAdDriverUseTaboola enabled', function () {
		var adProviderNullMock = {name: 'NullMock'},
			adProviderEvolveMock = {name: 'EvolveMock', canHandleSlot: function () {return true;}},
			adProviderDirectGpt = {name: 'DirectGpt', canHandleSlot: function () {return true;}},
			adProviderRemnantGpt = {name: 'RemnantGpt', canHandleSlot: function () {return false;}},
			adProviderTaboola = {name: 'Taboola', canHandleSlot: function () {return true;}, init: function(){}},
			adProviderLiftiumMock = {name: 'LiftiumMock', canHandleSlot: function () {return true;}},
			adProviderSevenOneMedia = {name: 'SevenOneMediaMock', canHandleSlot: function () {return true;}},
			logMock = function () {},
			windowMock = {},
			instantGlobalsMock = {},
			abTestMock = { inGroup: function () {return true;} },
			geoMock = { getCountryCode: function () {return 'US';} },
			adConfig;

		spyOn(adProviderTaboola, 'init');

		adConfig = modules['ext.wikia.adEngine.adConfigLate'](
			logMock,
			windowMock,
			instantGlobalsMock,
			geoMock,
			mockAdContext({ pageType: 'article', wikiDbName: 'darksouls' }, { taboola: true }),
			adProviderEvolveMock,
			adProviderLiftiumMock,
			adProviderDirectGpt,
			adProviderRemnantGpt,
			adProviderTaboola,
			adProviderNullMock,
			adProviderSevenOneMedia,
			abTestMock
		);

		expect(adConfig.getProviderList(['NATIVE_TABOOLA'])[0]).toBe(adProviderTaboola, 'adProviderTaboola');

	});
	it('getProvider returns Taboola US wikis on home pages when wgAdDriverUseTaboola enabled', function () {
		var adProviderNullMock = {name: 'NullMock'},
			adProviderEvolveMock = {name: 'EvolveMock', canHandleSlot: function () {return true;}},
			adProviderDirectGpt = {name: 'DirectGpt', canHandleSlot: function () {return true;}},
			adProviderRemnantGpt = {name: 'RemnantGpt', canHandleSlot: function () {return false;}},
			adProviderTaboola = {name: 'Taboola', canHandleSlot: function () {return true;}, init: function(){}},
			adProviderLiftiumMock = {name: 'LiftiumMock', canHandleSlot: function () {return true;}},
			adProviderSevenOneMedia = {name: 'SevenOneMediaMock', canHandleSlot: function () {return true;}},
			logMock = function () {},
			windowMock = {},
			instantGlobalsMock = {},
			abTestMock = { inGroup: function () {return true;} },
			geoMock = { getCountryCode: function () {return 'US';} },
			adConfig;

		spyOn(adProviderTaboola, 'init');

		adConfig = modules['ext.wikia.adEngine.adConfigLate'](
			logMock,
			windowMock,
			instantGlobalsMock,
			geoMock,
			mockAdContext({ pageType: 'home', wikiDbName: 'darksouls' }, { taboola: true }),
			adProviderEvolveMock,
			adProviderLiftiumMock,
			adProviderDirectGpt,
			adProviderRemnantGpt,
			adProviderTaboola,
			adProviderNullMock,
			adProviderSevenOneMedia,
			abTestMock
		);

		expect(adConfig.getProviderList(['NATIVE_TABOOLA'])[0]).toBe(adProviderTaboola, 'adProviderTaboola');

	});

});
