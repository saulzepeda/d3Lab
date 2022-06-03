var svg = d3.select("#chart-area").append("svg")
.attr("width", 400)
.attr("height", 400);

d3.csv("data/ages.csv").then((data)=> {

	console.log(data);

});

d3.tsv("data/ages.tsv").then((data)=> {

	console.log(data);

});

d3.json("data/ages.json").then((data)=> {

	data.forEach((d)=>{

		d.age = +d.age;

	});

	console.log(data);

    var circles=svg.selectAll("circle").data(data);
    
    circles.enter()
        .append("circle")
        .attr("r", (d)=>{return d.age;})
	    .attr("cx",(d,i)=>{return (i*50)+20;})
	    .attr("cy",100)
	    .attr("fill",(d)=>{if(d.age>10){return "green";} else{return "blue";}});
    }).catch((error)=>{
        console.log(error);
});