import Image from 'next/image'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { PawPrint } from 'lucide-react'

export default function ChatHistoryItem({ chat }) {
  const message = typeof chat.message === 'string' 
    ? JSON.parse(chat.message) 
    : chat.message

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-start gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
          {chat.pet.imageUrl ? (
            <Image
              src={chat.pet.imageUrl}
              alt={chat.pet.name}
              fill
              className="object-cover"
            />
          ) : (
            <PawPrint className="w-8 h-8 text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {chat.pet.name}
            </h3>
            <span className="text-sm text-gray-500">
              {format(new Date(chat.createdAt), 'PPP', { locale: es })}
            </span>
          </div>
          <div className="mb-2">
            <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
              {chat.category}
            </span>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">{message.title}</h4>
            <p className="text-gray-600">{message.content}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 