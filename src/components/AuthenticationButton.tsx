import GenericButton from "../components/generic/GenericButton";

interface Props {
  states: {
    authenticationErrors: string[] | null;
    loadingButtonAnimation: boolean;
  };
  callback: () => void;
}

const AuthenticationButton = ({ states, callback }: Props) => {
  return (
    <GenericButton
      style={{
        animation: `${
          states.authenticationErrors ? "error_button_shake 0.2s ease" : ""
        }`,
        backgroundColor: `${states.authenticationErrors ? "#cb0d20" : ""}`,
        width: "100%",
      }}
      callback={callback}
    >
      {states.loadingButtonAnimation ? (
        <div
          style={{
            width: "25px",
            height: "25px",
            borderRadius: "100em",
            borderBottom: "5px solid #fff",
            animation: "loading_spin 0.3s",
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
