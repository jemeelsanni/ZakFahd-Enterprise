import FormContainer from "../../components/auth/FormContainer";
import background from "../../assets/images/background.jpg";
const Login = () => {
  return (
    <div className=" w-full h-screen flex relative justify-center items-center ">
      {/* <img
        src={background}
        alt=""
        className=" absolute -z-[99] w-full h-full object-cover"
      /> */}
      <FormContainer />
    </div>
  );
};

export default Login;
