"use client";
import React, { useState } from "react";

import SearchIcon from "@/shared/assets/icons/SearchIcon";
import { Input } from "@/shared/ui";

import styles from "./BootcampList.module.scss";
import BootcampListItem from "./BootcampListItem";

export interface Bootcamp {
  id: number;
  name: string;
  organizer: string;
  isKdt: boolean;
  startedAt: string;
  endedAt: string;
  isEnded: boolean;
  classDates: string[];
}

const bootcampDummy: Bootcamp[] = [
  {
    id: 1,
    name: "웹 개발 기초 부트캠프",
    organizer: "한국IT교육원",
    isKdt: false,
    startedAt: "2024-03-01",
    endedAt: "2024-06-30",
    isEnded: true,
    classDates: ["2024-03-01", "2024-03-03", "2024-03-05"],
  },
  {
    id: 2,
    name: "KDT 프론트엔드 심화 과정",
    organizer: "KDT연구소",
    isKdt: true,
    startedAt: "2024-07-01",
    endedAt: "2024-12-20",
    isEnded: false,
    classDates: ["2024-07-01", "2024-07-02", "2024-07-03"],
  },
  {
    id: 3,
    name: "백엔드 스프링 부트 실전",
    organizer: "코딩아카데미",
    isKdt: false,
    startedAt: "2024-02-15",
    endedAt: "2024-05-15",
    isEnded: true,
    classDates: ["2024-02-15", "2024-02-17", "2024-02-20"],
  },
  {
    id: 4,
    name: "데이터 분석 입문 캠프",
    organizer: "데이터사이언스랩",
    isKdt: false,
    startedAt: "2024-08-10",
    endedAt: "2024-11-30",
    isEnded: false,
    classDates: ["2024-08-10", "2024-08-12", "2024-08-14"],
  },
  {
    id: 5,
    name: "AI 기반 풀스택 개발자 과정",
    organizer: "AI융합센터",
    isKdt: true,
    startedAt: "2024-01-10",
    endedAt: "2024-07-25",
    isEnded: true,
    classDates: ["2024-01-10", "2024-01-12", "2024-01-15"],
  },
];

const BootcampList = () => {
  const [selectBootcamp, setSelectBootcamp] = useState<Bootcamp>();

  const handleSelect = (bootcamp: Bootcamp) => {
    setSelectBootcamp(bootcamp);
    console.log(selectBootcamp);
  };

  return (
    <div className={styles.wrapper}>
      <Input
        placeholder="검색하실 부트캠프 이름 또는 교육기관을 입력하세요..."
        icon={<SearchIcon />}
      />
      {/* <div>
        {bootcampDummy.map((bootcamp) => (
          <BootcampListItem key={bootcamp.id} Bootcamp={bootcamp} selectItem={() => handleSelect} />
        ))}
      </div> */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Organization</th>
            <th>Bootcamp Name</th>
            <th>Schedule</th>
            <th>Duration</th>
            <th>KDT</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bootcampDummy.map((b) => (
            <BootcampListItem
              key={b.id}
              Bootcamp={b}
              selectItem={() => handleSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BootcampList;
