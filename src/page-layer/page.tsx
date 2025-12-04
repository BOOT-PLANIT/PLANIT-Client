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
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button disabled>Disabled</Button>

      <h2 style={{ marginTop: 16 }}>With Icons</h2>
      <Button icon={<PlusIcon />}>Add Item</Button>
      <Button icon={<ArrowRightIcon />}>Next</Button>

      <h2 style={{ marginTop: 16 }}>Custom Gap</h2>
      <Button icon={<SearchIcon />} gap="4px">
        Gap 4px
      </Button>
      <Button icon={<SearchIcon />} gap="8px">
        Gap 8px (default)
      </Button>
      <Button icon={<SearchIcon />} gap="16px">
        Gap 16px
      </Button>
    </div>
  );
};

export default Home;
