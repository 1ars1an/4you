'use client';

import { useState } from 'react';

export default function TaskSettings() {
  const [isAlertOpen, setIsAlertOpen] = useState('false');

  function handleAlertClick(e) {
    setIsAlertOpen(!isAlertOpen);
  }

  return (
    <div>
      <section></section>
      <section></section>
      <section>
        <h3>Delete Category</h3>
        <div className="flex flex-col">
          <p>
            Warning: Deleting the category is an irreversible action!
          </p>
          <button onClick={(e) => handleAlertClick(e)}>ICON</button>
        </div>
      </section>
    </div>
  );
}
