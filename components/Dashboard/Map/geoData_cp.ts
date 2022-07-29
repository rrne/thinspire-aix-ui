import { Feature, Point } from 'geojson'

type GeoTypes = {
    type:"FeatureCollection";
    features:Feature<Point>[
    ]
}

export const geoData:GeoTypes = {   
    type: "FeatureCollection",
    features: [
        {
            geometry: {
                type: "Point",
                coordinates: [
                    126.8583204,
                    35.2257176
                ]
            },
            type: "Feature",
            properties: {
                cluster_id:1,
                description: "Southern Ave",
                markerSymbol: "rail-metro",
                title: "아이지스"
            }
        },
        {
            geometry: {
                type: "Point",
                coordinates: [
                    126.857933,
                    35.2265856
                ]
            },
            type: "Feature",
            properties: {
                cluster_id:2,
                description: "Southern Ave",
                markerSymbol: "rail-metro",
                title: "아이코디"
            }
        },
        {
            geometry: {
                type: "Point",
                coordinates: [
                    126.863897,
                    35.2030358
                ]
            },
            type: "Feature",
            properties: {
                cluster_id:3,
                description: "Southern Ave",
                markerSymbol: "rail-metro",
                title: "디알텍"
            }
        },
        {
            geometry: {
                type: "Point",
                coordinates: [
                    126.8611434,
                    35.1989575
                ]
            },
            type: "Feature",
            properties: {
                cluster_id:4,
                description: "Southern Ave",
                markerSymbol: "rail-metro",
                title: "DH 글로벌"
            }
        },
        {
            geometry: {
                type: "Point",
                coordinates: [
                    127.6584653,
                    34.8237514
                ]
            },
            type: "Feature",
            properties: {
                cluster_id:5,
                description: "Southern Ave",
                markerSymbol: "rail-metro",
                title: "재원산업"
            }
        },
        {
            geometry: {
                type: "Point",
                coordinates: [
                    127.6492842,
                    34.8318756
                ]
            },
            type: "Feature",
            properties: {
                cluster_id:6,
                description: "Southern Ave",
                markerSymbol: "rail-metro",
                title: "에스에프시"
            }
        }
    ]
}