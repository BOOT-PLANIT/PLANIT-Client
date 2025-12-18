"use client";
import { AxiosError } from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Bootcamp, BootcampList } from "@/feature/bootcamp";
import { useEnrollBootcamp } from "@/feature/enrollment";
import { SuccessIcon } from "@/shared/assets";
import { useToast } from "@/shared/lib";
import { Button, Card } from "@/shared/ui";

import styles from "./Onboarding.module.scss";

const Onboarding = () => {
  const [selectedBootcamp, setSelectedBootcamp] = useState<Bootcamp | null>(
    null,
  );
  const enrollBootcamp = useEnrollBootcamp();
  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get("userType");

  const handleRegister = () => {
    if (selectedBootcamp) {
      enrollBootcamp.mutate(selectedBootcamp.id, {
        onSuccess: () => {
          toast.success("부트캠프 신청이 완료되었습니다.");
          router.replace("/mypage");
        },
        onError: (error) => {
          let message = "등록 중 오류가 발생했습니다.";

          if (error instanceof AxiosError) {
            message =
              error.response?.data?.message ??
              error.response?.data?.error ??
              message;
          }
          toast.error(message);
        },
      });
    } else {
      toast.error("부트캠프를 찾지못했습니다.");
    }
  };
  const handleCancel = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image alt="logo" src="/logo.svg" width={150} height={150} priority />
        <span className={styles.title}>교육 프로그램 등록을 시작해볼까요?</span>
        <span className={styles.description}>
          등록한 교육 프로그램을 기반으로 출석, 기간, 현황 분석이 제공됩니다.
        </span>
      </div>
      <div className={styles.card}>
        <Card title="교육과정 선택">
          <span className={styles.description}>
            등록하고 싶은 부트캠프 프로그램을 선택하세요!
          </span>
          <div className={styles.tableScroll}>
            <BootcampList
              manage={false}
              onSelectBootcamp={setSelectedBootcamp}
            />
          </div>
          <div className={styles.footer}>
            {userType === "existing" && (
              <Button onClick={handleCancel} variant="outline" width="100px">
                취소
              </Button>
            )}
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

export default Onboarding;
