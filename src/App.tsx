import { useState } from "react";
import LostItemTable from "./components/LostItemTable";
import LostItemForm from "./components/LostItemForm";
import LostItemView from "./components/LostItemView";


export type LostItem = {
  id: number;
  itemName: string;
  locationLost: string;
  dateReported: string;
};

function App() {
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
      itemName: "Motor Key (Honda)",
      locationLost: "PE Acad",
      dateReported: "2025-11-18",
    },
  ]);

  // START auto-increment at 3 (because you already have ID 1 and 2)
  const [nextId, setNextId] = useState(3);

  const [showAdd, setShowAdd] = useState(false);
  const [viewItem, setViewItem] = useState<LostItem | null>(null);
  const [editItem, setEditItem] = useState<LostItem | null>(null);

  // ADD ITEM (fixed so ID NEVER becomes 00)
  const addItem = (data: Omit<LostItem, "id">) => {
    const newItem: LostItem = {
      id: nextId, // <-- always unique
      ...data,
    };

    setItems((prev) => [...prev, newItem]);
    setNextId(nextId + 1); // <-- increment ID
    setShowAdd(false);
  };

  // UPDATE ITEM
  const updateItem = (updated: LostItem) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    setEditItem(null);
  };

  // DELETE ITEM
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

      {/* ADD MODAL */}
      {showAdd && (
        <LostItemForm onSubmit={addItem} onClose={() => setShowAdd(false)} />
      )}

      {/* EDIT MODAL */}
      {editItem && (
        <LostItemForm
          item={editItem}
          onSubmit={(data) => updateItem(data as LostItem)}
          onClose={() => setEditItem(null)}
        />
      )}

      {/* VIEW MODAL */}
      {viewItem && (
        <LostItemView item={viewItem} onClose={() => setViewItem(null)} />
      )}
    </div>
  );
}

export { App };
