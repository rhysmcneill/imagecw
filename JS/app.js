//The URIs of the REST endpoint
CIA = "https://imageioapi.azurewebsites.net:443/api/CIA/triggers/manual/invoke?api-version=2020-05-01-preview&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UvwRJ-mAkCevVShjX__QeIjgoEeEbpYRcBRubDcZ4kQ";
RAI = "https://imageioapi.azurewebsites.net:443/api/RAI/triggers/manual/invoke?api-version=2020-05-01-preview&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=663tCA1ZtDLnzbN6NiBToJiHkjisrf1V1Ueav1Dsh6E";
BASEDAI = "https://imageioapi.azurewebsites.net/api/DIA/triggers/manual/invoke/rest/v1/images/";
TAILDAI = "?api-version=2020-05-01-preview&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=R_9eueML1FKwCgNQM5H5mihDn2GBWjIsv8gGJi2cm1Q";
BASEUIA = "https://imageioapi.azurewebsites.net/api/UIA/triggers/manual/invoke/rest/v1/images/";
TAILUIA = "?api-version=2020-05-01-preview&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=YbV8obECiWPxIFQz4vhS1p5zz5DHMb4zcxMuUekQtzM";
CREATEUSERS = "https://imageioapi.azurewebsites.net:443/api/CreateUsers/triggers/manual/invoke?api-version=2020-05-01-preview&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wQ2zfM90bcrcps95uCIxlRPxFmAPf3ATu41DTnIfUNw";
LOGINUSER = "https://imageioapi.azurewebsites.net:443/api/LoginUser/triggers/manual/invoke?api-version=2020-05-01-preview&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=sFsBWcPG6zMrqzXobkfbVmNQnhJFXOoDIFtiQr9ZtfE"
BLOB_ACCOUNT = "https://blobstorageuurm.blob.core.windows.net";



//Handlers for button clicks
$(document).ready(function() {

      //Run the get images list function
  getImages();


   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewImage();
    
  });


  //Handler for the updating image details submission button
  $("#updateForm").click(function(editid){

    //Execute the submit new asset function
    editImageDetails(editid);

  });

  //Handler for the new asset submission button
  $("#deletephoto").click(function(id){
      deletePhoto(id)
    //Execute the submit new asset function


  });
});

/****************************************************
 *                 Posting images                   *
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
  submitData.append('firstName', $('#firstName').val());
  submitData.append('surname', $('#surname').val());
  submitData.append('username', $('#username').val());
  submitData.append('password', $("#password").val());

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

//Handler for the adding users to DB
$("#regForm").click(function(){

  //Execute the submit new asset function
  postUser();

});

// login to the system
function login(id){
  //form object
  submitData = new FormData

  //Get form variables and append them to the form data object
  submitData.append('username', $('#username').val());
  submitData.append('password', $('#password').val());

  //Update form data to the endpoint
  $.ajax({
    url: LOGINUSER,
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'GET',
    success: function (data) {
    }
  });
}

$("#loginForm").click(function(){

  //Execute
  login();

});

