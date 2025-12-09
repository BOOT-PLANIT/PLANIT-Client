import React from "react";

import { EditIcon, DeleteIcon } from "@/shared/assets";

import type { Bootcamp } from "./BootcampList";
import styles from "./BootcampListItem.module.scss";

interface BootcampListItemProps {
  Bootcamp: Bootcamp;
  isSelect?: boolean;
  manage: boolean;
  selectItem: () => void;
  editItem: () => void;
  deleteItem: () => void;
}

const BootcampListItem = ({
  Bootcamp,
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
      <td className={styles.organization}>{Bootcamp.organizer}</td>

      <td className={styles.name}>{Bootcamp.name}</td>

      <td className={styles.schedule}>
        {Bootcamp.startedAt} - {Bootcamp.endedAt}
      </td>

      <td className={styles.duration}>{Bootcamp.classDates.length} 일</td>

      <td className={styles.kdt}>
        {Bootcamp.isKdt ? <span className={styles.kdtBadge}>KDT</span> : "-"}
      </td>

      <td className={styles.status}>
        <span
          className={Bootcamp.isEnded ? styles.activeBadge : styles.endedBadge}
        >
          {Bootcamp.isEnded ? "Active" : "Ended"}
        </span>
      </td>

      {manage && (
        <>
          <td>
            <div className={styles.icon} onClick={editItem}>
              <EditIcon />
            </div>
          </td>

          <td>
            <div
              className={`${styles.delete} ${styles.icon}`}
              onClick={deleteItem}
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
