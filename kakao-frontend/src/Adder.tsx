import { useState, ChangeEvent } from "react";

const Adder = () => {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);

  const ChangeNumber1 = (event: ChangeEvent<HTMLInputElement>) => {
    const number = event.currentTarget.value;

    if (number.length == 0) setNumber1(0);
    else {
      setNumber1(Number.parseInt(number));
    }
  };

  const ChangeNumber2 = (event: ChangeEvent<HTMLInputElement>) => {
    const number = event.currentTarget.value;

    if (number.length == 0) setNumber2(0);
    else {
      setNumber2(Number.parseInt(number));
    }
  };

  return (
    <section>
      <input type="text" onChange={ChangeNumber1} />
      +
      <input type="text" onChange={ChangeNumber2} />
      <section>
        result:{number1}+{number2}={number1 + number2}
      </section>
    </section>
  );
};
export default Adder;
