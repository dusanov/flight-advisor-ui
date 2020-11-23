import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { SearchResult } from './app/search-result'
import { Observable } from 'rxjs';
import { _ParseAST } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class D3Service {
  svg : any;
  xy: any;
  path: any;
  width: any; 
  height: any;
  //----
  geojson : any; worldLayer: any; pathLayer:any; projection: any; worldGenerator: any;pathGenerator: any;

  constructor(private window: Window) {
    this.width = window.innerWidth/1.33;
    this.height = window.innerHeight;
    this.svg = d3.select("#left_col")
                .append("svg")
                .attr("width", this.width)
                .attr("height", this.height);
    this.xy = d3.geoMercator();// geoAzimuthalEquidistant();
    this.xy.scale(100);
    this.xy.center([140,0]);
    this.xy.precision(0);                    
    this.path = d3.geoPath();             
    
  }

  drawSVG() {    

    var worldJson = 'tm_world_borders_simpl_0_3.geojson';
    this.svg.append("g").attr("id", "first_layer");

    d3.json("/assets/" + worldJson).then(data =>{
      this.svg.select("#first_layer")
      .selectAll("path")
        .data(data.features)
      .enter().append("path")
      .attr("d", this.path.projection(this.xy));
    });
  }

  drawSVGData(geoJson){
    var path = this.svg.selectAll(".geojson").data([geoJson]);
    path.enter().append("path")
      .attr("class","geojson")
      .attr("d", this.path.projection(this.xy));
    path.transition().duration(600).attrTween("d", someValue=>{
      path.attr("d", this.path.projection(this.xy))
    });
    path.exit();
  }
/******************** */
  drawCanvas(){
    
    this.geojson = {}
    this.worldLayer = d3.select("#world_layer")
    .attr("width", this.width)
      .attr("height", this.height)
      .node()
      .getContext('2d');

    this.pathLayer = d3.select("#path_layer")
    .attr("width", this.width)
      .attr("height", this.height)
      .node()
      .getContext('2d');

    this.projection = d3.geoOrthographic()
      .scale(500)
      .rotate([30, -45]);
    this.worldGenerator = d3.geoPath()
      .projection(this.projection)
      .pointRadius(4)
      .context(this.worldLayer);

      this.pathGenerator = d3.geoPath()
      .projection(this.projection)
      .pointRadius(4)
      .context(this.pathLayer);      

    // REQUEST DATA
    d3.json("/assets/ne_110m_land.json")
    .then((json) => {
      this.worldLayer.clearRect(0, 0, 800, 600);    
      this.worldLayer.lineWidth = 0.5;
      this.worldLayer.strokeStyle = '#333';
    
      this.worldLayer.beginPath();
      this.worldGenerator({type: 'FeatureCollection', features: json.features})
      this.worldLayer.stroke();
      
      // Graticule
      var graticule = d3.geoGraticule();
      this.worldLayer.beginPath();
      this.worldLayer.strokeStyle = '#ccc';
      this.worldGenerator(graticule());
      this.worldLayer.stroke();
    });    
  }
  
  updatePath(geojson: any){
    console.log("geojson:");
    console.log(geojson);
    if (geojson && geojson.coordinates){
      console.log("geojson.coordinates");
      console.log(geojson.coordinates);
      var numOfStops = geojson.coordinates.length;
      var idx = 0;
      while (idx < numOfStops-1){
        updatePathStop(geojson.coordinates[idx], geojson.coordinates[idx+1],this.pathLayer,this.pathGenerator );
        idx++;
      }
    }
    function updatePathStop(from: any, to: any, context: any, geoGenerator: any) {

      //context = d3.select("#mid_col").append("canvas")
      context.clearRect(0, 0, 800, 600);    
      var geoInterpolator = d3.geoInterpolate(from, to);
      var u = 0;

      window.setInterval(movePoint, 50);

      function movePoint()
      {      
          context.beginPath();
          context.strokeStyle = 'red';
          geoGenerator({type: 'Feature', geometry: {type: 'LineString', coordinates: [from, to]}});
          context.stroke();            
  
          // Point
          context.beginPath();
          context.fillStyle = 'red';
          geoGenerator({type: 'Feature', geometry: {type: 'Point', coordinates: geoInterpolator(u)}});
          context.fill();
        
          u += 0.01;
          if(u > 1) u = 0;    

      }
    }
  }
}
