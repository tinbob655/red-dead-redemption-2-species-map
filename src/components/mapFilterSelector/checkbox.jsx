import React, {useState} from 'react';

export default function Checkbox() {

    const [checked, setChecked] = useState(false);

    return (
        <React.Fragment>
            <div className="checkbox" onClick={() => {setChecked(!checked)}}>
                <div className="checkboxInner" style={{backgroundColor: checked ? '#79cbda' : 'transparent'}}></div>
            </div>
        </React.Fragment>
    );
};