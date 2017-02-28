<template>
    <div id="map-loc"></div>
</template>

<script>
    function style(feature) {
        return {
            fillColor: getColor(feature.properties.diff),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    function getColor(d) {
        return d > 100 ? '#800026' :
            d > 50 ? '#BD0026' :
                d > 30 ? '#E31A1C' :
                    d > 20 ? '#FC4E2A' :
                        d > 10 ? '#FD8D3C' :
                            d > 0 ? '#FEB24C' :
                                d < 0 ? '#FED976' :
                                    '#FFEDA0';
    }

    export default {
        name: 'wv-map',
        /* On page load, render the map in the DOM */
        mounted() {
            // const map = L.map('map-loc').setView([20.0, 0.0], 2.4);
            const map = L.map('map-loc', {
                zoomControl: false,
            }).fitBounds([
                [-70, 80],
                [80, -60]
            ]);
            const token = 'pk.eyJ1IjoibHVrZXMiLCJhIjoiY2l5dTNsMGgxMDA0MDMzbGtxNmRoY3Z1cSJ9.cue1Rm47SIxUHmEEC3HVmg';

            /* Render the world map */
            L.tileLayer(`https://api.mapbox.com/styles/v1/lukes/ciyu3sn2s001m2rpd7lciprs5/tiles/256/{z}/{x}/{y}?access_token=${token}`, {
                id: 'mapbox.light',
            }).addTo(map);

            /* Fetch GeoJSON data and add as layer on map */
            fetch('data/countries.json')
                .then(resp => resp.json())
                .then(response => {
                    const geojson = L.geoJson(response, {
                        style,
                        onEachFeature: (feature, layer) => {
                            layer.on({
                                /* On mouseover, modify styles and update country highlight el */
                                mouseover: e => {
                                    e.target.setStyle({
                                        weight: 3,
                                        color: '#666',
                                        dashArray: '',
                                        fillOpacity: 0.7
                                    });

                                    e.target.bringToFront();
                                    // info.update(e.target.feature.properties);
                                },
                                mouseout: e => {
                                    geojson.resetStyle(e.target);
                                    // info.update();
                                },
                                click: e => {
                                    map.fitBounds(e.target.getBounds());
                                    /* Trigger select event */
                                    this.$emit('select', e.target.feature.properties);
                                }
                            })
                        },
                    }).addTo(map);
                });

            /*
            const info = L.control();

            info.onAdd = function (map) {
                this._div = L.DomUtil.create('div', 'country-highlight'); // create a div with a class "info"
                this.update();
                return this._div;
            };

            // method that we will use to update the control based on feature properties passed
            info.update = function (props) {
                if (props) {
                    this._div.innerHTML = `<h4>${props.name}</h4><p>${props.diff > 0 ? '+' + props.diff : props.diff} stories</p>`;
                } else {
                    this._div.innerHTML = '<h4>Hover over a country</h4>';
                }
            };

            info.addTo(map);
            */
        },
    };

</script>