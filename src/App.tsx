import { useState } from "react";
import LostItemTable from "./components/LostItemTable";
import LostItemForm from "./components/LostItemForm";
import LostItemView from "./components/LostItemView";
import "./App.css";

export type LostItem = {
  id: number;
  itemName: string;
  locationLost: string;
  dateReported: string;
};

export default function App() {
  // SAMPLE DATA
  const [items, setItems] = useState<LostItem[]>([
    {
      id: 1,
      itemName: "School ID",
      locationLost: "Old Gym",
      dateReported: "2025-11-20",
    },
    {
      id: 2,
      itemName: "Motor Key",
      locationLost: "PE Acad",
      dateReported: "2025-11-18",
    },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [viewItem, setViewItem] = useState<LostItem | null>(null);
  const [editItem, setEditItem] = useState<LostItem | null>(null);

  // Add New Item
  const addItem = (data: Omit<LostItem, "id">) => {
    const newItem: LostItem = {
      id: items.length + 1, // unique auto ID
      ...data,
    };

    setItems((prev) => [...prev, newItem]);
    setShowAdd(false);
  };

  // Update Item
  const updateItem = (updated: LostItem) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    setEditItem(null);
  };

  // Delete Item
  const deleteItem = (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <header className="header">Lost Items List (CRUD)</header>

      <div className="top-bar">
        <h2 className="title">Lost Items</h2>
        <button className="add-btn" onClick={() => setShowAdd(true)}>
          Add Lost Item
        </button>
      </div>

      <LostItemTable
        items={items}
        onView={setViewItem}
        onEdit={setEditItem}
        onDelete={deleteItem}
      />

      {showAdd && (
        <LostItemForm onSubmit={addItem} onClose={() => setShowAdd(false)} />
      )}

      {editItem && (
        <LostItemForm
          item={editItem}
          onSubmit={(data: LostItem) => updateItem(data as LostItem)}
          onClose={() => setEditItem(null)}
        />
      )}

      {viewItem && (
        <LostItemView item={viewItem} onClose={() => setViewItem(null)} />
      )}
    </div>
  );
}
