import React from "react";

import { BootcampTest as Bootcamp } from "@/feature/bootcamp";
import { EditIcon, DeleteIcon } from "@/shared/assets";

import styles from "./BootcampListItem.module.scss";

interface BootcampListItemProps {
  bootcamp: Bootcamp;
  isSelect?: boolean;
  manage: boolean;
  selectItem: () => void;
  editItem: () => void;
  deleteItem: () => void;
}

const BootcampListItem = ({
  bootcamp,
  isSelect,
  manage,
  selectItem,
  editItem,
  deleteItem,
}: BootcampListItemProps) => {
  return (
    <tr
      className={`${styles.row} ${isSelect ? styles.selected : ""}`}
      onClick={selectItem}
    >
      <td className={styles.organization}>{bootcamp.organizer}</td>

      <td className={styles.name}>{bootcamp.name}</td>

      <td className={styles.schedule}>
        <div className={styles.scheduleWrap}>
          <div>{bootcamp.startedAt} ~</div>
          <div>{bootcamp.endedAt}</div>
        </div>
      </td>

      <td className={styles.duration}>{bootcamp.classDates.length}일</td>

      <td className={styles.kdt}>
        {bootcamp.isKdt ? <span className={styles.kdtBadge}>KDT</span> : "-"}
      </td>

      <td className={styles.status}>
        <span
          className={bootcamp.isEnded ? styles.endedBadge : styles.activeBadge}
        >
          {bootcamp.isEnded ? "Ended" : "Active"}
        </span>
      </td>

      {manage && (
        <>
          <td>
            <button
              type="button"
              className={styles.icon}
              onClick={(e) => {
                e.stopPropagation();
                editItem();
              }}
            >
              <EditIcon />
            </button>
          </td>

          <td>
            <button
              type="button"
              className={`${styles.delete} ${styles.icon}`}
              onClick={(e) => {
                e.stopPropagation();
                deleteItem();
              }}
            >
              <DeleteIcon />
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default BootcampListItem;
