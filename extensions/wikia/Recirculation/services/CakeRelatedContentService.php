<?php

use Swagger\Client\ApiException;
use Swagger\Client\ContentEntity\Api\RelatedContentApi;
use Swagger\Client\ContentEntity\Models\Content;
use Swagger\Client\ContentEntity\Models\RelatedContent;
use Wikia\DependencyInjection\Injector;
use Wikia\Logger\Loggable;
use Wikia\Service\Swagger\ApiProvider;

class CakeRelatedContentService {

	use Loggable;

	const SERVICE_NAME = "content-entity-service";
	const DISCUSSION_THREAD_TITLE_MAX_LENGTH = 105;
	const TIMEOUT = 5;

	/**
	 * @param $title
	 * @param $ignore
	 * @return RecirculationContent[]
	 */
	public function getContentRelatedTo( $title, $universeName = null, $limit = 5, $ignore = null ) {
		$items = [];

		if ( !$this->onValidWiki() || !$this->onValidPage( $title ) ) {
			return $items;
		}

		$api = $this->relatedContentApi();

		try {
			$filteredRelatedContent = $api->getRelatedContentFromEntityName( $title, $universeName, $limit + 1, "true" );
			if ( is_null( $filteredRelatedContent ) ) {
				$this->warning( "getRelatedContentFromEntityName failed to retrieve recommendations", [
						"title" => $title,
						"limit" => $limit
				] );

				return [];
			}

			// The server may have given us a malformed response, so log and adjust accordingly
			if ( !is_array( $filteredRelatedContent->getFandomArticles() ) ) {
				$this->warning( "getRelatedContentFromEntityName expected fandom_articles to be an array", [
						"title" => $title,
						"limit" => $limit,
						"fandom_articles" => $filteredRelatedContent->getFandomArticles()
				] );
				$filteredRelatedContent->setFandomArticles( [] );
			}

			if ( !is_array( $filteredRelatedContent->getDiscussionThreads() ) ) {
				$this->warning( "getRelatedContentFromEntityName expected discussion_threads to be an array", [
						"title" => $title,
						"limit" => $limit,
						"discussion_threads" => $filteredRelatedContent->getDiscussionThreads()
				] );
				$filteredRelatedContent->setDiscussionThreads( [] );
			}

			if ( !is_array( $filteredRelatedContent->getWikiArticles() ) ) {
				$this->warning( "getRelatedContentFromEntityName expected wiki_articles to be an array", [
						"title" => $title,
						"limit" => $limit,
						"wiki_articles" => $filteredRelatedContent->getWikiArticles()
				] );
				$filteredRelatedContent->setWikiArticles( [] );
			}

			$wikiArticles = [];
			foreach ( $filteredRelatedContent->getWikiArticles() as $article ) {
				$parsed = parse_url( $article->getContent()->getUrl() );
				if ( urldecode( $parsed['path'] ) != $ignore ) {
					$wikiArticles[] = $article;
				}
			}

			/**
			 * this seems funky, but http://php.net/manual/en/function.array-map.php#refsect1-function.array-map-examples
			 * so this actually will create an array of arrays where the elements are ordered:
			 * [
			 *   // fandom
			 *   // discussion
			 *   // article
			 * ]
			 * because that's the order they're passed in
			 */
			$ordered = array_map(
					null,
					$filteredRelatedContent->getFandomArticles(),
					$filteredRelatedContent->getDiscussionThreads(),
					$wikiArticles );

			foreach ( $ordered as $sublist ) {
				foreach ( $sublist as $item ) {
					if ( !empty( $item ) ) {
						/** @var RelatedContent $item */
						$content = $item->getContent();

						$items[] = new RecirculationContent( [
								'index' => count( $items ),
								'url' => $content->getUrl(),
								'thumbnail' => $content->getImage(),
								'title' => $this->formatTitle( $content ),
								'publishDate' => $content->getModified(),
								'author' => $this->getAuthor( $content->getContentMetadata() ),
								'authors' => $this->getAuthors( $content ),
								'isVideo' => false,
								'meta' => $content->getContentMetadata(),
								'source' => $this->getRecirculationContentType( $content->getContentType() ),
							] );
					}

					if ( count( $items ) >= $limit ) {
						break 2;
					}
				}
			}

			return $items;
		} catch ( ApiException $e ) {
			$this->error( "error while getting content", [
				'code' => $e->getCode(),
				'message' => $e->getMessage(),
			] );
			return [];
		}
	}

	/**
	 * @return RelatedContentApi
	 */
	private function relatedContentApi() {
		/** @var ApiProvider $apiProvider */
		$apiProvider = Injector::getInjector()->get( ApiProvider::class );
		/** @var RelatedContentApi $api */
		$api = $apiProvider->getApi( self::SERVICE_NAME, RelatedContentApi::class );
		$api->getApiClient()->getConfig()->setCurlTimeout( self::TIMEOUT );

		return $api;
	}

	private function formatTitle( Content $content ) {
		global $wgContLang;

		if ( $content->getContentType() == "Discussion Thread" ) {
			return $wgContLang->truncate(
					$content->getTitle(),
					self::DISCUSSION_THREAD_TITLE_MAX_LENGTH );
		}

		return $content->getTitle();
	}

	private function getAuthors( Content $content ) {
		$authors = [];
		$authorObjects = $content->getAuthors();
		if ( !is_array( $authorObjects ) ) {
			return $authors;
		}

		foreach ($authorObjects as $author) {
			$avatar = null;
			$avatarContainer = $author->getAvatar();
			if ( is_array( $avatarContainer ) ) {
				$avatar = $avatarContainer["src"];
			}

			$authors[] = [
				'id' => $author->getId(),
				'external_user_id' => $author->getExternalUserId(),
				'username' => $author->getUsername(),
				'usertype' => $author->getUserType(),
				'avatar' => $avatar,
			];
		}

		return $authors;
	}

	private function getAuthor( $metadata ) {
		if ( array_key_exists( "authorName", $metadata ) ) {
			return $metadata["authorName"];
		} else {
			return "";
		}

	}

	private function getRecirculationContentType( $contentType ) {
		switch ( $contentType ) {
			case "Discussion Thread":
				return "discussions";
			case "Fandom Article":
				return "fandom";
			case "Wiki Article":
				return "wiki";
			default:
				return "undefined";
		}

	}

	private function onValidWiki() {
		global $wgCityId;

		return in_array(
				$wgCityId,
				[
						147,    // starwars
						130814, // gameofthrones
						3035,   // fallout
						2237,   // dc
						2233,   // marvel
						208733, // darksouls
				]
		);
	}

	private function onValidPage( $title ) {
		return $title != "Main Page";
	}
}
