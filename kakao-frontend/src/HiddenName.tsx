import { ChangeEvent, useState } from "react";
const HiddenName = () => {
  const [name, setName] = useState<string>("");
  const updateName = (event: ChangeEvent<HTMLInputElement>) => {
    let newName = event.currentTarget.value;
    if (newName.length > 2) {
      const startName = newName.substring(0, 1);
      const endName = newName.substring(newName.length - 1, newName.length);
      const hiddenPart = "*".repeat(newName.length - 2);
      newName = startName + hiddenPart + endName;
    }
    setName(newName);
  };
  /*
   const starname = event.currentTarget.value;
       if (starname.length >= 3) {
         setName(
            starname[0] +"*".repeat(starname.length - 2) +
          starname[starname.length - 1]);
    } 
      else setName(starname);
  };*/
  return (
    <>
      <input type="text" onChange={updateName} />
      <article>{name}</article>
    </>
  );
};
export default HiddenName;
