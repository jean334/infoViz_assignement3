import { useEffect, useState } from "react";
import * as d3 from "d3";
import data from "../assets/barChart2.json";
import DateSlider2 from "./DateSlider2";
import NewSlider from "./NewSlider";
import "./ToggleButton.jsx";
import ToggleButtons from "./ToggleButton.jsx";
import "./BarChart.css";

function BarPlot(){
  if (!data) return <p>Loading viz...</p>;

  return <GraphVisualization data={data}/>;
}

function GraphVisualization({ data}){
  const [dateRange, setDateRange] = useState([0, 2023-2010+1]);
  const [selected, setSelected] = useState(1);
  useEffect(() => {
    d3.select("#bar-container").select("svg").remove();
    const width = 900;
    const height = data.length * 30;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const filteredData = data;
    const xScale = d3.scaleLinear().range([0, width]);
    if (selected === 1) {
      //filteredData.sort((a, b) => d3.mean(b.positive.slice(dateRange[0], dateRange[1])) - d3.mean(a.positive.slice(dateRange[0], dateRange[1])));
      xScale.domain([0, d3.max(filteredData, d => d3.mean(d.positive.slice(dateRange[0], dateRange[1])))])
    } else if (selected === 2) {
      //filteredData.sort((a, b) => d3.mean(b.negative.slice(dateRange[0], dateRange[1])) - d3.mean(a.negative.slice(dateRange[0], dateRange[1])));
      xScale.domain([0, d3.max(filteredData, d => d3.mean(d.negative.slice(dateRange[0], dateRange[1])))])
    } else if (selected === 3) {
      //filteredData.sort((a, b) => d3.mean(b.neutral.slice(dateRange[0], dateRange[1])) - d3.mean(a.neutral.slice(dateRange[0], dateRange[1])));
      xScale.domain([0, d3.max(filteredData, d => d3.mean(d.neutral.slice(dateRange[0], dateRange[1])))])
    }

    const yScale = d3.scaleBand()
      .domain(filteredData.map(d => d.socialmedia))
      .range([0, height])
      .padding(0.2);

    const svg = d3.select("#bar-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width+10, height])
      .style("max-width", "100%")
      .style("height", "auto")
      .style("border", "1px solid #333533")
      .style("border-radius", "8px");

    //const g = svg.append("g");

    /*
    const zoom = d3.zoom()
        .scaleExtent([0.5, 5]) // Facteur de zoom min/max
        .on("zoom", (event) => {
        g.attr("transform", event.transform); // Applique la transformation sur le groupe contenant le graph
        });

        svg.call(zoom); // Active le zoom sur le SVG
    */
   if(selected === 1) {
    svg.selectAll("rect")
      .data(filteredData, d => d.socialmedia)
      .join(
        enter => enter.append("rect")
          .attr("x", 0)
          .attr("y", d => yScale(d.socialmedia))
          .attr("height", yScale.bandwidth())
          .attr("width", 0) 
          .attr("fill", d => color(d.socialmedia))
          .transition()
          .duration(500)
          .attr("width", d =>xScale(d3.mean(d.positive.slice(dateRange[0], dateRange[1])))),
        update => update
          .transition()
          .duration(500)
          .attr("y", d => yScale(d.socialmedia))
          .attr("width", d => xScale(d3.mean(d.positive.slice(dateRange[0], dateRange[1])))),
        exit => exit
          .transition()
          .duration(300)
          .attr("width", 0)
          .remove()
      );
    } else if(selected === 2) {
      svg.selectAll("rect")
      .data(filteredData, d => d.socialmedia)
      .join(
        enter => enter.append("rect")
          .attr("x", 0)
          .attr("y", d => yScale(d.socialmedia))
          .attr("height", yScale.bandwidth())
          .attr("width", 0) 
          .attr("fill", d => color(d.socialmedia))
          .transition()
          .duration(500)
          .attr("width", d =>xScale(d3.mean(d.negative.slice(dateRange[0], dateRange[1])))),
        update => update
          .transition()
          .duration(500)
          .attr("y", d => yScale(d.socialmedia))
          .attr("width", d => xScale(d3.mean(d.negative.slice(dateRange[0], dateRange[1])))),
        exit => exit
          .transition()
          .duration(300)
          .attr("width", 0)
          .remove()
      );
    }
    else if(selected === 3) {
      svg.selectAll("rect")
      .data(filteredData, d => d.socialmedia)
      .join(
        enter => enter.append("rect")
          .attr("x", 0)
          .attr("y", d => yScale(d.socialmedia))
          .attr("height", yScale.bandwidth())
          .attr("width", 0) 
          .attr("fill", d => color(d.socialmedia))
          .transition()
          .duration(500)
          .attr("width", d =>xScale(d3.mean(d.neutral.slice(dateRange[0], dateRange[1])))),
        update => update
          .transition()
          .duration(500)
          .attr("y", d => yScale(d.socialmedia))
          .attr("width", d => xScale(d3.mean(d.neutral.slice(dateRange[0], dateRange[1])))),
        exit => exit
          .transition()
          .duration(300)
          .attr("width", 0)
          .remove()
      );
    }


      function formatValue(value) {
        return d3.format(".2f")(value);
      }
    
    if (selected === 1) {
      svg.selectAll("text")
      .data(filteredData, d => d.socialmedia)
      .join(
        enter => enter.append("text")
          .attr("x", 5)
          .attr("y", d => yScale(d.socialmedia) + yScale.bandwidth() / 2)
          .attr("dy", "0.35em")
          .text(d => `${d.socialmedia}:  ${formatValue(d3.mean(d.positive.slice(dateRange[0], dateRange[1])))+ "%"}`)
          .style("fill", "white"),
        update => update
          .transition()
          .duration(500)
          .attr("y", d => yScale(d.socialmedia) + yScale.bandwidth() / 2)
          .text(d => `${d.socialmedia}: ${formatValue(d3.mean(d.positive.slice(dateRange[0], dateRange[1])))}`),//d3.mean(d.nb_game.slice(dateRange[0], dateRange[1])) }`),
        exit => exit
          .transition()
          .duration(300)
          .style("opacity", 0)
          .remove()
      );
    }
    else if (selected === 2) {
      svg.selectAll("text")
      .data(filteredData, d => d.socialmedia)
      .join(
        enter => enter.append("text")
          .attr("x", 5)
          .attr("y", d => yScale(d.socialmedia) + yScale.bandwidth() / 2)
          .attr("dy", "0.35em")
          .text(d => `${d.socialmedia}:  ${formatValue(d3.mean(d.negative.slice(dateRange[0], dateRange[1])))+ "%"}`)
          .style("fill", "white"),
        update => update
          .transition()
          .duration(500)
          .attr("y", d => yScale(d.socialmedia) + yScale.bandwidth() / 2)
          .text(d => `${d.socialmedia}: ${formatValue(d3.mean(d.negative.slice(dateRange[0], dateRange[1])))}`),//d3.mean(d.nb_game.slice(dateRange[0], dateRange[1])) }`),
        exit => exit
          .transition()
          .duration(300)
          .style("opacity", 0)
          .remove()
      );
    }
    else if (selected === 3) {
      svg.selectAll("text")
      .data(filteredData, d => d.socialmedia)
      .join(
        enter => enter.append("text")
          .attr("x", 5)
          .attr("y", d => yScale(d.socialmedia) + yScale.bandwidth() / 2)
          .attr("dy", "0.35em")
          .text(d => `${d.socialmedia}:  ${formatValue(d3.mean(d.neutral.slice(dateRange[0], dateRange[1])))+ "%"}`)
          .style("fill", "white"),
        update => update
          .transition()
          .duration(500)
          .attr("y", d => yScale(d.socialmedia) + yScale.bandwidth() / 2)
          .text(d => `${d.socialmedia}: ${formatValue(d3.mean(d.neutral.slice(dateRange[0], dateRange[1])))}`),//d3.mean(d.nb_game.slice(dateRange[0], dateRange[1])) }`),
        exit => exit
          .transition()
          .duration(300)
          .style("opacity", 0)
          .remove()
      );
    }


  }, [data, dateRange, selected]);

  return (
    <div id="bar-container">
    <div className="controller-container">  
      <div className="slider-container">
        <NewSlider props={{dateRange:dateRange, setDateRange: setDateRange}}/>
      </div>
      <div className="toggle-container">
        <ToggleButtons props={{setSelected:setSelected, selected: selected}}/>
      </div>
    </div>
  </div>);
}

export default BarPlot;