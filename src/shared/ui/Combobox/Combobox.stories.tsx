import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState, useRef } from "react";

import Combobox, { ComboboxRef } from "./Combobox";

const bootcampOptions = [
  { value: "fullstack", label: "Full-Stack Web Development Bootcamp" },
  { value: "datascience", label: "Data Science & AI Bootcamp" },
  { value: "uxui", label: "UX/UI Design Bootcamp" },
];

const meta: Meta<typeof Combobox> = {
  title: "shared/ui/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    options: {
      description: "선택 옵션 목록",
    },
    value: {
      control: "text",
      description: "선택된 값",
    },
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
    },
    width: {
      control: "text",
      description: "콤보박스 너비",
    },
    onChange: {
      action: "changed",
      description: "값이 변경될 때 호출되는 콜백",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  args: {
    options: bootcampOptions,
    placeholder: "부트캠프를 선택하세요",
    width: "400px",
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: bootcampOptions,
    value: "fullstack",
    width: "400px",
  },
};

export const WithOnChange: Story = {
  render: () => {
    const OnChangeExample = () => {
      const [value, setValue] = useState("");
      const [history, setHistory] = useState<string[]>([]);

      const handleChange = (newValue: string) => {
        setValue(newValue);
        setHistory((prev) => [...prev, newValue]);
      };

      return (
        <div style={{ width: 400 }}>
          <Combobox
            options={bootcampOptions}
            value={value}
            onChange={handleChange}
            placeholder="부트캠프를 선택하세요"
          />
          <div
            style={{
              marginTop: 16,
              padding: 16,
              backgroundColor: "#f5f6f9",
              borderRadius: 8,
            }}
          >
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
              onChange 호출 기록:
            </p>
            {history.length === 0 ? (
              <p style={{ fontSize: 14, color: "#8d929f" }}>
                아직 선택된 값이 없습니다.
              </p>
            ) : (
              <ul style={{ fontSize: 14, color: "#333", paddingLeft: 20 }}>
                {history.map((item, index) => (
                  <li key={index}>
                    {index + 1}. {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );
    };
    return <OnChangeExample />;
  },
};

export const WithRef: Story = {
  render: () => {
    const RefExample = () => {
      const comboboxRef = useRef<ComboboxRef>(null);
      const [displayValue, setDisplayValue] = useState<string>("");

      const handleGetValue = () => {
        const value = comboboxRef.current?.getValue();
        const option = comboboxRef.current?.getSelectedOption();
        setDisplayValue(option?.label || value || "선택된 값 없음");
      };

      const handleSetValue = (value: string) => {
        comboboxRef.current?.setValue(value);
      };

      return (
        <div style={{ width: 400 }}>
          <Combobox
            ref={comboboxRef}
            options={bootcampOptions}
            placeholder="부트캠프를 선택하세요"
          />
          <div
            style={{
              marginTop: 16,
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={handleGetValue}
              style={{
                padding: "8px 16px",
                backgroundColor: "#4A7EFF",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              getValue()
            </button>
            <button
              onClick={() => handleSetValue("fullstack")}
              style={{
                padding: "8px 16px",
                backgroundColor: "#048724",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              setValue(&quot;fullstack&quot;)
            </button>
            <button
              onClick={() => handleSetValue("datascience")}
              style={{
                padding: "8px 16px",
                backgroundColor: "#048724",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              setValue(&quot;datascience&quot;)
            </button>
          </div>
          {displayValue && (
            <p style={{ marginTop: 16, fontSize: 14, color: "#333" }}>
              getValue 결과: <strong>{displayValue}</strong>
            </p>
          )}
        </div>
      );
    };
    return <RefExample />;
  },
};

export const Controlled: Story = {
  render: () => {
    const ControlledCombobox = () => {
      const [value, setValue] = useState("fullstack");
      return (
        <div style={{ width: 400 }}>
          <Combobox
            options={bootcampOptions}
            value={value}
            onChange={setValue}
          />
          <p style={{ marginTop: 16, fontSize: 14, color: "#8d929f" }}>
            선택된 값: {value}
          </p>
        </div>
      );
    };
    return <ControlledCombobox />;
  },
};

export const CustomWidth: Story = {
  args: {
    options: bootcampOptions,
    value: "datascience",
    width: "500px",
  },
};

export const ManyOptions: Story = {
  args: {
    options: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
      { value: "4", label: "Option 4" },
      { value: "5", label: "Option 5" },
      { value: "6", label: "Option 6" },
      { value: "7", label: "Option 7" },
      { value: "8", label: "Option 8" },
    ],
    placeholder: "옵션을 선택하세요",
    width: "300px",
  },
};
