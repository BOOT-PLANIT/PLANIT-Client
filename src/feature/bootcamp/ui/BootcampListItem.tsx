import React from "react";

import { Bootcamp } from "@/feature/bootcamp";
import { EditIcon, DeleteIcon } from "@/shared/assets";
import { Badge } from "@/shared/ui/Badge";

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
