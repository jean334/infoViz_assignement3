import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";


function ScatterPlot({ selectedGroups }) {
    const [data, setData] = useState(null);
    useEffect(() => {
      d3.dsv(",", "/assets/scatter.csv", (d) => ({
        label: d.label,
        time: +d.time,
        diff: +d.diff,
        tool: d.tool,
        size: +d.size,
      })).then((loadedData) => {
        setData(loadedData);
      });
    }, []);
  
    if (!data) return <p>Loading viz...</p>;
  
    return <GraphVisualization data={data} />;
  }

  
function GraphVisualization({ data }) {    
    const width = 800;
    const height = 500;
    const marginTop = 20;
    const marginRight = 70;
    const marginBottom = 30;
    const marginLeft = 40;

    useEffect(() => {

    d3.select("#scatter-container").select("svg").remove(); 


    const svg = d3.select("#scatter-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width+marginLeft+170, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");


    // Add X axis
   const x = d3.scaleLinear([30, d3.max(data, d => d.time+5)], [marginLeft, width - marginRight]);

    // Add Y axis
    const y = d3.scaleLinear([0, d3.max(data, d => d.diff+2)], [height - marginBottom, marginTop]);

    const xAxis = svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    xAxis.select("path.domain")
        .attr("stroke-dasharray", width) // Longueur du trait
        .attr("stroke-dashoffset", width) // Masque complet du trait
        .transition()
        .duration(800)
        .delay(1000)
        .ease(d3.easeCubic)
        .attr("stroke-dashoffset", 0);


    xAxis
        .call(g => g.append("text")
            .attr("x", width-40)
            .attr("y", 5)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("Time invested in the assignement"))
            .attr("font-size", 2)
            .attr("opacity", 0)
            .transition()
            .delay(1500) 
            .duration(800)
            .ease(d3.easeElastic)
            .delay((d, i) => Math.random() * 1000)
            .attr("font-size", 15)
            .attr('opacity', 1)
            .attr("font-weight", "bold"); 
    


    const yAxis = svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).ticks(height / 40));
      

    yAxis.select("path.domain")
        .attr("stroke-dasharray", height)
        .attr("stroke-dashoffset", height)
        .transition()
        .duration(2500)
        .delay(1500)
        .ease(d3.easeCubic)
        .attr("stroke-dashoffset", 0);
          
    yAxis
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("Difficulty of the assignement (0-10)"))
            .attr("font-size", 2)
            .attr("opacity", 0)
            .transition()
            .delay(1500) 
            .duration(800)
            .ease(d3.easeElastic)
            .delay((d, i) => Math.random() * 1000)
            .attr("font-size", 15)
            .attr('opacity', 1)
            .attr("font-weight", "bold"); 

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
    
    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
            .attr("cx", function (d) { return x(d.time); } )
            .attr("cy", function (d) { return y(d.diff); } )
            .attr("r", 0)
            .attr("opacity", 0)
            .attr("fill", (d) => {
                if (d.tool === "D3.js") return "url(#gradient_3)";
                else if (d.tool === "Tableau") return "url(#gradient_1)"; 
                else if (d.tool === "Tableau & D3.js") return "url(#gradient_2)"; 
                else if (d.tool === "NaN") return "#ff0000"; 
            })
            .transition()
            .duration(800)
            .delay((d, i) => i * 600 + 1500)
            .attr("opacity", 1)
            .ease(d3.easeElastic)
            .attr("r", (d) => {
                if(d.size === 0) return 4; // Hide the dot if size is 0
                else return d.size*5;
            });

    svg.append('g')
        .selectAll("text")
        .data(data)
        .join("text")
            .text(d => d.label) // remplace `label` par le nom réel de ton attribut
            .attr("x", d => x(d.time))
            .attr("y", d => y(d.diff) - d.size*5 - 5) // un peu au-dessus du point
            .attr("text-anchor", "middle")
            .attr("fill", "white") // ou autre couleur lisible
            .attr("font-size", "15px")
            .attr("font-weight", "bold")
            .attr("opacity", 0)
            .transition()
            .duration(800)
            .delay((d, i) => i * 600 + 2000) // même delay que les points pour rester synchronisé
            .attr("opacity", 1);

    svg.append('g')
    .selectAll("text")
    .data(data)
    .join("text")
        .text(d => d.size + " viz") // remplace `label` par le nom réel de ton attribut
        .attr("x", d => x(d.time))
        .attr("y", d => y(d.diff)+6) // un peu au-dessus du point
        .attr("text-anchor", "middle")
        .attr("fill", "#333") // ou autre couleur lisible
        .attr("font-size", "12px")
        //.attr("font-weight", "bold")
        .attr("opacity", 0)
        .transition()
        .duration(800)
        .delay((d, i) => i * 600 + 2000) // même delay que les points pour rester synchronisé
        .attr("opacity", 1);

    const legend = svg.append("g")
        //.attr("transform", `translate(${width / 2 - 100}, ${height / 2 - 600})`);
        
    const uniqueGroups = ["D3.js", "Tableau & D3.js"];
        
    uniqueGroups.forEach((group, i) => {
        const legendRow = legend.append("g")
        //.attr("x", width)
        //.attr("y", i * 40 + 200)

        .attr("transform", `translate(${width-marginRight}, ${i*50 + 200})`);

        legendRow.append("rect")
        .attr("width", 0)
        .attr("height", 0)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill", () => {
            if (group === "D3.js") return "url(#gradient_3)";
            else if (group === "Tableau") return "url(#gradient_1)"; 
            else if (group === "Tableau & D3.js") return "url(#gradient_2)"; 
        })
        .attr("opacity", 0)
        .transition()
        .duration(800)
        .attr("width", 20)
        .attr("height", 20)
        .delay((d, i) => i * 600 + 2000)
        .attr("opacity", 1)
        .ease(d3.easeCubic);
    
        legendRow.append("text")
        .attr("x", 10)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .attr("font-size", "15px")
        .attr("fill", "#E8EDDF")
        .attr("font-weight", "bold")
        .text(group)
        .attr("opacity", 0)
        .transition()
        .duration(800)
        .delay((d, i) => i * 600 + 2000)
        .attr("opacity", 1);
        
        });
        
        

      }, [data]); 
      return <div id="scatter-container"></div>;
      }


export default ScatterPlot;