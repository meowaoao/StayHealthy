let foodname;
let serving = 1;
let calorie = 0;
let totalCal = 0;
let calIntake = 0;
let brand;
let foodHistory = [];

// get food name through nrl link
function getFoodName(){
    let url = document.URL;
    let val = url.split("?")[1];
    foodname = val.split("=")[1];
    document.getElementById("title").innerHTML = foodname;
    console.log("selected food: " + foodname);  // log
}

// get cal data using "where" method in firebase
function getCal(){
    db.collection("items")
    .where("name", "==", foodname)
    .get()
    .then(function(snapshot){
        snapshot.forEach(function(doc){
            calorie = doc.data().cal;
            totalCal = calorie;
            brand = doc.data().brand;
            document.getElementById("totalCal").innerHTML = doc.data().cal + " Cal";
            console.log(doc.data());        // log
            console.log(doc.data().cal);    // log
            console.log(doc.data().brand);  // log
        })
    })
}

// event handler if serving amount is 1
function gets1(){
    serving = 1;
    console.log("serving: " + serving);
    calcTotalCal();
}
// event handler if serving amount is 2
function gets2(){
    serving = 2;
    console.log("serving: " + serving);
    calcTotalCal();
}
// event handler if serving amount is 3
function gets3(){
    serving = 3;
    console.log("serving: " + serving);
    calcTotalCal();
}
// event handler if serving amount is more than 3
function getsmore(){
    serving = prompt("Please enter a number:");
    console.log("serving: " + serving);
    calcTotalCal();
}

// calculate toal cal of one food by times with servings
function calcTotalCal(){
    totalCal = serving * calorie;
    document.getElementById("totalCal").innerHTML = totalCal + " Cal";
}

// event handler of add food button, and store data in localStorage
function addFood(){
    if (localStorage.getItem("cal") == null) {
        calIntake = totalCal;
        localStorage.setItem("cal", calIntake);
        console.log("localStorage init: " + localStorage.getItem("cal"));   // log
    } else {
        calIntake = totalCal + parseInt(localStorage.getItem("cal"));
        localStorage.setItem("cal", calIntake);
        console.log("localStorage cal: " + localStorage.getItem("cal"));    // log
        console.log("updated localStorage cal: " + localStorage.getItem("cal")); //log
    }
    firebase.auth().onAuthStateChanged(function(user){
        db.collection("users/").doc(user.uid)
        .update({
            totalcal: calIntake
            //totalcal: firebase.firestore.FieldValue.increment() //[easier way]
        })
        .then(function(){
            localStorage.setItem("brand", brand);
            localStorage.setItem("foodname", foodname);
            localStorage.setItem("calorie", calorie);
            localStorage.setItem("serving", serving);
            localStorage.setItem("totalCal", totalCal);
            db.collection("users/").doc(user.uid)
            .collection("dailyIntakeList").add({
                brand: brand,
                foodname: foodname,
                calorie: calorie,
                serving: serving,
                totalCal: totalCal
            })
            .then(function(){
                console.log("History updated"); // log
                window.location.href = "mealcal.html";
            }) 
        })
    })
}


getFoodName();
getCal();

