import { useState, useEffect, useRef, useCallback } from 'react'
import Map, { Source, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { MapRef, GeoJSONSource } from 'react-map-gl'
import { GeoTypes } from './Map/geoData'
import Image from 'next/image'
import { observer } from 'mobx-react-lite'

const MapBoxComp = observer(
  ({
    func,
    store,
    factory,
    flyto,
  }: {
    func
    store
    factory
    flyto
  }): JSX.Element => {
    const [mapData, setMapData] = useState<GeoTypes>({
      data: {
        type: 'FeatureCollection',
        features: [],
      },
    })

    const [storeData, setStoreData] = useState(
      store.module === 'AI'
        ? factory.AIFactorysBig
        : factory.AIXFactorys
    )

    const [select, setSelect] = useState('total')

    useEffect(() => {
      if (!flyto) return
      if (flyto.title === 'total') {
        callFlyToFactory({
          longitude: flyto.location[0],
          latitude: flyto.location[1],
          zoom: 9,
        })
        return
      }
      callFlyToFactory({
        longitude: flyto.location[0],
        latitude: flyto.location[1],
        zoom: 15,
      })
    }, [flyto])

    useEffect(() => {
      const dataArr: GeoTypes = {
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      }

      const data = [...storeData]
      for (let i = 0; i < data.length; i++) {
        dataArr.data.features.push({
          geometry: {
            type: 'Point',
            coordinates: data[i].location,
          },
          type: 'Feature',
          properties: {
            cluster_id: 1,
            title: data[i].title,
            code: data[i].code,
            error: data[i].error,
          },
        })
      }
      setMapData(dataArr)
    }, [factory.apiCallCount, storeData])

    const MAP_TOKEN =
      'pk.eyJ1IjoiY29jby13YXBwbGFiIiwiYSI6ImNrcjJzdmxjazI2ejIydXJ6eGEzZW9sZXQifQ.VdjtFzPZbh-UwA5ite3Lkw'

    const MAP_STYLE = 'mapbox://styles/coco-wapplab/cl63e9uym007r14nxxc660ghg'

    const [viewport, setViewport] = useState(
      store.module === 'AI'
        ? ({
            latitude: 35.01116689472127,
            longitude: 127.19614998984213,
            zoom: 9,
            pitch: 0,
          } as const)
        : ({
            latitude: 36.7,
            longitude: 127.8,
            zoom: 8.8,
            pitch: 0,
          } as const)
    )

    // copy and paste
    const mapRef = useRef<MapRef>(null)

    type flytoParams = {
      center: [number, number]
      duration: number
      zoom: number
    }
    const callFlyToFactory = useCallback(({ longitude, latitude, zoom }) => {
      mapRef.current?.flyTo({
        center: [longitude, latitude],
        duration: 3000,
        zoom: zoom,
      })
      // setSelect(title)
    }, [])

    const controlWheelMap = (event) => {
      if (event.viewState.zoom > 11) {
        setStoreData(
          store.module === 'AIX'
            ? factory.AIXFactorys
            : factory.AIBoutureFactorys
        )
      } else {
        setStoreData(
          store.module === 'AI'
            ? factory.AIFactorysBig
            : factory.AIXFactorys
        )
      }
    }

    return (
      <div className="map-box">
        <Map
          initialViewState={viewport}
          mapStyle={MAP_STYLE}
          mapboxAccessToken={MAP_TOKEN}
          style={{ width: '100vw', height: '100vh' }}
          ref={mapRef}
          minZoom={6}
          maxZoom={17}
          onZoom={controlWheelMap}
        >
          <Source
            id="factory"
            type="geojson"
            data={mapData.data}
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={50}
          >
            {mapData.data.features.map((list, i) => {
              return (
                <Marker
                  key={i}
                  latitude={list.geometry.coordinates[1]}
                  longitude={list.geometry.coordinates[0]}
                  scale={1}
                >
                  {list.properties.error ? (
                    <Image
                      src={require('public/images/marker.png')}
                      alt=""
                      width={60}
                      height={60}
                    />
                  ) : (
                    <Image
                      src={require('public/images/marker2.png')}
                      alt=""
                      width={60}
                      height={60}
                    />
                  )}
                  <span className="title">{list.properties.title}</span>
                </Marker>
              )
            })}
          </Source>
          {/* <ControlPanel onSelectCity={callFlyToFactory} select={select} /> */}
        </Map>
      </div>
    )
  }
)

export default MapBoxComp
