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

	// change manage button
	document.getElementById("manage").value = "Done";
	document.getElementById("manage").onclick = doneManage;
}

// hides buttons and fields for managing table
function doneManage(){
	// change done button back to manage
	document.getElementById("manage").value = "Manage...";
	document.getElementById("manage").onclick = manage;

	// hide the edit and delete buttons
	var buttons = document.getElementsByClassName('togglee');
	for (i = 0; i < buttons.length; i++){
		buttons[i].style.visibility = 'hidden';
	}
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

// submits new record to database
function submitRow(){
	
}
	
