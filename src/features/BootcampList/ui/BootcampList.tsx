"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import SearchIcon from "@/shared/assets/icons/SearchIcon";
import { dummyFetchBootcamps } from "@/shared/lib";
import { Input, Spinner } from "@/shared/ui";

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

interface BootcampListProps {
  onSelectBootcamp: (bootcamp: Bootcamp | null) => void;
  manage: boolean; // 관리자모드
}

const BootcampList = ({ onSelectBootcamp, manage }: BootcampListProps) => {
  const [selectedItem, setSelectedItem] = useState<Bootcamp | null>(null);

  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");

  //0.5초 검색할시간 유예
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(search), 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["bootcamps", debounced],
      queryFn: ({ pageParam = 1 }) =>
        dummyFetchBootcamps({ query: debounced, pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  //옵저버
  useEffect(() => {
    const target = document.getElementById("scroll-anchor");
    const scrollBox = document.getElementById("scroll-box");
    if (!target || !scrollBox) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: scrollBox, threshold: 0.1 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSearchChange = (value: string) => {
    setSearch(value);

    // 검색어 바뀌면 선택 초기화
    if (selectedItem !== null) {
      setSelectedItem(null);
      onSelectBootcamp(null);
    }
  };

  const handleSelect = (bootcamp: Bootcamp) => {
    if (!manage) {
      if (selectedItem?.id === bootcamp.id) {
        setSelectedItem(null);
        onSelectBootcamp(null);
      } else {
        setSelectedItem(bootcamp);
        onSelectBootcamp(bootcamp);
      }
    }
  };

  const handleDelete = (bootcamp: Bootcamp) => {
    if (manage) {
      console.log("부트캠프 삭제", bootcamp);
    }
  };

  const handleEdit = (bootcamp: Bootcamp) => {
    if (manage) {
      console.log("부트캠프 수정", bootcamp);
    }
  };

  const flatList = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className={styles.container}>
      <Input
        placeholder="검색하실 부트캠프 이름 또는 교육기관을 입력하세요..."
        icon={<SearchIcon />}
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
      />

      <table className={`${styles.table} ${styles.headerTable}`}>
        <thead>
          <tr>
            <th>훈련기관</th>
            <th>부트캠프 이름</th>
            <th>일정</th>
            <th>훈련일수</th>
            <th>KDT</th>
            <th>상태</th>
            {manage && <th colSpan={2}>관리</th>}
          </tr>
        </thead>
      </table>
      <div className={styles.tableLayout} id="scroll-box">
        <table className={styles.table}>
          <tbody>
            {isLoading && (
              <tr>
                <td className={styles.spinner} colSpan={manage ? 8 : 6}>
                  <Spinner />
                </td>
              </tr>
            )}

            {flatList.map((b) => (
              <BootcampListItem
                key={b.id}
                isSelect={b.id === selectedItem?.id}
                bootcamp={b}
                manage={manage}
                selectItem={() => handleSelect(b)}
                editItem={() => handleEdit(b)}
                deleteItem={() => handleDelete(b)}
              />
            ))}
            {/* 옵저버 */}
            <tr id="scroll-anchor" className={styles.spinner}>
              <td colSpan={manage ? 8 : 6}>
                {isFetchingNextPage && <Spinner />}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BootcampList;
