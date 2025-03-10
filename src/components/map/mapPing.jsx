import React from 'react';

export default function MapPing({itemName, animalBool, parentMapId}) {

    const randomId = 'mapPing#' + String(Math.random());

    document.getElementById(parentMapId).addEventListener('drag', (event) => {

        //when the parent map is dragged, this will fire. Move the ping along with the map
    });

    return (
        <div className="mapPing" id={randomId} style={{marginLeft: 0, marginRight: 0}}>
            <p>
                {`Item name: ${itemName}`}
                <br/>
                {`Animal?: ${String(animalBool)}`}
            </p>
        </div>
    );

};