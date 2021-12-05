//The URIs of the REST endpoint of images
CIA = "https://prod-24.northcentralus.logic.azure.com:443/workflows/a6b3322bf0f04a0fb5fdd38d1f7f5ba3/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=gclQqp8Z1TmkG7ACcSC_ZAUrxJC7TsZHNUcGCBrl-u8";
RAI = "https://prod-27.northcentralus.logic.azure.com:443/workflows/5e73a6cc7ead4e7b85104dac8732bb9a/versions/08585628849145846886/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Fversions%2F08585628849145846886%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MyvgI4h7tGZgBw3iEhwCZ3w7tptjr812sdA9O2hM9Hg";
BASEDAI = "https://prod-14.ukwest.logic.azure.com/workflows/7cabc07c991743ea9ccaadcde756de11/triggers/manual/paths/invoke/rest/v1/images/";
TAILDAI = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZndfDtiW-jMt-ETcvshI5sL9qVmVoJNL6UGukz3yJ-M";
BASEUIA = "https://prod-02.uksouth.logic.azure.com/workflows/b50fd994bee14ee3b74a45ec5ed5564e/triggers/manual/paths/invoke/rest/v1/images/";
TAILUIA = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=KeZ8K1JgHlEjqu26LhPEM8HT2yBhLr-NQ5CafynOf_8";
//The URIs of REST endpoints for Reg/Login
CREATEUSERS = "https://prod-14.uksouth.logic.azure.com:443/workflows/eeaaeb70a6d0416eb7f6414d14ea520c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=jfY48aqF8fa2w3jItKTgdIzOfktv2r9J0jIGgXPkFL8";
BASELOGINUSER = "https://prod-14.uksouth.logic.azure.com/workflows/c636c76322694414ae077da8b8606f75/triggers/manual/paths/invoke/rest/v1/login/";
TAILLOGINUSER = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Y7YbnrreOySo4MqXYL3K470njVEAHqySIOvAsm5nznM";
//User data URI REST enpoints
GETUSERS = "https://prod-29.uksouth.logic.azure.com:443/workflows/fa28887cfa5641cc885c1bbad1242f68/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PlghKEq_L3CVmGwpcmopex68jFQoU5MFBQ7CkQOI22k";
BLOB_ACCOUNT = "https://blobstorageuurm.blob.core.windows.net";



//Handlers for button clicks
$(document).ready(function() {

  //Run the get images list function
  getImages();


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

});

/****************************************************
 *                 Images Functions                 *
 ****************************************************/

//A function to submit a new asset to the REST endpoint 
function submitNewImage() {

  //Create a form data object
  submitData = new FormData

  //Get form variables and append them to the form data object
  submitData.append('fileName', $('#FileName').val());
  submitData.append('userID', $('#userID').val());
  submitData.append('userName', $('#userName').val());
  submitData.append('File', $("#UpFile")[0].files[0]);

  //Post the form data to the endpoint, note the need to set the content type header
  $.ajax({
    url: CIA,
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
function getImages() {

  //Replace the current HTML in that div with a loading message
  $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only">' +
      '&nbsp;</span>');

  $.getJSON(RAI, function (data) {

    //Create an array to hold all the retrieved assets
    var items = [];

    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each(data, function (key, val) {
      items.push("<hr />");
      items.push("<img alt='uploadedimages' src='" + BLOB_ACCOUNT + val["filepath"] + "' width='400'/> <br />");
      items.push("File: " + val["fileName"] + "<br />");
      items.push("Uploaded by: " + val["userName"] + " (user id: " + val["userID"] + ")<br />");
      items.push("<hr />");
      items.push('<button type="button" id="editPhoto" class="btn btn-dark" onclick="myFunction()">Edit</button <br/>')
      items.push('<button type="button" id="deletephoto" class="btn btn-danger" onclick="deletePhoto(\''+ val["id"]+'\')">Delete</button><br/><br/>');
      items.push('<div id="myDIV"><p>Update Image</p>')
      items.push('<form style="font-size: 10pt;" id="newUpdateForm">')
      items.push('<div class="mb-3"> <label for="FileName" class="form-label">File Name</label><input type="text" class="form-control" id="FileName"></div>');
      items.push('<div class="mb-3"><label for="userID" class="form-label">User Id</label><input type="string" class="form-control" id="userID"></div>')
      items.push('<div class="mb-3"><label for="userName" class="form-label">User Name</label><input type="text" class="form-control" id="userName"></div>')
      items.push('<div className="mb-3"><label htmlFor="UpFile" className="form-label">File to Upload</label><input type="file" className="form-control" id="UpFile"></div>');
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

// A function for editing Image details
function editImageDetails(editid){
  //form object
  submitData = new FormData

  //Get form variables and append them to the form data object
  submitData.append('fileName', $('#FileName').val());
  submitData.append('userID', $('#userID').val());
  submitData.append('userName', $('#userName').val());
  submitData.append('File', $("#UpFile")[0].files[0]);

  //Update form data to the endpoint
  $.ajax({
    type: "PUT",
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    //Note the need to concatenate the ID
    url: BASEUIA + editid + TAILUIA,
  }).done(function( msg ) {
    //On success, update the imagelist.
    getImages();
  });
}

//Handler for the updating image details submission button
$("#updateForm").click(function(editid){

  //Execute the submit new asset function
  editImageDetails(editid);

});

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

//Handler for the adding users to DB
$("#registrationForm").click(function(){

  //Execute the submit new asset function
  postUser();

});

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


// login to the system
function login() {

  //Get form variables and append them to the form data object
  username = ('Username', $('#Username').val());
  password = ('Password', $('#Password').val());

  //Update form data to the endpoint
  $.ajax({
    url: BASELOGINUSER + username + '/' + password + TAILLOGINUSER,
    type: 'GET',
    success: function (data) {
      localStorage.setItem('UserID', "84");
    }
  });
}

//!!!!!!!! FINISH !!!!!!!!!!//
function getUsers() {

  //Replace the current HTML in that div with a loading message
  $('#getUsers').html('<div class="spinner-border" role="status"><span class="sr-only">' +
      '&nbsp;</span>');

  $.getJSON(GETUSERS, function (data) {

    //Create an array to hold all the retrieved assets
    var items = [];

    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
    $.each(data, function (key, val) {
      items.push("<hr />");
      items.push("<img alt='uploadedimages' src='" + BLOB_ACCOUNT + val["filepath"] + "' width='400'/> <br />");

    })
  })
}
