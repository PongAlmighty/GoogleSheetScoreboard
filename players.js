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

function getRow(count, name, score, totalPeople){

    let dynSize;
    if (totalPeople <= 10) {
        dynSize = scale(count, totalPeople, 95, 70);
    } else if (totalPeople <= 15) {
        dynSize = scale(count, totalPeople, 85, 35);
    } else if (totalPeople <= 20) {
        dynSize = scale(count, totalPeople, 75, 15);
    } else {
        dynSize = scale(count, totalPeople, 45, 15);
    }

    const dynCol = scale(count, 5, 128, 255); // <- amount of green in the text color

    return '<tr style="font-size:' + dynSize + 'px; color:rgb(255, ' + dynCol + ',0);  ">' +
            '<td class="plrRnk">' + count + ')</td>' +
            '<td class="plrName">' + name + '</td>' +
            '<td class="plrScore">' + score + '</td>' +
        '</tr>';

}

function scale (count, inMax, outMin, outMax) {
    return (count - 1) * (outMax - outMin) / (inMax - 1) + outMin;
}

function loadData() {
    getJSON('./sheet.json.php',
        function(err, results) {
            if (err !== null) {
                console.log('Something went wrong fetching player JSON: ' + err);
            } else {
                const leaderboard = document.getElementById('leaders');
                leaderboard.innerHTML = '';

                for(const count in results.data){
                    const person = results.data[count];
                    if (person.score > 0) {
                        leaderboard.innerHTML += getRow(
                            (Number(count) + 1),
                            person.name,
                            person.score,
                            results.totalNonZeroPeople
                        );
                    }
                }
            }
        });
}
