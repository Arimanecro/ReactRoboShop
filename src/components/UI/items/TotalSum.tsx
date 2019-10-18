import React from "react";
import Currency from "../../../classes/Currency";

export default React.memo((props: any) => {
  return <p className="total">Total: {Currency.currencyPrice(props.sum)}</p>;
});
