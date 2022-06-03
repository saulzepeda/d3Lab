var svg = d3.select("#chart-area").append("svg")
	.attr("width", 600 + 110)
	.attr("height", 400 + 110);

var group= svg.append("g")
	.attr("transform","translate("+100+","+10+")");

d3.json("data/buildings.json").then((data)=> {
	data.forEach((d)=>{
		d.height = +d.height;
	});
    building_name=data.map((d)=>{return d.name});
    max_height=d3.max(data,(d)=>{return d.height});

    var x = d3.scaleBand()
	.domain(building_name)
	.range([0,400])
	.paddingInner(.3)
	.paddingOuter(.3);

    var y = d3.scaleLinear()
	.domain([0,max_height])
	.range([0,400]);

    var colors=d3.scaleOrdinal()
    .domain(building_name)
    .range(d3.schemeSet3);

	var buildings=group.selectAll("rect").data(data);
    buildings.enter()
        .append("rect")
	    .attr("x",(d)=>{return x(d.name);})
	    .attr("y",(d)=>{return 400-y(d.height);})
	    .attr("height", (d)=>{return y(d.height);})
        .attr("width",x.bandwidth())
	    .attr("fill",(d)=>{return colors(d.name)});
		var bottomAxis = d3.axisBottom(x);
		group.append("g")
			.attr("class", "bottom axis")
			.attr("transform", "translate(0, " + 400+ ")")
			.call(bottomAxis)
			.selectAll("text")
    		.attr("y", "10")
	    	.attr("x", "-5")
    		.attr("text-anchor", "end")
    		.attr("transform", "rotate(-20)");
			
		var leftAxis = d3.axisLeft(y)
			.ticks(5)
			.tickFormat((d)=>{return d +" m";});
		group.append("g")
			.attr("class", "left axis")
			.call(leftAxis);
		group.append("text")
			.attr("class", "x axis-label")
			.attr("x", (600 / 2))
			.attr("y", 400 + 140)
			.attr("font-size", "20px")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(-120, -50)")
			.text("The word's tallest buildings");
		group.append("text")
			.attr("class", "y axis-label")
			.attr("x", - (400 / 2))
			.attr("y", -60)
			.attr("font-size", "20px")
			.attr("text-anchor", "middle")
			.attr("transform", "rotate(-90)")
			.text("Height (m)");
}).catch((error)=>{
    console.log(error);
});