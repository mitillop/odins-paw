import Image from "next/image";
import { Trash2, Calendar } from "lucide-react";

export default function ChatHistoryItem({ chat, onDelete, isDeleting }) {
  const message =
    typeof chat.message === "string" ? JSON.parse(chat.message) : chat.message;

  // Función para obtener colores según la categoría
  const getCategoryColors = (category) => {
    switch (category) {
      case "Preguntas_Generales":
        return "bg-blue-100 text-blue-800";
      case "Alimentacion":
        return "bg-orange-100 text-orange-800";
      case "Cuidados":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Función para obtener el nombre de la categoría
  const getCategoryLabel = (category) => {
    switch (category) {
      case "Preguntas_Generales":
        return "General";
      case "Alimentacion":
        return "Nutrición";
      case "Cuidados":
        return "Cuidados";
      default:
        return category;
    }
  };

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = () => {
    if (onDelete && !isDeleting) {
      onDelete(chat.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 relative group">
      <div className="flex items-start gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={
              chat.pet.imageUrl ||
              "https://odinpawsimages.blob.core.windows.net/pet-images/12e4f3ae-c4e3-4104-81f4-81a977a35f38.png"
            }
            alt={chat.pet.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {chat.pet.name}
            </h3>
            {/* Botón de eliminar - solo visible en hover */}
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              title="Eliminar conversación"
            >
              {isDeleting ? (
                <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Trash2 size={16} />
              )}
            </button>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColors(chat.category)}`}>
              {getCategoryLabel(chat.category)}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar size={12} />
              <span>{formatDate(chat.createdAt)}</span>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">{message.title}</h4>
            <p className="text-gray-600 text-sm line-clamp-3">{message.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
