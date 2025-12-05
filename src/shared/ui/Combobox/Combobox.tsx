"use client";

import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { createPortal } from "react-dom";

import styles from "./Combobox.module.scss";

interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  width?: string;
}

export interface ComboboxRef {
  getValue: () => string;
  setValue: (value: string) => void;
  getSelectedOption: () => ComboboxOption | undefined;
  open: () => void;
  close: () => void;
}

const Combobox = forwardRef<ComboboxRef, ComboboxProps>(
  (
    { options, value, onChange, placeholder = "선택하세요", width = "100%" },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(value ?? "");
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({
      top: 0,
      left: 0,
      width: 0,
    });
    const comboboxRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLUListElement>(null);

    const currentValue = isControlled ? value : internalValue;
    const selectedOption = options.find((opt) => opt.value === currentValue);

    useImperativeHandle(ref, () => ({
      getValue: () => currentValue,
      setValue: (newValue: string) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      getSelectedOption: () => selectedOption,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        const isOutsideCombobox =
          comboboxRef.current && !comboboxRef.current.contains(target);
        const isOutsideDropdown =
          dropdownRef.current && !dropdownRef.current.contains(target);

        if (isOutsideCombobox && isOutsideDropdown) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
      if (isOpen && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 4,
          left: rect.left,
          width: rect.width,
        });
      }
    }, [isOpen]);

    useEffect(() => {
      if (!isOpen) return;

      const handleScroll = () => {
        if (triggerRef.current) {
          const rect = triggerRef.current.getBoundingClientRect();
          setDropdownPosition({
            top: rect.bottom + 4,
            left: rect.left,
            width: rect.width,
          });
        }
      };

      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll, true);
        window.removeEventListener("resize", handleScroll);
      };
    }, [isOpen]);

    const handleSelect = (optionValue: string) => {
      if (!isControlled) {
        setInternalValue(optionValue);
      }
      onChange?.(optionValue);
      setIsOpen(false);
    };

    return (
      <div className={styles.combobox} ref={comboboxRef} style={{ width }}>
        <button
          ref={triggerRef}
          type="button"
          className={styles.trigger}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className={styles.label}>
            {selectedOption?.label || placeholder}
          </span>
          <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
            <ChevronIcon />
          </span>
        </button>

        {isOpen &&
          createPortal(
            <ul
              ref={dropdownRef}
              className={styles.dropdown}
              style={{
                position: "fixed",
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: dropdownPosition.width,
              }}
            >
              {options.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    className={`${styles.option} ${
                      option.value === currentValue ? styles.selected : ""
                    }`}
                    onClick={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>,
            document.body,
          )}
      </div>
    );
  },
);

Combobox.displayName = "Combobox";

const ChevronIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Combobox;
