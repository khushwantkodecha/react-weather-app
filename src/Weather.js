import React from "react";

function Weather(props) {
  return (
    <React.Fragment>
      {props.city && !props.error && (
        <div className="cards p-4">
          <h1>{props.city}</h1>
          <h5 className="py-4">
            <i className={`wi ${props.icon} display-1`}></i>
          </h5>
          <h1 className="py-4">{props.temparature}&deg;</h1>
          {props.minMax(props.temp_min, props.temp_max)}
          <h4 className="py-3">{props.description}</h4>
        </div>
      )}
    </React.Fragment>
  );
}

export default Weather;
