import React, { useEffect} from "react";
import * as d3 from "d3";
import data from "../assets/Hive.json";


const width = 1400;
const height = 1100;

//const color = d3.scaleOrdinal(d3.schemeCategory10);

function Hive({ selectedGroups}) {
    if (!data) return <p>Chargement du graphe...</p>;
    // Simulation D3 et rendu
    return <HiveVisualization data={data} selectedGroups={selectedGroups}/>;
    }

function HiveVisualization({ data, selectedGroups }) {    
    useEffect(() => {
        if (!data || !data.nodes || !data.links) return;
        d3.select("#hive-container").select("svg").remove();

        const links = data.links.map(d => ({ ...d }));
        const nodes = data.nodes.map(d => ({ ...d }));    

        //const filteredNodes = nodes.filter(node =>
        //    node.group.some(group => selectedGroups.has(group))
        //);

        const filteredNodes = nodes.filter(node => selectedGroups.has(node.group));
        //const filteredLinks = links.filter(link =>
        //link.source_group.some(group => selectedGroups.has(group)) &&
        //link.target_group.some(group => selectedGroups.has(group))
        //);

        let filteredLinks = links.filter(link => 
            filteredNodes.some(node => node.id === link.source) &&
            filteredNodes.some(node => node.id === link.target)
          );

        //only keep 20 % of the links
        const numLinksToKeep = Math.floor(filteredLinks.length * 0.2); // 20% des liens
        //const shuffledLinks = filteredLinks.sort(() => 0.5 - Math.random()); // Mélange les liens
        filteredLinks = filteredLinks.slice(0, numLinksToKeep); // Garde les 20% des liens



        const t = d3.transition()
          .duration(750)
          .ease(d3.easeLinear);

        const svg = d3.select("#hive-container")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .style("max-width", "100%")
            .style("height", "auto")
            .style("border", "1px solid #333533")
            .style("border-radius", "8px");


        const back = svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("x", -width / 2)
            .attr("y", -height / 2)
            .attr("fill", "url(#gradient_bg)");

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

    const color = d3.scaleOrdinal()
      .domain(['0', '1', '2']) 
      .range(["url(#gradient_1)", "url(#gradient_2)", "url(#gradient_3)"]); 

    const color2 = d3.scaleOrdinal()
      .domain(['0', '1', '2'])
        .range(["#ffafcc", "#75befe", "#af85c7"]);


        // Crée une zone de zoom
        const zoom = d3.zoom()
            .scaleExtent([0.5, 5]) // Facteur de zoom min/max
            .on("zoom", (event) => {
            g.attr("transform", event.transform); // Applique la transformation sur le groupe contenant le graph
            });

            svg.call(zoom); // Active le zoom sur le SVG


    
        const numGroups = selectedGroups.size;
        const angleStep = (2 * Math.PI) / numGroups; // Angle en radians
        const radius = Math.min(width, height) / 2 - 50;
    
        // Positions des axes
        const groups = Array.from({ length: numGroups }, (_, i) => ({
        angle: i * angleStep,
        x: radius * Math.cos(i * angleStep),
        y: radius * Math.sin(i * angleStep),
        }));

        // Regroupement des nœuds par F
        const nodesByGroup = d3.group(filteredNodes, (d) => d.group);
    
        // Échelle pour positionner les nœuds le long des axes
        const maxNodes = Math.max(...Array.from(nodesByGroup.values(), (g) => g.length-1));
        const xScale = d3.scaleLinear().domain([0, maxNodes]).range([0, radius]);
        

        const uniqueGroups = [...new Set(filteredNodes.map(n => n.group))];
        const groupMap = Object.fromEntries(uniqueGroups.map((group, index) => [group, index]));

        nodesByGroup.forEach((nodes, groupKey) => {
            const groupIndex = groupMap[groupKey]; // Récupère l'index du groupe
            nodes.forEach((node, i) => {
                node.x = xScale(i) * Math.cos(groupIndex * angleStep);
                node.y = xScale(i) * Math.sin(groupIndex * angleStep);
            });
        });

        const line = d3
            .line()
            .curve(d3.curveBundle.beta(0.85)) // Courbure ajustable avec beta (0 à 1)
            .x((d) => d.x)
            .y((d) => d.y);

        function getAngleAxes(p1, p2) {
            return Math.atan2(p2.y - p1.y, p2.x - p1.x);
        }

        function midPoint(p1, p2, d) {
            const orth_x = p2.y - p1.y;
            const orth_y = p1.x - p2.x;
            const norm = Math.sqrt(orth_x * orth_x + orth_y * orth_y);
            return {
              x: (p1.x + p2.x) / 2 + 20 * orth_x / norm,
              y: (p1.y + p2.y) / 2 + 20 * orth_y / norm
            };
        }
      

        links.forEach((link, i) => {
            const sourceNode = nodes.find(n => n.id === link.source);
            const targetNode = nodes.find(n => n.id === link.target);
          
            const gradient = defs.append("linearGradient")
              .attr("id", `grad-${i}`)
              .attr("gradientUnits", "userSpaceOnUse")
              .attr("x1", sourceNode.x)
              .attr("y1", sourceNode.y)
              .attr("x2", targetNode.x)
              .attr("y2", targetNode.y);
          
            gradient.append("stop")
              .attr("offset", "0%")
              .attr("stop-color", color2(sourceNode.group));
          
            gradient.append("stop")
              .attr("offset", "100%")
              .attr("stop-color", color2(targetNode.group));
          });

      g
        .selectAll(".link")
        .data(filteredLinks)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke-width", (d) => d.value)
        .attr("stroke", (d, i) => `url(#grad-${i})`) // Applique le gradient
        .attr("stroke-opacity", 0.4)
        .attr("d", (d) => {
            const source = filteredNodes.find((n) => n.id === d.source);
            const target = filteredNodes.find((n) => n.id === d.target);
            const mid = midPoint(source, target, d);
            return line([source, mid, target]); // Maintenant, on a 3 points pour créer une vraie courbe
        })
        .attr("stroke-dasharray", function() {
            return this.getTotalLength(); // Récupère la longueur du chemin
          })
          .attr("stroke-dashoffset", function() {
            return this.getTotalLength(); // Cache le chemin au départ
          })
          .transition()
          .duration(1200)
          .delay((d, i) => 2500 + Math.random() * 1000)
          .ease(d3.easeCubic)
          .attr("stroke-dashoffset", 0); // Dessine progressivement les liens

        // Dessin des axes
        g
        .selectAll(".axis")
        .data(groups)
        .enter()
        .append("line")
        .attr("class", "axis")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", (d) => d.x)
        .attr("y2", (d) => d.y)
        .attr("stroke", "#aaa")
        .attr("stroke-width", 1.5)
        .attr("stroke-dasharray", (d) => Math.sqrt(d.x * d.x + d.y * d.y)) // Longueur du trait
        .attr("stroke-dashoffset", (d) => Math.sqrt(d.x * d.x + d.y * d.y)) // Masque complet du trait
        .transition()
        .duration(800)
        .delay((d, i) => Math.random() * 1000)
        .ease(d3.easeCubic)
        .attr("stroke-dashoffset", 0); // Fait apparaître progressivement l'axe

    /*
      g
      .selectAll(".axis-label")
      .data(groups)
      .enter()
      .append("text")
      .attr("class", "axis-label")
      .attr("x", (d) => d.x * 1.1) // Décale un peu pour éviter qu'il soit collé à l'axe
      .attr("y", (d) => d.y * 1.1)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("fill", "#E8EDDF")
      .style("font-size", "24px")
      .style("color", "#E8EDDF")
      .text((d, i) => uniqueGroups[i]) // Remplace par la vraie valeur du groupe si nécessaire
      .style("opacity", 0) // Début invisible
      .transition()
      .delay(2000) // Après l'affichage des axes et des nœuds
      .duration(1000)
      .style("opacity", 1);
          */
      // Dessin des nœuds
      const node = g.append("g")
      .selectAll(".node")
      .data(filteredNodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .style("fill", (d) => color(d.group));


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
          d3.select(this).transition().duration(200).attr("r", d.radius * 1.5); // Augmente la taille du nœud
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
    
    // Appliquer la transition APRÈS avoir attaché les événements
    node.transition()
        .delay(1500) // Attend que les axes soient tracés
        .duration(800)
        .ease(d3.easeElastic)
        .attr("r", d => d.radius); // Augmente progressivement la taille des nœuds

    setTimeout(() => {
        const stops = gradient_bg.selectAll("stop");
        // Choix des nouvelles couleurs (ex gradient_2)
        const newColors = ["#d58936", "#a44200"];
        
        stops.data(newColors)
            .transition()
            .duration(2000)
            .attr("stop-color", d => d);
        }, 3000);


    let angle = 0;

    function rotateAndTranslate(angleDelta, dxDelta) {
      angle += angleDelta;
      dx += dxDelta;
        
      //ease linearly
      g.transition()
        .duration(400)
        .ease(d3.easeLinear)
        .attr("transform", `translate(${dx}, 0) rotate(${angle})`);
    }
    
    let dx = 0;
    
    setTimeout(() => {
      rotateAndTranslate(90, -400);
    }, 5000);
    setTimeout(() => {
      rotateAndTranslate(90, -400);
    }, 5400);
    setTimeout(() => {
      rotateAndTranslate(90, -400);
    }, 5800);
    setTimeout(() => {
      rotateAndTranslate(90, -400);
    }, 5200);
    setTimeout(() => {
      rotateAndTranslate(90, -400);
    }, 5600);
    

    }, [data, selectedGroups]); 
    return <div id="hive-container"></div>;
    }

export default Hive;