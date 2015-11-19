<!-- Directory Application
	 Author: Daniel dbm0100@yahoo.com
	 A basic directory application with
	 create, read, update, delete functionality-->

<!DOCTYPE html>
<html lang ="en">
	<head>
		<meta charset="utf-8"/>
		<title>Directory Application</title>
		<link rel ="stylesheet" type="text/css" href ="style.css"/>
		<script language ="javascript" type ="text/javascript" src ="manager.js"></script>
	</head>
	<body>
		<div id ="wrapper">
			<h1>Directory Listings</h1>
			<form action ="index.php" method ="post">
				Search
				<select id = "searchMenu" name = "searchMenu">
					<option value="lastName">Last Name</option>
					<option value="firstName">First Name</option>
					<option value="dob">Date of Birth</option>
					<option value="zip">Zip Code</option>
				</select>
				<input type ="text" name ="searchValue" size = "11"/>
			</form><br/>
			<form action ="index.php" method ="post" >
				<table id ="table">
					<tr>
						<td>Last Name</td>
						<td>First Name</td>
						<td>Date of Birth</td>
						<td>Zip Code</td>
						<td class ="pri_key"></td>
						<td></td>
						<td></td>
					</tr>
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

// empty search
elseif ($_POST["searchValue"] == ""){
	$sql = "SELECT * FROM persons";
}
// search table
else{
	$sql = "SELECT * FROM persons WHERE ".$_POST['searchMenu']."='". $_POST['searchValue']."'" ; 
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
					<tr class ="inputRow">
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td class ="pri_key"></td>
						<td><input type ="button" value ="new" onclick ="newRecord(<?php echo $result->num_rows ?>);"/></td>
						<td></td>
					</tr>
				</table>
			</form>
		</div>
	</body>
</html>

