import React, { Component } from "react";

class Loader extends Component {
  render() {
    return (
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{
            margin: "0px",
            position: "fixed",
            top: "50%",
            left: "50%",
            // height: '100vh',
            transform: "translate(-50%,-50%)",
          }}
          width="217px"
          height="217px"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <circle
            cx="50"
            cy="50"
            r="32"
            stroke-width="5"
            stroke="#233C3B"
            stroke-dasharray="50.26548245743669 50.26548245743669"
            fill="none"
            stroke-linecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="1s"
              repeatCount="indefinite"
              keyTimes="0;1"
              values="0 50 50;360 50 50"
            />
          </circle>
          <circle
            cx="50"
            cy="50"
            r="26"
            stroke-width="5"
            stroke="#53C4BF"
            stroke-dasharray="40.840704496667314 40.840704496667314"
            stroke-dashoffset="40.840704496667314"
            fill="none"
            stroke-linecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="1s"
              repeatCount="indefinite"
              keyTimes="0;1"
              values="0 50 50;-360 50 50"
            />
          </circle>
        </svg>
      </div>
    );
  }
}

export default Loader;
