import React, {useEffect, useState} from 'react';
import Checkbox from './checkbox.jsx';

export default function MapFilterSelector({data}) {

    const [filters, setFilters] = useState(null);
    const [checkboxHTML, setCheckboxHTML] = useState(<></>);

    useEffect(() => {

        //only run if data exists
        if (data) {

            //get a list of all the filters available
            let tempFilters = [];
    
            data.forEach((species) => {
                tempFilters.push(species.animalName || species.plantName);
            });

            setFilters(tempFilters);
        };
        
    }, [data]);

    //when the filters are updated, we need to re-render the selector
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