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

function loadData() {
    getJSON('./sheet.json.php',
        function(err, results) {
            if (err !== null) {
                console.log('Something went wrong fetching player JSON: ' + err);
            } else {
                const vbp1 = document.getElementById('vp1');
                const vbp2 = document.getElementById('vp2');
                vbp1.innerHTML = '';
                vbp2.innerHTML = '';
		var slot = 0;

                for(const count in results.data){
                    const person = results.data[count];
                    if (person.vstate > 0) {
			    if (slot == 0) {
				vbp1.innerHTML = person.name;
				slot = 1 ;
			    } else {
				vbp2.innerHTML = person.name;
				return;
			    }
                    }
                }
            }
        });

}



