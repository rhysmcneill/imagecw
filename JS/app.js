//The URIs of the REST endpoint of images
BASECIA = "https://prod-24.northcentralus.logic.azure.com/workflows/a6b3322bf0f04a0fb5fdd38d1f7f5ba3/triggers/manual/paths/invoke/rest/v1/images/";
TAILCIA = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=gclQqp8Z1TmkG7ACcSC_ZAUrxJC7TsZHNUcGCBrl-u8"
BASERAI = "https://prod-27.northcentralus.logic.azure.com/workflows/5e73a6cc7ead4e7b85104dac8732bb9a/triggers/manual/paths/invoke/rest/v1/Feed/";
TAILRAI = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SkqJdqwoNn-dRH2sU5esZ5bV8AUVlF-Tu5OpwSpyq0Q"
BASEDAI = "https://prod-14.ukwest.logic.azure.com/workflows/7cabc07c991743ea9ccaadcde756de11/triggers/manual/paths/invoke/rest/v1/images/";
TAILDAI = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZndfDtiW-jMt-ETcvshI5sL9qVmVoJNL6UGukz3yJ-M";
BASEUIA = "https://prod-14.uksouth.logic.azure.com/workflows/63b965e90eda42d583411827b005718e/triggers/manual/paths/invoke/rest/v1/images/";
TAILUIA = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=OWVgM6GzBL7afbxqacYdm33HEaDEJAEglRYbpz1jGgk";
//The URIs of REST endpoints for Reg/Login
CREATEUSERS = "https://prod-14.uksouth.logic.azure.com:443/workflows/eeaaeb70a6d0416eb7f6414d14ea520c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=jfY48aqF8fa2w3jItKTgdIzOfktv2r9J0jIGgXPkFL8";
BASELOGINUSER = "https://prod-14.uksouth.logic.azure.com/workflows/c636c76322694414ae077da8b8606f75/triggers/manual/paths/invoke/rest/v1/login/";
TAILLOGINUSER = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Y7YbnrreOySo4MqXYL3K470njVEAHqySIOvAsm5nznM";
//User data URI REST enpoints
BASEGETUSERS = "https://prod-29.uksouth.logic.azure.com/workflows/fa28887cfa5641cc885c1bbad1242f68/triggers/manual/paths/invoke/rest/v1/users/";
TAILGETUSERS = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PlghKEq_L3CVmGwpcmopex68jFQoU5MFBQ7CkQOI22k";
BASEFOLLOWUSER = "https://prod-14.uksouth.logic.azure.com/workflows/8a5318f26a624c0f9b845a13996e94fc/triggers/manual/paths/invoke/rest/v1/users/";
TAILFOLLOWUSER = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=JDDrPtZGnm__DyXozy4LKOUtelqfhkvzKgzkTomO52g"
BLOB_ACCOUNT = "https://blobstorageuurm.blob.core.windows.net";



//Handlers for button clicks
$(document).ready(function() {

  //Run the get images list function



  //Handler for the new asset submission button
  $("#subNewForm").click(function () {

    //Execute the submit new asset function
    submitNewImage();

  });


  //Handler for the new asset submission button
  $("#deletephoto").click(function (id) {
    deletePhoto(id)
    //Execute the submit new asset function


  });

  $("#loginForm").click(function () {

    //Execute
    login();


  });

  getImages();
  getUsers();


});

/****************************************************
 *                 Images Functions                 *
 ****************************************************/

//A function to submit a new asset to the REST endpoint 
function submitNewImage(Userid) {

  UserID = localStorage.getItem('UserID');
  //Create a form data object
  submitData = new FormData

  //Get form variables and append them to the form data object
  submitData.append('fileName', $('#FileName').val());
  submitData.append('userID', localStorage.getItem('UserID'));
  submitData.append('userName', localStorage.getItem('Username'));
  submitData.append('File', $("#UpFile")[0].files[0]);

  //Post the form data to the endpoint, note the need to set the content type header
  $.ajax({
    url: BASECIA + UserID + TAILCIA,
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'POST',
    success: function (data) {

    }
  });
}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(id) {
  UserID = localStorage.getItem('UserID');
  //Replace the current HTML in that div with a loading message
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only">' +
      '&nbsp;</span>');

  $.getJSON(BASERAI + UserID + TAILRAI, function (data) {

    //Create an array to hold all the retrieved assets
    var items = [];

    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each(data, function (key, val) {
      items.push("<hr />");
      items.push("<img alt='uploadedimages' src='" + BLOB_ACCOUNT + val["filepath"] + "' width='400'/> <br />");
      items.push("File: " + val["fileName"] + "<br />");
      items.push("Uploaded by: " + val["userName"] + " (user id: " + val["UserID"] + ")<br />");
      items.push("<hr />");
      items.push('<button type="button" id="editPhoto" class="btn btn-dark" onclick="myFunction()">Edit</button <br/>')
      items.push('<button type="button" id="deletephoto" class="btn btn-danger" onclick="deletePhoto(\''+ val["id"]+'\')">Delete</button><br/><br/>');
      items.push('<div id="myDIV"><p>Update Image</p>')
      items.push('<form style="font-size: 10pt;" id="newUpdateForm">')
      items.push('<div class="mb-3"> <label for="FileName" class="form-label">File Name</label><input type="text" class="form-control" id="FileName"></div>');
      items.push('<div class="mb-3"><label For="File" class="form-label">File to Upload</label><input type="file" class="form-control" id="File"></div>');
      items.push('<button type="button" onclick="editImageDetails(\''+ val["id"]+'\')" class="btn btn-primary">Submit</button> <br/><br/> </form></div>')

    });
    //Clear the assetlist div
    $('#ImageList').empty();
    //Append the contents of the items array to the ImageList Div
    $("<ul/>", {
      "class": "my-new-list",
      html: items.join("")
    }).appendTo("#ImageList");
  });
}

// A function for editing Image details
function editImageDetails(id){

  //form object
  submitData = new FormData

  //Get form variables and append them to the form data object
  submitData.append('fileName', $('#FileName').val());
  submitData.append('File', $("#File")[0].files[0]);

  //Update form data to the endpoint
  $.ajax({
    type: "PUT",
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    //Note the need to concatenate the ID
    url: BASEUIA + id + TAILUIA,
  }).done(function( msg ) {
    //On success, update the imagelist.
    getImages();
  });
}

  function deletePhoto(id){
    $.ajax({
      type: "DELETE",
    //Note the need to concatenate the ID
      url: BASEDAI + id + TAILDAI,
    }).done(function( msg ) {
    //On success, update the imagelist.
      getImages();
    });
  }

// Hiding/showing form
let isShow = false;
function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

/****************************************************
 *           Login/Registration System              *
 ****************************************************/

//A function to Create a user to the user
function postUser() {

  //Create a form data object
  submitData = new FormData

  //Get form variables and append them to the form data object
  submitData.append('FirstName', $('#firstName').val());
  submitData.append('LastName', $('#surname').val());
  submitData.append('Username', $('#username').val());
  submitData.append('Password', $("#password").val());

  //Post the form data to the endpoint, note the need to set the content type header
  $.ajax({
    url: CREATEUSERS,
    data: submitData,
    cache: false,
    enctype: 'application/x-www-form-urlencoded',
    contentType: false,
    processData: false,
    type: 'POST',
    success: function (data) {

    }
  });
}
$("#logoutbtn").click(function(){

  //Execute the submit new asset function
  logout();

});

function logout(){
  localStorage.removeItem('UserID');
  localStorage.removeItem('Username');
}

//Handler for the adding users to DB
$("#registrationForm").click(function(){

  //Execute the submit new asset function
  postUser();

});

// login to the system
function login() {

  //Get form variables and append them to the form data object
  username = ('Username', $('#username').val());
  password = ('Password', $('#password').val());

  //Update form data to the endpoint
  $.ajax({
    url: BASELOGINUSER + username + '/' + password + TAILLOGINUSER,
    type: 'GET',
    success: function (data) {
      localStorage.setItem('UserID', JSON.stringify(data['Table1'][0]['UserID']));
      localStorage.setItem('Username', JSON.stringify(data['Table1'][0]['Username']));
    }
  });
}

// Allows users to follow eachother
function followUser(followID){
  userID = localStorage.getItem('UserID');

  $.ajax({
    type: "POST",
    //Note the need to concatenate the ID
    url: BASEFOLLOWUSER + userID + '/' + followID + TAILFOLLOWUSER,
  }).done(function( msg ) {
    //On success, update the imagelist.

  });

}

// Gets a Userlist
function getUsers(userID) {
  userID = localStorage.getItem('UserID');
  //Replace the current HTML in that div with a loading message
  $('#getUsers').html('<div class="spinner-border" role="status"><span class="sr-only">' +
      '&nbsp;</span>');

  $.getJSON(BASEGETUSERS + userID + TAILGETUSERS, function (data) {

    //Create an array to hold all the retrieved assets
    var items = [];

    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each(data, function (key, val) {
      items.push("<hr />");
      items.push("Username: " + val["Username"] + " (user id: " + val["UserID"] + ")<br />");
      items.push('<button type="button" onclick="followUser(\''+ val["UserID"]+'\')" class="btn btn-primary">Follow</button> <br/><br/> </form></div>')
      items.push("<hr />")
    })

    //Update form data to the endpoint
    $.ajax({
      type: "GET",
      //Note the need to concatenate the ID
      url: BASEGETUSERS + userID + TAILUIA,
    }).done(function( msg ) {
      //On success, update the imagelist.
      getUsers();
    });

    //Clear the assetlist div
    $('#getUsers').empty();
    //Append the contents of the items array to the ImageList Div
    $("<ul/>", {
      "class": "my-new-list",
      html: items.join("")
    }).appendTo("#getUsers");
  });

}
