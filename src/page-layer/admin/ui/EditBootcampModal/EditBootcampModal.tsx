"use client";
import { useForm } from "react-hook-form";

import {
  Bootcamp,
  BootcampRequest,
  useUpdateBootcamp,
} from "@/feature/bootcamp";
import { useToast } from "@/shared/lib";
import { Button, Input, Modal } from "@/shared/ui";

import styles from "./EditBootcampModal.module.scss";

interface EditBootcampModalProps {
  onClose: () => void;
  bootcamp: Bootcamp;
}

const EditBootcampModal = ({ onClose, bootcamp }: EditBootcampModalProps) => {
  const updateBootcamp = useUpdateBootcamp();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BootcampRequest>({
    defaultValues: {
      organizer: bootcamp.organizer,
      name: bootcamp.name,
      isKdt: bootcamp.isKdt,
      classDates: [""],
    },
  });
  const onSubmit = (data: BootcampRequest) => {
    updateBootcamp.mutate(
      { id: bootcamp.id, data },
      {
        onError: () => {
          toast.error("부트캠프 수정에 실패하였습니다.");
        },
      },
    );
    onClose();
  };

  return (
    <Modal title="부트캠프 정보 수정" onClose={onClose}>
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.description}>
            부트캠프의 상세정보를 수정하세요.
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

            <div className={styles.buttonLayout}>
              <Button onClick={onClose} variant="outline" width="70px">
                취소
              </Button>
              <Button type="submit" width="120px">
                부트캠프 수정
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EditBootcampModal;
