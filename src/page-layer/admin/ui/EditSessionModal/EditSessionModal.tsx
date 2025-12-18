"use client";
import { useState } from "react";

import { Bootcamp } from "@/feature/bootcamp";
import {
  Session,
  useCreateSessions,
  useDeleteSessions,
  useSessionsByBootcamp,
} from "@/feature/session";
import { useToast } from "@/shared/lib";
import { Button, Calendar, Modal, Spinner } from "@/shared/ui";
import { DateData } from "@/shared/ui/Calendar";
import { parseDateString } from "@/shared/utils";

import styles from "./EditSessionModal.module.scss";

interface EditSessionModalProps {
  onClose: () => void;
  bootcamp: Bootcamp;
}

const getDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

interface AddedLecture {
  classDate: string;
}

interface RemovedLecture {
  id: number;
  classDate: string;
}

const EditSessionModal = ({ onClose, bootcamp }: EditSessionModalProps) => {
  const toast = useToast();
  const createSessions = useCreateSessions();
  const deleteSessions = useDeleteSessions();
  const [addedLectures, setAddedLectures] = useState<Map<string, AddedLecture>>(
    new Map(),
  );
  const [removedLectures, setRemovedLectures] = useState<
    Map<string, RemovedLecture>
  >(new Map());

  const addedList = Array.from(addedLectures.values());
  const removedList = Array.from(removedLectures.values());
  const removedIdList = removedList.map((v) => v.id);

  const isDisabled = addedLectures.size > 0 || removedLectures.size > 0;

  const { data, isLoading, isError } = useSessionsByBootcamp(bootcamp.id);
  if (isLoading) {
    return (
      <Modal title="부트캠프 일정 수정" onClose={onClose}>
        <div className={styles.layout}>
          <Spinner size="lg" />
        </div>
      </Modal>
    );
  }

  if (isError || !data) {
    return (
      <Modal title="부트캠프 일정 수정" onClose={onClose}>
        <div className={styles.layout}>
          일정 정보를 불러오지 못했습니다.
          <Button onClick={onClose}>닫기</Button>
        </div>
      </Modal>
    );
  }
  //서버 원본세션객체
  const totalSession: Session[] = data.data;

  //세션id와 강의날짜 매핑
  const buildSessionMap = (data: Session[]) => {
    const map = new Map<string, number>();

    data.forEach(({ classDate, id }) => {
      map.set(classDate, id);
    });
    return map;
  };
  const sessionMap = buildSessionMap(totalSession);

  const handleSelectSession = (dates: Date[]) => {
    const stringSelectDate = dates.map((date) => getDateKey(date));
    const isAdd = new Map<string, AddedLecture>();
    const isRemove = new Map<string, RemovedLecture>();

    stringSelectDate.forEach((date) => {
      const hasSession = sessionMap.has(date);

      if (hasSession) {
        const id = sessionMap.get(date)!;
        isRemove.set(date, { classDate: date, id: id });
        return;
      }
      isAdd.set(date, { classDate: date });
    });
    setAddedLectures(isAdd);
    setRemovedLectures(isRemove);
  };

  const handleEditSession = () => {
    if (addedList.length <= 0 && removedIdList.length <= 0) {
      return toast.error("선택하신 날짜가 없습니다.");
    }
    if (addedList.length > 0) {
      createSessions.mutate({ bootcampId: bootcamp.id, sessions: addedList });
    }
    if (removedIdList.length > 0) {
      deleteSessions.mutate({ sessionIds: removedIdList });
    }
    toast.success("일정 수정 완료하였습니다.");
    onClose();
  };

  const calendarSessionDate: DateData[] = totalSession.map((date) => {
    return { date: parseDateString(date.classDate), isCurrentUnit: true };
  });

  return (
    <Modal title="부트캠프 일정 수정" onClose={onClose}>
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.description}>
            부트캠프의 일정을 수정하세요.
          </div>
          <div className={styles.calendarLayout}>
            <Calendar
              onDateSelect={handleSelectSession}
              onEdit={handleEditSession}
              dates={calendarSessionDate}
              unitColors={{ currentUnit: "var(--color-purple-lightest)" }}
              allowSelectionWithoutData={true}
            />
            <div className={styles.sessionLayout}>
              <div className={styles.addSessionLayout}>
                <span className={styles.sessionTitle}>추가될 강의일</span>
                <div className={styles.addSession}>
                  {addedList.map((lecture) => (
                    <div className={styles.addDate} key={lecture.classDate}>
                      {lecture.classDate}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.removeSessionLayout}>
                <span className={styles.sessionTitle}>삭제될 강의일</span>
                <div className={styles.removeSession}>
                  {removedList.map((lecture) => (
                    <div className={styles.deleteDate} key={lecture.id}>
                      {lecture.classDate}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.buttonLayout}>
            <Button onClick={onClose} variant="outline" width="70px">
              취소
            </Button>
            <Button
              disabled={!isDisabled}
              onClick={handleEditSession}
              width="120px"
            >
              일정 수정
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditSessionModal;
