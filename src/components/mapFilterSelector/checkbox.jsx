import React, {useState} from 'react';

export default function Checkbox({addToParentStateArray, filterName}) {

    const [checked, setChecked] = useState(false);

    return (
        <React.Fragment>
            <div className="checkbox" onClick={() => {checkboxClicked()}}>
                <div className="checkboxInner" style={{backgroundColor: checked ? '#79cbda' : 'transparent'}}></div>
            </div>
        </React.Fragment>
    );

    function checkboxClicked() {
        
        //toggle checked
        setChecked(!checked);

        //update the map by passing state to the parent
        addToParentStateArray(filterName);
    };
};