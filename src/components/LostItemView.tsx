import type { LostItem } from "../App";


type Props = {
  item: LostItem;
  onClose: () => void;
};

export default function LostItemView({ item, onClose }: Props) {
  return (
    <div className="modal">
      <div className="modal-box">
        <h2>Lost Item Details</h2>

        <p><strong>ID:</strong> {String(item.id).padStart(2, "0")}</p>
        <p><strong>Item Name:</strong> {item.itemName}</p>
        <p><strong>Location Lost:</strong> {item.locationLost}</p>
        <p><strong>Date Reported:</strong> {item.dateReported}</p>

        <div className="modal-actions">
          <button className="close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
