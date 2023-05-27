import React, { useState } from "react";
import "./HeadAndTail.css";

function HeadAndTail() {
  const [selectedValue, setSelectedValue] = useState("");
  const [headChars, setHeadChars] = useState([]);
  const [tailChars, setTailChars] = useState([]);
  const [validationMessage, setValidationMessage] = useState("");

  const handleDropdownChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedValue === "") {
      setValidationMessage("Please select a value from the dropdown");
      return;
    }

    if (selectedValue === "H") {
      setHeadChars((prevChars) => [...prevChars, selectedValue]);
    } else if (selectedValue === "T") {
      setTailChars((prevChars) => [...prevChars, selectedValue]);
    }

    setSelectedValue("");
    setValidationMessage("");
  };

  return (
    <div className="head-tail-container">
      <h2>Head & Tail</h2>
      <div className="dropdown-container">
        <select value={selectedValue} onChange={handleDropdownChange}>
          <option value="">Select value</option>
          <option value="H">H</option>
          <option value="T">T</option>
        </select>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {validationMessage && (
        <p className="validation-message">{validationMessage}</p>
      )}
      <div className="char-columns">
        <div className="char-column">
          {headChars.map((char, index) => (
            <div key={index} className="char char-head">
              {char}
            </div>
          ))}
        </div>
        <div className="char-column">
          {tailChars.map((char, index) => (
            <div key={index} className="char char-tail">
              {char}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeadAndTail;



// import React, { useState } from 'react';

// const HeadAndTail = ({ navigateTo }) => {
//   const [selection, setSelection] = useState('');
//   const [hValues, setHValues] = useState([]);
//   const [tValues, setTValues] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleDropdownChange = (event) => {
//     setSelection(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (selection === '') {
//       setErrorMessage('Please select a value from the dropdown');
//       return;
//     }

//     if (selection === 'H') {
//       if (tValues.length > hValues.length) {
//         setHValues((prevValues) => [...prevValues, selection]);
//       } else {
//         setTValues((prevValues) => [...prevValues, selection]);
//       }
//     } else if (selection === 'T') {
//       setTValues((prevValues) => [...prevValues, selection]);
//     }

//     setSelection('');
//     setErrorMessage('');
//   };

//   return (
//     <div className="page-container">
//       <h2>Head & Tail</h2>
//       <form onSubmit={handleSubmit}>
//         <select value={selection} onChange={handleDropdownChange}>
//           <option value="" disabled>
//             Select value
//           </option>
//           <option value="H">H</option>
//           <option value="T">T</option>
//         </select>
//         <button type="submit">Submit</button>
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//       </form>
//       <div className="values-container">
//         <div className="column">
//           <h3>H</h3>
//           {hValues.map((value, index) => (
//             <p key={index}>{value}</p>
//           ))}
//         </div>
//         <div className="column">
//           <h3>T</h3>
//           {tValues.map((value, index) => (
//             <p key={index}>{value}</p>
//           ))}
//         </div>
//       </div>
//       <button onClick={() => navigateTo('home')}>Go back to Home</button>
//     </div>
//   );
// };

// export default HeadAndTail;
