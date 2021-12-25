// thanks https://stackoverflow.com/a/35970894
let getJSON = function(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        let status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function getRow(total, count, name, score){
    let cssStyle = ' style="font-size: 10px;" '
    if (score > 0) {
        
        cssStyle = ' style="font-size:' +  (20) + 'px;" '
        // no, the parens aren't needed but it's so I can put a variable back later
        // safety: cssStyle = ' style="font-size:' +  (800 * (score / total)) + 'px;" '
    
    }
    
    if (count == 1) {
      return '<tr class="trNum01"><td id="plrRnk">' + count + ')</td><td id="tdSpacer">&nbsp</td><td  id = "plrName">'+ name +'</td><td  id = "plrScore">'+ score +'</td><td id="tdSpacer">&nbsp</td></tr>';
    } else if (count == 2) {
      return '<tr class="trNum02"><td id="plrRnk">' + count + ')</td><td id="tdSpacer">&nbsp</td><td  id = "plrName">'+ name +'</td><td  id = "plrScore">'+ score +'</td><td id="tdSpacer">&nbsp</td></tr>';
    } else if (count == 3) {
      return '<tr class="trNum03"><td id="plrRnk">' + count + ')</td><td id="tdSpacer">&nbsp</td><td  id = "plrName">'+ name +'</td><td  id = "plrScore">'+ score +'</td><td id="tdSpacer">&nbsp</td></tr>';
    } else if (count == 4) {
      return '<tr class="trNum04"><td id="plrRnk">' + count + ')</td><td id="tdSpacer">&nbsp</td><td  id = "plrName">'+ name +'</td><td  id = "plrScore">'+ score +'</td><td id="tdSpacer">&nbsp</td></tr>';
    } else if (count == 5) {
      return '<tr class="trNum05"><td id="plrRnk">' + count + ')</td><td id="tdSpacer">&nbsp</td><td  id = "plrName">'+ name +'</td><td  id = "plrScore">'+ score +'</td><td id="tdSpacer">&nbsp</td></tr>';
    } else {
      return '<tr  ' + cssStyle + '><td id="plrRnk">' + count + ')</td><td id="tdSpacer">&nbsp</td><td id = "plrName">'+ name +'</td><td id = "plrScore">'+ score +'</td><td id="tdSpacer">&nbsp</td></tr>';
    }
}

function loadData() {
    getJSON('./sheet.json.php',
        function(err, results) {
            if (err !== null) {
                console.log('Something went wrong fetching player JSON: ' + err);
            } else {
                let leaderboard = document.getElementById('leaders');
                leaderboard.innerHTML = '';

                for(const count in results.data){
                    const person = results.data[count];
                    if (person.score > 0) {
                        leaderboard.innerHTML += getRow(
                            results.total,
                            (Number(count) + 1),
                            person.name,
                            person.score
                        );
                    }
                }
            }
        });
}
