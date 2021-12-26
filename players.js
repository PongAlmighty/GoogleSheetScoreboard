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

    // now we need to actually set the size here, instead of in the classes
    // "Xsm", gradient size from 95 down to 70 *To Do: Add colors to the top 5
    // "Sml", gradient size from 95 down to 45
    // "Med", gradient size from 75 down to 15
    // "Lge", gradient size from 55 down to 25(?)

    let dynSize;

    if (totalPeople <= 5) {
        dynSize = scale(count, 1, totalPeople, 95, 70)
    } else if (totalPeople <= 10) {
        dynSize = scale(count, 1, totalPeople, 95, 70)
    } else if (totalPeople <= 20) {
        dynSize = scale(count, 1, totalPeople, 75, 15)
    } else if (totalPeople > 20) {
        dynSize = scale(count, 1, totalPeople, 45, 15)
    }

    return '<tr style="font-size:' + dynSize + 'px">' +
            '<td class="plrRnk">' + count + ')</td>' +
            '<td class="plrName">'+ name +'</td>' +
            '<td class="plrScore">'+ score + '</td>' +
        '</tr>';

}

function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
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
