type TitleText = {
  title: string;
  subTitle?: string;
};

const Title = (props: TitleText) => {
  const { title, subTitle } = props;
  return (
    <>
      <h1>{title}</h1>
      <hr />
      {subTitle && <h3>{subTitle}</h3>}
    </>
  );
};

export default Title;
