<?php

/**
 * Forum
 *
 * @author Hyun Lim, Kyle Florence, Saipetch Kongkatong, Tomasz Odrobny
 *
 */

$wgExtensionCredits['specialpage'][] = array(
	'name' => 'Forum',
	'author' => array( 'Hyun Lim', 'Kyle Florence', 'Saipetch Kongkatong', 'Tomasz Odrobny' ),
);

$dir = dirname( __FILE__ ) . '/';
$app = F::app( );

// classes
$wgAutoloadClasses[ 'ForumSpecialController'] =  $dir . 'ForumSpecialController.class.php' ;
$wgAutoloadClasses[ 'ForumHooksHelper'] =  $dir . 'ForumHooksHelper.class.php' ;
$wgAutoloadClasses[ 'ForumController'] =  $dir . 'ForumController.class.php' ;
$wgAutoloadClasses[ 'ForumNotificationPlugin'] =  $dir . 'ForumNotificationPlugin.class.php' ;
$wgAutoloadClasses[ 'Forum'] =  $dir . 'Forum.class.php' ;
$wgAutoloadClasses[ 'ForumBoard'] =  $dir . 'ForumBoard.class.php' ;
$wgAutoloadClasses[ 'ForumHelper'] =  $dir . 'ForumHelper.class.php' ;
$wgAutoloadClasses[ 'ForumExternalController'] =  $dir . 'ForumExternalController.class.php' ;
$wgAutoloadClasses[ 'RelatedForumDiscussionController'] =  $dir . 'RelatedForumDiscussionController.class.php' ;

// i18n mapping
$app->registerExtensionMessageFile( 'Forum', $dir . 'Forum.i18n.php' );
$app->registerExtensionMessageFile( 'ForumAliases', $dir . 'Forum.alias.php');

// special pages
$wgSpecialPages[ 'Forum' ] =  'ForumSpecialController';

// hooks
$wgHooks['AfterWallWikiActivityFilter'][] = 'ForumHooksHelper::onAfterWallWikiActivityFilter';
$wgHooks['WallContributionsLine'][] = 'ForumHooksHelper::onWallContributionsLine';
$wgHooks['getUserPermissionsErrors'][] = 'ForumHooksHelper::getUserPermissionsErrors';
$wgHooks['WallRecentchangesMessagePrefix'][] = 'ForumHooksHelper::onWallRecentchangesMessagePrefix';
$wgHooks['WallThreadHeader'][] = 'ForumHooksHelper::onWallThreadHeader';
$wgHooks['WallMessageGetWallOwnerName'][] = 'ForumHooksHelper::onWallMessageGetWallOwnerName';

$wgHooks['WallHistoryThreadHeader'][] = 'ForumHooksHelper::onWallHistoryThreadHeader';
$wgHooks['WallHistoryHeader'][] = 'ForumHooksHelper::onWallHistoryHeader';

$wgHooks['WallHeader'][] = 'ForumHooksHelper::onWallHeader';
$wgHooks['WallNewMessage'][] = 'ForumHooksHelper::onWallNewMessage';
$wgHooks['EditCommentsIndex'][] = 'ForumHooksHelper::onEditCommentsIndex';
$wgHooks['ArticleInsertComplete'][] = 'ForumHooksHelper::onArticleInsertComplete';
$wgHooks['WallBeforeRenderThread'][] = 'ForumHooksHelper::onWallBeforeRenderThread';
$wgHooks['AfterBuildNewMessageAndPost'][] = 'ForumHooksHelper::onAfterBuildNewMessageAndPost';
$wgHooks['WallMessageDeleted'][] = 'ForumHooksHelper::onWallMessageDeleted';
$wgHooks['ContributionsLineEnding'][] = 'ForumHooksHelper::onContributionsLineEnding';
$wgHooks['OasisAddPageDeletedConfirmationMessage'][] = 'ForumHooksHelper::onOasisAddPageDeletedConfirmationMessage';
$wgHooks['FilePageImageUsageSingleLink'][] = 'ForumHooksHelper::onFilePageImageUsageSingleLink';

//notification hooks
$wgHooks['NotificationGetNotificationMessage'][] = 'ForumNotificationPlugin::onGetNotificationMessage';
$wgHooks['NotificationGetMailNotificationMessage'][] = 'ForumNotificationPlugin::onGetMailNotificationMessage';

//old forum archive
$wgHooks['getUserPermissionsErrors'][] = 'ForumHooksHelper::onGetUserPermissionsErrors';
$wgHooks['PageHeaderIndexAfterActionButtonPrepared'][] = 'ForumHooksHelper::onPageHeaderIndexAfterActionButtonPrepared';
$wgHooks['ArticleViewHeader'][] = 'ForumHooksHelper::onArticleViewHeader';

// forum discussion on article
//It need to be first one !!!
array_splice( $wgHooks['OutputPageBeforeHTML'], 0, 0, 'ForumHooksHelper::onOutputPageBeforeHTML' );

$wgHooks['WallAction'][] = 'ForumHooksHelper::onWallAction';
$wgHooks['WallBeforeStoreRelatedTopicsInDB'][] = 'ForumHooksHelper::onWallStoreRelatedTopicsInDB';
$wgHooks['WallAfterStoreRelatedTopicsInDB'][] = 'ForumHooksHelper::onWallStoreRelatedTopicsInDB';

$wgHooks['ArticleFromTitle'][] = 'ForumHooksHelper::onArticleFromTitle';

// For activity module tag
$wgHooks['ParserFirstCallInit'][] = 'ForumHooksHelper::onParserFirstCallInit';

// Hook for topic red links
$wgHooks['LinkBegin'][] = 'ForumHooksHelper::onLinkBegin';

include ($dir . '/Forum.namespace.setup.php');

//add this namespace to list of wall namespaces
$app->registerNamespaceControler( NS_WIKIA_FORUM_BOARD, 'ForumController', 'board', true );
$app->registerNamespaceControler( NS_WIKIA_FORUM_TOPIC_BOARD, 'ForumController', 'board', true );

// permissions
$wgAvailableRights[] = 'forum';
$wgAvailableRights[] = 'boardedit';
$wgAvailableRights[] = 'forumadmin';

$wgGroupPermissions['*']['forum'] = false;
$wgGroupPermissions['staff']['forum'] = true;
$wgGroupPermissions['sysop']['forum'] = true;
$wgGroupPermissions['bureaucrat']['forum'] = true;
$wgGroupPermissions['helper']['forum'] = true;

$wgRevokePermissions['vstf']['forum'] = true;

$wgGroupPermissions['*']['boardedit'] = false;
$wgGroupPermissions['staff']['boardedit'] = true;

$wgGroupPermissions['*']['forumoldedit'] = false;
$wgGroupPermissions['staff']['forumoldedit'] = true;
$wgGroupPermissions['helper']['forumoldedit'] = true;
$wgGroupPermissions['sysop']['forumoldedit'] = true;
$wgGroupPermissions['bureaucrat']['forumoldedit'] = true;
$wgGroupPermissions['helper']['forumoldedit'] = true;

$wgGroupPermissions['*']['forumadmin'] = false;
$wgGroupPermissions['staff']['forumadmin'] = true;
$wgGroupPermissions['helper']['forumadmin'] = true;
$wgGroupPermissions['sysop']['forumadmin'] = true;
$wgGroupPermissions['helper']['forumadmin'] = true;


JSMessages::registerPackage('Forum', array(
	'back',
	'forum-specialpage-policies-edit',
	'forum-specialpage-policies'
));

