"use client";
import useToast from "@/shared/lib/toast";
import { Button } from "@/shared/ui";

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <circle
      cx="6"
      cy="6"
      r="4"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path d="M10 10l4 4" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const Home = () => {
  const toast = useToast();
  return (
    <div
      style={{
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 400,
      }}
    >
      <h2>Button Variants</h2>
      <Button
        variant="primary"
        onClick={() => toast.success("성공메시지입니다. 성공메시지입니다.")}
      >
        Primary
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.error("에러메시지입니다. 에러메시지입니다.")}
      >
        Secondary
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.info("인포메시지입니다. 인포메시지입니다. ")}
      >
        Outline
      </Button>
      <Button disabled>Disabled</Button>

      <h2 style={{ marginTop: 16 }}>With Icons</h2>
      <Button icon={<PlusIcon />}>Add Item</Button>
      <Button icon={<ArrowRightIcon />}>Next</Button>

      <h2 style={{ marginTop: 16 }}>Custom Gap</h2>
      <Button icon={<SearchIcon />}>Search</Button>
    </div>
  );
};

export default Home;
