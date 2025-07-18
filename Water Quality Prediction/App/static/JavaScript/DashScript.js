// Color palettes for charts
const colors_blue = ["#132C22", "#264D58", "#17869E", "#51C4D4", "#B4DBE8"];
const colors_dark = ["#1F1F1F", "#313131", "#636363", "#AEAEAE", "#DADADA"];
const colors_green = ["#01411C", "#4B6F44", "#4F7942", "#74C365", "#D0F0C0"];

window.onload = function () {
  loadPieChart();
};

// Load pie chart for potability distribution
function loadPieChart() {
  d3.csv("/static/data/cleaned_data.csv")
    .then(function (data) {
      var potable_count = data.filter((d) => d.Potability === "0").length;
      var impotable_count = data.filter((d) => d.Potability === "1").length;

      var labels = ["Potable", "Impotable"];
      var values = [potable_count, impotable_count];

      var pieChart = {
        labels: labels,
        values: values,
        type: "pie",
        hole: 0.4,
        opacity: 0.9,
        marker: { colors: [colors_green[3], colors_blue[3]] },
        textinfo: "label+percent",
        hoverinfo: "percent+label",
      };

      var layout = {
        title: "Potability Distribution",
        paper_bgcolor: "#ffffff",
        plot_bgcolor: "#ffffff",
        height: 450,
        width: document.getElementById("piechart-container").clientWidth,
      };

      Plotly.newPlot("piechart-container", [pieChart], layout);
    })
    .catch(function (error) {
      console.error("Error loading pie chart data:", error);
    });
}

// General dispatcher for loading charts on button click
function loadChart(chartName) {
  switch (chartName) {
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
    default:
      console.warn("Unknown chart type:", chartName);
  }
}

function loadBoxPlot() {
  d3.csv("/static/data/cleaned_data.csv")
    .then(function (data) {
      const features = Object.keys(data[0]).filter(f => f !== "Potability");

      const boxplots = features.map(feature => ({
        y: data.map(d => +d[feature]),
        type: "box",
        name: feature,
        boxpoints: "outliers",
        marker: { size: 4 },
      }));

      const layout = {
        title: "Summary Statistics",
        paper_bgcolor: "#ffffff",
        plot_bgcolor: "#ffffff",
        height: 450,
        width: document.getElementById("summary-chart").offsetWidth,
        margin: { t: 50, l: 40, r: 30, b: 80 },
        yaxis: {
          type: "log",
          autorange: true,
        },
      };

      Plotly.newPlot("summary-chart", boxplots, layout, { responsive: true });
    })
    .catch(function (error) {
      console.error("Box plot error:", error);
    });
}

// Load on DOM ready
document.addEventListener("DOMContentLoaded", loadBoxPlot);


function loadScatterPlot() {
  d3.csv("/static/data/cleaned_data.csv").then(function (data) {
    const potableTrace = {
      x: data.filter((d) => d.Potability === "1").map((d) => Number(d.ph)),
      y: data.filter((d) => d.Potability === "1").map((d) => Number(d.Sulfate)),
      mode: "markers",
      marker: { color: colors_blue[3], size: 10 },
      type: "scatter",
      name: "Potable",
      legendgroup: "Potability",
    };

    const nonPotableTrace = {
      x: data.filter((d) => d.Potability === "0").map((d) => Number(d.ph)),
      y: data.filter((d) => d.Potability === "0").map((d) => Number(d.Sulfate)),
      mode: "markers",
      marker: { color: colors_dark[3], size: 10 },
      type: "scatter",
      name: "Non-Potable",
      legendgroup: "Potability",
    };

    const layout = {
      title: "Ph and Sulphate Distribution",
      xaxis: { title: "Ph" },
      yaxis: { title: "Sulfate" },
      paper_bgcolor: "#ffffff",
      plot_bgcolor: "#ffffff",
      height: 450,
      width: document.getElementById("chart-container").clientWidth,

      legend: {
        x: 1.05,
        y: 0.5,
        traceorder: "normal",
        font: { family: "monospace", size: 12, color: "#000" },
        bgcolor: "#f1f1f1",
        bordercolor: "rgba(0, 0, 0, 0.1)",
      },
    };

    Plotly.newPlot("chart-container", [potableTrace, nonPotableTrace], layout);
  });
}

function loadPhHistogram() {
  const container = document.getElementById("chart-container");
  const width = container.clientWidth;
  const height = container.clientHeight || 450;

  d3.csv("/static/data/cleaned_data.csv").then(function (data) {
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
      marker: { color: colors_blue[3] },
    };

    const trace2 = {
      x: impotableData,
      type: "histogram",
      opacity: 0.7,
      name: "Impotable",
      marker: { color: colors_green[3] },
    };

    const layout = {
      title: "pH Level Distribution",
      bargap: 0.3,
      paper_bgcolor: "#ffffff",
      plot_bgcolor: "#ffffff",
      height: height,
      width: width,
      xaxis: { title: "pH Level" },
      yaxis: { title: "Count", range: [0, 80] },
      legend: {
        x: 1,
        y: 0.96,
        bordercolor: "#2a2a2a",
        borderwidth: 0,
        tracegroupgap: 5,
      },
      shapes: [
        {
          type: "line",
          x0: 7,
          x1: 7,
          y0: 0,
          y1: 1,
          yref: "paper",
          line: { color: "#000000", width: 1, dash: "dot" },
          opacity: 0.7,
        },
      ],
      annotations: [
        {
          text: "<7 is Acidic",
          x: 4,
          y: 70,
          xref: "x",
          yref: "y",
          showarrow: false,
          font: { size: 10, family: "monospace" },
        },
        {
          text: ">7 is Basic",
          x: 10,
          y: 70,
          xref: "x",
          yref: "y",
          showarrow: false,
          font: { size: 10, family: "monospace" },
        },
      ],
    };

    Plotly.newPlot(container, [trace1, trace2], layout, { responsive: true });
  });
}

// Load it on page load
window.addEventListener("DOMContentLoaded", loadPhHistogram);

function loadOrganicCarbon() {
  d3.csv("/static/data/cleaned_data.csv").then(function (data) {
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
      marker: { color: colors_blue[3] },
    };

    const trace2 = {
      x: impotableData,
      type: "histogram",
      opacity: 0.7,
      name: "Impotable",
      marker: { color: colors_green[3] },
    };

    const layout = {
      title: "Organic Carbon Distribution",
      bargap: 0.3,
      paper_bgcolor: "#ffffff",
      plot_bgcolor: "#ffffff",
      height: 450,
      width: document.getElementById("chart-container").clientWidth,

      xaxis: { title: "Organic Carbon (ppm)" },
      yaxis: { title: "Count" },
      legend: {
        x: 1,
        y: 0.96,
        bordercolor: "#2a2a2a",
        borderwidth: 0,
        tracegroupgap: 5,
      },
      shapes: [
        {
          type: "line",
          x0: 10,
          x1: 10,
          y0: 0,
          y1: 1,
          yref: "paper",
          line: { color: colors_dark[1], width: 1, dash: "dot" },
          opacity: 0.7,
        },
      ],
      annotations: [
        {
          text: "Typical Organic Carbon<br> level is up to 10 ppm",
          x: 5.3,
          y: 110,
          xref: "x",
          yref: "y",
          showarrow: false,
          font: { family: "monospace" },
        },
      ],
    };

    Plotly.newPlot("chart-container", [trace1, trace2], layout);
  });
}

function loadHard() {
  d3.csv("/static/data/cleaned_data.csv").then(function (data) {
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
      marker: { color: colors_blue[3] },
    };

    const trace2 = {
      x: impotableData,
      type: "histogram",
      opacity: 0.7,
      name: "Impotable",
      marker: { color: colors_green[3] },
    };

    const layout = {
      title: "Hardness Distribution",
      bargap: 0.3,
      paper_bgcolor: "#ffffff",
      plot_bgcolor: "#ffffff",
      height: 450,
      width: document.getElementById("chart-container").clientWidth,

      xaxis: { title: "Hardness (mg/L)" },
      yaxis: { title: "Count" },
      shapes: [
        {
          type: "line",
          x0: 76,
          x1: 76,
          y0: 0,
          y1: 1,
          yref: "paper",
          line: { color: "#000000", width: 1, dash: "dot" },
          opacity: 0.7,
        },
      ],
      annotations: [
        {
          text: "WHO recommends hardness < 76 mg/L",
          x: 40,
          y: 110,
          xref: "x",
          yref: "y",
          showarrow: false,
          font: { family: "monospace" },
        },
      ],
    };

    Plotly.newPlot("chart-container", [trace1, trace2], layout);
  });
}

function loadSulphate() {
  d3.csv("/static/data/cleaned_data.csv").then(function (data) {
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
      marker: { color: colors_blue[3] },
    };

    const trace2 = {
      x: impotableData,
      type: "histogram",
      opacity: 0.7,
      name: "Impotable",
      marker: { color: colors_green[3] },
    };

    const layout = {
      title: "Sulphate Distribution",
      bargap: 0.3,
      paper_bgcolor: "#ffffff",
      plot_bgcolor: "#ffffff",
      height: 450,
      width: document.getElementById("chart-container").clientWidth,

      xaxis: { title: "Sulphate (mg/L)" },
      yaxis: { title: "Count" },
      shapes: [
        {
          type: "line",
          x0: 250,
          x1: 250,
          y0: 0,
          y1: 1,
          yref: "paper",
          line: { color: "#000000", width: 1, dash: "dot" },
          opacity: 0.7,
        },
      ],
      annotations: [
        {
          text: "WHO recommends Sulphate < 250 mg/L",
          x: 100,
          y: 110,
          xref: "x",
          yref: "y",
          showarrow: false,
          font: { family: "monospace" },
        },
      ],
    };

    Plotly.newPlot("chart-container", [trace1, trace2], layout);
  });
}

function loadConductivity() {
  d3.csv("/static/data/cleaned_data.csv").then(function (data) {
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
      marker: { color: colors_blue[3] },
    };

    const trace2 = {
      x: impotableData,
      type: "histogram",
      opacity: 0.7,
      name: "Impotable",
      marker: { color: colors_green[3] },
    };

    const layout = {
      title: "Conductivity Distribution",
      bargap: 0.3,
      paper_bgcolor: "#ffffff",
      plot_bgcolor: "#ffffff",
      height: 450,
      width: document.getElementById("chart-container").clientWidth,

      xaxis: { title: "Conductivity (µS/cm)" },
      yaxis: { title: "Count" },
    };

    Plotly.newPlot("chart-container", [trace1, trace2], layout);
  });
}

function loadTurbidity() {
  d3.csv("/static/data/cleaned_data.csv").then(function (data) {
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
      marker: { color: colors_blue[3] },
    };

    const trace2 = {
      x: impotableData,
      type: "histogram",
      opacity: 0.7,
      name: "Impotable",
      marker: { color: colors_green[3] },
    };

    const layout = {
      title: "Turbidity Distribution",
      bargap: 0.3,
      paper_bgcolor: "#ffffff",
      plot_bgcolor: "#ffffff",
      height: 450,
      width: document.getElementById("chart-container").clientWidth,

      xaxis: { title: "Turbidity (NTU)" },
      yaxis: { title: "Count" },
    };

    Plotly.newPlot("chart-container", [trace1, trace2], layout);
  });
}


  let sample_data = [];

  // Function to render pH Distribution Chart
  function renderPHDistributionChart() {
    if (sample_data.length === 0) {
      console.error("sample_data not loaded yet.");
      return;
    }

    const trace = {
      x: sample_data.map(row => parseFloat(row.pH)),
      type: "histogram",
      marker: {
        color: "#3b82f6"
      }
    };

    const layout = {
      title: "pH Distribution",
      paper_bgcolor: "#ffffff",
      plot_bgcolor: "#ffffff",
      margin: { t: 50, l: 40, r: 30, b: 60 },
      xaxis: { title: "pH Level" },
      yaxis: { title: "Count" },
      autosize: true
    };

    Plotly.newPlot("chart-container", [trace], layout, {
      responsive: true,
      useResizeHandler: true
    });
  }

  // Load CSV and render default chart
  d3.csv("/static/data/cleaned_data.csv").then((data) => {
    sample_data = data;
    renderPHDistributionChart(); // Auto-render on load
  });

function downloadCSV() {
  window.location.href = "/download";
}
