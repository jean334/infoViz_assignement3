import React from 'react';
import './NewSlider.css';




function NewSlider({props}) {
    const handleChange = (e, index) => {
        const range = document.querySelector(".range-selected");
        range.style.left = (props.dateRange[0] / 12) * 100 + "%";
        range.style.right = 100 - (props.dateRange[1] / 13) * 100 + "%";
        const newDate = Number(e.target.value);
        const newRange = index === 0 ? [newDate, props.dateRange[1]] : [props.dateRange[0], newDate];
    
        if (newRange[0] <= newRange[1]) {
            props.setDateRange(newRange);
        }
    };

    return(
        <div className="range">
        <div className="range-slider">
            <span className="range-selected"></span>
        </div>
        <div className="range-input">
            <input 
                type="range" 
                className="min" 
                min={0}
                max={2023-2010} 
                value={props.dateRange[0]} 
                step="1"
                onChange={(e) => handleChange(e, 0)}
                />
            <input 
                type="range" 
                className="max" 
                min={0} 
                max={2023-2010} 
                value={props.dateRange[1]} 
                step="1"
                onChange={(e) => handleChange(e,1)}/>
        </div>
        
        <div className="range-price">      
            <label for="min">{2010+props.dateRange[0]}</label>
            {/*<input 
            type="number" 
            name="min" 
            step="1"
            min={2010}
            max={2023}
            value={2010+props.dateRange[0]}    
            />*/}      
            <label for="max">{2010+props.dateRange[1]}</label>
            {/*<input 
                type="number" 
                name="max" 
                step="1"
                min={2010}
                max={2023}
                value={2010+props.dateRange[1]}
            />      */}
        </div>
    </div> 
  );
  }

export default NewSlider;