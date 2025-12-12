import { useState, useEffect } from "react";
import type { LostItem } from "../App";


type Props = {
  item?: LostItem;
  onSubmit: (data: LostItem | Omit<LostItem, "id">) => void;
  onClose: () => void;
};

export default function LostItemForm({ item, onSubmit, onClose }: Props) {
  const [itemName, setItemName] = useState("");
  const [locationLost, setLocationLost] = useState("");
  const [dateReported, setDateReported] = useState("");

  useEffect(() => {
    if (item) {
      setItemName(item.itemName);
      setLocationLost(item.locationLost);
      setDateReported(item.dateReported);
    }
  }, [item]);

  const submitHandler = () => {
    if (!itemName || !locationLost || !dateReported) {
      alert("Please fill all fields");
      return;
    }

    const data = item
      ? { ...item, itemName, locationLost, dateReported }
      : { itemName, locationLost, dateReported };

    onSubmit(data);
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <h2>{item ? "Edit Item" : "Add Lost Item"}</h2>

        <label className="label">Item Name</label>
        <input className="input" value={itemName} onChange={(e) => setItemName(e.target.value)} />

        <label className="label">Location Lost</label>
        <input className="input" value={locationLost} onChange={(e) => setLocationLost(e.target.value)} />

        <label className="label">Date Reported</label>
        <input
          type="date"
          className="input"
          value={dateReported}
          onChange={(e) => setDateReported(e.target.value)}
        />

        <div className="modal-actions">
          <button className="close" onClick={onClose}>Close</button>
          <button className="add-btn" onClick={submitHandler}>{item ? "Save Changes" : "Add Item"}</button>
        </div>
      </div>
    </div>
  );
}
