import { zumbro, terraces, centerlines, floodplains} from './zumbro.js';


let map = L.map('terracemap').setView([44.2, -92.5], 9);

let Esri_WorldShadedRelief = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
	minZoom: 6,
	maxZoom: 13
});
Esri_WorldShadedRelief.addTo(map);
let zumbro_coords = zumbro.features[0].geometry.coordinates[0];
for(let i = 0; i < zumbro_coords.length; i++){
	zumbro_coords[i].reverse();
}
const outside_bounds = [[-90, -180], [-90, 180], [90, 180], [90, -180]];
let zumbro_poly = L.polygon([outside_bounds, zumbro_coords], {color: 'black', stroke: false, fillOpacity: 0.50});
zumbro_poly.addTo(map);

let terrace_style = function(feature) {
	switch (feature.properties.MERGE_SRC) {
		case "Zumbro_LowerMain_Terraces": return {color: "#d95f02", weight: 1, fillOpacity: 0.8};
		case "Zumbro_UpperMain_Terraces": return {color: "#d95f02", weight: 1, fillOpacity: 0.8};
		case "Zumbro_UpperNorth_Terraces": return {color: "#7570b3", weight: 1, fillOpacity: 0.8};
		case "Zumbro_LowerNorth_Terraces": return {color: "#7570b3", weight: 1, fillOpacity: 0.8};
		case "Zumbro_South_Terraces": return {color: "#1b9e77", weight: 1, fillOpacity: 0.8};
		case "Zumbro_Middle_Terraces": return {fill: false, stroke: false};

	}
};

let centerline_style = function(feature) {
	switch (feature.properties.MERGE_SRC) {
		case "Main_Centerline": return {color: "#d95f02", weight: 2};
		case "North_Centerline": return {color: "#7570b3", weight: 2};
		case "South_Centerline": return {color: "#1b9e77", weight: 2};

	}
};


let floodplain_style = function(feature) {
	switch (feature.properties.MERGE_SRC) {
		case "main.Zumbro_Floodplain_LowerMain_diff": return {color: "#d95f02", weight: 1, opacity: 0.8};
		case "main.Zumbro_Floodplain_Uppermain_diff": return {color: "#d95f02", weight: 1, opacity: 0.8};
		case "Zumbro_North_Floodplain": return {color: "#7570b3", weight: 1, opacity: 0.8};
		case "Zumbro_South_Floodplain": return {color: "#1b9e77", weight: 1, opacity: 0.8};

	}
};

L.geoJSON(floodplains, {style: floodplain_style}).addTo(map);
L.geoJSON(centerlines, {style: centerline_style}).addTo(map);
L.geoJSON(terraces, {style: terrace_style}).addTo(map);