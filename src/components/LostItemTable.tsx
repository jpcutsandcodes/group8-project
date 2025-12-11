import type { LostItem } from "../App";


type Props = {
  items: LostItem[];
  onView: (item: LostItem) => void;
  onEdit: (item: LostItem) => void;
  onDelete: (id: number) => void;
};

export default function LostItemTable({
  items,
  onView,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="table-card">
      <table className="item-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Location Lost</th>
            <th>Date Reported</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan={5} className="empty">
                No items found.
              </td>
            </tr>
          )}

          {items.map((item) => (
            <tr key={item.id}>
              <td>{String(item.id).padStart(2, "0")}</td>
              <td>{item.itemName}</td>
              <td>{item.locationLost}</td>
              <td>{item.dateReported}</td>

              <td className="actions">
                <button className="btn view" onClick={() => onView(item)}>
                  View
                </button>

                <button className="btn edit" onClick={() => onEdit(item)}>
                  Edit
                </button>

                <button className="btn delete" onClick={() => onDelete(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
