<?php

class GlobalNavigationHelper {

	const DEFAULT_LANG = 'en';
	const USE_LANG_PARAMETER = '?uselang=';
	const CENTRAL_WIKI_SEARCH = '/wiki/Special:Search';
	const WAM_LANG_CODE_PARAMETER = '?langCode=';

	/**
	 * @var WikiaCorporateModel
	 */
	private $wikiCorporateModel;

	/**
	 * @var WikiaLogoHelper
	 */
	private $wikiaLogoHelper;


	public function __construct() {
		$this->wikiCorporateModel = new WikiaCorporateModel();
		$this->wikiaLogoHelper = new WikiaLogoHelper();
	}

	/**
	 * @desc get central wiki URL for given language.
	 * If central wiki in given language doesn't exist return default one (english)
	 *
	 * @param String $lang - language
	 * @return string - central wiki url
	 */
	public function getCentralUrlFromGlobalTitle( $lang ) {
		$out = '/';

		$title = $this->wikiaLogoHelper->getCentralWikiUrlForLangIfExists( $lang );
		if ( $title ) {
			$out = $title->getServer();
		} else if ( $title = $this->wikiaLogoHelper->getCentralWikiUrlForLangIfExists( self::DEFAULT_LANG ) ) {
			$out = $title->getServer();
		}

		return $out;
	}

	/**
	 * @desc get CNW url from GlobalTitle and append uselang
	 * if language is different than default (english)
	 *
	 * @param String $lang - language
	 * @return string - CNW url with uselang appended if necessary
	 */
	public function getCreateNewWikiUrl( $lang ) {
		$createWikiUrl = $this->createCNWUrlFromGlobalTitle();

		if ( $lang != self::DEFAULT_LANG ) {
			$createWikiUrl .= self::USE_LANG_PARAMETER . $lang;
		}
		return $createWikiUrl;
	}

	/**
	 * @desc This method appends /wiki/Special:Search to central URL.
	 * It appends not localized version because SpecialPage::getTitle returns value based on content language
	 * not user language.
	 *
	 * @param String $centralUrl - central wiki URL in given user language
	 * @return string - url to Special:Search page
	 */
	public function getGlobalSearchUrl( $centralUrl ) {
		return $centralUrl . self::CENTRAL_WIKI_SEARCH;
	}

	/**
	 * @desc get language for search results.
	 * If resultsLang param is set then use it if not get it from $wgLang
	 *
	 * @return String - language
	 */
	public function getLangForSearchResults() {
		global $wgLanguageCode, $wgRequest;

		$resultsLang = $wgRequest->getVal( 'resultsLang' );
		if ( !empty( $resultsLang ) ) {
			return $resultsLang;
		} else {
			return $wgLanguageCode;
		}
	}

	protected function createCNWUrlFromGlobalTitle() {
		return GlobalTitle::newFromText(
			'CreateNewWiki',
			NS_SPECIAL,
			WikiService::WIKIAGLOBAL_CITY_ID
		)->getFullURL();
	}

	public function getMenuNodes2016() {
		global $wgLang;

		$exploreDropdownLinks = [];

		$WAMLinkAndLabel = wfMessage( 'global-navigation-wam-link-label' );

		$hubsNodes = ( new NavigationModel( true /* useSharedMemcKey */ ) )->getTree(
			NavigationModel::TYPE_MESSAGE,
			'global-navigation-menu-hubs',
			[3] // max 3 links
		);

		// Link to WAM - Top Communities
		$exploreDropdownLinks[] = [
			'text' => $WAMLinkAndLabel->plain(),
			'textEscaped' => $WAMLinkAndLabel->escaped(),
			'href' => $this->getWAMLinkForLang( $wgLang->getCode() )
		];

		$exploreNodes = ( new NavigationModel( true /* useSharedMemcKey */ ) )->getTree(
			NavigationModel::TYPE_MESSAGE,
			'global-navigation-menu-explore',
			[1, 3] // max 1 entry with 3 links
		);

		$exploreNodes[] = $WAMLinkAndLabel;

		return [
			'hubs' => $hubsNodes,
			'explore' => $exploreNodes[0], // always one node - explore the wikia
		];
	}

	public function getWAMLinkForLang( $lang ) {
		$wamService = new WAMService();
		$wamDates = $wamService->getWamIndexDates();

		if ( $lang === 'en' || empty( $wamService->getWAMLanguages( $wamDates['max_date'] )[$lang] ) ) {
			return WAMService::WAM_LINK;
		} else {
			return WAMService::WAM_LINK . self::WAM_LANG_CODE_PARAMETER . $lang;
		}
	}
}
