import { ChangeEvent, useState } from "react";
const WelcomeName = () => {
  const [name, setName] = useState<string>();
  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  return (
    <section>
      <input type="text" onChange={changeName} />
      <article>반갑습니다 {name}님</article>
    </section>
  );
};
export default WelcomeName;
