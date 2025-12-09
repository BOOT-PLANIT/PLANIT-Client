import React from "react";

import type { Bootcamp } from "./BootcampList";
import styles from "./BootcampListItem.module.scss";

interface BootcampListItemProps {
  Bootcamp: Bootcamp;
  selectItem: () => void;
  editItem?: () => void;
  deleteItem?: () => void;
}

const BootcampListItem = ({
  Bootcamp,
  //   selectItem,
  //   editItem,
  //   deleteItem,
}: BootcampListItemProps) => {
  return (
    <tr className={styles.row}>
      <td className={styles.organization}>
        <span className={styles.icon}>🏫</span>
        {Bootcamp.organizer}
      </td>

      <td className={styles.name}>
        <span className={styles.tag}>🏷️</span>
        {Bootcamp.name}
      </td>

      <td className={styles.schedule}>
        <div className={styles.date}>
          {Bootcamp.startedAt} - {Bootcamp.endedAt}
        </div>
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
    </tr>
  );
};

export default BootcampListItem;
