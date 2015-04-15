<div class="insights-container-nav">
	<ul class="insights-nav-list">
		<? foreach( $messageKeys as $key => $messages ) : ?>
			<li class="insights-nav-item">
				<a href="<?= InsightsHelper::getSubpageLocalUrl( $key ) ?>" class="insights-nav-link">
					<?= wfMessage( $messages['subtitle'] )->escaped() ?>
				</a>
			</li>
		<? endforeach; ?>
	</ul>
</div>
<div class="insights-container-main">
	<div class="insights-header insights-icon-<?= $par ?> clearfix">
		<h2 class="insights-header-subtitle"><?= wfMessage( $messageKeys[$par]['subtitle'] )->escaped() ?></h2>
		<p class="insights-header-description"><?= wfMessage( $messageKeys[$par]['description'] )->escaped() ?></p>
	</div>
	<table class="insights-list">
		<? foreach( $list as $item ): ?>
			<tr>
				<td class="item-number"><?= ++$offset ?></td>
				<td><a href="<?= $item['link'] ?>"><?= $item['title'] ?></a></td>
				<td><?= wfMessage( 'insights-last-edit' )->rawParams(
						Xml::element('a', [
							'href' => $item['revision']['userpage']
						],
							$item['revision']['username']
						),
						date('F j, Y', $item['revision']['timestamp'])
					)->escaped() ?></td>
				<td># of views</td>
			</tr>
		<? endforeach ?>
	</table>
</div>
