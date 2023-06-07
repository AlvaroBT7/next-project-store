import GenericButton from "../components/generic/GenericButton";

interface 

const AuthenticationButton = ( {} ) => {
  return (
    <GenericButton
      style={{
        animation: `${
          authenticationError ? "error_button_shake 0.2s ease" : ""
        }`,
        backgroundColor: `${authenticationError ? "#ce0927" : ""}`,
        width: "100%",
      }}
      callback={handleEnterButtonClick}
    >
      {loadingButtonAnimation ? (
        <div
          style={{
            width: "25px",
            height: "25px",
            borderRadius: "100em",
            borderBottom: "5px solid #fff",
            animation: "spin 0.3s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        ></div>
      ) : (
        "Enter"
      )}
    </GenericButton>
  );
};

export default AuthenticationButton;
