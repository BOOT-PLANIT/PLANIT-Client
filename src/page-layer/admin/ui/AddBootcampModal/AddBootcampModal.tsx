"use client";
import { useForm } from "react-hook-form";

import { Button, Input, Modal } from "@/shared/ui";

import styles from "./AddBootcampModal.module.scss";

interface AddBootcampModalProps {
  onClose: () => void;
}

interface BootcampFormValues {
  organizer: string;
  name: string;
  isKdt: boolean;
  classDates: string;
}

const AddBootcampModal = ({ onClose }: AddBootcampModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BootcampFormValues>({
    defaultValues: {
      isKdt: false,
    },
  });

  const onSubmit = (data: BootcampFormValues) => {
    console.log("제출 데이터:", data);
    onClose();
  };

  return (
    <Modal title="새로운 부트캠프 추가" onClose={onClose}>
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.description}>
            부트캠프의 세부정보를 입력하고 일정을 설정하세요.
          </div>

          <form className={styles.formLayout} onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="훈련기관 이름"
              placeholder="ex. 멀티 캠퍼스"
              errorMessage={errors.organizer?.message}
              {...register("organizer", {
                required: "훈련기관 이름은 필수입니다.",
              })}
            />
            <Input
              label="부트캠프 이름"
              placeholder="ex. [LG유플러스] 유레카 프론트엔드 개발자"
              errorMessage={errors.name?.message}
              {...register("name", {
                required: "부트캠프 이름은 필수입니다.",
              })}
            />
            <label className={styles.kdtCheckBox}>
              <input type="checkbox" {...register("isKdt")} />
              <div className={styles.kdtContent}>
                <span className={styles.kdtTitle}>
                  K-Digital Training (KDT) 훈련
                </span>
                <span className={styles.kdtDescription}>
                  이 부트캠프가 KDT 훈련인지 확인하세요
                </span>
              </div>
            </label>
            <div>
              <textarea
                className={`${styles.textarea} ${errors.classDates ? styles.textareaError : ""}`}
                aria-invalid={errors.classDates ? true : undefined}
                aria-describedby={
                  errors.classDates ? "classDates-error" : undefined
                }
                placeholder="고용24에서 복사한 부트캠프 일정을 넣어주세요."
                {...register("classDates", {
                  required: "부트캠프 일정은 필수입니다.",
                })}
              ></textarea>
              {errors.classDates && (
                <span className={styles.errorMessage}>
                  {errors.classDates.message}
                </span>
              )}
            </div>
            <div className={styles.buttonLayout}>
              <Button onClick={onClose} variant="outline" width="70px">
                취소
              </Button>
              <Button type="submit" width="120px">
                부트캠프 추가
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddBootcampModal;
