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

function getRow(totalPoints, totalPeople, count, name, score){
    let cssStyle= " class='trNum00' ";
    if (count > 0 && count < 6) {
        cssStyle = " class='trNum0" + count + "' ";
    } else if (totalPeople < 15) {
        cssStyle = " class='trNum00Plus' ";
    }

    return '<tr  ' + cssStyle + '>' +
            '<td class="plrRnk">' + count + ')</td>' +
            '<td class="plrName">'+ name +'</td>' +
            '<td class="plrScore">'+ score +'</td>' +
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
                            results.totalScore,
                            results.totalNonZeroPeople,
                            (Number(count) + 1),
                            person.name,
                            person.score
                        );
                    } else {
                        
                    }
                }
            }
        });
}
