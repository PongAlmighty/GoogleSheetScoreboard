<?php

require_once('config.php');

$url = "https://docs.google.com/spreadsheets/d/" . $sheet_id . "/gviz/tq?tqx=out:json&sheet=" . $sheet_name;
$fullData = json_decode(substr(file_get_contents($url), 47, -2), true);

$playerData = $fullData['table']['rows'];
$data = array();
$totalScore = 0;
$totalNonZeroPeople = 0;

foreach($playerData as $row) {
    // expected sheet columns are: Name, Score, Captian, Comments, Versus state
    $playerName = $row['c'][0]['v'];
    $playerScore = $row['c'][1]['v'];
    $playerVersusState = $row['c'][4]['v'];
    $totalScore += $playerScore;
    if($playerScore > 0){
        $totalNonZeroPeople += 1;
    }
    $data[] = ['name' => $playerName, 'score' => $playerScore, 'vstate' => $playerVersusState];
}

$scores = array_column($data, 'score');
array_multisort($scores, SORT_DESC, $data);
print  json_encode(['totalScore' => $totalScore, 'totalNonZeroPeople' => $totalNonZeroPeople, 'data' => $data]) ;
