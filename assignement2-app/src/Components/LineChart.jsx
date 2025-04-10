import React, { useEffect, useState} from "react";
import * as d3 from "d3";


function LineChart({selectedGroups}) {
    const [aapl, setData] = useState(null);
  //if (!aapl) return <p>Loading viz...</p>;
    useEffect(() => {
        d3.dsv(",", "/assets/hoursClean.csv", (d) => ({
            date: d.date,
            close: +d.close,
        })).then((loadedData) => {
            setData(loadedData);
        });
    }, []);
    if (!aapl) return <p>Loading viz...</p>;
  return <GraphVisualization data={aapl} selectedGroups={selectedGroups}/>;
}


function GraphVisualization({ data, selectedGroups }) {
    const width = 800;
    const height = 500;
    const marginTop = 20;
    const marginRight = 70;
    const marginBottom = 30;
    const marginLeft = 40;
    
    // Declare the x (horizontal position) scale.
    //const x = d3.scaleUtc(d3.extent(aapl, d => d.date), [marginLeft, width - marginRight]);
    d3.select("#line-container").select("svg").remove(); 



    //const x = d3.scaleLinear([0, d3.max(data, d => d.date)], [marginLeft, width - marginRight]);
    //const x = d3.scaleUtc(d3.extent(data, d => d.date), [marginLeft, width - marginRight]);
    const x = d3.scaleBand()
        .domain(data.map(d => d.date)) // Use the date as the domain
        .range([marginLeft, width - marginRight]);
    
    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear([0, d3.max(data, d => d.close)], [height - marginBottom, marginTop]);
  

    // Declare the line generator.
    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.close));
  
    // Create the SVG container.
    const svg = d3.select("#line-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    const defs = svg.append("defs");
    const gradient_1 = defs
    .append("linearGradient")
    .attr("id", "gradient_1")
    .attr("x1", "0%")
    .attr("y1", "100%")
    .attr("x2", "50%")
    .attr("y2", "0%");
    
  gradient_1.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#ffafcc"); 
  gradient_1.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#ffd7e6"); 
    
    // Add the x-axis.
    const xAxis = svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    xAxis.select("path.domain")
        .attr("stroke-dasharray", 13*80) // Longueur du trait
        .attr("stroke-dashoffset", 13*80) // Masque complet du trait
        .transition()
        .duration(800)
        .delay(1000)
        .ease(d3.easeCubic)
        .attr("stroke-dashoffset", 0);


    xAxis
        .call(g => g.append("text")
            .attr("x", width-marginRight + 5)
            .attr("y", 5)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("Weeks"))
            .attr("font-size", 2)
            .attr("opacity", 0)
            .transition()
            .delay(1500) 
            .duration(800)
            .ease(d3.easeElastic)
            .delay((d, i) => Math.random() * 1000)
            .attr("font-size", 12)
            .attr('opacity', 1)
            .attr("font-weight", "bold"); 
    


    const yAxis = svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).ticks(height / 40));
      

      yAxis.select("path.domain")
        .attr("stroke-dasharray", height * 40)
        .attr("stroke-dashoffset", height * 40)
        .transition()
        .duration(2500)
        .delay(1500)
        .ease(d3.easeCubic)
        .attr("stroke-dashoffset", 0);
      

    
      yAxis.selectAll(".tick line")
        .clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.2)
        .attr("stroke-dasharray", width - marginLeft - marginRight)
        .attr("stroke-dashoffset", width - marginLeft - marginRight)
        .transition()
        .duration(2500)
        .delay((d, i) => Math.random() * 1000)
        .ease(d3.easeCubic)
        .attr("stroke-dashoffset", 0);
        
    
    
    yAxis
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("Hours invested per week"))
            .attr("font-size", 2)
            .attr("opacity", 0)
            .transition()
            .delay(1500) 
            .duration(800)
            .ease(d3.easeElastic)
            .delay((d, i) => Math.random() * 1000)
            .attr("font-size", 12)
            .attr('opacity', 1)
            .attr("font-weight", "bold"); 



    const path = svg.append("path")
    .attr("fill", "none")
    .attr("stroke", "url(#gradient_1)")
    .attr("stroke-width", 3.5)
    .attr("d", line(data));
    
    const totalLength = 1700;//path.node().getTotalLength();
    //console.log(path.node().getTotalLength())
    
    path
        .attr("stroke-dasharray", totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .delay(3000)
        .ease(d3.easeCubic)
        .attr("stroke-dashoffset", 0);



    return (
        <div id="line-container">
        </div>)   
    ;}
        
export default LineChart;