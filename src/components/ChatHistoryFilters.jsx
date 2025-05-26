'use client'

import { Filter } from 'lucide-react'

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
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Filter className="text-primary" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-base-content">Filtros</h3>
            <p className="text-base-content/60 text-sm">Filtra las conversaciones por categoría</p>
          </div>
        </div>
        
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-medium">Categoría</span>
          </label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="select select-bordered w-full max-w-xs focus:select-primary"
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