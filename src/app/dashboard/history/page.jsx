import { getChatHistory } from '../../actions/chat/getChatHistory'
import ChatHistoryFilters from '../../../components/ChatHistoryFilters'
import ChatHistoryItem from '../../../components/ChatHistoryItem'

export default async function History() {
  const response = await getChatHistory()

  if (!response.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-medium">Error al cargar el historial</p>
          <p className="text-sm">{response.details}</p>
        </div>
      </div>
    )
  }

  const { data: history, pets } = response

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Historial de Conversaciones</h1>
      
      <ChatHistoryFilters pets={pets} />
      
      <div className="space-y-4">
        {history.length > 0 ? (
          history.map((chat) => (
            <ChatHistoryItem key={chat.id} chat={chat} />
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No hay conversaciones en el historial</p>
          </div>
        )}
      </div>
    </div>
  )
}