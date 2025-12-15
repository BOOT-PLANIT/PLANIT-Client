"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import {
  Bootcamp,
  BootcampListItem,
  dummyFetchBootcamps,
} from "@/feature/bootcamp";
import SearchIcon from "@/shared/assets/icons/SearchIcon";
import { Input, Spinner } from "@/shared/ui";

import styles from "./BootcampList.module.scss";
type ModalType = "add" | "edit" | "delete" | "session" | null;
interface BootcampListProps {
  onSelectBootcamp?: (bootcamp: Bootcamp | null) => void;
  onModalOpen?: (type: ModalType, bootcamp?: Bootcamp) => void;
  manage: boolean; // 관리자모드
}

const BootcampList = ({
  onSelectBootcamp,
  onModalOpen,
  manage,
}: BootcampListProps) => {
  const [selectedItem, setSelectedItem] = useState<Bootcamp | null>(null);

  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");

  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLTableRowElement>(null);

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
    const target = anchorRef.current;
    const scrollBox = scrollBoxRef.current;
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
    if (selectedItem !== null && onSelectBootcamp) {
      setSelectedItem(null);
      onSelectBootcamp(null);
    }
  };

  const handleSelect = (bootcamp: Bootcamp) => {
    if (!manage && onSelectBootcamp) {
      if (selectedItem?.id === bootcamp.id) {
        setSelectedItem(null);
        onSelectBootcamp(null);
      } else {
        setSelectedItem(bootcamp);
        onSelectBootcamp(bootcamp);
      }
    }
  };

  const handleModalOpen = (type: ModalType, bootcamp: Bootcamp) => {
    if (manage && onModalOpen) {
      onModalOpen(type, bootcamp);
    }
  };

  const flatList = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <>
      <div className={styles.inputLayout}>
        <Input
          placeholder="부트캠프명, 교육기관명을 입력하세요"
          icon={<SearchIcon />}
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>훈련기관</th>
              <th>부트캠프 이름</th>
              <th>일정</th>
              <th>훈련일수</th>
              <th>KDT</th>
              <th>상태</th>
              {manage && <th colSpan={3}>관리</th>}
            </tr>
          </thead>
        </table>
        <div className={styles.tableLayout} ref={scrollBoxRef}>
          <table className={styles.table}>
            <tbody>
              {isLoading && (
                <tr>
                  <td className={styles.spinner} colSpan={manage ? 9 : 6}>
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
                  selectItem={handleSelect}
                  isModalOpen={handleModalOpen}
                />
              ))}
              {isFetchingNextPage && (
                <tr>
                  <td className={styles.spinner} colSpan={manage ? 9 : 6}>
                    <Spinner />
                  </td>
                </tr>
              )}

              {/* 옵저버 */}
              <tr ref={anchorRef}>
                <td className={styles.spinner} colSpan={manage ? 9 : 6}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BootcampList;
