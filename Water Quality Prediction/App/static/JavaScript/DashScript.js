function downloadCSV() {
  window.location.href = "/download";
}


const colors_blue = ["#132C22", "#264D58", '#17869E', '#51C4D4', '#B4DBE8']
const colors_dark = ["#1F1F1F", "#313131", '#636363', '#AEAEAE', '#DADADA']
const colors_green = ['#01411C', '#4B6F44', '#4F7942', '#74C365', '#D0F0C0']

window.onload = function () {
  // Call the function you want to execute on page load
  loadPieChart();
};
function loadPieChart() {
  // Use d3.csv to load the data
  d3.csv("/static/Files/cleaned_data.csv").then(function (data) {
    // Assuming 'Potability' column is present in the dataset
    var potable_count = data.filter(function (d) { return d.Potability === '0'; }).length;
    var impotable_count = data.filter(function (d) { return d.Potability === '1'; }).length;

    var labels = ['Potable', 'Impotable'];
    var values = [potable_count, impotable_count];

    // Create the pie chart
    var pieChart = {
      labels: labels,
      values: values,
      type: 'pie',
      hole: 0.4,
      opacity: 0.9,
      marker: { colors: [colors_green[3], colors_blue[3]] },
      textinfo: 'label+percent',
      hoverinfo: 'percent+label',
      
    };

    // Layout settings
    var layout = {
      paper_bgcolor: "#f1f1f1",
      plot_bgcolor: "#f1f1f1",
      height: 550,
      width: 700, 
    };

    // Create the plot
    Plotly.newPlot('piechart-container', [pieChart], layout);
  }).catch(function (error) {
    console.error('Error loading data:', error);
  });
}

document.addEventListener("DOMContentLoaded", function () {

  function loadChart() {
    const chartTypeSelect = document.querySelector(
      "input[name='chartType']:checked"
    );
    const selectedChartType = chartTypeSelect ? chartTypeSelect.value : null;

    switch (selectedChartType) {
      case "BoxPlot":
        loadBoxPlot();
        break;
      case "Sulphate":
        loadSulphate();
        break;
      case "Scatter Plot":
        loadScatterPlot();
        break;
      case "PH Histogram":
        loadPhHistogram();
        break;
      case "OrganicCarbon":
        loadOrganicCarbon();
        break;
      case "Hardness":
        loadHard();
        break;
      case "Conductivity":
        loadConductivity();
        break;
      case "Turbidity":
        loadTurbidity();
        break;
    }
  }
  function loadBoxPlot() {
    d3.csv("/static/Files/cleaned_data.csv").then(function (data) {

      var features = Object.keys(data[0]).filter(function (feature) {
        return feature !== 'Potability';
      });

      // Create subplots
      var subplots = features.map(function (feature) {
        return {
          y: data.map(function (d) { return +d[feature]; }),
          type: 'box',
          jitter: 0.1,
          pointpos: -1.8,
          marker: { size: 5 },
          name: feature,
          xaxis: 'x',
          yaxis: 'y' + feature
        };
      });

      // Layout settings with logarithmic scale on y-axis
      var layout = {
        title: 'Summary Statistics',
        showlegend: false,
        paper_bgcolor: "#f1f1f1",
        plot_bgcolor: "#f1f1f1",
        yaxis: {
          type: 'log',
          autorange: true,
        },
      };

      // Create the plot
      Plotly.newPlot('chart-container', subplots, layout);
    }).catch(function (error) {
      console.error('Error loading data:', error);
    });
  }
  function loadScatterPlot() {
    d3.csv("/static/Files/cleaned_data.csv").then(function (data) {
      const potableTrace = {
        x: data.filter((d) => d.Potability === "1").map((d) => Number(d.ph)),
        y: data
          .filter((d) => d.Potability === "1")
          .map((d) => Number(d.Sulfate)),
        mode: "markers",
        marker: {
          color: colors_blue[3],
          size: 10,
        },
        type: "scatter",
        name: "Potable",
        legendgroup: "Potability",
      };

      const nonPotableTrace = {
        x: data.filter((d) => d.Potability === "0").map((d) => Number(d.ph)),
        y: data
          .filter((d) => d.Potability === "0")
          .map((d) => Number(d.Sulfate)),
        mode: "markers",
        marker: {
          color: colors_dark[3],
          size: 10,
        },
        type: "scatter",
        name: "Non-Potable",
        legendgroup: "Potability",
      };

      const layout = {
        title: "Ph and Sulphate Distribution",
        template: "plotly_dark",
        xaxis: { title: "Ph" },
        yaxis: { title: "Sulfate" },
        plot_bgcolor: "#f1f1f1",
        paper_bgcolor: "#f1f1f1",
        legend: {
          x: 1.05,
          y: 0.5,
          traceorder: "normal",
          font: { family: "monospace", size: 12, color: "#000" },
          bgcolor: "#f1f1f1",
          bordercolor: "rgba(0, 0, 0, 0.1)",
        },
        annotations: [
          {
            x: 0.5,
            y: -0.1,
            font: { size: 16 },
          },
        ],
      };

      Plotly.newPlot(
        "chart-container",
        [potableTrace, nonPotableTrace],
        layout
      );
    });
  }

  function loadPhHistogram() {
    d3.csv("/static/Files/cleaned_data.csv").then(function (data) {
      const potableData = data
        .filter((d) => d.Potability === "0")
        .map((d) => Number(d.ph));
      const impotableData = data
        .filter((d) => d.Potability === "1")
        .map((d) => Number(d.ph));

      const trace1 = {
        x: potableData,
        type: "histogram",
        opacity: 0.7,
        name: "Potable",
        marker: {
          color: colors_blue[3],
        },
      };

      const trace2 = {
        x: impotableData,
        type: "histogram",
        opacity: 0.7,
        name: "Impotable",
        marker: {
          color: colors_green[3],
        },
      };

      const layout = {
        title: "Ph Level Distribution",
        template: "plotly_white",
        bargap: 0.3,
        plot_bgcolor: "#f1f1f1",
        paper_bgcolor: "#f1f1f1",
        xaxis: {
          title: "Ph Level",
        },
        yaxis: {
          title: "Count",
          range: [0, 80],
        },
        legend: {
          x: 1,
          y: 0.96,
          bordercolor: "#2a2a2a",
          borderwidth: 0,
          tracegroupgap: 5,
        },
      };
      layout.shapes = [
        { type: 'line', x0: 7, x1: 7, y0: 0, y1: 1, yref: 'paper', line: { color: '#000000', width: 1, dash: 'dot' }, opacity: 0.7 },
      ];

      layout.annotations = [
        { text: '<7 is Acidic', x: 4, y: 70, xref: 'x', yref: 'y', showarrow: false, font_size: 10, family: 'monospace' },
        { text: '>7 is Basic', x: 10, y: 70, xref: 'x', yref: 'y', showarrow: false, font_size: 10, family: 'monospace' },
      ];

      Plotly.newPlot("chart-container", [trace1, trace2], layout);
    });
  }
  function loadOrganicCarbon() {
    d3.csv("/static/Files/cleaned_data.csv").then(function (data) {
      const potableData = data
        .filter((d) => d.Potability === "0")
        .map((d) => Number(d.Organic_carbon));
      const impotableData = data
        .filter((d) => d.Potability === "1")
        .map((d) => Number(d.Organic_carbon));

      const trace1 = {
        x: potableData,
        type: "histogram",
        opacity: 0.7,
        name: "Potable",
        marker: {
          color: colors_blue[3],
        },
      };

      const trace2 = {
        x: impotableData,
        type: "histogram",
        opacity: 0.7,
        name: "Impotable",
        marker: {
          color: colors_green[3],
        },
      };

      const layout = {
        title: "Organic Carbon Distribution",
        template: "plotly_white",
        bargap: 0.3,
        plot_bgcolor: "#f1f1f1",
        paper_bgcolor: "#f1f1f1",
        xaxis: {
          title: "Organic Carbon (ppm)",
        },
        yaxis: {
          title: "Count",
        },
        legend: {
          x: 1,
          y: 0.96,
          bordercolor: "#2a2a2a",
          borderwidth: 0,
          tracegroupgap: 5,
        },
      };

      // Add vertical lines and annotations
      layout.shapes = [
        { type: 'line', x0: 10, x1: 10, y0: 0, y1: 1, yref: 'paper', line: { color: colors_dark[1], width: 1, dash: 'dot' }, opacity: 0.7 },
      ];

      layout.annotations = [
        { text: 'Typical Organic Carbon<br> level is up to 10 ppm', x: 5.3, y: 110, xref: 'x', yref: 'y', showarrow: false, family: 'monospace' },
      ];

      Plotly.newPlot("chart-container", [trace1, trace2], layout);
    });
  }
  function loadHard() {
    d3.csv("/static/Files/cleaned_data.csv").then(function (data) {
      const potableData = data
        .filter((d) => d.Potability === "0")
        .map((d) => Number(d.Hardness));
      const impotableData = data
        .filter((d) => d.Potability === "1")
        .map((d) => Number(d.Hardness));

      const trace1 = {
        x: potableData,
        type: "histogram",
        opacity: 0.7,
        name: "Potable",
        marker: {
          color: colors_blue[3],
        },
      };

      const trace2 = {
        x: impotableData,
        type: "histogram",
        opacity: 0.7,
        name: "Impotable",
        marker: {
          color: colors_green[3],
        },
      };
      const layout = {
        title: "Hardness Distribution",
        template: "plotly_white",
        bargap: 0.3,
        plot_bgcolor: "#f1f1f1",
        paper_bgcolor: "#f1f1f1",
        xaxis: {
          title: "Hardness (mg/L)",
        },
        yaxis: {
          title: "Count",
        },
      };

      // Add vertical lines and annotations
      layout.shapes = [
        { type: 'line', x0: 76, x1: 76, y0: 0, y1: 1, yref: 'paper', line: { color: '#000000', width: 1, dash: 'dot' }, opacity: 0.7 },
        { type: 'line', x0: 151, x1: 151, y0: 0, y1: 1, yref: 'paper', line: { color: '#000000', width: 1, dash: 'dot' }, opacity: 0.7 },
        { type: 'line', x0: 301, x1: 301, y0: 0, y1: 1, yref: 'paper', line: { color: '#000000', width: 1, dash: 'dot' }, opacity: 0.7 },
      ];

      layout.annotations = [
        { text: '<76 mg/L is <br>considered soft', x: 40, y: 0.9, xref: 'x', yref: 'paper', showarrow: false, font_size: 7, family: 'monospace' },
        { text: ' 76-150 (mg/L) <br>is considered moderately hard', x: 115, y: 1, xref: 'x', yref: 'paper', showarrow: false, font_size: 7, family: 'monospace' },
        { text: 'Between 151 and 300 (mg/L) <br>is considered hard', x: 250, y: 1, xref: 'x', yref: 'paper', showarrow: false, font_size: 7, family: 'monospace' },
        { text: '>300 mg/L is <br>considered very hard', x: 340, y: 1, xref: 'x', yref: 'paper', showarrow: false, font_size: 7, family: 'monospace' },
      ];

      Plotly.newPlot("chart-container", [trace1, trace2], layout);
    });
  }

  function loadSulphate() {
    d3.csv("/static/Files/cleaned_data.csv").then(function (data) {
      const potableData = data
        .filter((d) => d.Potability === "0")
        .map((d) => Number(d.Sulfate));
      const impotableData = data
        .filter((d) => d.Potability === "1")
        .map((d) => Number(d.Sulfate));

      const trace1 = {
        x: potableData,
        type: "histogram",
        opacity: 0.7,
        name: "Potable",
        marker: {
          color: colors_blue[3],
        },
      };

      const trace2 = {
        x: impotableData,
        type: "histogram",
        opacity: 0.7,
        name: "Impotable",
        marker: {
          color: colors_green[3],
        },
      };

      const layout = {
        title: "Sulfate Distribution",
        template: "plotly_white",
        bargap: 0.3,
        plot_bgcolor: "#f1f1f1",
        paper_bgcolor: "#f1f1f1",
        xaxis: {
          title: "Sulfate (mg/L)",
        },
        yaxis: {
          title: "Count",
        },
      };

      // Add vertical line and annotation
      layout.shapes = [
        { type: 'line', x0: 250, x1: 250, y0: 0, y1: 1, yref: 'paper', line: { color: '#000000', width: 1, dash: 'dot' }, opacity: 0.7 },
      ];

      layout.annotations = [
        { text: '<250 mg/L is considered <br>safe for drinking', x: 190, y: 0.9, xref: 'x', yref: 'paper', showarrow: false, font_size: 10, family: 'monospace' },
      ];

      Plotly.newPlot("chart-container", [trace1, trace2], layout);
    });
  }
  function loadConductivity() {
    d3.csv("/static/Files/cleaned_data.csv").then(function (data) {
      const potableData = data
        .filter((d) => d.Potability === "0")
        .map((d) => Number(d.Conductivity));
      const impotableData = data
        .filter((d) => d.Potability === "1")
        .map((d) => Number(d.Conductivity));

      const trace1 = {
        x: potableData,
        type: "histogram",
        opacity: 0.7,
        name: "Potable",
        marker: {
          color: colors_blue[3],
        },
      };

      const trace2 = {
        x: impotableData,
        type: "histogram",
        opacity: 0.7,
        name: "Impotable",
        marker: {
          color: colors_green[3],
        },
      };

      const layout = {
        title: "Conductivity Distribution",
        font: {
          family: 'monospace',
        },
        xaxis: {
          title: "Conductivity (μS/cm)",
        },
        yaxis: {
          title: "Count",
        },
        legend: {
          x: 1,
          y: 0.96,
          bordercolor: colors_green[3],
          borderwidth: 0,
          tracegroupgap: 5,
        },
        bargap: 0.3,
        plot_bgcolor: "#f1f1f1",
        paper_bgcolor: "#f1f1f1",
      };

      // Add annotation
      layout.annotations = [
        {
          text: 'The Conductivity range<br> is safe for both (200-800 microsiemens per centimeter),<br> Potable and Non-Potable water',
          x: 600, y: 90, showarrow: false, font_size: 12, family: 'monospace'
        },
      ];

      Plotly.newPlot("chart-container", [trace1, trace2], layout);
    });
  }
  function loadTurbidity() {
    d3.csv("/static/Files/cleaned_data.csv").then(function (data) {
      const potableData = data
        .filter((d) => d.Potability === "0")
        .map((d) => Number(d.Turbidity));
      const impotableData = data
        .filter((d) => d.Potability === "1")
        .map((d) => Number(d.Turbidity));

      const trace1 = {
        x: potableData,
        type: "histogram",
        opacity: 0.7,
        name: "Potable",
        marker: {
          color: colors_blue[3],
        },
      };

      const trace2 = {
        x: impotableData,
        type: "histogram",
        opacity: 0.7,
        name: "Impotable",
        marker: {
          color: colors_green[3],
        },
      };

      const layout = {
        title: "Turbidity Distribution",
        font: {
          family: 'monospace',
        },
        xaxis: {
          title: "Turbidity (NTU)",
        },
        yaxis: {
          title: "Count",
        },
        legend: {
          x: 1,
          y: 0.96,
          bordercolor: colors_dark[4],
          borderwidth: 0,
          tracegroupgap: 5,
        },
        bargap: 0.3,
        plot_bgcolor: "#f1f1f1",
        paper_bgcolor: "#f1f1f1",
      };

      // Add vertical line and annotation
      layout.shapes = [
        { type: 'line', x0: 5, x1: 5, y0: 0, y1: 1, yref: 'paper', line: { color: colors_dark[1], width: 1, dash: 'dot' }, opacity: 0.7 },
      ];

      layout.annotations = [
        { text: '<5 NTU(Nephelometric Turbidity Units) Turbidity <br>is considered safe', x: 6, y: 90, showarrow: false, font_size: 10 },
      ];

      Plotly.newPlot("chart-container", [trace1, trace2], layout);
    });
  }
  window.loadChart = loadChart;
});

document.addEventListener("DOMContentLoaded", function () {
  // Show the initial content when the page is loaded
  document.getElementById('initialContent').style.display = 'block';
  // Hide the radio content initially
  document.querySelectorAll('.radio-content').forEach(function (content) {
    content.style.display = 'none';
  });

  // Attach an event listener to each radio button
  var radioButtons = document.querySelectorAll('input[name="chartType"]');
  radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener('change', showRadioContent);
  });

  // Function to show or hide content based on radio button selection
  function showRadioContent() {
    // Hide or show content based on radio button selection
    var selectedOption = document.querySelector('input[name="chartType"]:checked');
    if (selectedOption) {
      // If a radio button is selected, hide the initial content
      document.getElementById('initialContent').style.display = 'none';
      // Show the content associated with the selected radio button
      var contentId = selectedOption.value + 'Content';
      document.getElementById(contentId).style.display = 'block';
    } else {
      // If no radio button is selected, show the initial content
      document.getElementById('initialContent').style.display = 'block';
      // Hide all other content sections
      document.querySelectorAll('.radio-content').forEach(function (content) {
        content.style.display = 'none';
      });
    }
  }
});
