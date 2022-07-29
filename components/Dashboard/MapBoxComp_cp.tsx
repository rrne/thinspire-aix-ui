import { useState, useEffect, useRef } from 'react';
import Map,{ Source, Layer, Marker, useControl, ScaleControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from './Map/layers';
import type {MapRef, GeoJSONSource} from 'react-map-gl';
import { geoData } from "./Map/geoData_cp";
import Image from 'next/image';

const MapBoxComp = ():JSX.Element => {

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
        console.log(event);
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
        <Map initialViewState={viewport}  mapStyle={MAP_STYLE} mapboxAccessToken={MAP_TOKEN} style={{width: '100vw', height: '100vh'}} onClick={onClick} ref={mapRef} interactiveLayerIds={[clusterLayer.id]} minZoom={6} maxZoom={17} > 
            <Source
                 id="factory" type="geojson" data={geoData} cluster={true} clusterMaxZoom={14}
                 clusterRadius={50}
            >
            {geoData.features?.map((list,i) => {
              return(
                <Marker key={i} latitude={list.geometry.coordinates[1]} longitude={list.geometry.coordinates[0]} scale={1} >
                <Image src={require('public/images/marker.png')} alt="" width={80} height={80}/>
              </Marker>
              )
            })}
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />
            </Source>
        </Map>
        </div>
    )
}

export default MapBoxComp