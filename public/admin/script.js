var loadedData = [];

function loadEditItem() {
    localStorage = window.localStorage;
    editItem = JSON.parse(localStorage.getItem("editItem"));
    console.log(editItem);
    document.getElementById("_id").value = editItem["_id"];
    document.getElementById("title").value = editItem["title"];
    document.getElementById("fullname").value = editItem["fullname"];   
    document.getElementById("author").value = editItem["author"];
    document.getElementById("colour").value = editItem["colour"];
    document.getElementById("covertype").value = editItem["covertype"];
    document.getElementById("othercovervalue").value = editItem["othercovervalue"];      
    document.getElementById("nofpages").value = editItem["nofpages"];
    document.getElementById("price").value = editItem["price"];
    document.getElementById("currency").value = editItem["currency"];
    document.getElementById("language").value = editItem["language"];
    document.getElementById("otherlanguagevalue").value = editItem["otherlanguagevalue"];
    document.getElementById("orglanguage").value = editItem["orglanguage"];
    document.getElementById("otherorglanguagevalue").value = editItem["otherorglanguagevalue"];
    document.getElementById("edition").value = editItem["edition"];
    document.getElementById("dimensions").value = editItem["dimensions"];
    document.getElementById("publisher").value = editItem["publisher"];
    document.getElementById("date").value = editItem["date"];
    document.getElementById("orgdate").value = editItem["orgdate"];
    document.getElementById("genre").value = editItem["genre"];
    document.getElementById("agerestr").value = editItem["agerestr"];
}

function loadFootballEditItem() {
    localStorage = window.localStorage;
    editItem = JSON.parse(localStorage.getItem("editItem"));
    console.log(editItem);
    document.getElementById("_id").value = editItem["_id"];
    document.getElementById("fullname").value = editItem["fullname"];
    document.getElementById("mail").value = editItem["mail"];
    document.getElementById("date").value = editItem["date"];
    document.getElementById("age").value = editItem["age"];
    document.getElementById("years").value = editItem["years"];   
    document.getElementById("favplayer").value = editItem["favplayer"];
    document.getElementById("club").value = editItem["club"];
    document.getElementById("otherclubvalue").value = editItem["otherclubvalue"]; 
}

function editData(id) {
    var tmp = id.split("edit_");
    var item_id = tmp[1];

    loadedData.forEach(item => {
        if ( item._id == item_id) {
            console.log(item); 
            localStorage = window.localStorage;
            localStorage.setItem('editItem', JSON.stringify(item));
            if (item["project"] == "Football") {
            document.location  = "footballForm.html"; 
            } else {
            document.location  = "form.html"; 
            }
        }
    })
}

function deleteData(id) {

    var r = confirm("Are you sure you want to delete the item with the following ID? " + id);
    if (r == false) {
        return;
    }

    var tmp = {
        "id": id
    }

    $.ajax({
        type: 'POST',
        url: "https://cse120-2021-api-tatevik.herokuapp.com/data/delete",
        data: tmp,
        cache: false,
        dataType : 'json',
        success: function (data) {
            console.log("success");
            document.getElementById("div" + id).style.display = "none";
        },
        error: function (xhr) {
            console.error("Error in post", xhr);
        },
        complete: function () {
            console.log("Complete");  
        }
    });
}

function saveData() {
	var tmp = {
		"test": "Data"
	}

  $.ajax({
      type: 'POST',
      url: "https://cse120-2021-api-tatevik.herokuapp.com/data",
      data: tmp,
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

function loadExistingData() {
  myFootballData = [];
  myBookData = [];
  otherData = [];
  $.ajax({
     type : "GET",
      url : "https://cse120-2021-api-tatevik.herokuapp.com/data",
      dataType : "json",
      success : function(data) {
        loadedData = data.data;
        data.data.forEach(elem => {
          if (elem["owner"] == "Tatevik Sahakyan") {
            if (elem["project"] == "Football") {
              myFootballData.push(elem);
            } else {
              myBookData.push(elem);
            }
          } else {
            otherData.push(elem);
          }
        })
        displayData(myFootballData, "footballDataContainer");
        displayData(myBookData, "bookDataContainer");
        displayData(otherData, "otherDataContainer");
      },
      error : function(data) {
          console.log("Error")
      }
  });
}

function displayData(data, containerDivName) {
  document.getElementById(containerDivName).innerHTML = "";
  data.forEach(elem => {
    var item = document.createElement("div");
    item.id = "div" + elem["_id"];
    item.className = "item";
    if (Object.keys(elem).length == 1) {
      var span = document.createElement("span");
      span.innerHTML = "<i>Empty Element with autogenerated ID: </i>" + elem["_id"];
      item.appendChild(span);
    }
    Object.keys(elem).forEach(key => {
      if (key != "_id") {
        var span = document.createElement("span");

        var b = document.createElement("b");
        b.innerHTML = key + ": ";
        span.appendChild(b);
        
        span.className = "item";
        if (elem[key]) {
            span.innerHTML += elem[key];
        } else {
            var span1 = document.createElement("span");
            span1.className = "undefined";
            span1.innerHTML = "N/A";
            span.appendChild(span1)
        }
        item.appendChild(span);

        var br = document.createElement("br");
        item.appendChild(br);
      }
    })
    var edit_button = document.createElement("button");
    edit_button.innerHTML = "Edit";
    edit_button.id = "edit_" + elem["_id"];
    edit_button.className = "edit";
    edit_button.addEventListener("click", function(e){
        editData(e.target.id);
    }, false);
    item.appendChild(edit_button);

    var button = document.createElement("button");
    button.innerHTML = "Delete";
    button.id = elem["_id"];
    button.addEventListener("click", function(e){
        deleteData(e.target.id);
    }, false);
    item.appendChild(button);
    document.getElementById(containerDivName).appendChild(item);
  })

}

function toggleOtherData() {
  var otherData = document.getElementById("otherDataContainer");
  if (otherData.style.display == "block") {
    otherData.style.display = "none";
  } else {
    otherData.style.display = "block";
  }
}

function toggleFootballData() {
  var footballData = document.getElementById("footballDataContainer");
  if (footballData.style.display == "block") {
    footballData.style.display = "none";
  } else {
    footballData.style.display = "block";
  }
}

function toggleBookData() {
  var bookData = document.getElementById("bookDataContainer");
  if (bookData.style.display == "block") {
    bookData.style.display = "none";
  } else {
    bookData.style.display = "block";
  }
}


function updateData(e) {
  e.preventDefault();
  var updatedBook = {};
  updatedBook.id = document.getElementById("_id").value;
  updatedBook.title = document.getElementById("title").value;
  updatedBook.title = document.getElementById("fullname").value;					    
  updatedBook.author = document.getElementById("author").value;
  updatedBook.colour = document.getElementById("colour").value;
  updatedBook.covertype = document.getElementById("covertype").value;
  updatedBook.othercovervalue = document.getElementById("othercovervalue").value;
  updatedBook.nofpages = document.getElementById("nofpages").value;
  updatedBook.price = document.getElementById("price").value;
  updatedBook.currency = document.getElementById("currency").value;
  updatedBook.language = document.getElementById("language").value;	
  updatedBook.otherlanguagevalue = document.getElementById("otherlanguagevalue").value;	
  updatedBook.orglanguage = document.getElementById("orglanguage").value;	
  updatedBook.otherorglanguagevalue = document.getElementById("otherorglanguagevalue").value;	
  updatedBook.edition = document.getElementById("edition").value;	
  updatedBook.dimensions = document.getElementById("dimensions").value;	
  updatedBook.publisher = document.getElementById("publisher").value;	
  updatedBook.date = document.getElementById("date").value;	
  updatedBook.orgdate = document.getElementById("orgdate").value;	
  updatedBook.genre = document.getElementById("genre").value;	
  updatedBook.agerestr = document.getElementById("agerestr").value;	
	
	
	
      $.ajax({
      type: 'POST',
      url: "/data/update",
      data: updatedBook,
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


function updateFootballData(e) {
  e.preventDefault();
  var updatedFootball = {};
    updatedFootball.id = document.getElementById("_id").value;
    updatedFootball.fullname = document.getElementById("fullname").value;
    updatedFootball.mail = document.getElementById("mail").value; 
    updatedFootball.date = document.getElementById("date").value;
    updatedFootball.age = document.getElementById("age").value;
    updatedFootball.years = document.getElementById("years").value;   
    updatedFootball.favplayer = document.getElementById("favplayer").value;
    updatedFootball.club = document.getElementById("club").value;
    updatedFootball.otherclubvalue = document.getElementById("otherclubvalue").value; 
      
	
	
	
      $.ajax({
      type: 'POST',
      url: "/data/update",
      data: updatedFootball,
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
