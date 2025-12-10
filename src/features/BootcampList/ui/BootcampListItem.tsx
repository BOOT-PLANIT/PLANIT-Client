import React from "react";

import { EditIcon, DeleteIcon } from "@/shared/assets";

import type { Bootcamp } from "./BootcampList";
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
        {/* <div className={styles.scheduleWrap}>

        </div> */}
        {bootcamp.startedAt} ~ {bootcamp.endedAt}
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
            <div
              className={styles.icon}
              onClick={(e) => {
                e.stopPropagation();
                editItem();
              }}
            >
              <EditIcon />
            </div>
          </td>

          <td>
            <div
              className={`${styles.delete} ${styles.icon}`}
              onClick={(e) => {
                e.stopPropagation();
                deleteItem();
              }}
            >
              <DeleteIcon />
            </div>
          </td>
        </>
      )}
    </tr>
  );
};

export default BootcampListItem;
