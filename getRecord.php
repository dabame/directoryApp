<!-- getRecord.php AUTHOR: Daniel dbm0100@yahoo.com
	 fetches record matching search Value and sends response
	 back, intended use with AJAX!
   -->

<!DOCTYPE html>
<html lang = "en">
	<head>
		<meta charset="utf-8"/>
		<title>Directory Application</title>
		<link rel ="stylesheet" type="text/css" href ="style.css"/>
		<script language ="javascript" type ="text/javascript" src ="script.js"></script>
	</head>
	<body>
		<?php
		$criteria = $_GET["searchMenu"];
		$value = $_GET["searchValue"];
		require_once('dbInfo.php');

		// get our connection to msql server
		$conn = new mysqli($servername, $username, $password, $dbname);
		if (!$conn)
		{
			die ("Could not connect: " . mysqli_error($conn));
		}
		echo ("<table>");
		
		// sql query the database
		$sql = "SELECT * FROM persons WHERE ".$criteria."='". $value."'" ;
		$result = $conn->query($sql);

		// display results if any, otherwise display no results
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
		else
		{
			echo "<tr><td>No Results</td></tr>";
		}
		
		echo "</table>";
		$conn->close();
		?>
	</body>
</html>
