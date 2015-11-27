<!-- Directory Application
	 Author: Daniel dbm0100@yahoo.com
	 A basic directory application with
	 create, read, update, delete functionality
	 Version 0.1 completed 11-27.
	 Hope to revisit this and improve UI and
	 implement more AJAX!-->

<!DOCTYPE html>
<html lang ="en">
	<head>
		<meta charset="utf-8"/>
		<title>Directory Application</title>
		<link rel ="stylesheet" type="text/css" href ="style.css"/>
		<script language ="javascript" type ="text/javascript" src ="script.js"></script>
	</head>
	<body>
		<div id ="wrapper">
			<h1>Persons Listings</h1>
			<h3>Fictional information only please</h3>
			<!-- A search menu for searching the records -->
			<form name = "search" onsubmit ="return showRecord();">
				<input type ="button" onclick ="showRecord()" value ="Search"/>
				<select id = "searchMenu" name = "searchMenu">
					<option value="lastName">Last Name</option>
					<option value="firstName">First Name</option>
					<option value="dob">Date of Birth</option>
					<option value="zip">Zip Code</option>
				</select>
				<input type ="text" id = "searchValue" name ="searchValue" size = "11"/>
			</form><br/>

			<!-- Here's where our search results will end up -->
			<div id ="searchResults"></div>

			<!-- This form is used for editing, deleting, adding records to the databse -->
 			<form name ="personsForm"action ="index.php" method ="post" onsubmit="return validateForm();" >
				<table id ="table">
					<tr>
						<td>
							<table id="tableHead">
								<tr>
									<th>Last Name</th>
									<th>First Name</th>
									<th>Date of Birth</th>
									<th>Zip Code</th>
									<th class ="pri_key"></th>
									<th></th>
									<th></th>
									<th></th>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<div id ="scrollingTable">
								<table id ="innerTable">
<?php 
// set variables used for $conn
require_once('dbInfo.php');

// Create Connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check Connection
if ($conn->connect_error) {
	die ("Connection failed: " . $conn->connect_error);
}

// This if statement handles different cases for contents of POST
if ( empty($_POST))
	$sql = "SELECT * FROM persons";

// Submit button case Inserts new record before display
elseif ($_POST["insert"] ===""){
	$sql = "INSERT INTO persons (lastName, firstName, dob, zip) VALUES ('".$_POST[lastName]."', '".$_POST[firstName]."', '".$_POST[dob]."', '".$_POST[zip]."');";
	$conn->query($sql);
	$sql = "SELECT * FROM persons";
}

// Delete button cases, deletes record before display
elseif ($_POST["delete"] ===""){
	$sql = "DELETE FROM persons WHERE pri_key='".$_POST["pri_key"]."'";
	$conn->query($sql);
	$sql = "SELECT * FROM persons";
}

// Update button case, updates record
elseif ($_POST["update"] ===""){
	$sql = "UPDATE persons SET lastName = '".$_POST["lastName"]."', firstName = '".$_POST["firstName"]."', dob = '".$_POST["dob"]."', zip = '".$_POST["zip"]."' WHERE persons.pri_key = ".$_POST["pri_key"];
	$conn->query($sql);
	echo $conn->error;
	$sql = "SELECT * FROM persons";
}

$result = $conn->query($sql);

if ($result->num_rows > 0){
	//output data of each row
	$i=0;
	while ($row = $result->fetch_assoc()){
		echo "<tr><td>".$row["lastName"]."</td><td>".$row["firstName"].
			"</td><td>".$row["dob"]."</td><td>".$row["zip"].
			"\n</td><td class = 'pri_key'>".$row["pri_key"]."</td>".
			"<td class = 'buttonField'><input type = 'button' class = 'togglee' onclick='edit(".$i.");' value = 'edit'/></td>\n".
			"<td class = 'buttonField'><button type = 'submit' class = 'togglee' name = 'delete' onclick = 'deleteIt(".$i.");'>delete</button></td></tr>\n";
		$i++;
	}
}
$conn->close();

?>
								</table>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<!-- this table used for creating a new record -->
							<table id="newTable">
								<tr class ="inputRow">
									<th><input type ="button" value ="new" onclick ="newRecord();"/></th>
									<th></th>
									<th></th>
									<th></th>
									<th class ="pri_key"> </th>
									<th></th>
									<th></th>
									<th></th>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</form>
		</div>
	</body>
</html>

