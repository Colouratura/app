<header class="AdminDashboardHeader" id="AdminDashboardHeader">
	<h1>
		<a href="<?= $adminDashboardUrlGeneral ?>" data-tracking="header/admindashboard">
			<?= wfMsg("admindashboard-header") ?>
		</a>
	</h1>
</header>
<nav class="AdminDashboardTabs" id="AdminDashboardTabs">
	<a href="<?= $adminDashboardUrlAdvanced ?>" class="tab <?= $tab == 'advanced' ? 'active' : '' ?>" data-section="advanced" data-tracking="header/advanced"><?= wfMsg('admindashboard-tab-advanced') ?></a>
	<a href="<?= $adminDashboardUrlGeneral ?>" class="tab <?= $tab == 'general' ? 'active' : '' ?>" data-section="general" data-tracking="header/general"><?= wfMsg('admindashboard-tab-general') ?></a>
</nav>
<aside class="AdminDashboardRail" id="AdminDashboardRail">
	<?= $wg->EnableFounderProgressBarExt ? $app->renderView( 'FounderProgressBar', 'widget' ) : '' ?>
	<?= $app->renderView( 'QuickStats', 'getStats') ?>
</aside>