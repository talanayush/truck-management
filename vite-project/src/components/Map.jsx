import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const MapWithRoute = ({ start, end }) => {
    const [positions, setPositions] = useState({
        startPos: null,
        endPos: null,
    });

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
                    setPositions({ startPos, endPos });
                }
            } catch (error) {
                console.error("Error fetching coordinates:", error);
            }
        };

        fetchCoordinates();
    }, [start, end]);

    if (!positions.startPos || !positions.endPos) {
        return <div>Loading map...</div>;
    }

    const route = [positions.startPos, positions.endPos];

    return (
        <MapContainer
            center={positions.startPos}
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
            <Marker position={positions.startPos} />
            <Marker position={positions.endPos} />
            <Polyline positions={route} color="blue" weight={4} />
        </MapContainer>
    );
};

export default MapWithRoute;
