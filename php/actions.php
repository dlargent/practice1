<?php

// These are my login credentials for the database.
$servername = "localhost";
$username = "mydb";
$password = "mydb";
$dbname = "mydb";

// Create connection.
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection.
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


// What do you want me to do today?
$action = $_GET['action'];



// Let me do one of the following things based on $action.
switch ($action) {

    // Create a new row in my database containing a new label.
    // Return the id of the database row just created.
    case 'createLabel':
        $label = $_GET['label'];
        $sql = "INSERT INTO labels(label) VALUES ('".$label."')";
        if ($conn->query($sql) === TRUE) {
            $id = $conn->insert_id;
            echo json_encode($id);
        } 
        break;
        
        
        
    // Read my database and return the data.
    case 'getLabels':
        $sql = "SELECT id, label FROM labels";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            // Build an array and echo it as JSON.
            $rows = array();
            while($r = mysqli_fetch_assoc($result)) {
                $rows[] = $r;
            }
            echo json_encode($rows);
        } else {
            echo "0 results";
        }
        break;
        
        

    // Get a unique row from the database identified by its id.
    case 'getLabel':
        $id = $_GET['id'];
        $sql = "SELECT label FROM labels WHERE id=".$id;
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            // Build an array and echo it as JSON.
            $row = mysqli_fetch_assoc($result);
            echo json_encode($row['label']);
        } else {
            echo "0 results";
        }
        break;
        
        
        
    // Update the label field in a row identified by the row id.
    case 'updateLabel':
        $id = $_GET['id'];
        $label = $_GET['label'];
        $sql = "UPDATE labels SET label='".$label."' WHERE id=".$id;
        $result = $conn->query($sql);
        break;
        
        
        
    // Delete a row from the database based on the id of the row.
    case 'deleteLabel':
        $id = $_GET['id'];
        $sql = "DELETE FROM labels WHERE id=".$id;
        $result = $conn->query($sql);
        break;
}

$conn->close();
?>
