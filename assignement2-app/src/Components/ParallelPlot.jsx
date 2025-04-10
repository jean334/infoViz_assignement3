import { useEffect, useState } from "react";
import * as d3 from "d3";

function ParallelPlot() {
    const [data, setData] = useState(null);
  
    useEffect(() => {
      d3.dsv(",", "/assets/paral3_sampled.csv", (d) => ({
        date: d3.timeParse("%Y/%m/%d")(d.date),
        name: d.name,
        followers_count: +d.followers_count,
        following_count: +d.following_count,
        statuses_count: +d.statuses_count,
        listed_count: +d.listed_count,    
      })).then((loadedData) => {
        setData(loadedData);
      });
    }, []);
  
    if (!data) return <p>Loading viz...</p>;
  
    return <GraphVisualization data={data} />;
  }

function GraphVisualization({ data}){
    const keys = data.columns.slice(1);
    const keyz = "date";
    const width = window.innerWidth;
    const height = keys.length * 120;
    const marginTop = 20;
    const marginRight = 10;
    const marginBottom = 40;
    const marginLeft = 10;
    useEffect(() => {
      d3.select("#parralel-container").select("svg").remove(); 

    const x = new Map(Array.from(keys, key => [key, d3.scaleLinear(d3.extent(data, d => d[key]), [marginLeft, width - marginRight])]));

    const y = d3.scalePoint(keys, [marginTop, height - marginBottom]);
  
    const color = d3.scaleSequential(x.get(keyz).domain(), t => d3.interpolatePuBu(t));
    const svg = d3.select("#parralel-container")
        .append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto;");

        const z = svg.append("g");

        const zoom = d3.zoom()
        .scaleExtent([0.5, 5]) 
        .on("zoom", (event) => {
        z.attr("transform", event.transform); 
        });
  
    svg.call(zoom);

    
    // Append the lines.
    const line = d3.line()
      .defined(([, value]) => value != null)
      .x(([key, value]) => x.get(key)(value))
      .y(([key]) => y(key));
  
    z.attr("fill", "none")
        .attr("stroke-width", 1.5)
        .attr("stroke-opacity", 0.4)
      .selectAll("path")
      .data(data.slice().sort((a, b) => d3.ascending(a[keyz], b[keyz])))
      .join("path")
        .attr("stroke", d => color(d[keyz]))
        .attr("d", d => line(d3.cross(keys, [d], (key, d) => [key, d[key]])))
      .append("title")
        .text(d => d.name);

    z.selectAll("g")
      .data(keys)
      .join("g")
        .attr("transform", d => `translate(0,${y(d)})`)
        .each(function(d) { d3.select(this).call(d3.axisBottom(x.get(d))); })
        .call(g => g.append("text")
          .attr("x", marginLeft)
          .attr("y", -6)
          .attr("text-anchor", "start")
          .attr("fill", "currentColor")
          .text(d => d))
        .call(g => g.selectAll("text")
          .clone(true).lower()
          .attr("size", 12)
          .attr("fill", "#FDF0D5"));

    }, [data]);
    return (
      <div className="graph-container">
        <div id="parralel-container"/>
    </div>
    );
  }

  export default ParallelPlot;