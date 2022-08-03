import { useState, useEffect, useRef } from 'react';
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import marker from 'public/images/marker.png'
import { AIBoutureFactorys, AIXFactorys, GeoTypes } from "./Map/geoData";
import useStore from 'stores';

const MapBoxComp = ():JSX.Element => {

  const [mapData, setMapData] = useState<GeoTypes>()

  useEffect(() => {
    const data =  store.module === "AIX" ? AIXFactorys : AIBoutureFactorys;
    
    const dataArr:GeoTypes = {
      type: "geojson",
      data:{
        type: 'FeatureCollection',
        features: [
          {
            geometry: {
              type: "Point",
              coordinates: []
              },
            type: "Feature",
            properties: {
                cluster_id: 1,
                title: "",
                code:""
            }
          }
        ]
      }
    }

    for(let i = 0; i < data.length; i++){
      let cpFeatures = {...dataArr.data.features[0]}
      cpFeatures.geometry.coordinates = data[i].location;
      cpFeatures.properties.title = data[i].title
      cpFeatures.properties.code = data[i].code
      dataArr.data.features.push(cpFeatures)
    }
    console.log(dataArr);
    setMapData(dataArr)
  },[AIXFactorys])

  useEffect(() => {
    mapbox();
  },[])

  const store = useStore().Main
  const myMap = useRef()

    const MAP_TOKEN = 'pk.eyJ1IjoiY29jby13YXBwbGFiIiwiYSI6ImNrcjJzdmxjazI2ejIydXJ6eGEzZW9sZXQifQ.VdjtFzPZbh-UwA5ite3Lkw';

    const MAP_STYLE = "mapbox://styles/coco-wapplab/cl63e9uym007r14nxxc660ghg"

    const AIXCenter: [number, number] = [127.19614998984213, 35.01116689472127]
    const AICenter: [number, number] = [127.812958,36.884584]

    const mapbox = () => {
      mapboxgl.accessToken = MAP_TOKEN;
      const map = new mapboxgl.Map({
        container: "mapBox",
        style: MAP_STYLE,
        center: store.module === "AIX" ? AIXCenter : AICenter,
        zoom: store.module === "AIX" ? 9 : 8
      });

      map.on("load", async () => {
        map.loadImage(
          marker,
          await function(error, image) {
            if (error){
              console.log(error);
              throw error;
              
            }
            map.addImage("custom-marker", image);
            // Add a GeoJSON source with 2 points
            map.addSource("points", mapData);
            // Add a symbol layer
            map.addLayer({
              id: "points",
              type: "symbol",
              source: "points",
              layout: {
                "icon-image": "custom-marker",
                "icon-size": 0.14,
                "icon-allow-overlap": true,
                 "text-allow-overlap": true,
                "text-field": ["get", "title"],
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 2.25],
                "text-anchor": "top",
                "text-size": 14
              },
              paint: {
                "text-color": "#ffffff",
                "icon-color": "#ffffff"
              }
            });
          }
        );
      });
    };

    return(
        <div className="map-box" ref={myMap} id="mapBox" style={{width: "100vw", height:"800px"}}>
        </div>
    )
}

export default MapBoxComp