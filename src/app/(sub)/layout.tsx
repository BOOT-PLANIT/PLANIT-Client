import styles from "./layout.module.scss";
const SubLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default SubLayout;
