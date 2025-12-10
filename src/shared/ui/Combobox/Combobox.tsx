"use client";

import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import { createPortal } from "react-dom";

import { ChevronDown } from "@/shared/assets";

import styles from "./Combobox.module.scss";

interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: number;
  onChange?: (index: number) => void;
  placeholder?: string;
  width?: string;
}

export interface ComboboxRef {
  getIndex: () => number;
  setIndex: (index: number) => void;
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
    const [internalIndex, setInternalIndex] = useState(value ?? -1);
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [dropdownPosition, setDropdownPosition] = useState({
      top: 0,
      left: 0,
      width: 0,
    });
    const comboboxRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const selectedIndex = isControlled ? value : internalIndex;
    const selectedOption =
      selectedIndex >= 0 && selectedIndex < options.length
        ? options[selectedIndex]
        : undefined;

    useImperativeHandle(ref, () => ({
      getIndex: () => selectedIndex,
      setIndex: (newIndex: number) => {
        if (!isControlled) {
          setInternalIndex(newIndex);
        }
        onChange?.(newIndex);
      },
      getSelectedOption: () => selectedOption,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    const openDropdown = useCallback(() => {
      if (options.length === 0) return;
      setIsOpen(true);
      setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }, [options.length, selectedIndex]);

    const closeDropdown = useCallback(() => {
      setIsOpen(false);
      setFocusedIndex(-1);
    }, []);

    const handleSelect = useCallback(
      (index: number) => {
        if (!isControlled) {
          setInternalIndex(index);
        }
        onChange?.(index);
        closeDropdown();
        triggerRef.current?.focus();
      },
      [isControlled, onChange, closeDropdown],
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (options.length === 0) return;

        switch (event.key) {
          case "Enter":
          case " ":
            event.preventDefault();
            if (isOpen && focusedIndex >= 0 && options[focusedIndex]) {
              handleSelect(focusedIndex);
            } else {
              openDropdown();
            }
            break;

          case "ArrowDown":
            event.preventDefault();
            if (!isOpen) {
              openDropdown();
            } else {
              setFocusedIndex((prev) =>
                prev < options.length - 1 ? prev + 1 : 0,
              );
            }
            break;

          case "ArrowUp":
            event.preventDefault();
            if (!isOpen) {
              openDropdown();
            } else {
              setFocusedIndex((prev) =>
                prev > 0 ? prev - 1 : options.length - 1,
              );
            }
            break;

          case "Escape":
            event.preventDefault();
            closeDropdown();
            triggerRef.current?.focus();
            break;

          case "Home":
            if (isOpen && options.length > 0) {
              event.preventDefault();
              setFocusedIndex(0);
            }
            break;

          case "End":
            if (isOpen && options.length > 0) {
              event.preventDefault();
              setFocusedIndex(options.length - 1);
            }
            break;

          case "Tab":
            if (isOpen) {
              closeDropdown();
            }
            break;
        }
      },
      [
        isOpen,
        focusedIndex,
        options,
        handleSelect,
        openDropdown,
        closeDropdown,
      ],
    );

    useEffect(() => {
      if (isOpen && focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
        optionRefs.current[focusedIndex]?.scrollIntoView({
          block: "nearest",
        });
      }
    }, [focusedIndex, isOpen]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        const isOutsideCombobox =
          comboboxRef.current && !comboboxRef.current.contains(target);
        const isOutsideDropdown =
          dropdownRef.current && !dropdownRef.current.contains(target);

        if (isOutsideCombobox && isOutsideDropdown) {
          closeDropdown();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [closeDropdown]);

    function setTriggerDropdownPosition() {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom,
          left: rect.left,
          width: rect.width,
        });
      }
    }

    useEffect(() => {
      if (isOpen) {
        setTriggerDropdownPosition();
      }
    }, [isOpen]);

    useEffect(() => {
      if (!isOpen) return;

      const handleScroll = () => {
        setTriggerDropdownPosition();
      };

      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll, true);
        window.removeEventListener("resize", handleScroll);
      };
    }, [isOpen]);

    const handleTriggerClick = () => {
      if (isOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    };

    return (
      <div
        className={styles.combobox}
        ref={comboboxRef}
        style={{ width }}
        onKeyDown={handleKeyDown}
      >
        <button
          ref={triggerRef}
          type="button"
          className={styles.trigger}
          onClick={handleTriggerClick}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className={styles.label}>
            {selectedOption?.label || placeholder}
          </span>
          <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
            <ChevronDown />
          </span>
        </button>

        {isOpen &&
          createPortal(
            <ul
              ref={dropdownRef}
              className={styles.dropdown}
              role="listbox"
              style={{
                position: "fixed",
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: dropdownPosition.width,
              }}
            >
              {options.map((option, index) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  <button
                    ref={(el) => {
                      optionRefs.current[index] = el;
                    }}
                    type="button"
                    className={`${styles.option} ${
                      index === selectedIndex ? styles.selected : ""
                    } ${index === focusedIndex ? styles.focused : ""}`}
                    onClick={() => handleSelect(index)}
                    onMouseEnter={() => setFocusedIndex(index)}
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

export default Combobox;
