"use client";
import Image from "next/image";
import { useState } from "react";

import BootcampList, {
  Bootcamp,
} from "@/features/BootcampList/ui/BootcampList";
import { SuccessIcon } from "@/shared/assets";
import { Button, Card } from "@/shared/ui";

import styles from "./AddBootcamp.module.scss";

const AddBootcamp = () => {
  const [selectedBootcamp, setSelectedBootcamp] = useState<Bootcamp | null>(
    null,
  );

  const handleRegister = () => {
    console.log("부트캠프 등록", selectedBootcamp);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image alt="logo" src="/logo.svg" width={150} height={150} priority />
        <span className={styles.title}>교육 프로그램 등록을 시작해볼까요?</span>
        <span className={styles.subtitle}>
          등록한 교육 프로그램을 기반으로 출석, 기간, 현황 분석이 제공됩니다.
        </span>
      </div>
      <div className={styles.card}>
        <Card variant="solid" title="교육과정 선택">
          <span className={styles.subtitle}>
            등록하고 싶은 부트캠프 프로그램을 선택하세요!
          </span>
          <div className={styles.tableScroll}>
            <BootcampList
              manage={false}
              onSelectBootcamp={setSelectedBootcamp}
            />
          </div>
          <div className={styles.footer}>
            <Button
              disabled={!selectedBootcamp}
              variant="primary"
              width="200px"
              icon={<SuccessIcon />}
              onClick={handleRegister}
            >
              교육과정 등록
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddBootcamp;
