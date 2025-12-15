interface ToggleSwitchProps {
  checked: boolean;
  onToggle: () => void;
}

const ToggleSwitch = ({ checked, onToggle }: ToggleSwitchProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onToggle}
      style={{
        width: 42,
        height: 24,
        padding: 0,
        border: "none",
        background: "none",
        cursor: "pointer",
      }}
    >
      <svg
        width="42"
        height="24"
        viewBox="0 0 42 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Track */}
        <rect
          x="1"
          y="1"
          width="40"
          height="22"
          rx="11"
          fill={
            checked
              ? "var(--color-blue-normal)"
              : "var(--color-grey-light-strong)"
          }
        />

        {/* Thumb */}
        <circle
          cx={checked ? 30 : 12}
          cy="12"
          r="9"
          fill="var(--color-white)"
          style={{
            transition: "cx 0.2s ease",
          }}
        />
      </svg>
    </button>
  );
};

export default ToggleSwitch;
