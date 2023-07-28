import Loading from "../components/Loading";
import MainMenu from "../components/MainMenu";

const DefaultLayout = (props) => {
  return (
    <>
      <MainMenu />
      <div className="container-fluid pt-2">{props.children}</div>
    </>
  );
};

export default DefaultLayout;
