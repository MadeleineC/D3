var svgWidth = 960;
var svgHeight = 660;
// console.log("hello world")

// Define the chart's margins as an object
var chartMargin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth)

 var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.csv("data.csv", function (error, internetData) {

  // Log an error if one exists
  if (error) return console.warn(error);

  // Print the internetData
  // console.log(internetData);

  // console.log(internetData)

  internetData.forEach(function (data) {
      data.poverty = +data.poverty;
      data.noInternet = +data.noInternet;
      // console.log(d3.max(data.poverty))
   
  });
  
  // console.log(internetData)
  // scale y to chart height
	var yScale = d3.scaleLinear()
	  .domain([0, d3.max(internetData, d => d.noInternet)])
	  .range([chartHeight, 0]);

	// scale y to chart height
	var xScale = d3.scaleLinear()
	  .domain([0, d3.max(internetData, d => d.poverty)])
	  .range([0, chartWidth]);

	// console.log("max: " + d3.max(internetData.poverty)+", " + d3.max(internetData.noInternet))

	// create axes
	var yAxis = d3.axisLeft(yScale);
	var xAxis = d3.axisBottom(xScale);


	var circlesGroup = chartGroup.selectAll("circle")
    .data(internetData)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.poverty))
    .attr("cy", d => yScale(d.noInternet))
    .attr("r", 20)
    .attr("fill", "green")
    .attr("opacity", ".3")


  var text = chartGroup.selectAll("text")
    .data(internetData)
    .enter()
    .append("text")
    .attr("x", d => xScale(d.poverty))
    .attr("y", d => yScale(d.noInternet))
    .attr("text-anchor", "middle")
    .attr("font-size", "10px")
    .attr("font-family", "sans-serif")
    .attr("fill", "black")
    .text(d=>d.abbr);
  
  chartGroup.append("text")
    // Position the text
    // Center the text:
    // (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor)
    .attr("transform",`translate(${chartWidth / 2}, ${chartHeight + chartMargin.top-10})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("font-family", "sans-serif")
    .attr("fill", "green")
    .text("% of people living in poverty");

  chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left+5)
      .attr("x",0 - (chartHeight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-family", "sans-serif")
      .attr("fill", "green")
      .text("% of People Who Haven't Used the Internet in the last 30 Days");

// set x to the bottom of the chart
  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);

  // set y to the y axis
  chartGroup.append("g")
    .call(yAxis);



 
});