import { ClockIcon } from "@/shared/assets/icons";
import { Card } from "@/shared/ui";

import styles from "./RemainingBalanceCard.module.scss";

interface BalanceData {
  leftBalanceValue: number;
  totalBalanceValue: number;
}

interface RemainingBalanceCardProps {
  values: BalanceData;
}

const handleClick = () => {
  console.log("클릭");
};

const RemainingBalanceCard = ({ values }: RemainingBalanceCardProps) => {
  return (
    <Card title="남은 연차" onClick={handleClick}>
      <div className={styles.container}>
        <div className={styles.textBox}>
          <h2 className={styles.balanceText}>
            {values.leftBalanceValue}/{values.totalBalanceValue}
          </h2>
          <span className={styles.description}>현재 남은 연차 개수입니다</span>
        </div>
        <div className={styles.iconBox}>
          <ClockIcon width={24} height={24} color="var(--background)" />
        </div>
      </div>
    </Card>
  );
};

export default RemainingBalanceCard;
