import React, {useEffect, useState} from 'react';
import mapImage from '../../assets/images/rdr2Map.jpg';
import resetIcon from '../../assets/images/resetIcon.svg';
import MapPing from './mapPing.jsx';
import fetchCSV from '../../csvHandler.js';
import './mapStyles.scss';

//initialise variables to do with map movements
const initialScale = 0.25;
const initialTranslation = [-1342, -4025]; //translation to make valentine the center of the map (most players will know where this is)
const initialMatrix = [initialScale, 0, 0, initialScale, initialTranslation[0], initialTranslation[1]];
let [deltaX, deltaY] = [0, 0];
let oldX = 0;
let oldY = 0;

//the map needs a random ID to be distinguished from the other map
const randomIdHash = String(Math.random());

export default function Map({shownItems}) {

    //variable to store the HTML of the map markers
    const [shownItemsHTML, setShownItemsHTML] = useState(<></>);

    useEffect(() => {

        //set the event listener for the image being scrolled over
        document.getElementById(randomIdHash).addEventListener('wheel', (event) => {imageScrolled(event), {passive: false}});
    }, []);

    //will fire when shownItems changes
    useEffect(() => {

        //entire useEffect is encased in a function for easier data returning
        function updateMapPings() {

            //render new HTML for the map markers based on the new shown items
            //remove the last value from shownItems as this is always duplicated due to react weirdness
            let adjustedShownItems = shownItems;
            adjustedShownItems.pop();
    
            let tempItemsHTML = [];
    
            //do not show anything if no items are to be shown
            if (adjustedShownItems.length <= 0) {
                return <></>;
            };
    
            //deduce if the items are being added to the animal map or the plant map
            let animalBool = false;
            fetchCSV('src/assets/testData/testAnimalData.csv').then((res) => {
                const data = res.data;
                data.shift();

                //if any item in the animal array is in the adjustedShownItems array, then set animalBool to true
                //start by converting the 2d data array into a 1d array with just the animal names
                const animalNames = data.map((animal) => animal[1]);
                adjustedShownItems.forEach((item) => {

                    //after repeating for each item, if that item is also in the animalNames array, then set animalBool to true
                    if (animalNames.includes(item)) {
                        animalBool = true;
                    };
                });
            });
    
            //if there are items to show, show them
            adjustedShownItems.forEach((item) => {
                tempItemsHTML.push(
                    <MapPing itemName={item} animalBool={animalBool} />
                );
            });

            return tempItemsHTML;
        };

        //set the shown map items as the result of the updateMapPings function
        setShownItemsHTML(updateMapPings());

    }, [shownItems]);

    return (
        <React.Fragment>
            <div className="mapWrapper">

                {/*map reset button*/}
                <button className="mapResetButton" onClick={() => {resetMap()}}>
                    <img src={resetIcon} alt="Reset" className="mapIcon" />
                </button>

                {/*draggable section of the map*/}
                <div className="innerMap" id={randomIdHash} onDragStart={(event) => {dragStarted(event)}} onDrag={(event) => {imageDragged(event)}} style={{transform: `matrix(${initialMatrix})`}}>


                    {/*map markers for shown items*/}
                    {shownItemsHTML}

                    {/*map image*/}
                    <img className="map" src={mapImage} />
                </div>
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
        if (oldX === 0 || oldY === 0) {
            return;
        };

        const image = document.getElementById(randomIdHash);


        //calculate the amount to move the image by
        const currentTranslation = image.style.transform.replace('matrix(', '').replace(')', '').split(', ');
        let [currentX, currentY] = [Number(currentTranslation[4]), Number(currentTranslation[5])];
        let [newX, newY] = [(currentX+deltaX), (currentY+deltaY)];

        //update the position of the image
        image.style.transform = `matrix(${currentTranslation[0]}, 0, 0, ${currentTranslation[3]}, ${newX}, ${newY})`;
    };

    function imageScrolled(event) {
        event.preventDefault();

        const imageStyle = document.getElementById(randomIdHash)?.style;
        if (!imageStyle) {
            return;
        };

        const currentMatrix = imageStyle.transform.replace('matrix(', '').replace(')', '').split(', ');

        //calculate scale factor
        const newScale = Number(currentMatrix[0]) - (event.deltaY / 2000);

        //make sure newScale stays within bounds
        const bounds = [0.15, 4.5];
        if (newScale > bounds[1] || newScale < bounds[0]) {
            return;
        };

        //calculate new translation.
        //x formula is: oldTranslation * (newScale / oldScale)
        const oldScale = Number(currentMatrix[0]);
        const oldTranslations = [Number(currentMatrix[4]), Number(currentMatrix[5])];
        const translationX = oldTranslations[0] * (newScale / oldScale);
        //y formula is UNKNOWN
        const translationY = oldTranslations[1] * 0.98; //no clue where this 0.98 comes from, works for first few enlargements if valentine is center

        imageStyle.transform = `matrix(${newScale}, 0, 0, ${newScale}, ${translationX}, ${translationY})`;
    };

    function resetMap() {
        const image = document.getElementById(randomIdHash);
        image.style.transform = `matrix(${initialMatrix})`;
    };
};