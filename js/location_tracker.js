function fetchFn(){
    window.setInterval(function() {
        console.log("Here now we are tracking location ");
        let response = fetch(protectedUrl , {
        method: 'GET',
        // mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0B4eXouY29tIiwidXNlcklkIjoiNWUxZmQwNGEyNmZmYWIxMTc4ZTk1ZjBjIiwiaWF0IjoxNTc5MjQwNTg0LCJleHAiOjE1NzkyNDQxODR9.ghVmVXAtnDbkgmuY1Y19BGRW_UUcU9tdQOtOhvNZ-IA"
        }
        }).then(function(res){
        res.json().then(function(resData){
            console.log(resData['Lat']);
            console.log(resData['Long']);
        });
        console.log("res: ", res);
        }).catch(function(err){
        console.log("err: ", err);
        });

    }, 3000);
}
