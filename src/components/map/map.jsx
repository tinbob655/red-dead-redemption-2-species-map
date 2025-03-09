import React, {useEffect} from 'react';
import mapImage from '../../assets/images/rdr2Map.jpg';
import resetIcon from '../../assets/images/resetIcon.svg';
import './mapStyles.scss';

export default function Map({shownItems}) {

    const randomIdHash = String(Math.random());

    const initialScale = 0.25;
    const initialTranslation = [-4720, -4022]; //translation to make valentine the center of the map (most players will know where this is)
    const initialMatrix = [initialScale, 0, 0, initialScale, initialTranslation[0], initialTranslation[1]];

    let [deltaX, deltaY] = [0, 0];
    let [oldX, oldY] = [0, 0];

    useEffect(() => {

        //set the event listener for the image being scrolled over
        document.getElementById(randomIdHash).addEventListener('wheel', (event) => {imageScrolled(event), {passive: false}});
    }, []);

    return (
        <React.Fragment>
            <div className="mapWrapper">

                {/*map reset button*/}
                <button className="mapResetButton" onClick={() => {resetMap()}}>
                    <img src={resetIcon} alt="Reset" className="mapIcon" />
                </button>

                {/*map image*/}
                <img className="map" id={randomIdHash} src={mapImage} onDragStart={(event) => {dragStarted(event)}} onDrag={(event) => {imageDragged(event)}} style={{transform: `matrix(${initialMatrix})`}} loading="lazy" />
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
        const currentTranslation = event.target.style.transform.replace('matrix(', '').replace(')', '').split(', ');
        let [currentX, currentY] = [Number(currentTranslation[4]), Number(currentTranslation[5])];
        let [newX, newY] = [(currentX+deltaX), (currentY+deltaY)];

        //update the position of the image
        const image = event.target;
        image.style.transform = `matrix(${currentTranslation[0]}, ${currentTranslation[1]}, ${currentTranslation[2]}, ${currentTranslation[3]}, ${newX}, ${newY})`;
    };

    function imageScrolled(event) {
        event.preventDefault();

        const currentMatrix = event.target.style.transform.replace('matrix(', '').replace(')', '').split(', ');

        //calculate scale factor
        const newScale = Number(currentMatrix[0]) - (event.deltaY / 2000);

        //make sure newScale stays within bounds
        const bounds = [0.15, 4.5];
        if (newScale > bounds[1] || newScale < bounds[0]) {
            return;
        };

        //scale the image
        event.target.style.transform = `matrix(${newScale}, 0, 0, ${newScale}, ${currentMatrix[4]}, ${currentMatrix[5]})`;
    };

    function resetMap() {
        const image = document.getElementById(randomIdHash);
        image.style.transform = `matrix(${initialMatrix})`;
    };
};