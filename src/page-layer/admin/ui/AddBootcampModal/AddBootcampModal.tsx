"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  BootcampRequest,
  useCreateBootcamp,
  useParseBootcampText,
} from "@/feature/bootcamp";
import { useToast } from "@/shared/lib";
import { Button, Input, Modal } from "@/shared/ui";

import styles from "./AddBootcampModal.module.scss";

interface AddBootcampModalProps {
  onClose: () => void;
}

interface BootcampFormValues {
  organizer: string;
  name: string;
  isKdt: boolean;
  classDatesText: string;
}

const AddBootcampModal = ({ onClose }: AddBootcampModalProps) => {
  const [parseText, setParseText] = useState("");
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BootcampFormValues>({
    defaultValues: {
      isKdt: false,
    },
  });

  const parseMutation = useParseBootcampText();
  const createBootcamp = useCreateBootcamp();

  const handleParse = async () => {
    if (!parseText.trim()) {
      toast.error("파싱할 텍스트를 입력해주세요.");
      return;
    }

    try {
      const result = await parseMutation.mutateAsync({
        text: parseText,
      });

      reset({
        organizer: result.organizer ?? "",
        name: result.name ?? "",
        isKdt: result.isKdt ?? false,
        classDatesText: (result.classDates ?? []).join(", "),
      });
    } catch {
      toast.error("복사한 내용을 인식하지 못했습니다.");
    }
  };

  const onSubmit = (formdata: BootcampFormValues) => {
    const classDates = formdata.classDatesText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (classDates.length === 0) {
      toast.error("부트캠프 일정을 입력해주세요.");
      return;
    }

    const payload: BootcampRequest = {
      organizer: formdata.organizer,
      name: formdata.name,
      isKdt: formdata.isKdt,
      classDates,
    };
    createBootcamp.mutate(payload, {
      onSuccess: () => {
        toast.success("부트캠프가 등록되었습니다.");
        onClose();
      },
      onError: () => {
        toast.error("부트캠프 등록에 실패하였습니다.");
      },
    });
  };
  return (
    <Modal title="새로운 부트캠프 추가" onClose={onClose}>
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.description}>
            부트캠프의 세부정보를 입력하고 일정을 설정하세요.
          </div>
          <div className={styles.formLayout}>
            <textarea
              className={styles.textarea}
              value={parseText}
              onChange={(e) => setParseText(e.target.value)}
              placeholder="고용24에서 복사한 부트캠프 정보를 넣어주세요."
            />
            <div className={styles.buttonLayout}>
              <Button
                variant="outline"
                type="button"
                onClick={() => setParseText("")}
                width="70px"
              >
                초기화
              </Button>
              <Button
                type="button"
                onClick={handleParse}
                width="150px"
                disabled={parseMutation.isPending}
              >
                {parseMutation.isPending ? "파싱 중..." : "부트캠프 일정 파싱"}
              </Button>
            </div>
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
                className={`${styles.textarea} ${errors.classDatesText ? styles.textareaError : ""}`}
                aria-invalid={errors.classDatesText ? true : undefined}
                aria-describedby={
                  errors.classDatesText ? "classDates-error" : undefined
                }
                placeholder="부트캠프 일정을 넣어주세요.  ex. YYYY-MM-DD, YYYY-MM-DD, ..."
                {...register("classDatesText", {
                  required: "부트캠프 일정은 필수입니다.",
                })}
              ></textarea>
              {errors.classDatesText && (
                <span className={styles.errorMessage}>
                  {errors.classDatesText.message}
                </span>
              )}
            </div>
            <div className={styles.buttonLayout}>
              <Button onClick={onClose} variant="outline" width="70px">
                취소
              </Button>
              <Button
                type="submit"
                width="120px"
                disabled={createBootcamp.isPending}
              >
                {createBootcamp.isPending ? "등록 중..." : "부트캠프 추가"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddBootcampModal;
