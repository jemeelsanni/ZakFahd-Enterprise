import FormHeader from "./FormHeader";
import FormBody from "./Form";

const FormContainer = () => {
  return (
    <div className=" bg-white/50 form-box w-[40rem] py-[40px] px-[20px] relative bg-blue-200  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20  ">
      <FormHeader />
      <FormBody />
    </div>
  );
};

export default FormContainer;
