'use client'

import { useState } from 'react'

export default function ChatHistoryFilters({ onCategoryChange, selectedCategory }) {
  const categories = [
    { value: 'Preguntas_Generales', label: 'General' },
    { value: 'Alimentacion', label: 'Nutrición' },
    { value: 'Cuidados', label: 'Cuidados' }
  ]

  const handleCategoryChange = (e) => {
    const value = e.target.value
    onCategoryChange(value)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Categoría
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
} 