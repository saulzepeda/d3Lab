var svg = d3.select("#chart-area").append("svg")
	.attr("width", 400)
	.attr("height", 400);
var circle = svg.append("circle")
	.attr("cx", 150)
	.attr("cy", 250)
	.attr("r", 70)
	.attr("fill", "blue");
var rect = svg.append("rect")
	.attr("x", 130)
	.attr("y", 40)
	.attr("width", 40)
	.attr("height", 140)
	.attr("fill","red");