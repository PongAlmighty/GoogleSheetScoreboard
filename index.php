<?PHP
$bots=Array();
$botsScore=Array();
$getData=$_GET['refresh'] . "";
if($getData=='true') {
  $getData=1;
}
// JF: Put your Google Sheets sheet_id here
// JF: Make Sure the permissions allow anyone with link
// 
if($getData==1) {
  //$sheet_id="1nCbksR7m-vftkQpCrJsUxkhmqoU5pFcQmNDwvIInGps";
    $sheet_id = "19WYCoDTrvYsb-oF-xTIKSvIyOHyNkT4bm0DcoMrXY_o"; $sheet_name = "Sheet1";
  $tmp=$_GET['id'] . "";
  if($tmp>"") { $sheet_id=$tmp;}
  $tmp=$_GET['name'] . "";
  if($tmp>"") { $sheet_id=$tmp;}
  $url = "https://docs.google.com/spreadsheets/d/";
  $url .= $sheet_id . "/gviz/tq?tqx=out:json&sheet=";
  $url .= $sheet_name;
  $contents=file_get_contents($url);
  $contents= substr($contents, 47, -1);
  $contents=substr($contents,0,strlen($contents)-1);
  file_put_contents('cache.json',$contents);
}

$contents=file_get_contents('cache.json');
$jsonData=json_decode($contents,true);
$rows=$jsonData['table']['rows'];
foreach($rows as $k=>$v) {
  $playerName=$v['c'][0]['v'];
  $playerScore=$v['c'][1]['v'];
  $bots[]=$playerName;
  $botsScore[]=$playerScore;
}

$data=Array('Bot Name'=>$bots,'Tokens'=>$botsScore,'url'=>$url);
$contents=json_encode($data);
$contents="var json=" . $contents . ";" ;
file_put_contents('players.js',$contents);
$display=$_GET['display'] . "";
if($display=='leaderboard') {
  include('LeaderBoard.html');
  exit();
}
if($display=='top3') {
  include('top3.html');
  exit();
}
include('test.html');

?>
