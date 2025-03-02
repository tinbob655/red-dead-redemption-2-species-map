import React from 'react';
import mapImage from '../../assets/images/rdr2Map.jpeg';
import './mapStyles.scss';

export default function Map({shownItems}) {

    const randomIdHash = String(Math.random());

    //initialise x and y related variables
    let [deltaX, deltaY] = [0, 0];
    const initialTranslation = [-450, 100];
    let [oldX, oldY] = [0, 0];

    return (
        <React.Fragment>
            <div className="mapWrapper">
                <img className="map" id={randomIdHash} src={mapImage} onDragStart={(event) => {dragStarted(event)}} onDrag={(event) => {imageDragged(event)}} style={{transform: `translate(${initialTranslation[0]}px, ${initialTranslation[1]}px)`}} />
            </div>
        </React.Fragment>
    );

    function dragStarted(event) {
        
        //set oldX and oldY as the coordinate at the point of the drag starting
        oldX = event.clientX;
        oldY = event.clientY;
    };

    function imageDragged(event) {
        event.preventDefault();

        //calculate the change in position
        const [mouseX, mouseY] = [event.clientX, event.clientY];
        deltaX = mouseX - oldX;
        deltaY = mouseY - oldY;
        [oldX, oldY] = [mouseX, mouseY];

        //if the drag is stopped, stop the map from teleporting
        if (oldX == 0 || oldY == 0) {
            return;
        };

        //calculate the amount to move the image by
        let [currentX, currentY] = event.target.style.transform.replace('translate(', '').replace(')', '').split(', ');
        currentX = Number(currentX.replace('px', ''));
        currentY = Number(currentY.replace('px', ''));
        let [newX, newY] = [(currentX+deltaX), (currentY+deltaY)];

        //update the position of the image
        const image = event.target;
        image.style.transform = `translate(${newX}px, ${newY}px)`;
    };
};