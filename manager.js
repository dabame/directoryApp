/***********************************************************
* Hidden interface for managing the directory
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
	var row = document.getElementById('table').rows[i+1];
	var numRows = document.getElementById('table').rows.length-1;
	var lastRow = document.getElementById('table').rows[numRows];

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
	
	hideButtons();
}

// delete make pri_key an input
function deleteIt(i){
	var row = document.getElementById('table').rows[i+1];
	row.cells[4].innerHTML = "<input type = 'hidden' name = 'pri_key' value = '"+row.cells[4].innerHTML+"'/>";
}

// disables other buttons while editing
function hideButtons(){
	var buttonsToHide = document.getElementsByClassName('togglee');
	for (i=0; i < buttonsToHide.length;i++){
		buttonsToHide[i].style.visibility = "hidden";
	}
}
	


	
