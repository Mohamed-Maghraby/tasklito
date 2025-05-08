import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useRender from "../hooks/useRender";

const DateInput = React.memo(({dueto, onChange})=> {
  useRender('DateInput', 'document')
  return (
    <DatePicker 
    name="dueto"
    selected={dueto} 
    onChange={onChange} 
    showTimeInput={true}
    dateFormat="MMMM d, yyyy h:mm aa"
    />
  );

})

export default DateInput
