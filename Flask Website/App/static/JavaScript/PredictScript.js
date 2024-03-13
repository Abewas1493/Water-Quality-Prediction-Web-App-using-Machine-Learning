function loadCSV() {
  // Create an input element of type 'file'
  var input = document.createElement("input");
  input.type = "file";

  // Set up an event listener for when the user selects a file
  input.addEventListener("change", function () {
    var file = input.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      // Parse the CSV content
      var csvContent = e.target.result;
      var lines = csvContent.split("\n");

      // Extract values from CSV and populate the form fields
      if (lines.length >= 1) {
        var values = lines[1].split(",");  // Use lines[0] to get values from the first row
        document.getElementsByName("ph")[0].value = parseFloat(values[0]).toFixed(9);
        document.getElementsByName("Hardness")[0].value = parseFloat(values[1]).toFixed(9);
        document.getElementsByName("Solids")[0].value = parseFloat(values[2]).toFixed(9);
        document.getElementsByName("Chloramines")[0].value = parseFloat(values[3]).toFixed(9);
        document.getElementsByName("Sulfate")[0].value = parseFloat(values[4]).toFixed(9);
        document.getElementsByName("Conductivity")[0].value = parseFloat(values[5]).toFixed(9);
        document.getElementsByName("Organic_carbon")[0].value = parseFloat(values[6]).toFixed(9);
        document.getElementsByName("Trihalomethanes")[0].value = parseFloat(values[7]).toFixed(9);
        document.getElementsByName("Turbidity")[0].value = parseFloat(values[8]).toFixed(9);
      } else {
        alert("Invalid CSV format. Please make sure the file contains data.");
      }
    };

    // Read the file as text
    reader.readAsText(file);
  });

  // Trigger a click event to open the file dialog
  input.click();
}
