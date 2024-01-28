"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assets/images/logo.svg";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
const HomePage = () => {
  const tips = [5, 10, 15, 25, 50];
  const [bill, setBill] = useState<number>();
  const [tipPercentage, setTipPercentage] = useState(0);
  const [personCount, setPersonCount] = useState<number>(1);

  const tipAmount =
    bill && personCount ? ((tipPercentage / 100) * bill) / personCount : 0;

  const amountToPay =
    bill && personCount
      ? (bill + (tipPercentage / 100) * bill) / personCount
      : 0;

  const handleReset = () => {
    setBill(0), setPersonCount(1), setTipPercentage(0);
  };

  return (
    <div className="h-screen w-screen bg-[hsl(184,14%,56%)] flex justify-center items-center flex-col gap-16 p-2 ">
      <Image src={logo} alt="logo" />
      <main className="bg-white rounded-2xl p-4 gap-10 w-full max-w-[700px] flex flex-col md:flex-row  ">
        {/* left */}
        <div className="flex flex-col gap-4 md:w-1/2">
          {/* bill */}
          <section>
            {/* <p>Bill</p> */}
            <Label>Bill</Label>
            <div className="relative">
              <input
                type="number"
                placeholder="0"
                className="text-right bg-VeryLightGrayishCyan w-full h-[30px] px-2 border-2 border-transparent hover:border-strongCyan cursor-pointer rounded-lg text-VeryDarkCyan font-extrabold outline-VeryDarkCyan "
                value={bill}
                onChange={(event) => setBill(event.target.valueAsNumber)}
              />
              <BsCurrencyDollar className="absolute top-1.5 left-1.5 text-LightGrayishCyan font-extrabold " />
            </div>
          </section>
          {/* select tip */}
          <section className="py-1 ">
            <p>Select Tip %</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 gap-2">
              {tips.map((tip, index) => (
                <TipButton onClick={() => setTipPercentage(tip)} key={index}>
                  {tip}%
                </TipButton>
              ))}
              <input
                type="number"
                placeholder="Custom"
                className=" bg-VeryLightGrayishCyan w-full h-[38px] px-2 border-2 border-transparent hover:border-strongCyan cursor-pointer rounded-lg text-VeryDarkCyan font-extrabold text-center placeholder-VeryDarkCyan "
                value={tipPercentage}
                onChange={(event) =>
                  setTipPercentage(event.target.valueAsNumber)
                }
              />
            </div>
            {/* {tipPercentage}% */}
          </section>

          {/* Number of People section */}
          <section>
            <Label className=""> Number of People </Label>
            <div className="relative">
              <input
                type="number"
                placeholder="0"
                className=" text-right bg-VeryLightGrayishCyan w-full h-[30px] px-2 border-2 border-transparent hover:border-red-300 cursor-pointer rounded-lg text-VeryDarkCyan font-extrabold outline-VeryDarkCyan "
                value={personCount}
                onChange={(event) => setPersonCount(event.target.valueAsNumber)}
              />
              <FaUser className=" absolute top-2 left-1.5 text-sm text-LightGrayishCyan " />
            </div>
            {/* {personCount} */}
          </section>
        </div>
        {/* right */}
        <div className="bg-VeryDarkCyan md:w-1/2 rounded-xl p-5 flex flex-col justify-between gap-6  ">
          <section className="flex  flex-col gap-5 p-2">
            <PersonBill label="Tip Amount" bill={+tipAmount.toFixed(2)} />
            <PersonBill label="Total" bill={+amountToPay.toFixed(2)} />
          </section>

          <button
            className="bg-strongCyan w-full text-VeryDarkCyan rounded font-bold h-[38px] "
            onClick={handleReset}
          >
            RESET
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;

const Label = (props: React.HtmlHTMLAttributes<HTMLLabelElement>) => {
  return (
    <div>
      <label
        {...props}
        htmlFor=" "
        className="text-[hsl(186,14%,43%)]  "
      ></label>
    </div>
  );
};

const TipButton = (props: React.HtmlHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className=" bg-VeryDarkCyan hover:bg-strongCyan  text-white font-semibold w-full h-[38px] rounded-md "
    ></button>
  );
};

type PersonBillType = {
  label: string;
  bill: number;
};
const PersonBill = (props: PersonBillType) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-white text-sm "> {props.label} </p>
        <p className="text-GrayishCyan text-xs"> / person </p>
      </div>
      <p className="text-strongCyan text-3xl font-extrabold">${props.bill}</p>
    </div>
  );
};
