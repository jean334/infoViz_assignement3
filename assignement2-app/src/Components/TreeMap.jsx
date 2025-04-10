import { useEffect, useRef } from "react";
import * as d3 from "d3";
import data from "../assets/treeMap.json";
import "./TreeMap.css";

function TreeMap({ selectedGroups }) {
    if (!data) return <p>Loading viz...</p>;
  
    return <GraphVisualization selectedGroups={selectedGroups}/>;
  }

function GraphVisualization({selectedGroups}) {
    const width = window.innerWidth / 2;
    const height = 400;
    let selectedGroupsSet = new Set(selectedGroups);

    useEffect(() => {
        if (!data) return;      
        const nodes = data.children.map(d => ({ ...d }));

        let filteredData = {
            ...data, 
            children: data.children.filter(node => selectedGroupsSet.has(node.name))
          };
          
        
        d3.select("#treemap-container").select("svg").remove();

        const color = d3.scaleOrdinal(filteredData.children.map((d) => d.name), d3.schemeTableau10);

        const root = d3.treemap()
        .tile(d3.treemapSquarify)
        .size([width, height])
        .padding(1)
        .round(true)(
            d3.hierarchy(filteredData)
            .sum((d) => d.value)
            .sort((a, b) => b.value - a.value)
        );

        const svg = d3.select("#treemap-container")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", width)
        .attr("height", height)
        .style("font", "10px sans-serif");


        const z = svg.append("g");

        const zoom = d3.zoom()
            .scaleExtent([0.5, 5]) 
            .on("zoom", (event) => {
            z.attr("transform", event.transform); 
            });
    
        svg.call(zoom);

        const leaf = z.selectAll("g")
        .data(root.leaves())
        .join("g")
        .attr("transform", (d) => `translate(${d.x0},${d.y0})`);
        
        const formatPercent = d3.format(".2%");
        const format = d3.format(",d");
        leaf.append("title").text((d) =>
        `${d.ancestors().reverse().map((d) => d.data.name).join(".")}\n${format(d.value)}`
        );
        
        leaf.append("rect")
        .attr("fill", (d) => {
            while (d.depth > 1) d = d.parent;
            return color(d.data.name);
        })
        .attr("fill-opacity", 1)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0);


        leaf.append("text")
        .selectAll("tspan")
        .data((d) => d.data.name.split(/(?=[A-Z][a-z])|\s+/g).concat(formatPercent(d.value/d.parent.value)))//.concat(format(d.value))
        .join("tspan")
        .attr("x", 3)
        .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
        .attr("fill-opacity", (d, i, nodes) => (i === nodes.length - 1 ? 1 : 1))
        .text((d) => d)
        .style("fill", (d, i, nodes) => (i === nodes.length - 1 ? "#FDF0D5" : "#FDF0D5"))
        .style("font-size", (d, i, nodes) => (i === nodes.length - 1 ? "1em" : ".6em")) 
        .style("font-weight", (d, i, nodes) => (i === nodes.length - 1 ? "bold" : "normal"))
        .classed("percentage-text", (d, i, nodes) => i === nodes.length - 1)


        const categories = Array.from(new Set(root.children.map(d => d.data.name)));
        const legendData = categories.map(category => ({ 
            name: category, 
            color: color(category) 
        }));
        
        const legend = svg.append("g")
            const background = legend.append("g")
            .attr("class", "background")
            .append("rect")
            .attr("width", 150)
            .attr("height", 175)    
            .attr("x", -5)
            .attr("y", -5)
            .attr("fill", "#333533")
            .attr("opacity", 0.8)
        
        
        legend.attr("transform", `translate(${width - 150}, ${10})`); 
            const legendItem = legend.selectAll(".legend-item")
                                    .data(legendData)
                                    .join("g")
                                    .append("g")
                                    .attr("class", "legend-item")
                                    .attr("transform", (d, i) => `translate(0, ${i * 25})`);

            legendItem.append("rect")
                .attr("width", 15)
                .attr("height", 15)
                .attr("fill", d => d.color);

            legendItem.append("text")
                .attr("x", 20)
                .attr("y", 12)
                .text(d => d.name)
                .style("font-size", "20px")
                .style("fill", "#FDF0D5")
                .attr("alignment-baseline", "middle");
    }, [data, selectedGroups, selectedGroupsSet]);

    return (
        <div className="graph-container">
            <div id="treemap-container"/>
        </div>
    );
    };

export default TreeMap;