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
        // no, the parens aren't needed but it's so I can put a variable back later
        // safety: cssStyle = ' style="font-size:' +  (800 * (score / total)) + 'px;" '
        cssStyle = ' style="font-size:' +  (60) + 'px;" '
    }
    return '<tr  ' + cssStyle + '>' +
            '<td class="plrRnk">' + count + ')</td>' +
            '<td class = "plrName">'+ name +'</td>' +
            '<td class = "plrScore">'+ score +'</td>' +
        '</tr>';
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
