import { useState, ChangeEvent } from "react";
const ConditionalText = () => {
  const [text, setText] = useState<string>("");
  const updateText = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };
  return (
    <>
      <input type="text" onChange={updateText} />
      <article>{text.length > 5 && text}</article>
    </>
  );
};
export default ConditionalText;
