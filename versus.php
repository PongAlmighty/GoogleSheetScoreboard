<?php require_once('config.php'); ?>
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family='Press Start 2P'">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
        <script src="versus.js"></script>
        <link rel="stylesheet" type="text/css" href="style.css">
    </head>
    <body>
        <div id="leaderboard">
		<div id="vp1">Player 1</div>
		Versus
		<div id="vp2">Player 2</div>
        </div>
        <script>
            loadData();
            setInterval(loadData, <?php echo $refreshRate ?>000);
        </script>
    </body>
</html>
