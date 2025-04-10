import React, { useEffect, useState} from "react";
import * as d3 from "d3";
import data from "../assets/hairball1.json";
import "./Hairball.css";
import Slider from "./Slider";
import DateSlider from "./DateSlider";

function Hairball({selectedGroups}) {
  if (!data) return <p>Loading viz...</p>;

  return <GraphVisualization data={data} selectedGroups={selectedGroups}/>;
}

function GraphVisualization({ data, selectedGroups }) {
  const [nbIntraLink, setNbIntraLink] = useState(0.02); // Valeur initiale du slider
  const [nbInterLink, setNbInterLink] = useState(0.2); // Valeur initiale du slider
  const [dateRange, setDateRange] = useState(["1997-06-30", "2025-04-14"]);

  const [visibleNodes, setVisibleNodes] = useState([]);
  const [visibleLinks, setVisibleLinks] = useState([]);

  useEffect(() => {



    const width = 928 * 2;
    const height = 680 * 2;
    //const color = d3.scaleOrdinal(d3.schemeCategory10);


    d3.select("#graph-container").select("svg").remove();

    const svg = d3.select("#graph-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .style("max-width", "100%")
      .style("height", "auto")
      .style("border", "1px solid #333533")
      .style("border-radius", "8px");




      const zoom = d3.zoom()
      .scaleExtent([0.5, 5]) // Zoom entre 50% et 500%
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    const g = svg.append("g"); 

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

      /*
      svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("x", -width / 2)
      .attr("y", -height / 2)
      .attr("fill", "#080807");

      setTimeout(() => {
        svg.select("rect")
          .attr("fill", "url(#gradient_1)")
          .transition()
          .duration(2000)
          .attr("fill", "url(#gradient_2)"); 
      }, 1000); // Délai de 1 seconde avant le changement de couleur
      */

    const back = g.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("x", -width / 2)
      .attr("y", -height / 2)
      .attr("fill", "url(#gradient_bg)");





    const color = d3.scaleOrdinal()
      .domain(['0', '1', '2']) 
      .range(["url(#gradient_1)", "url(#gradient_2)", "url(#gradient_3)"]); 


    console.log("color[1]", color("1"));

    const links = data.link.map(d => ({ ...d }));
    const nodes = data.node.map(d => ({ ...d }));
    
    const filteredNodes = nodes
    const filteredLinks = links;
    
    console.log(filteredNodes);
    console.log(new Date(dateRange[0]));

    const simulation = d3.forceSimulation(filteredNodes)
      .force("link", d3.forceLink(filteredLinks).id(d => d.id))
      .force("charge", d3.forceManyBody())
      .force("x", d3.forceX())
      .force("y", d3.forceY())      

    const link = g.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 1)
      .attr("stroke-width", 1.5)
      .selectAll("line")
      .data(filteredLinks)
      .join("line");

    const node = g.append("g")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(filteredNodes)
      .join("circle")
      .attr("r", d => d.radius)
      .attr("fill", d => color(d.group))
      
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
      
      const legend = svg.append("g")
      .attr("transform", `translate(${width / 2 - 100}, ${height / 2 - 600})`);
      
      const uniqueGroups = Array.from(new Set(nodes.flatMap(node => node.group)));
      /*
      uniqueGroups.forEach((group, i) => {
        const legendRow = legend.append("g")
          .attr("transform", `translate(${-150}, ${i*70 - 600})`);
      
        legendRow.append("rect")
          .attr("width", 30)
          .attr("height", 30)
          .attr("fill", color(group));
      
        legendRow.append("text")
          .attr("x", -20)
          .attr("y", -10)
          .attr("text-anchor", "start")
          .attr("font-size", "24px")
          .attr("fill", "#E8EDDF")
          .text(group);
      });
      */

    const groupCenters = new Map();

    // Définition des positions centrales des groupes
    uniqueGroups.forEach((group, i) => {
      groupCenters.set(group, { x: (i % 3) * 200 - width / 4, y: Math.floor(i / 3) * 200 - height / 4 });
    });

  
    // Ajout d'une force qui attire chaque groupe vers son centre
    simulation.force("grouping", d3.forceManyBody().strength(-15)) // Répulsion entre tous les noeuds
  .force("groupCenter", d3.forceX().x(d => {
    const group = d.group; // Prend le premier groupe pour l'attraction
    return groupCenters.has(group) ? groupCenters.get(group).x : 0;
  }).strength(.1))
  .force("groupY", d3.forceY().y(d => {
    const group = d.group;
    return groupCenters.has(group) ? groupCenters.get(group).y : 0;
  }).strength(.1));
    
        
    const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background", "#333")
    .style("color", "white")
    .style("padding", "5px 10px")
    .style("border-radius", "5px")
    .style("display", "none")
    .style("pointer-events", "none");

    
    node.on("mouseover", function (event, d) {
        d3.select(this);//.transition().duration(200).attr("r", d.radius * 1.5); // Augmente la taille du nœud
        tooltip.style("display", "block")
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 10}px`)
            .text(d.id);
    });
    
    node.on("mouseout", function () {
        d3.select(this)
        .transition()
        .duration(200)
        .attr("r", d => d.radius); 
        tooltip.style("display", "none");
    });
      

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("cx", d => d.x)
        .attr("r", d => d.radius)
        .attr("cy", d => d.y);
    });

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    function animateHairballIntro(nodes, simulation, width, height) {
      const centerX = width / 2;
      const centerY = height / 2;
    
      // Étape 1 : décalage initial vers le bas
      nodes.forEach(node => {
        node.y += 200;
        node.x += width/2; // Décalage aléatoire sur l'axe X
      });
    
      // Étape 2 : "tirage" vers le centre
      nodes.forEach(node => {
        node.fx = centerX + (Math.random() - 0.5) * 100;
        node.fy = centerY + (Math.random() - 0.5) * 100;
      });
    
      simulation.alpha(1).restart();
    
      // Étape 3 : relâche les nœuds pour qu'ils se réorganisent naturellement
      setTimeout(() => {
        nodes.forEach(node => {
          node.fx = null;
          node.fy = null;
        });
        simulation.alphaTarget(0.3).restart();
      }, 2000);    
      
      
      setTimeout(() => {
        const stops = gradient_bg.selectAll("stop");
        // Choix des nouvelles couleurs (ex gradient_2)
        const newColors = ["#f9d794", "#fcbf49"];
      
        stops.data(newColors)
          .transition()
          .duration(2000)
          .attr("stop-color", d => d);
      }, 3500);
    }
    animateHairballIntro(filteredNodes, simulation, width, height);


    return () => simulation.stop(); // Nettoyage du simulation
  }, [data, selectedGroups, nbInterLink, nbIntraLink, dateRange]);

  return (
  <div id="graph-container">
    <div className="slider-container">
        <Slider nbLink={nbIntraLink} setNbLink={setNbIntraLink} className="slider-intra"  htmlFor="intra_link" label="intra link"/>
        <Slider nbLink={nbInterLink} setNbLink={setNbInterLink} className="slider-inter"  htmlFor="inter_link" label="inter link"/>
        <DateSlider minDate="1997-06-30" maxDate="2025-04-14" dateRange={dateRange} setDateRange={setDateRange} className="date-slider" label="Date Range"/>
    </div>
  </div>)
  
  ; 
}

export default Hairball;



