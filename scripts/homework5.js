var mergedData;
var index = 0;

// This runs when the page is loaded
document.addEventListener('DOMContentLoaded', function() {

  d3.csv("/data/dogs.csv").then(data => {

    // format the data such that strings are converted to their appropriate types
    data.forEach(function(d) {
        drawPlot(d);
    });

  });

  // drawLineChart();
});

function drawPlot(d){

 var margin = {top: 10, right: 20, bottom: 50, left: 200};
  var width = 750 - margin.left - margin.right;
  var height = 250 - margin.top - margin.bottom;

  var toolTipDiv = d3.select("#tooltipData")
      .attr("class", "tooltipData")
      .style("opacity", "0");

  var dogsvg = d3.select("#dog-container")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .on('mouseover', function() {
                toolTipDiv.transition()
               .duration(50)
               .style("opacity", "1");

                d3.select(this)
                .style("stroke", "black")
                .style("stroke-width", "2");

                let rocket = d.Rocket;
                toolTipDiv.html("I was on " + rocket + " rocket" + "<br />" + "My Latin name: " + d.LatinName + "<br />" +"Fact: " + d.Notes)
               .style("left", (d3.event.pageX + 10) + "px")
               .style("top", (d3.event.pageY - 15) + "px");
            })
            .on('mouseout', function(d,i) {
                d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1')
                .style("stroke", "black")
                .style("stroke-width", ".5");

                toolTipDiv.transition()
               .style("opacity", "0");

            })

  
            // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
if(d.Gender == "Female"){
  d3.svg("/svg/maleDog.svg")
  .then(data => {
    dogsvg.node().append(data.documentElement)
  });
}
else{
  d3.svg("/svg/femaleDog.svg")
  .then(data => {
    dogsvg.node().append(data.documentElement)
  });
}


for(var i = 0; i < d.Flights; i++){

  var starSvg = d3.select("#dog-container")
            .append("svg0")
            .attr("width", 50)
            .attr("height", 100)
            .append("g")

  if(i == d.Flights - 1 && d.Fate == "No"){
    d3.svg("/svg/blackStar.svg")
      .then(data => {
      starSvg.node().append(data.documentElement)
    });
  }
  else{
    d3.svg("/svg/goldStar.svg")
      .then(data => {
      starSvg.node().append(data.documentElement)
    })
  }
}

dogsvg.append("text")
.text(d.Name)
.style("font-size", "50px")
.attr('x', 180)
.attr('y', 135)
.style('text-anchor', 'end')
      
}
