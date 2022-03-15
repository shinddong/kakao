type PhotoType = {
  address: string;
  description: string;
};

const Photo = (props: PhotoType) => {
  const { address, description } = props;
  return (
    <>
      {<img src={address} />}
      {<article>{description}</article>}
    </>
  );
};
export default Photo;
