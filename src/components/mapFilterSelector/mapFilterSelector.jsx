import React, {useEffect, useState} from 'react';
import Checkbox from './checkbox.jsx';

export default function MapFilterSelector(data) {

    const [filters, setFilters] = useState(null);
    const [animalOrPlant, setAnimalOrPlant] = useState(null);
    const [checkboxHTML, setCheckboxHTML] = useState(<></>);

    useEffect(() => {

        //only run if data exists
        if (data.animalData || data.plantData) {

            //get a list of all the filters available
            let tempFilters = [];
    
            //if we are dealing with animal data
            if (data.animalData) {
                setAnimalOrPlant('animal');
                data.animalData.forEach((species) => {
                    tempFilters.push(species.animalName);
                });
            }
    
            //if we are dealing with plant data
            else if (data.plantData) {
                setAnimalOrPlant('plant');
                data.plantData.forEach((species) => {
                    tempFilters.push(species.plantName);
                });
            };

            setFilters(tempFilters);
        };
        
    }, [data]);

    //when the filters are updates, we need to re-render the selector
    useEffect(() => {

        //only run if filters has been set
        if (filters && filters.length > 0) {

            function getIndividualFilterHTML(filterName) {

                if (filterName) {

                    return (
                        <React.Fragment>
                            <div id={filterName + 'checkboxWrapper'} className="filterCheckboxWrapper">
                                <Checkbox />
                                <span>
                                    {filterName}
                                </span>
                            </div>
                        </React.Fragment>
                    );
                }
                else {
                    return <></>;
                };
            };

            let tempCheckboxHTML = [];

            //repeat in groups of column height, generating markup each time
            let index = 0;
            while (index < filters.length) {
                tempCheckboxHTML.push(
                    <React.Fragment>
                        <tr>
                            <td>
                                {getIndividualFilterHTML(filters[index])}
                            </td>
                            <td>
                                {getIndividualFilterHTML(filters[index + 1])}
                            </td>
                            <td>
                                {getIndividualFilterHTML(filters[index + 2])}
                            </td>
                        </tr>
                    </React.Fragment>
                );

                index += 3;
            };
    
            //save the generated HTML to main
            setCheckboxHTML(tempCheckboxHTML);
        };

    }, [filters]);

    return (
        <React.Fragment>
            <div id="mapFilterSelectorWrapper">
                <table>
                    <thead>
                        {checkboxHTML}
                    </thead>
                </table>
            </div>
        </React.Fragment>
    );
};