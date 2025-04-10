import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import data from "../assets/barRace1.json";
import "./BarRace.css";

const generateKeyframes = () => {
  const data = [
    { name: "A", value: Math.random() * 100 },
    { name: "B", value: Math.random() * 100 },
    { name: "C", value: Math.random() * 100 },
    { name: "D", value: Math.random() * 100 },
  ];

  const keyframes = Array.from({ length: 20 }, (_, i) => {
    const updatedData = data.map((d) => ({ ...d, value: d.value + Math.random() * 10 }));

    const rankedData = updatedData
      .sort((a, b) => b.value - a.value)
      .map((d, index) => ({ ...d, rank: index }));

    return [`2025-03-${i + 1}`, rankedData]; 
  });

  return keyframes;
};

  
  const BarRace = ({duration = 250, n = 12 }) => {
    const width = window.innerWidth/2;
    const height = window.innerHeight/2;
    const keyframes = data;
    const svgRef = useRef();
    const [replay, setReplay] = useState(false); 
    const barSize = 100;
    const marginTop = 16;
    const marginBottom = 6;
    const marginLeft = 0;
    const marginRight = 100;
    const barRadius = 10; 

    const x = d3.scaleLinear([0, 1], [marginLeft, width - marginRight]);
    const y = d3
      .scaleBand()
      .domain(d3.range(n))
      .rangeRound([marginTop, marginTop + barSize * n])
      .padding(0.1);
  
    const colorScale = d3.scaleOrdinal(d3.schemeTableau10);
  
    const replayAnimation = () => {
      setReplay(false);
      setTimeout(() => setReplay(true), 0); 
    };
    useEffect(() => {
      if (!svgRef.current || !keyframes || keyframes.length === 0) return;
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); 
      svg
        .attr("viewBox", [0,0, width, height])
        .attr("x", width)
        .attr("y", height)
        .attr("width", width)
        .attr("height", height);

    const back = svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0)
        .attr("fill", "url(#gradient_bg)");
  
      const gBars = svg.append("g").attr("fill-opacity", 1);
      const gLabels = svg.append("g").attr("text-anchor", "end");
      const gTicker = svg.append("text").attr("x", width - 6).attr("y", marginTop).style("font", "bold 35px sans-serif");


  
      const updateBars = (data, transition) => {
        const bars = gBars.selectAll("rect").data(data, (d) => d.name);
        bars
          .join(
            (enter) =>
              enter
                .append("rect")
                .attr("fill", (d) => color(d.name))
                .attr("rx", barRadius) 
                .attr("ry", barRadius)
                .attr("x", x(0))
                .attr("y", (d) => y(d.rank))
                .attr("height", y.bandwidth())
                .attr("width", (d) => x(d.value/5) - x(0)),
            (update) => update,
            (exit) => exit.transition(transition).attr("width", 0).remove()
          )
          if(transition) {
            bars.call((bar) =>
            bar
              .transition(transition)
              .attr("y", (d) => y(d.rank)) 
              .attr("width", (d) => x(d.value) - x(0))
          );}
      };

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
  
    const gradient_2 = defs
        .append("linearGradient")
        .attr("id", "gradient_2")
        .attr("x1", "0%")
        .attr("y1", "100%")
        .attr("x2", "50%")
        .attr("y2", "0%");
        
      gradient_2.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#75befe"); 
      gradient_2.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#bde0fe"); 
  
      const gradient_3 = defs
        .append("linearGradient")
        .attr("id", "gradient_3")
        .attr("x1", "0%")
        .attr("y1", "100%")
        .attr("x2", "50%")
        .attr("y2", "0%");
        
      gradient_3.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#af85c7"); 
      gradient_3.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#cab3d7"); 


    const gradient_4 = defs
        .append("linearGradient")
        .attr("id", "gradient_4")
        .attr("x1", "0%")
        .attr("y1", "100%")
        .attr("x2", "50%")
        .attr("y2", "0%");

    gradient_4.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#fbbfa4");
    gradient_4.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#ffe5d9");

    const gradient_bg = defs.append("linearGradient")
        .attr("id", "gradient_bg")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%");
      
      gradient_bg.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#080807") // départ sombre
        .attr("stop-opacity", 1);
      
      gradient_bg.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#080807") // départ sombre aussi
        .attr("stop-opacity", 1);

    setTimeout(() => {
        const stops = gradient_bg.selectAll("stop");
        // Choix des nouvelles couleurs (ex gradient_2)
        const newColors = ["#adb5bd", "#edf2f4"];
        
        stops.data(newColors)
            .transition()
            .duration(2000)
            .attr("stop-color", d => d);
        }, 3500);



    const color = d3.scaleOrdinal()
        .domain(['1', '2', '3', '4']) 
        .range(["url(#gradient_1)", "url(#gradient_2)", "url(#gradient_3)", "url(#gradient_4)"]); 
      
    /*
      const updateLabels = (data, transition) => {
        const labels = gLabels.selectAll("text").data(data, (d) => d.name);
        
        labels
          .join(
            (enter) =>
              enter
                .append("text")
                .attr("x", -6)
                .attr("y", (d) => y(d.rank) + y.bandwidth() / 2)
                .attr("dy", "0.35em")
                .text((d) => d.name + ": " + Math.round(d.value)),
            (update) =>
              update, 
            (exit) =>
              exit.transition(transition).attr("opacity", 0).remove() 
          )
          if(transition) {
            labels
            .call((label) =>
                label
                  .transition(transition)
                  .attr("x", 120)
                  .attr("y", (d) => y(d.rank) + y.bandwidth() / 2)
                  .attr('fill', '#FDF0D5')
                  .selection() 
                  .text((d) => d.name + ": " + Math.round(d.value)) 
              );
          }
      };
  
      const updateTicker = (date, transition) => {
        gTicker
        .attr('fill', '#FDF0D5')
        .attr('x', width - marginRight-140)
        .attr('y', height - marginBottom-50)
        .transition(transition).text(date.slice(0,7));
          
      };
      */

      
      (async function animateChart() {
        for (const { date, val } of keyframes) {
          if (!val || val.length === 0) continue; 
  
          const transition = svg.transition()
            .duration(duration)
            .ease(d3.easeLinear);

          x.domain([0, 500]); 

          updateBars(val, transition);
          //updateLabels(val, transition);
          //updateTicker(date, transition);
            try {
              await transition.end();
            } catch (e) {
              console.log("Transition interrupted:", e);
            }
          }
      })();
      
    }, [keyframes, replay, svgRef]); 
  
    return (
      <div>
        <svg ref={svgRef} className="bar-race"></svg>
      </div>
    );
  };
  
  export default BarRace;

