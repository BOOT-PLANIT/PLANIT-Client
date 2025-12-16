"use client";
import { useState } from "react";

import { Bootcamp } from "@/feature/bootcamp";
import { Button, Calendar, Modal } from "@/shared/ui";
import { DateData } from "@/shared/ui/Calendar";
import { parseDateString } from "@/shared/utils";

import styles from "./EditSessionModal.module.scss";

interface EditSessionModalProps {
  onClose: () => void;
  bootcamp: Bootcamp | null;
}

const getDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

//api 매칭해야됨 임시
interface SessionDateDto {
  id: number;
  classDate: string;
}

interface AddedLecture {
  classDate: string;
}

interface RemovedLecture {
  id: number;
  classDate: string;
}

const EditSessionModal = ({ onClose, bootcamp }: EditSessionModalProps) => {
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

  //api연동필요
  if (!bootcamp) return <div>부트캠프에 입력된 강의가 없습니다.</div>;

  const textSession: SessionDateDto[] = bootcamp?.classDates.map((date, i) => {
    return { id: i + 1, classDate: date };
  });

  const buildSessionMap = (data: SessionDateDto[]) => {
    const map = new Map<string, number>();

    data.forEach(({ classDate, id }) => {
      map.set(classDate, id);
    });
    return map;
  };
  const sessionMap = buildSessionMap(textSession);
  /////

  const handleSelectSession = (dates: Date[]) => {
    const stringSelectDate = dates.map((date) => getDateKey(date));
    const isAdd = new Map<string, AddedLecture>();
    const isRemove = new Map<string, RemovedLecture>();

    stringSelectDate.map((date) => {
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
    console.log("추가할날짜:", addedList);
    console.log("삭제할날짜:", removedIdList);
  };

  ///api 연동시 교체
  const calendarSessionDate: DateData[] = textSession.map((date) => {
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
              <div className={styles.addSession}>
                <span className={styles.sessionTitle}>추가될 강의일</span>
                {addedList.map((lecture) => (
                  <div className={styles.addDate} key={lecture.classDate}>
                    {lecture.classDate}
                  </div>
                ))}
              </div>
              <div className={styles.removeSession}>
                <span className={styles.sessionTitle}>삭제될 강의일</span>
                {removedList.map((lecture) => (
                  <div className={styles.deleteDate} key={lecture.id}>
                    {lecture.classDate}
                  </div>
                ))}
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
