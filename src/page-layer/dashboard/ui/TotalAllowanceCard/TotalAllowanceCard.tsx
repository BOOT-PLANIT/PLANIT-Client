import { MoneyIcon } from "@/shared/assets/icons";
import { Card } from "@/shared/ui";
import { formatCurrency } from "@/shared/utils";

import styles from "./TotalAllowanceCard.module.scss";

interface TotalAllowanceCardProps {
  value: number;
}

const handleClick = () => {
  console.log("클릭");
};

const TotalAllowanceCard = ({ value }: TotalAllowanceCardProps) => {
  return (
    <Card title="총 수령액" onClick={handleClick}>
      <div className={styles.container}>
        <div className={styles.textBox}>
          <h2 className={styles.totalAllowanceText}>{formatCurrency(value)}</h2>
          <span className={styles.description}>
            수령 가능한 훈련지원금 총액입니다
          </span>
        </div>
        <div className={styles.iconBox}>
          <MoneyIcon width={24} height={24} color="var(--background)" />
        </div>
      </div>
    </Card>
  );
};

export default TotalAllowanceCard;
