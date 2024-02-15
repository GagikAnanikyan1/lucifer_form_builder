import React from "react";
import Fields from "./Fields";

const Body = ({ payment, fields, printableFields, gridOptions }) => {
  return (
    <Fields
      fields={fields}
      payment={payment}
      printableFields={printableFields}
      gridOptions={gridOptions}
    />
  );
};

export default Body;
