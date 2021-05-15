let ID;

// event handler of each food image, get element id and store it in url
function getID(){
    ID = event.srcElement.id;
    window.location.href = "selectedfood.html?id=" + ID;
}

//-------------------- test code ----------------------//
// function id_honeydip(){
//     ID = document.getElementById("Honey_Dip").id;  // ID = "Honey_Dip"
//     to();
// }
