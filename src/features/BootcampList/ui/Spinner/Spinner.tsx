import Styles from "./Spinner.module.scss";
const Spinner = () => {
  return (
    <div className={Styles.loader}>
      <div className={Styles.spinner} />
    </div>
  );
};
export default Spinner;
