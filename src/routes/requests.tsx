import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/requests')({
  component: RequestsComponent,
})

interface EducationalRequest {
  id: string
  courseName: string
  dateCreated: string
  status: 'в обработке' | 'обучение' | 'завершен'
  hasReview: boolean
}

function RequestsComponent() {
  const navigate = useNavigate()

  const [requests, setRequests] = useState<EducationalRequest[]>([
    {
      id: 'REQ-101',
      courseName: 'Разработка приложений на React & TypeScript',
      dateCreated: '12.02.2026',
      status: 'завершен',
      hasReview: false,
    },
    {
      id: 'REQ-102',
      courseName: 'Проектирование баз данных с Prisma ORM',
      dateCreated: '05.03.2026',
      status: 'обучение',
      hasReview: false,
    },
    {
      id: 'REQ-103',
      courseName: 'Основы UI/UX дизайна',
      dateCreated: '28.03.2026',
      status: 'в обработке',
      hasReview: false,
    },
    {
      id: 'REQ-104',
      courseName: 'Автоматизированное тестирование на JS',
      dateCreated: '10.12.2025',
      status: 'завершен',
      hasReview: true,
    },
  ])

  const [selectedRequest, setSelectedRequest] = useState<EducationalRequest | null>(null)
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewError, setReviewError] = useState('')

  const handleSendReview = (e: React.FormEvent) => {
    e.preventDefault()

    if (!reviewText.trim()) {
      setReviewError('Пожалуйста, заполните текст отзыва перед отправкой')
      return
    }

    setRequests((prev) =>
      prev.map((req) =>
        req.id === selectedRequest?.id ? { ...req, hasReview: true } : req
      )
    )

    console.log(`Отзыв отправлен для: ${selectedRequest?.courseName}`, {
      rating: reviewRating,
      text: reviewText.trim(),
    })

    setSelectedRequest(null)
    setReviewText('')
    setReviewRating(5)
    setReviewError('')
  }

  const getStatusStyles = (status: EducationalRequest['status']) => {
    switch (status) {
      case 'завершен': return 'bg-green-100 text-green-800 border-green-200'
      case 'обучение': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'в обработке': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Мои заявки</h1>
          </div>
          <button
            onClick={() => navigate({ to: '/' })}
            className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
          >
            На главную
          </button>
        </div>

        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-400">{request.id}</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${getStatusStyles(request.status)}`}>
                    {request.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{request.courseName}</h3>
                <p className="text-xs text-gray-400">Дата создания: {request.dateCreated}</p>
              </div>

              <div className="sm:text-right shrink-0">
                {request.status !== 'завершен' ? (
                  <div className="text-xs text-gray-400 italic max-w-[200px]">
                    Отзыв доступен только после прохождения курса
                  </div>
                ) : request.hasReview ? (
                  <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                    ✓ Отзыв отправлен
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedRequest(request)}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                  >
                    Оставить отзыв
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Оставить отзыв</h3>
              <p className="text-sm text-gray-500 font-semibold">{selectedRequest.courseName}</p>

              <form onSubmit={handleSendReview} className="space-y-4" noValidate>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ваша оценка</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-950 sm:text-sm"
                  >
                    <option value={5}>5 — Отлично</option>
                    <option value={4}>4 — Хорошо</option>
                    <option value={3}>3 — Удовлетворительно</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Текст отзыва</label>
                  <textarea
                    rows={4}
                    value={reviewText}
                    onChange={(e) => {
                      setReviewText(e.target.value)
                      if (reviewError) setReviewError('')
                    }}
                    className={`block w-full rounded-lg border ${reviewError ? 'border-red-500' : 'border-gray-300'} px-3 py-2 text-gray-950 sm:text-sm`}
                  />
                  {reviewError && <p className="mt-1 text-xs text-red-500">{reviewError}</p>}
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRequest(null)
                      setReviewError('')
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg"
                  >
                    Отмена
                  </button>
                  <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg">
                    Отправить
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}