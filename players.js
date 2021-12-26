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
    
    //let cssStyle= " class='trNum00' ";
    
    // Setup a "playerLoad" var to determine if there are a small, med or large number of users.
    // Lge = 22+  -  Med = 10-20   -   Sml = 5-10   -   XSm = < 5
    var playerLoad = "";

    if (totalPeople < 5) {
      playerLoad = "Xsm";
    } else if (totalPeople < 10) {
      playerLoad = "Sml";
    } else if (totalPeople =< 20) {
      playerLoad = "Med";
    } else {
      playerLoad = "Lge";
    }
    
    // now we need to actually set the size here, instead of in the classes
    // "Xsm" set every one the same size, but the higher the rank the more red
    // "Sml", gradient size from 55 down to 45
    // "Med", gradient size from 55 down to... 35?
    // "Lge", gradient size from 55 down to 25(?)
        
    var dynSize = '60px' //to hold the new size...

  
    switch(playerLoad) {
      case "Xsm":
        dynSize = 60;
        break;
      case "Sml":
        dynSize = scale(count, 1, totalPeople, 55, 45)
        break;
    }
    

    return '<tr style="font-size:' + (dynSize) + '">' +
            '<td class="plrRnk">' + count + ')</td>' +
            '<td class="plrName">'+ name +'</td>' +
            '<td class="plrScore">'+ score + '</td>' +
        '</tr>';

    /*
    if (count > 0 && count < 6) {
        cssStyle = " class='trNum0" + count + "' ";
    } else if (count < 10) {
        cssStyle = " class='trNumTierB' ";
    } else if (count < 16) {
        cssStyle = " class='trNumTierC' ";
    } else if (count < 22) {
        cssStyle = " class='trNumTierD' ";
    } else if (count < 25) {
        cssStyle = " class='trNumTierE' ";
    }
    

    return '<tr  ' + cssStyle + '>' +
            '<td class="plrRnk">' + count + ')</td>' +
            '<td class="plrName">'+ name +'</td>' +
            '<td class="plrScore">'+ score + '</td>' +
        '</tr>';
    */
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
                //alert(JSON.stringify(results));
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
