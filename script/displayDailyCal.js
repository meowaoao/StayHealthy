// get daily cal intake value from localStorage
function getTotalCal(){
    let totalCal = localStorage.getItem("cal");
    if (totalCal == null){
        document.getElementById("totalCal").innerHTML = "0 Cal";
    } else {
        document.getElementById("totalCal").innerHTML = totalCal + " Cal"; 
    }  
}

// read from subcollection to get a list of added food and their data
function getIntakeHistory(){
    document.getElementById("intakeList").innerHTML = 
        "<tr><th>Brand</th><th>Item</th><th>Calorie</th><th>Servings</th><th>Total Cal</th></tr>";
    firebase.auth().onAuthStateChanged(function(user){
        db.collection("users/").doc(user.uid)
        .collection("dailyIntakeList")
        .get()
        .then(function(snapshot){
            snapshot.forEach(function(doc){
                document.getElementById("intakeList").innerHTML 
                += "<tr>" +
                "<td>" + doc.data().brand + "</td>" +
                "<td>" + doc.data().foodname + "</td>" +
                "<td>" + doc.data().calorie + "</td>" +
                "<td>" + doc.data().serving + "</td>" +
                "<td>" + doc.data().totalCal + "</td>" +
                "</tr>";
            })
            console.log("intake list displayed");
        })
    })
}

// event handler of clear button and set total cal to 0
// clear all documents in "dailyIntakeList" subcollection
function clearData(){
    localStorage.clear();
    console.log("localStorage clear");
    document.getElementById("totalCal").innerHTML = "0 Cal";
    firebase.auth().onAuthStateChanged(function(user){
        db.collection("users/").doc(user.uid)
        .update({
            totalcal: 0
        })
        .then(function(){
            firebase.auth().onAuthStateChanged(function(user){
                db.collection("users/").doc(user.uid)
                .collection("dailyIntakeList")
                .get()
                .then(function(snapshot){
                    snapshot.forEach(function(doc){
                        let id = doc.id;
                        firebase.auth().onAuthStateChanged(function(user){
                            db.collection("users/").doc(user.uid)
                            .collection("dailyIntakeList")
                            .doc(id)
                            .delete()
                        })
                    })
                })
            })
        })
    })
    document.getElementById("intakeList").innerHTML = "";
}

getTotalCal();
getIntakeHistory();

