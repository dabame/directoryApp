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
			<table id ="table">
				<tr>
					<td rowspan ="100%" id ="tableNav">
						Search<br/>
						<form id="search" action="index.php" method="post">
							<select id = "searchMenu" name = "searchMenu">
								<option value="lastName">Last Name</option>
								<option value="firstName">First Name</option>
								<option value="dob">Date of Birth</option>
								<option value="zip">Zip Code</option>
							</select><br/>
							<input type ="text" name ="searchValue" size = "11"/>
						</form>
						<input type ="button" id ="manage"class ="toggler" value ="Manage..."
							onclick="manage();"/>
					</td>
					<td>Last Name</td>
					<td>First Name</td>
					<td>Date of Birth</td>
					<td>Zip Code</td>
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
				if ( empty($_POST))
					$sql = "SELECT * FROM persons";
				elseif (count($_POST) == 4){
					$sql = "INSERT INTO 'persons' ('pri-key', 'lastName', 'firstName', 'dob', 'zip') VALUES ('NULL', '$_POST[lastName]', '$_POST[firstName]', '$_POST[dob]', '$_POST[zip]');";
					$conn->query($sql);
					$sql = "SELECT * FROM persons";
				}
				elseif ($_POST["searchValue"] == ""){
					$sql = "SELECT * FROM persons";
				}
				else{
					$sql = "SELECT * FROM persons WHERE ".$_POST['searchMenu']."='". $_POST['searchValue']."'" ; 
				}

				
				$result = $conn->query($sql);

				if ($result->num_rows > 0){
					//output data of each row
					while ($row = $result->fetch_assoc()){
						echo "<tr><td>".$row["lastName"]."</td><td>".$row["firstName"].
							"</td><td>".$row["dob"]."</td><td>".$row["zip"]."</td>".
							"</td><td><input type = 'button' class = 'togglee' value = 'edit' onclick = 'editMode();'</td>".
							"</td><td><input type = 'button' class = 'togglee' value = 'delete' onclick = 'deleteEntry();'</td></tr>";
					}
				}
				$conn->close();
				
				?>
				<tr class ="togglee">
					<form id ="newRecord" action ="index.php" method="post">
						<td><input type ="text" name ="lastName" size = "11" value ="new..."/></td>
						<td><input type ="text" name ="firstName" size = "11"/></td>
						<td><input type ="text" name ="dob" size = "11"/></td>
						<td><input type ="text" name ="zip" size = "11"/></td>
						<td><input type ="submit" value ="submit"/>
					</form>
					<td><input type ="button" onclick ="resetRow();" value ="clear"/></td>
				</tr>
					
			</table>
		</div>
	</body>
</html>
		
