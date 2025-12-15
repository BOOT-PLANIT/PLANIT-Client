import React from "react";

import { Bootcamp } from "@/feature/bootcamp";
import { EditIcon, DeleteIcon } from "@/shared/assets";
import { Badge } from "@/shared/ui/Badge";

import styles from "./BootcampListItem.module.scss";

interface BootcampListItemProps {
  bootcamp: Bootcamp;
  isSelect?: boolean;
  manage: boolean;
  selectItem: (bootcamp: Bootcamp) => void;
  editItem: (bootcamp: Bootcamp) => void;
  deleteItem: (bootcamp: Bootcamp) => void;
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
      onClick={() => selectItem(bootcamp)}
    >
      <td className={styles.organization}>{bootcamp.organizer}</td>

      <td className={styles.name}>{bootcamp.name}</td>

      <td className={styles.schedule}>
        <div className={styles.scheduleWrap}>
          <div>{bootcamp.startDate} ~</div>
          <div>{bootcamp.endDate}</div>
        </div>
      </td>

      <td className={styles.duration}>{bootcamp.classDates.length}일</td>

      <td className={styles.kdt}>
        {bootcamp.isKdt ? <Badge variant="kdt">KDT</Badge> : "-"}
      </td>

      <td className={styles.status}>
        {bootcamp.isEnded ? (
          <Badge variant="ended">Ended</Badge>
        ) : (
          <Badge variant="active">Active</Badge>
        )}
      </td>

      {manage && (
        <>
          <td>
            <button
              type="button"
              className={styles.icon}
              onClick={(e) => {
                e.stopPropagation();
                editItem(bootcamp);
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
                deleteItem(bootcamp);
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
