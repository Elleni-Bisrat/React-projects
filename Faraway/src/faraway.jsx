import React, { use, useState } from "react";

const initializedItems = [
  {
    id: "1",
    item: "charger",
    quantity: 2,
    packed: false,
  },
  {
    id: "2",
    item: "computer",
    quantity: 8,
    packed: true,
  },
  {
    id: "3",
    item: "airpod",
    quantity: 2,
    packed: true,
  },
];

export default function Faraway() {
  const [displayedItem, setDisplayedItem] = useState([]);

  const handelAddItems = (displayedItem) => {
    setDisplayedItem((items) => [...items, displayedItem]);
  };

  const handelDeletedItems = (id) => {
    setDisplayedItem((items) =>
      items.filter((displayedItem) => displayedItem.id !== id)
    );
  };

  const handPackedItem = (id) => {
    setDisplayedItem((items) =>
      items.map((displayedItem) =>
        displayedItem.id === id
          ? { ...displayedItem, packed: !displayedItem.packed }
          : displayedItem
      )
    );
  };
const handelClearItem= ()=>{
  const confirmed = window.confirm("Are you sure want to delete all items ?");

  if(confirmed) setDisplayedItem([]);
}

  return (
    <div>
      <Logo />
      <Nav onAddItem={handelAddItems} />
      <Main
        items={displayedItem}
        onDeleteItem={handelDeletedItems}
        onPackedItem={handPackedItem}
        onClearItem = {handelClearItem}
      />
      <Footer items={displayedItem} />
    </div>
  );
}

function Logo() {
  return (
    <div className="box1">
      <header className="header">🌴Far AWAY 💼</header>
    </div>
  );
}

function Nav({ onAddItem }) {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handlesubmit = (e) => {
    e.preventDefault();

    if (!item) return;
    const newItem = { item, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItem(newItem);
    setItem("");
    setQuantity(1);
  };

  return (
    <div>
      <form action="" className="box2" onSubmit={handlesubmit}>
        <p>What do you need for your 😍 trip?</p>
        <select
          name=""
          id=""
          className="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="input"
          placeholder="item..."
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button className="btn_add">ADD</button>
      </form>
    </div>
  );
}

function Main({ items, onDeleteItem, onPackedItem,onClearItem }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") {
    sortedItems = items;
  }
  if (sortBy === "item") {
    sortedItems = items.slice().sort((a, b) => a.item.localeCompare(b.item));
  }
  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="box3">
      <div className="lists">
        {sortedItems.map((items, index) => (
          <Item
            item={items}
            onDeleteItem={onDeleteItem}
            onPackedItem={onPackedItem}
            key={index.id}
          />
        ))}
      </div>
      <select
        name=""
        className="btn_sort"
        id=""
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="input">SORT BY INPUT ORDER</option>
        <option value="item">SORT BY ITEM</option>
        <option value="packed">SORT BY PACKED STATUS</option>
      </select>
      <button className="btn_clear" onClick={onClearItem}>CLEAR LIST</button>
    </div>
  );
}

function Item({ item, onDeleteItem, onPackedItem }) {
  return (
    <div>
      <li className="lists">
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onPackedItem(item.id)}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.item}
        </span>
        <button className="packed" onClick={() => onDeleteItem(item.id)}>
          ❌
        </button>
      </li>
    </div>
  );
}

function Footer({ items }) {
  if (!items.length)
    return (
      <div className="box4">
        <p className="message">
          {" "}
          start adding some items to your packing list🚀
        </p>
      </div>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percenatge = Math.round((numPacked / numItems) * 100);
  return (
    <div className="box4">
      <p className="message">
        {percenatge === 100
          ? `You got everything! Ready to go ✈️`
          : `💼You have ${numItems} items on your list, and you already packed ${numPacked}
        (${percenatge}%)`}
      </p>
    </div>
  );
}
