/***********************************************************
* Main script for directoryApp
* Author: Daniel dbm0100@yahoo.com
************************************************************/
// clears the row of data
function resetRow(){
	var numRows = document.getElementById('table').rows.length-1;
	var row = document.getElementById('table').rows[numRows];
	row.cells[0].innerHTML = '<input type ="text" name ="lastName" size = "11" value = "new..."/>';
	row.cells[1].innerHTML = '<input type ="text" name ="firstName" size = "11"/>';
	row.cells[2].innerHTML = '<input type ="text" name ="dob" size = "11"/>';
	row.cells[3].innerHTML = '<input type ="text" name ="zip" size = "11"/>';
}

// edit button changes table fields to editable fields
function edit(i){
	var row = document.getElementById('innerTable').rows[i];
	var numRows = document.getElementById('table').rows.length-1;
	var lastRow = document.getElementById('newTable').rows[0];

	row.style.color = "red";
	lastRow.cells[0].innerHTML = "<input type ='text' name ='lastName' size = '8' value = '"+row.cells[0].innerHTML+"'/>";
	lastRow.cells[1].innerHTML = "<input type ='text' name ='firstName' size = '8' value = '"+row.cells[1].innerHTML+"'/>";
	lastRow.cells[2].innerHTML = "<input type ='text' name ='dob' size = '9' value = '"+row.cells[2].innerHTML+"'/>";
	lastRow.cells[3].innerHTML = "<input type ='text' name ='zip' size = '5' value = '"+row.cells[3].innerHTML+"'/>";
	lastRow.cells[4].innerHTML = "<input type = 'hidden' name = 'pri_key' value = '"+row.cells[4].innerHTML+"'/>";
	lastRow.cells[5].innerHTML = "<button type = 'submit' class = 'togglee2' name = 'update'>save</button>";
	lastRow.cells[6].innerHTML = "<button type = 'submit' class = 'togglee2' name = 'discard'>discard</button>";

	var curText = [];
	for (j = 0; j < 4; j++){
		curText[j] = row.cells[j].innerHTML;
	}
	

	hideButtons();
}

// Inserts the row and input fields for new record form
function newRecord(){
	var numRows = document.getElementById('table').rows.length-1;
	var row = document.getElementById('newTable').rows[0];
		
	row.cells[0].innerHTML = "<input type ='text' name ='lastName' size = '12'/>";
	row.cells[1].innerHTML = "<input type ='text' name ='firstName' size = '12'/>";
	row.cells[2].innerHTML = "<input type ='text' name ='dob' size = '12'/>";
	row.cells[3].innerHTML = "<input type ='text' name ='zip' size = '12'/>";
	row.cells[4].innerHTML = "";
	row.cells[5].innerHTML = "<button type = 'submit' class = 'togglee2' name = 'insert'>save</button>";
	row.cells[6].innerHTML = "<button type = 'submit' class = 'togglee2' name = 'discard'>discard</button>";
	
	hideButtons();
}

// delete make pri_key an input
function deleteIt(i){
	var row = document.getElementById('innerTable').rows[i];
	row.cells[4].innerHTML = "<input type = 'hidden' name = 'pri_key' value = '"+row.cells[4].innerHTML+"'/>";
}

// disables other buttons while editing
function hideButtons(){
	var buttonsToHide = document.getElementsByClassName('togglee');
	for (i=0; i < buttonsToHide.length;i++){
		buttonsToHide[i].style.visibility = "hidden";
	}
}

// checks form for valid input
function validateForm(){
	var input = document.forms["personsForm"];
	valid = true;
	if (input["lastName"]){
		if (input["lastName"].value === "" || input["lastName"].value === "*")
		{
			var lastName = document.getElementsByName("lastName")[0];
			lastName.value = "*";
			lastName.style.color = "red";
			valid = false;
		}
		if (input["firstName"].value === "" || input["firstName"].value === "*")
		{
			var lastName = document.getElementsByName("firstName")[0];
			lastName.value = "*";
			lastName.style.color = "red";
			valid = false;
		}
		
		if (valid === false){
			//		document.body.innerHTML += "* indicates missing or invalid field";
		}

		if (!dateIsValid(input["dob"].value)){
			var dob = document.getElementsByName("dob")[0];
			dob.value = "yyyy-mm-dd";
			dob.style.color = "red";
			valid = false;
		}
		if (!(/^\d{5}$/.test(input["zip"].value))){
			var zip = document.getElementsByName("zip")[0];
			zip.value = "XXXXX";
			zip.style.color = "red";
			valid = false;
		}

		return valid;
	}
	return true;
}

// checks that date provided is valid date return true if valid, false if not
function dateIsValid(date){
	var bits = date.split('-');
	var d = new Date(bits[0], bits[1] - 1, bits[2]);
	return d && (d.getMonth() + 1) == bits[1] && d.getDate() == Number(bits[2]);
}

// show record requested in search bar using AJAX
function showRecord(){
	var criteria = document.getElementById("searchMenu").value;
	var value = document.getElementById("searchValue").value;

	if (value === "")
	{
		document.getElementById("searchResults").innerHTML = "";
	}
	else
	{
		xmlhttp = new XMLHttpRequest()
		xmlhttp.onreadystatechange = function()
		{
			if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
			{
				document.getElementById("searchResults").innerHTML = xmlhttp.responseText;
			}
		};
		xmlhttp.open("GET","getRecord.php?searchMenu="+criteria+"&searchValue="+value, true);
		xmlhttp.send();
	}
	return false;
}
	


	
