'use client'

import { useState } from 'react'

export default function ChatHistoryFilters({ pets, onFilterChange }) {
  const [selectedPet, setSelectedPet] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = [
    { value: 'GENERAL', label: 'General' },
    { value: 'NUTRITION', label: 'Nutrición' },
    { value: 'TIPS', label: 'Consejos' }
  ]

  const handlePetChange = (e) => {
    const value = e.target.value
    setSelectedPet(value)
    onFilterChange({ petId: value, category: selectedCategory })
  }

  const handleCategoryChange = (e) => {
    const value = e.target.value
    setSelectedCategory(value)
    onFilterChange({ petId: selectedPet, category: value })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pet" className="block text-sm font-medium text-gray-700 mb-1">
            Mascota
          </label>
          <select
            id="pet"
            value={selectedPet}
            onChange={handlePetChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Todas las mascotas</option>
            {pets.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.name}
              </option>
            ))}
          </select>
        </div>
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
    </div>
  )
} 