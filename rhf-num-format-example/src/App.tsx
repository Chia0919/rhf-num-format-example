import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import Cleave from "cleave.js/react";
import BigNumber from "bignumber.js";
import { amtStr, amtFloat } from "./formatter";

interface Inputs {
  subtotal: string;
  amount: string;
  total: string;
}
const CurrencyFormat = ({ onChange, value, ...rest }: any) => {
  const [currency, setCurrency] = React.useState(value / 100);
  return (
    <NumberFormat
      {...rest}
      value={currency}
      thousandSeparator={true}
      decimalScale={2.1}
      onValueChange={(target) => {
        setCurrency(target?.floatValue as any);
        onChange((target?.floatValue as any) * 100);
      }}
      isNumericString
      prefix="MYR "
    />
  );
};

function App() {
  const { register, handleSubmit, watch, setValue, control } = useForm<Inputs>(
    {}
  );
  const onSubmit = (data: any) => console.log(data.amount?.replace(/,/g, ""));
  const { subtotal, amount, total } = watch();
  console.log(amount, "amount");
  console.log(subtotal, "subtotal");

  useEffect(() => {
    const totalAmount: BigNumber = new BigNumber(
      subtotal?.replace(/,/g, "")
    ).plus(amount?.replace(/,/g, ""));
    setValue("total", amtStr(totalAmount));
  }, [subtotal, amount]);
  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        {/* <label htmlFor="priceInCents">Price</label>
        <Controller name="itemPrice" control={control} as={CurrencyFormat} />
        <br /> */}

        <label htmlFor="priceInCents">Amount</label>

        <Controller
          name="amount"
          control={control}
          as={Cleave}
          placeholder="0.00"
          options={{
            numeral: true,
            numeralPositiveOnly: true,
          }}
        />
        <br />
        <label htmlFor="priceInCents">subtotal</label>

        <Controller
          name="subtotal"
          control={control}
          as={Cleave}
          placeholder="0.00"
          options={{
            numeral: true,
            numeralPositiveOnly: true,
          }}
        />
        <br />
        <label htmlFor="priceInCents">Total</label>

        <Controller
          readOnly
          name="total"
          control={control}
          as={Cleave}
          placeholder="0.00"
          options={{
            numeral: true,
            numeralPositiveOnly: true,
          }}
        />
        <br />
        <input
          type="submit"
          onClick={() =>
            alert(`Amount: ${amount} subtotal: ${subtotal} total: ${total}`)
          }
        />
      </form>
    </div>
  );
}

export default App;
