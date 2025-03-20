import React from 'react';

export default function MapPing({itemName, animalBool}) {

    //MARGINS IS NOT UPDATING WHEN THE STATE OF THE PARENT UPDATES

    const randomId = 'mapPing#' + String(Math.random());

    return (
        <div className="mapPing">
            <h1>
                {itemName}
            </h1>
        </div>
    );
};