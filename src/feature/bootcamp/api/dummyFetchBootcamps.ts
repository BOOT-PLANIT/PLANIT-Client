import { bootcampDummy } from "./bootcampDummy";

const PAGE_SIZE = 10;

export default async function dummyFetchBootcamps({
  pageParam = 1,
  query = "",
}: {
  pageParam?: number;
  query: string;
}) {
  // 필터: 검색
  const filtered = bootcampDummy.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.organizer.toLowerCase().includes(q)
    );
  });

  // 페이징
  const start = (pageParam - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageItems = filtered.slice(start, end);

  // 다음 페이지 여부
  const hasNext = end < filtered.length;

  await new Promise((r) => setTimeout(r, 1000)); // 네트워크 딜레이 흉내

  return {
    items: pageItems,
    nextPage: hasNext ? pageParam + 1 : undefined,
  };
}
