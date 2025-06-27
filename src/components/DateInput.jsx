import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function DateInput({ dueto, onChange, setIsVisible, inputClass }) {
  return (
    <DatePicker
      className={inputClass}
      name="dueto"
      selected={dueto}
      onChange={onChange}
      showTimeInput={true}
      dateFormat="MMMM d, yyyy h:mm aa"
      shouldCloseOnSelect={false}
      showIcon={true}
      calendarIconClassName="calendar-icon"
    />
  );
}
export default React.memo(DateInput);
