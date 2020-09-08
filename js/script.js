// Perform initialization for the web page:
//      Load the table
//      Make the button functional
document.addEventListener("DOMContentLoaded", function () {
    initializeTable();
    var btn1 = document.querySelector("#btn1");
    btn1.addEventListener("click", function () {
        var label = document.querySelector("#newLabel").value;
        createLabel(label);
    });
});

// Read data into the table.
function initializeTable() {
    $.get("php/actions.php?action=getLabels", function (data, status) {
        var labelsObj = JSON.parse(data);
        labelsObj.forEach((item) => {
            Object.entries(item).forEach(([key, val]) => {
                if (key == "id") {
                    id = val;
                }
                if (key == "label") {
                    addTableRow(id, val);
                }
            });
        });
    });
}

// Add a new label to the database and to the table.
function createLabel(label) {
    $.get("php/actions.php?action=createLabel&label=" + label, function (data, status) {
        var id = JSON.parse(data);
        addTableRow(id, label);
    });
}

// Add a row to the table.
function addTableRow(id, label) {
    var tbody = document.querySelector("#mylist");
    var tr = document.createElement("tr");
    
    // The id of each table row matches the id
    // of that label within the database.
    tr.setAttribute("id", id);
    
    // Add the delete column
    var td = document.createElement("td");
    var a = document.createElement("a");
    a.innerHTML = "[Delete]";
    // If delete button is clicked, delete this label from the 
    // database and remove the row.
    a.href = "javascript: $.get('php/actions.php?action=deleteLabel&id=" + id + "', function (data, status) {});";
    a.addEventListener("click", () => {
        tr.parentNode.removeChild(tr);
    });
    td.appendChild(a);
    tr.appendChild(td);
    
    // Add the label column content.
    var td = document.createElement("td");
    tr.appendChild(td);
    td.innerHTML = label;
    
    // Add the edit column
    var td = document.createElement("td");
    var a = document.createElement("a");
    a.innerHTML = "[Edit]";
    a.href = "javascript:editRow(" + id + ")";
    td.appendChild(a);
    tr.appendChild(td);
    tbody.appendChild(tr);
}


// Pop up a window to allow the user to edit a label value.
//      This function creates the window.  When the user clicks
//      the submit button, function editRow2 removes the edit
//      window and finishes up.
function editRow(id) {
    // Get the old value.
    var oldLabel = document.getElementById(id).childNodes[1].innerHTML;
    
    // Begin to build a div.
    var editDiv = document.createElement("div");
    editDiv.id = "edit-window";

    var editTitle = document.createElement("h3");
    editTitle.innerHTML = "Please edit the label and hit submit.";

    var editForm = document.createElement("form");
    editForm.id = "editForm";

    var editLabel = document.createElement("label");
    editLabel.for = "editLabel";
    editLabel.innerHTML = "Label:";
    
    // Create input field and set default value to the
    // old label value.
    var editInputText3 = document.createElement("input");
    editInputText3.type = "text";
    editInputText3.id = "editedLabel";
    editInputText3.value = oldLabel;

    var editInputText4 = document.createElement("input");
    editInputText4.type = "button";
    editInputText4.value = "Submit";
    editInputText4.id = "submitButton";
    
    // Construct the div and display it.
    editDiv.appendChild(editTitle);
    editForm.appendChild(editLabel);
    editForm.appendChild(editInputText3);
    editForm.appendChild(editInputText4);
    editDiv.appendChild(editForm);
    document.body.appendChild(editDiv);

    // Make the 'submit' button functional.
    document.getElementById("submitButton").onclick = function () {
        editRow2(id, document.getElementById('editedLabel').value)
    };
}

function editRow2(id, newLabelValue) {
    $.get("php/actions.php?action=updateLabel&id=" + id + "&label=" + newLabelValue, function (data, status) {});
    var editWindow = document.querySelector('#edit-window');
    editWindow.parentNode.removeChild(editWindow);
    document.getElementById(id).childNodes[1].innerHTML = newLabelValue;
}
