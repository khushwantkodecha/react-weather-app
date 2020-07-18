import React from "react";

function Form(props) {
  return (
    <div className="container">
      {props.error && (
        <div className="alert alert-danger">
          Plese Type Correct City and Country...
        </div>
      )}
      {props.formError && (
        <div className="alert alert-danger">Plese Type City and Country...</div>
      )}
      <form>
        <div className="row">
          <div className="col-md-3 offset-md-2">
            <input
              type="text"
              className="form-control"
              name="city"
              placeholder="city"
              onChange={(e) => props.hadnleChange(e)}
              autoComplete="off"
            />
          </div>

          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="country"
              placeholder="country"
              onChange={(e) => props.hadnleChange(e)}
              autoComplete="off"
            />
          </div>

          <div className="col-md-3 mt-md-0 text-md-left p-3">
            <button
              className="btn btn-warning"
              onClick={(e) => props.loadWeatherData(e)}
            >
              Get Weather
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
