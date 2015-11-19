/***********************************************************
* Hidden interface for managing the directory
* Author: Daniel dbm0100@yahoo.com
************************************************************/
// displays buttons and fields for managing table
function manage(){
	// show edit and delete buttons
	var buttons = document.getElementsByClassName('togglee');
	for (i = 0; i < buttons.length; i++){
		buttons[i].style.visibility = 'visible';
	}
	var otherButtons = document.getElementsByClassName('togglee2');
	for (i = 0; i < otherButtons.length; i++){
		otherButtons[i].style.visibility = 'visible';
	}

	// change manage button
	document.getElementById("manage").value = "Done";
	document.getElementById("manage").onclick = doneManage;
}

// hides buttons and fields for managing table
function doneManage(){
	// change done button back to manage
	document.getElementById("manage").value = "Manage...";
	document.getElementById("manage").onclick = manage;

	// hide the edit, delete, save, discard buttons
	var buttons = document.getElementsByClassName('togglee');
	for (i = 0; i < buttons.length; i++){
		buttons[i].style.visibility = 'hidden';
	}
	var otherButtons = document.getElementsByClassName('togglee2');
	for (i = 0; i < otherButtons.length; i++){
		otherButtons[i].style.visibility = 'hidden';
	}

	var row = document.getElementById('table').rows[document.getElementById('table').rows.length-1];
	for (i = 0; i < 5; i++){
		row.cells[i].innerHTML = "";
	}
	row.cells[5].innerHTML = '<input type ="button" value ="new" onclick ="newRecord();"/>';
	row.cells[6].innerHTML = "";

}

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
	var row = document.getElementById('table').rows[i+1];
		
	row.cells[0].innerHTML = "<input type ='text' name ='lastName' size = '8' value = '"+row.cells[0].innerHTML+"'/>";
	row.cells[1].innerHTML = "<input type ='text' name ='firstName' size = '8' value = '"+row.cells[1].innerHTML+"'/>";
	row.cells[2].innerHTML = "<input type ='text' name ='dob' size = '9' value = '"+row.cells[2].innerHTML+"'/>";
	row.cells[3].innerHTML = "<input type ='text' name ='zip' size = '5' value = '"+row.cells[3].innerHTML+"'/>";
	row.cells[4].innerHTML = "<input type = 'hidden' name = 'pri_key' value = '"+row.cells[4].innerHTML+"'/>";
	row.cells[5].innerHTML = "<button type = 'submit' class = 'togglee2' name = 'update'>save</button>";
	row.cells[6].innerHTML = "<button type = 'submit' class = 'togglee2' name = 'discard'>discard</button>";

	var curText = [];
	for (j = 0; j < 4; j++){
		curText[j] = row.cells[j].innerHTML;
	}
	

	hideButtons(i+1);
}

function newRecord(curRow){
	var numRows = document.getElementById('table').rows.length-1;
	var row = document.getElementById('table').rows[numRows];
		
	row.innerHTML = "<form action = 'index.php' method = 'post'>" + row.innerHTML + "</form>";
	row.cells[0].innerHTML = "<input type ='text' name ='lastName' size = '8' value = '"+row.cells[0].innerHTML+"'/>";
	row.cells[1].innerHTML = "<input type ='text' name ='firstName' size = '8' value = '"+row.cells[1].innerHTML+"'/>";
	row.cells[2].innerHTML = "<input type ='text' name ='dob' size = '9' value = '"+row.cells[2].innerHTML+"'/>";
	row.cells[3].innerHTML = "<input type ='text' name ='zip' size = '5' value = '"+row.cells[3].innerHTML+"'/>";
	row.cells[4].innerHTML = "";
	row.cells[5].innerHTML = "<button type = 'submit' class = 'togglee2' name = 'insert'>save</button>";
	row.cells[6].innerHTML = "<button type = 'submit' class = 'togglee2' name = 'discard'>discard</button>";
	var curText = [];
	for (j = 0; j < 4; j++){
		curText[j] = row.cells[j].innerHTML;
	}

	var buttons = document.getElementsByClassName('togglee');
	for (i = 0; i < buttons.length; i++){
		buttons[i].style.visibility = 'visible';
	}
}

// delete make pri_key an input
function deleteIt(i){
	var row = document.getElementById('table').rows[i+1];
	row.cells[4].innerHTML = "<input type = 'hidden' name = 'pri_key' value = '"+row.cells[4].innerHTML+"'/>";
}

// disables other buttons while editing curRow
function hideButtons(curRow){
/*	var rows = document.getElementById("table").rows;
	for (i = 0; i < curRow; i++){
		rows[i].cells[5].style.visibility = "hidden";
		rows[i].cells[6].innerHTML = "";
	}
	for (i = curRow+1; i < rows.length; i++){
		rows[i].cells[5].innerHTML = "";
		rows[i].cells[6].innerHTML = "";
		}*/
}
	


	
