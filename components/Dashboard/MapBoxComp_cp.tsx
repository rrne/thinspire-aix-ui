import { useState, useEffect, useRef } from 'react';
import Map,{ Source, Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type {MapRef, GeoJSONSource} from 'react-map-gl';
import { GeoTypes } from "./Map/geoData";
import useStore from 'stores';
import Image from 'next/image';

const MapBoxComp = ():JSX.Element => {
  const store = useStore().Main
  const factory = useStore().Factory

  const [mapData, setMapData] = useState<GeoTypes>({
    data:{
    type: 'FeatureCollection',
    features: []
  }})

  const data =  store.module === "AIX" ? factory.AIXFactorys : factory.AIBoutureFactorys;

  useEffect(() => {
    const dataArr:GeoTypes = {
      data:{
      type: 'FeatureCollection',
      features: []
    }}

    for(let i = 0; i < data.length; i++){
      dataArr.data.features.push({
        geometry: {
          type: "Point",
          coordinates: data[i].location
          },
        type: "Feature",
        properties: {
            cluster_id: 1,
            title: data[i].title,
            code: data[i].code
        }
      })
    }
    setMapData(dataArr)
  },[data])

    const MAP_TOKEN = 'pk.eyJ1IjoiY29jby13YXBwbGFiIiwiYSI6ImNrcjJzdmxjazI2ejIydXJ6eGEzZW9sZXQifQ.VdjtFzPZbh-UwA5ite3Lkw';

    const MAP_STYLE = "mapbox://styles/coco-wapplab/cl63e9uym007r14nxxc660ghg"


    const [ viewport, setViewport ] = useState({
        latitude: 35.01116689472127,
        longitude: 127.19614998984213,
        zoom: 9,
        pitch: 0
    } as const);

    // copy and paste
    const mapRef = useRef<MapRef>(null);

    const onClick = event => {
        if(event.features.length === 0) return;
        
      const feature = event.features[0];
      const clusterId = feature.properties.cluster_id;
  
      const mapboxSource = mapRef.current.getSource('factory') as GeoJSONSource;
  
      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) {
          return;
        }
  
        mapRef.current.easeTo({
          center: feature.geometry.coordinates,
          zoom,
          duration: 500
        });
      });
    };

    return(
        <div className="map-box">
        <Map initialViewState={viewport}  mapStyle={MAP_STYLE} mapboxAccessToken={MAP_TOKEN} style={{width: '100vw', height: '100vh'}} ref={mapRef} minZoom={6} maxZoom={17} > 
            <Source
                 id="factory" type="geojson" data={mapData.data} cluster={true} clusterMaxZoom={14}
                 clusterRadius={50}
            >
            {mapData.data.features.map((list,i) => {
              return(
                <Marker key={i} latitude={list.geometry.coordinates[1]} longitude={list.geometry.coordinates[0]} scale={1}>
                <Image src={require('public/images/marker.png')} alt="" width={60} height={60}/>
                <span className='title'>{list.properties.title}</span>
              </Marker>
              )
            })}
            </Source>
        </Map>
        </div>
    )
}

export default MapBoxComp