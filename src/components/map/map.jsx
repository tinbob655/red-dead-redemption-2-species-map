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
                <img className="map" id={randomIdHash} src={mapImage} onDrag={(event) => {imageDragged(event)}} style={{transform: `translate(${initialTranslation[0]}px, ${initialTranslation[1]}px)`}} />
            </div>
        </React.Fragment>
    );

    function imageDragged(event) {
        event.preventDefault();

        //calculate the change in position
        const [mouseX, mouseY] = [event.clientX - event.target.getBoundingClientRect().left, event.clientY - event.target.getBoundingClientRect().top];
        deltaX = mouseX - oldX;
        deltaY = mouseY - oldY;
        [oldX, oldY] = [mouseX, mouseY];

        //calculate the amount to move the image by
        let [currentX, currentY] = event.target.style.transform.replace('translate(', '').replace(')', '').split(', ');
        currentX = Number(currentX.replace('px', ''));
        currentY = Number(currentY.replace('px', ''));
        let [newX, newY] = [(currentX+deltaX), (currentY+deltaY)];

        //update the position of the image
        const image = event.target;
        image.style.transform = `translate(${newX}px, ${newY}px)`;

        //DRAG IS ALMOST WORKING, JUST NEED TO FIX FLASHING AND TELEPORTING AFTER DROP
    };
};