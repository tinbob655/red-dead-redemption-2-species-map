import React, {useState, useEffect} from 'react';
import Papa from 'papaparse';
import MapFilterSelector from './mapFilterSelector/mapFilterSelector.jsx';
import Map from './map/map.jsx';

export default function Home() {

    const [animalData, setAnimalData] = useState(null);
    const [plantData, setPlantData] = useState(null);

    useEffect(() => {

        //function to fetch the csv from file
        async function fetchCSV(path) {
            const data = await fetch(path);
            const reader = data.body.getReader();
            const decoder = new TextDecoder('utf-8');

            return reader.read().then(function(result) {
                return decoder.decode(result.value);
            });
        };

        function handleCSV(csv) {

            //parse the csv
            const parsedData = Papa.parse(csv).data;

            //get column names
            const columnHeadings = parsedData.shift();

            //convert the data into a map
            let data = [];
            parsedData.forEach((row) => {
                let innerMap = {};
                columnHeadings.forEach((columnHeading) => {
                    if (columnHeading != 'index') {
                        innerMap[columnHeading] = row[columnHeadings.indexOf(columnHeading)];
                    };
                });

                data.push(innerMap);
            });

            return data;
        };


        //fetch the csv for animal data and parse it
        fetchCSV('../src/assets/testData/testAnimalData.csv').then((res) => {
            setAnimalData(handleCSV(res));
        });

        //do the same for the plants data
        fetchCSV('../src/assets/testData/testPlantData.csv').then((res) => {
            setPlantData(handleCSV(res));
        });

    }, []);

    return (
        <React.Fragment>
            <h1 className="alignLeft" style={{whiteSpace: 'pre-wrap'}}>
                Red Dead Redemption 2:  All species locations
            </h1>
            <p className="alignLeft" style={{marginLeft: '10%'}}>
                An interactive map of all plants and animals from Red Dead Redemption 2
            </p>

            <div className="dividerLine"></div>

            <h2 style={{marginTop: '6vh'}}>
                Usage:
            </h2>
            <p>
                To get started, select which animals / plants you wish to filter by below. The map will then update to highlight your selection. Happy hunting!
            </p>

            <div className="dividerLine"></div>

            <h1>
                Red Dead Redemption 2 Animal Map:
            </h1>
            <table>
                <thead>
                    <tr>
                        <td>
                            <h2>
                                Select your filters:
                            </h2>
                        </td>
                        <td style={{width: '75%'}}>
                            <MapFilterSelector animalData={animalData} />
                        </td>
                    </tr>
                </thead>
            </table>

            <div className="dividerLine"></div>

            <h1>
                Red Dead Redemption 2 Plant Map:
            </h1>
            <table>
                <thead>
                    <tr>
                        <td>
                            <h2>
                                Select your filters:
                            </h2>
                        </td>
                        <td style={{width: '75%'}}>
                            <MapFilterSelector plantData={plantData} />
                        </td>
                    </tr>
                </thead>
            </table>
        </React.Fragment>
    );
};