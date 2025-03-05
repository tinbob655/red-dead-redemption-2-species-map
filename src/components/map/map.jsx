import React, {useEffect} from 'react';
import mapImage from '../../assets/images/rdr2Map.jpeg';
import './mapStyles.scss';

export default function Map({shownItems}) {

    const randomIdHash = String(Math.random());

    let globalScale = 0.3;

    //initialise x and y related variables
    let [deltaX, deltaY] = [0, 0];
    const initialTranslation = [-3787, -2278];
    let [oldX, oldY] = [0, 0];

    useEffect(() => {

        //set the event listener for the image being scrolled over
        document.getElementById(randomIdHash).addEventListener('wheel', (event) => {imageScrolled(event), {passive: false}});
    }, []);

    return (
        <React.Fragment>
            <div className="mapWrapper">
                <img className="map" id={randomIdHash} src={mapImage} onDragStart={(event) => {dragStarted(event)}} onDrag={(event) => {imageDragged(event)}} style={{translate: `${initialTranslation[0]}px ${initialTranslation[1]}px`, transform: `scale(${globalScale})`}} />
            </div>
        </React.Fragment>
    );

    function dragStarted(event) {
        
        //set oldX and oldY as the coordinate at the point of the drag starting, stops map teleporting at the star of a drag
        oldX = event.clientX;
        oldY = event.clientY;
    };

    function imageDragged(event) {

        //calculate the change in position
        const [mouseX, mouseY] = [event.clientX, event.clientY];
        deltaX = (mouseX - oldX);
        deltaY = (mouseY - oldY);
        [oldX, oldY] = [mouseX, mouseY];

        //if the drag is stopped, stop the map from teleporting
        if (oldX == 0 || oldY == 0) {
            return;
        };

        //calculate the amount to move the image by
        let [currentX, currentY] = event.target.style.translate.split(' ');
        currentX = Number(currentX.replace('px', ''));
        currentY = Number(currentY.replace('px', ''));
        let [newX, newY] = [(currentX+deltaX), (currentY+deltaY)];

        //update the position of the image
        const image = event.target;
        image.style.translate = `${newX}px ${newY}px`;
    };

    function imageScrolled(event) {
        event.preventDefault();

        const imageScale = event.target.style.transform.replace('scale(', '').replace(')', '');

        //calculate scale factor
        const newScale = Number(imageScale) - (event.deltaY / 1000);

        //make sure newScale stays within bounds
        const bounds = [0.3, 3];
        if (newScale > bounds[1] || newScale < bounds[0]) {
            return;
        };

        //scale the image
        globalScale = newScale;
        event.target.style.transform = `scale(${newScale})`;
    };
};