import React, {useState, useEffect} from 'react';
import Papa from 'papaparse';

export default function Home() {

    const [animalData, setAnimalData] = useState(null);

    useEffect(() => {

        //function to fetch the csv from file
        async function fetchCSV() {
            const animalData = await fetch('../src/assets/testData.csv');
            const reader = animalData.body.getReader();
            const decoder = new TextDecoder('utf-8');

            return reader.read().then(function(result) {
                return decoder.decode(result.value);
            });
        };


        //fetch the csv
        fetchCSV().then((res) => {
            
            //parse the csv
            const parsedData = Papa.parse(res).data;

            //top & tail
            const columnHeadings = parsedData.shift();
            parsedData.pop();

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

            setAnimalData(data);
        });

    }, []);

    return (
        <React.Fragment>
            <h1>
                Welcome to the RDR2 map
            </h1>
        </React.Fragment>
    );
};