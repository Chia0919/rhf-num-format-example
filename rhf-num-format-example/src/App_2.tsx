import React, { useState, useEffect } from "react";
import BigNumber from "bignumber.js";
import Cleave from "cleave.js/react";
import { amtStr } from "./formatter";

export default function App_2() {
  const [value1, setstate1] = useState("");
  const [value2, setstate2] = useState("");
  const [total, setstateTotal] = useState("");
  console.log(value1);
  console.log(value2);
  console.log(amtStr(total), "total");

  useEffect(() => {
    const totalAmount: BigNumber = new BigNumber(value1.replace(/,/g, "")).plus(
      value2.replace(/,/g, "")
    );
    setstateTotal(totalAmount as any);
  }, [value1.toString(), value2]);
  return (
    <div>
      {/* <input value={value1} onChange={(e) => setstate1(e.target.value)} />
      <input value={value2} onChange={(e) => setstate2(e.target.value)} /> */}
      <Cleave
        value={value1}
        options={{
          numeral: true,
          numeralPositiveOnly: true,
        }}
        onChange={(e) => setstate1(e.target.value)}
        className="form-field"
      />
      <Cleave
        value={value2}
        options={{
          numeral: true,
          numeralPositiveOnly: true,
        }}
        onChange={(e) => setstate2(e.target.value)}
        className="form-field"
      />
      <p>{amtStr(total)}</p>
    </div>
  );
}
