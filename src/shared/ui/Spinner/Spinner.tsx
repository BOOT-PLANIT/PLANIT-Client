import Styles from "./Spinner.module.scss";

type SpinnerSize = "sm" | "md" | "lg";
interface SpinnerProps {
  size?: SpinnerSize;
}

const sizeMap: Record<SpinnerSize, string> = {
  sm: "25px",
  md: "50px",
  lg: "80px",
};

const boderSizeMap: Record<SpinnerSize, string> = {
  sm: "3px solid var(--color-grey-light-strong)",
  md: "4px solid var(--color-grey-light-strong)",
  lg: "5px solid var(--color-grey-light-strong)",
};

const Spinner = ({ size = "sm" }: SpinnerProps) => {
  const sizeValue = sizeMap[size];
  const boderSizeValue = boderSizeMap[size];
  const topBoderColor = "var(--color-blue-normal)";

  return (
    <div className={Styles.loader}>
      <div
        className={Styles.spinner}
        style={{
          width: sizeValue,
          height: sizeValue,
          border: boderSizeValue,
          borderTopColor: topBoderColor,
        }}
      />
    </div>
  );
};
export default Spinner;
