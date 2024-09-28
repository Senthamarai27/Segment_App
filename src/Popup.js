import React, { useState } from "react";

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" }
];

function Popup({ onSubmit, onClose }) {
  const [segmentName, setSegmentName] = useState("");
  const [schemaDropdowns, setSchemaDropdowns] = useState([{ value: "", id: 1 }]);

  const handleAddSchema = () => {
    setSchemaDropdowns([
      ...schemaDropdowns,
      { value: "", id: schemaDropdowns.length + 1 }
    ]);
  };

  const handleDropdownChange = (e, index) => {
    const updatedDropdowns = schemaDropdowns.map((dropdown, idx) =>
      idx === index ? { ...dropdown, value: e.target.value } : dropdown
    );
    setSchemaDropdowns(updatedDropdowns);
  };

  // Helper function to get available schema options for a specific dropdown
  const getAvailableOptions = (index) => {
    // Get the values already selected in other dropdowns, excluding the current one
    const selectedValues = schemaDropdowns
      .filter((dropdown, idx) => idx !== index)
      .map((dropdown) => dropdown.value);

    // Return options that have not been selected
    return schemaOptions.filter((opt) => !selectedValues.includes(opt.value));
  };

  const handleSubmit = () => {
    const schema = schemaDropdowns
      .filter((dropdown) => dropdown.value) // Filter out any empty dropdowns
      .map((dropdown) => ({
        [dropdown.value]: schemaOptions.find((opt) => opt.value === dropdown.value)?.label
      }));

    onSubmit({ segment_name: segmentName, schema });

    // Reset the form fields after submission
    setSegmentName("");
    setSchemaDropdowns([{ value: "", id: 1 }]);
  };

  return (
    <div className="popup">
      <label>Enter the Name of the Segment</label>
      <input
        type="text"
        placeholder="Segment Name"
        value={segmentName}
        onChange={(e) => setSegmentName(e.target.value)}
      />

      <div className="select-box">
        {schemaDropdowns.map((dropdown, index) => (
          <select
            key={dropdown.id}
            value={dropdown.value}
            onChange={(e) => handleDropdownChange(e, index)}
          >
            <option value="" disabled>
              Select Schema
            </option>
            {getAvailableOptions(index).map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}
      </div>

      <a  onClick={handleAddSchema}>
        + Add new schema
      </a>

      <br />

      {/* Action Buttons */}
      <button className="save-btn" onClick={handleSubmit}>
        Save Segment
      </button>
      <button className="cancel-btn" onClick={onClose}>
        Cancel
      </button>
    </div>
  );
}

export default Popup;
