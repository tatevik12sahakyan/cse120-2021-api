var requiredFields = [
 "fullname", "mail", "date", "age", "years", "favplayer" 
]

var footballForm = {
  "owner" : "Tatevik Sahakyan",
  "project" : "Football",
  "fullname" : "",
  "mail" : "",
  "date" : "",
  "age" : "",
  "years" : "",
  "favplayer" : "",
  "club" : "",
  "otherclubvalue" : ""
}
function HandleFullnameChange() {
  footballForm.fullname = document.getElementById("fullname").value
}

function HandleMailChange() {
  footballForm.mail = document.getElementById("mail").value
}

function HandleDateChange() {
  footballForm.date = document.getElementById("date").value
}

function HandleTimeChange() {
  footballForm.age = document.getElementById("age").value
}

function HandleYearsChange() {
  footballForm.year = document.getElementById("years").value
}

function HandleFavChange() {
  footballForm.favplayer = document.getElementById("favplayer").value
}


function HandleClubchange(e) {
  footballForm.club=e.target.value;
  if (footballForm.club!="other") {
    footballForm.otherclubvalue="";
    document.getElementById("otherclub").style.display="none";
  }
  else{
    document.getElementById("otherclub").style.display="block";
  }
}

function HandleOtherClubchange() {
  if (footballForm.club == "other") {
    footballForm.otherclubvalue = document.getElementById("otherclub").value;
    document.getElementById("otherclub").style.display="block";
  }
}

function validateFormData() {
  var isFormValid = true;
  var keys = Object.keys(tennisForm);
  keys.forEach(key => {
      if (requiredFields.indexOf(key) > -1 && footballForm[key] == "") { console.log(key, " is a required field, please add a value") 
      if(document.getElementById(key)) {
        document.getElementById(key).style.backgroundColor = "red"; 
        isFormValid = false;
      }
    }   
  })
  return isFormValid;
}



function ShowTheData(e) {;
  console.log(footballForm);


  $.ajax({
    type: 'POST',
    url: "https://cse120-2021-api-tatevik.herokuapp.com/data",
    data: footballForm,
    cache: false,
    dataType : 'json',
    success: function (data) {
      console.log("success");
    },
    error: function (xhr) {
      console.error("Error in post", xhr);
    },
    complete: function () {
      console.log("Complete");  
    }
  });
}


function complete () {
  console.log("Complete");  
}

function loadExistingData() {
	var existingData = [];
  $.ajax({
    type: 'GET',
    url: "https://cse120-2021-api-tatevik.herokuapp.com/data",
    data: footballForm,
    cache: false,
    dataType : 'json',
    success: function (data) {
      console.log("success", data);
      existingData = data;
      displayData(existingData.data);
    },
    error: function (data) {
      console.error("Error in post");
    }
  });
}

function displayData(existingData) {
  document.getElementById("existingData").innerHTML = "<ul>";
  for (var i = 0; i < existingData.length; i++) {
    currentBook = existingData[i];
    document.getElementById("existingData").innerHTML += "<li><i>" + currentBook.fullname + "</li> : <b>" + currentBook.title + "</b></li>";
  }
  document.getElementById("existingData").innerHTML += "</ul>"
  }


