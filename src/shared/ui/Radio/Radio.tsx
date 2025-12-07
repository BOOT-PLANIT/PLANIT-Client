import styles from "./Radio.module.scss";

interface Props {
  selected: boolean;
}

const Radio = ({ selected }: Props) => {
  return (
    <span className={`${styles.radio} ${selected ? styles.selected : ""}`}>
      {selected && <span className={styles.dot} />}
    </span>
  );
};
export default Radio;
