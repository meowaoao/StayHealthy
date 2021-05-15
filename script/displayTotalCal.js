// get total cal data from localStorage and display it in webpage
function getTotalCal(){
    let totalCal = localStorage.getItem("cal");
    console.log(totalCal);
    if (totalCal == null){
        document.getElementById("totalCal").innerHTML = "0 Cal";
    } else {
        document.getElementById("totalCal").innerHTML = totalCal + " Cal"; 
    }  
}

// get data from localStorage and display them in a table
function showFoodInfo(){
    document.getElementById("foodInfo").innerHTML
        = "<tr><th>Brand</th><th>Item</th><th>Calorie</th><th>Servings</th><th>Total Cal</th></tr>"
        + "<tr>" +
        "<td>" + localStorage.getItem("brand") + "</td>" +
        "<td>" + localStorage.getItem("foodname") + "</td>" +
        "<td>" + localStorage.getItem("calorie") + "</td>" +
        "<td>" + localStorage.getItem("serving") + "</td>" +
        "<td>" + localStorage.getItem("totalCal") + "</td>" +
        "</tr>"
}

getTotalCal();
showFoodInfo();
