<div id="MagCloudIntroPopup" title="MagCloud" class="MagCloudDialog">
	<h3><?= wfMsg('magcloud-intro-create-magazine') ?></h3>
	<h4><?= wfMsg('magcloud-intro-check-out') ?></h4>

	<div id="MagCloudIntroPopupPreviews">
		<a href="<?= htmlspecialchars($preview['href']) ?>" target="_blank">
			<img src="<?= $preview['src'] ?>" />
		</a>
	</div>

	<p><?= wfMsg('magcloud-intro-hint') ?></p>

	<div id="MagCloudIntroPopupButtons" class="MagCloudPopupButtons">
		<a class="wikia_button" id="MagCloudIntroPopupOk">
			<span><?= wfMsg('magcloud-intro-get-started') ?></span>
		</a>
<?php if (!$isAnon): ?>
		<a class="wikia_button secondary" id="MagCloudIntroPopupLoad">
			<span><?= wfMsg('magcloud-intro-view-my-magazines') ?></span>
		</a>
<?php
	endif;
?>
		<a class="wikia_button secondary" id="MagCloudIntroPopupCancel">
			<span><?= wfMsg('cancel') ?></span>
		</a>
	</div>
</div>
