import { useState, useEffect, useRef } from 'react';
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
const marker = require('public/images/marker.png')
import { AIXData, AIBoutureData } from "./Map/geoData";
import useStore from 'stores';

const MapBoxComp = ():JSX.Element => {

  useEffect(() => {
    mapbox()
  },[])

  const store = useStore().Main
  const myMap = useRef()

    const MAP_TOKEN = 'pk.eyJ1IjoiY29jby13YXBwbGFiIiwiYSI6ImNrcjJzdmxjazI2ejIydXJ6eGEzZW9sZXQifQ.VdjtFzPZbh-UwA5ite3Lkw';

    const MAP_STYLE = "mapbox://styles/coco-wapplab/cl63e9uym007r14nxxc660ghg"
   
    // const [ viewport, setViewport ] = useState({
    //     latitude: 35.01116689472127,
    //     longitude: 127.19614998984213,
    //     zoom: 9,
    //     pitch: 0
    // } as const);
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
            if (error) throw error;
            map.addImage("custom-marker", image);
            // Add a GeoJSON source with 2 points
            map.addSource("points", store.module === "AIX" ? AIXData : AIBoutureData);
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