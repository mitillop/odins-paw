import Image from "next/image";
import { Trash2, Calendar, MessageCircle, HelpCircle, Sparkles, User } from "lucide-react";

export default function ChatHistoryItem({ chat, onDelete, isDeleting }) {
  const message =
    typeof chat.message === "string" ? JSON.parse(chat.message) : chat.message;

  const getCategoryColors = (category) => {
    switch (category) {
      case "Preguntas_Generales":
        return "badge-primary";
      case "Alimentacion":
        return "badge-warning";
      case "Cuidados":
        return "badge-secondary";
      default:
        return "badge-neutral";
    }
  };

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

  const formatResponse = (content) => {
    const lines = content.split('\n');
    const formattedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      if (line.includes('**')) {
        const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>');
        formattedLines.push(`<div class="mb-2">${formatted}</div>`);
      }
      else if (/^\d+\./.test(line)) {
        const number = line.match(/^(\d+)\./)[1];
        const content = line.replace(/^\d+\.\s*/, '');
        const formatted = content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>');
        formattedLines.push(`
          <div class="flex gap-3 mb-3 p-3 bg-base-200/50 rounded-lg hover:bg-base-200 transition-colors">
            <div class="flex-shrink-0 w-6 h-6 bg-primary text-primary-content rounded-full flex items-center justify-center text-sm font-bold">
              ${number}
            </div>
            <div class="flex-1">${formatted}</div>
          </div>
        `);
      }
      else {
        const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>');
        formattedLines.push(`<div class="mb-2">${formatted}</div>`);
      }
    }
    
    return formattedLines.join('');
  };

  const petName = chat.pet?.name || "Consulta General";
  const petImageUrl = chat.pet?.imageUrl || "https://odinpawsimages.blob.core.windows.net/pet-images/12e4f3ae-c4e3-4104-81f4-81a977a35f38.png";

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group border border-base-200 hover:border-primary/20">
      <div className="card-body p-0">
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-20 h-20 rounded-full ring-2 ring-primary ring-offset-4 ring-offset-base-100 shadow-lg">
                  {chat.pet ? (
                    <Image
                      src={petImageUrl}
                      alt={petName}
                      width={80}
                      height={80}
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                      <User size={32} className="text-primary" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-base-content flex items-center gap-2 mb-3">
                  <MessageCircle size={20} className="text-primary" />
                  {petName}
                </h3>
                
                <div className="flex flex-wrap items-center gap-3">
                  <div className={`badge ${getCategoryColors(chat.category)} badge-lg gap-1`}>
                    <Sparkles size={12} />
                    {getCategoryLabel(chat.category)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-base-content/70 bg-base-100/80 px-3 py-1 rounded-full">
                    <Calendar size={14} />
                    <span className="font-medium">{formatDate(chat.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="tooltip tooltip-left" data-tip="Eliminar conversación">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="btn btn-ghost btn-sm btn-circle opacity-0 group-hover:opacity-100 transition-all duration-300 hover:btn-error hover:scale-110"
              >
                {isDeleting ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <Trash2 size={18} />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-r from-info/10 to-info/5 border-l-4 border-info p-5 rounded-r-xl">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-8 h-8 bg-info text-info-content rounded-full flex items-center justify-center">
                <HelpCircle size={16} />
              </div>
              <h4 className="text-lg font-bold text-info flex-1">
                Pregunta
              </h4>
            </div>
            <p className="text-base-content/90 text-lg leading-relaxed pl-11">
              {message.title}
            </p>
          </div>

          <div className="bg-gradient-to-r from-success/10 to-success/5 border-l-4 border-success p-5 rounded-r-xl">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-8 h-8 bg-success text-success-content rounded-full flex items-center justify-center">
                <Sparkles size={16} />
              </div>
              <h4 className="text-lg font-bold text-success flex-1">
                Respuesta de Odin's Paw
              </h4>
            </div>
            <div className="pl-11">
              <div 
                className="prose prose-sm max-w-none text-base-content/90 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatResponse(message.content) }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
