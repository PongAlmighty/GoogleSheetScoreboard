# Scoreboard

Display a real time scoreboard on a web page from a Google Sheet.



![Scoreboard screenshot](./score.board.png)

## Prerequisites

1. Webserver with PHP
   - Repl.it can also be used. Click Here: [![Run on Repl.it](https://repl.it/badge/github/PongAlmighty/GoogleSheetScoreboard)](https://repl.it/github/PongAlmighty/GoogleSheetScoreboard)
2. Google Sheet ID

## Install 

1. Create a google doc modeled after this one: [Link to google sheet](https://docs.google.com/spreadsheets/d/1eQHR3-sW3VcTmIQn3ybS6PctSjtD78Oip5J2cyl6Xdw/edit#gid=0) 
2. Make sure it's shared so the public can view it
3. Get the ID from the URL of sheet
4. Clone this repo.  If you're putting it directly in the web directory, be sure the sensitive `.git` files are **not** web readable.
   - you can also run this directly from repl.it by following the links above. The remaining steps will still need done there
5. Copy `config.dist.php` to `config.php`. Update the `$sheet_id` and `$sheet_name` and `$refreshRate` as needed. The refresh rate is in seconds (needs to be in milliseconds)
6. Open a browser to your web server

## How it works

The HTML page is loaded as empty.  It then calls `loadData()` which makes an AJAX call to `sheet.json.php` which downloads the Google Sheet and returns up a cooked JSON object. The scripts in `players.js` then loops over the JSON and outputs a `<div/>` per player and score. `

The page will refresh every N seconds based on the value of `$refreshRate` by repeatedly calling `loadData()`.

If your score is  `0` you do not show on the board. Any player with more than `0`, will show.  The higher your score the larger font size your player is shown in.
