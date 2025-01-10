import { Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";
import useModalContext from "../../hooks/useModalContext";
import { TDeleteItem } from "../../api/mutations/delete.mutation";
import { TModalKeys } from "../../modals/data";

type TActionButton<T> = {
  row: T;
  edit: {
    key: TModalKeys;
  };
  delete: {
    type: TDeleteItem["type"];
  };
};

export function ActionButton<T extends { id: string }>({
  row,
  edit,
  delete: deleteProps,
}: TActionButton<T>) {
  const { openModal } = useModalContext();
  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="secondary"
        className="text-white"
        onClick={() => {
          openModal({
            key: edit.key, //Modal key
            initiatorName: row.id,
            data: row,
          });
        }}
      >
        <Pencil />
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() =>
          openModal({
            key: "DELETE_ITEM",
            initiatorName: row.id,
            data: { type: deleteProps.type },
          })
        }
      >
        <Trash />
      </Button>
    </div>
  );
}
