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

        <p><b>ID:</b> {String(item.id).padStart(2, "0")}</p>
        <p><b>Item Name:</b> {item.itemName}</p>
        <p><b>Location Lost:</b> {item.locationLost}</p>
        <p><b>Date Reported:</b> {item.dateReported}</p>

        <button className="btn close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
