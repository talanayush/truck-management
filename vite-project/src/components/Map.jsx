import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const MapWithRoute = ({ start, end }) => {
    const [route, setRoute] = useState([]);

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const startRes = await axios.get(
                    `https://nominatim.openstreetmap.org/search?q=${start}&format=json`
                );
                const endRes = await axios.get(
                    `https://nominatim.openstreetmap.org/search?q=${end}&format=json`
                );

                if (startRes.data[0] && endRes.data[0]) {
                    const startPos = [
                        parseFloat(startRes.data[0].lat),
                        parseFloat(startRes.data[0].lon),
                    ];
                    const endPos = [
                        parseFloat(endRes.data[0].lat),
                        parseFloat(endRes.data[0].lon),
                    ];

                    const routeRes = await axios.get(
                        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62486a07735dfaeb4ed6b5655459a1df9f02&start=${startPos[1]},${startPos[0]}&end=${endPos[1]},${endPos[0]}`
                    );

                    if (routeRes.data.features.length > 0) {
                        const coords =
                            routeRes.data.features[0].geometry.coordinates;
                        const routePath = coords.map((coord) => [
                            coord[1],
                            coord[0],
                        ]);
                        setRoute(routePath);
                    }
                }
            } catch (error) {
                console.error("Error fetching route data:", error);
            }
        };

        fetchCoordinates();
    }, [start, end]);

    if (route.length === 0) {
        return <div>Loading map...</div>;
    }

    return (
        <MapContainer
            center={route[0]}
            zoom={13}
            style={{
                height: "450px",
                width: "100%",
                borderRadius: "12px",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                border: "1px solid #e0e0e0",
            }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={route[0]} />
            <Marker position={route[route.length - 1]} />
            <Polyline positions={route} color="blue" weight={4} />
        </MapContainer>
    );
};

export default MapWithRoute;
