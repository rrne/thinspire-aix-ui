import { Point, GeoJsonProperties} from 'geojson'

export type GeoTypes = {
    type?:"geojson";
    data:{
        type: 'FeatureCollection';
        features: Feature[]
    }
}

type Feature = {
    type: 'Feature';
    geometry: Point;
    properties: GeoJsonProperties;
}

export type FactoryType = {
    id: number;
    title: string;
    electronic: boolean;
    heats: boolean;
    location: [number, number];
    code: string
}

// export const AIXData:GeoTypes = {   
//     type: "geojson",
//     data:{
//     type: 'FeatureCollection',
//     features: [
//         {
//             geometry: {
//                 type: "Point",
//                 coordinates: [
//                     126.8583204,
//                     35.2257176
//                 ]
//             },
//             type: "Feature",
//             properties: {
//                 cluster_id:1,
//                 description: "Southern Ave",
//                 markerSymbol: "rail-metro",
//                 title: "아이지스",
//                 code:"G"
//             },
//         },
//         {
//             geometry: {
//                 type: "Point",
//                 coordinates: [
//                     126.857933,
//                     35.2265856
//                 ]
//             },
//             type: "Feature",
//             properties: {
//                 cluster_id:2,
//                 description: "Southern Ave",
//                 markerSymbol: "rail-metro",
//                 title: "아이코디",
//                 code:"G"
//             }
//         },
//         {
//             geometry: {
//                 type: "Point",
//                 coordinates: [
//                     126.863897,
//                     35.2030358
//                 ]
//             },
//             type: "Feature",
//             properties: {
//                 cluster_id:3,
//                 description: "Southern Ave",
//                 markerSymbol: "rail-metro",
//                 title: "디알텍",
//                 code:"G"
//             }
//         },
//         {
//             geometry: {
//                 type: "Point",
//                 coordinates: [
//                     126.8611434,
//                     35.1989575
//                 ]
//             },
//             type: "Feature",
//             properties: {
//                 cluster_id:4,
//                 description: "Southern Ave",
//                 markerSymbol: "rail-metro",
//                 title: "DH 글로벌",
//                 code:"G"
//             }
//         },
//         {
//             geometry: {
//                 type: "Point",
//                 coordinates: [
//                     127.6584653,
//                     34.8237514
//                 ]
//             },
//             type: "Feature",
//             properties: {
//                 cluster_id:5,
//                 description: "Southern Ave",
//                 markerSymbol: "rail-metro",
//                 title: "재원산업",
//                 code:"Y"
//             }
//         },
//         {
//             geometry: {
//                 type: "Point",
//                 coordinates: [
//                     127.6492842,
//                     34.8318756
//                 ]
//             },
//             type: "Feature",
//             properties: {
//                 cluster_id:6,
//                 description: "Southern Ave",
//                 markerSymbol: "rail-metro",
//                 title: "에스에프시",
//                 code:"Y"
//             }
//         }
//     ]
//    }
// }

// export const AIBoutureData:GeoTypes = {   
//     type: "geojson",
//     data:{
//     type: 'FeatureCollection',
//     features: [
//         {
//             geometry: {
//                 type: "Point",
//                 coordinates: [
//                     127.2633319,
//                     36.9769888
//                 ]
//             },
//             type: "Feature",
//             properties: {
//                 cluster_id:1,
//                 description: "Southern Ave",
//                 markerSymbol: "rail-metro",
//                 title: "롯데칠성음료 안성공장"
//             }
//         },
//         {
//             geometry: {
//                 type: "Point",
//                 coordinates: [
//                     128.6281658,
//                     36.7908539
//                 ]
//             },
//             type: "Feature",
//             properties: {
//                 cluster_id:2,
//                 description: "Southern Ave",
//                 markerSymbol: "rail-metro",
//                 title: "노벨리스코리아주식회사"
//             }
//         },
//     ]
//    }
// }
