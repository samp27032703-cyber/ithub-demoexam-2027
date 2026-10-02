
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/create-request')({
  component: CreateRequestComponent,
})

// Интерфейс для ошибок валидации формы
interface RequestErrors {
  course?: string
  startDate?: string
  paymentMethod?: string
  server?: string
}

function CreateRequestComponent() {
  const navigate = useNavigate()

  // Состояния для полей формы
  const [course, setCourse] = useState('')
  const [startDate, setStartDate] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  // Состояния для ошибок и загрузки
  const [errors, setErrors] = useState<RequestErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Список курсов строго по вашему ТЗ
  const COURSES = [
    'Основы алгоритмизации и программирования',
    'Основы веб-дизайна',
    'Основы проектирования баз данных',
  ]

  // Регулярное выражение для проверки даты в формате ДД.ММ.ГГГГ
  const REGEX_DATE = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}\$/

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: RequestErrors = {}

    // 1. Проверка обязательности выбора курса
    if (!course) {
      newErrors.course = 'Пожалуйста, выберите наименование курса из списка'
    }

    // 2. Проверка обязательности и формата даты начала обучения
    if (!startDate.trim()) {
      newErrors.startDate = 'Пожалуйста, укажите желаемую дату начала обучения'
    } else if (!REGEX_DATE.test(startDate)) {
      newErrors.startDate = 'Введите дату строго в формате ДД.ММ.ГГГГ (например, 15.10.2026)'
    }

    // 3. Проверка выбора способа оплаты
    if (!paymentMethod) {
      newErrors.paymentMethod = 'Пожалуйста, выберите удобный способ оплаты'
    }

    // Если есть ошибки валидации — прерываем отправку
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setIsSubmitting(true)
      setErrors({})

      // Имитация отправки заявки на сервер/базу данных к администратору
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log('Заявка успешно сформирована и направлена администратору:', {
        course,
        startDate,
        paymentMethod,
        status: 'в обработке', // По умолчанию заявка уходит на рассмотрение
      })

      // После успешной отправки перенаправляем на страницу со списком всех заявок
      navigate({ to: '/requests' })
    } catch (err) {
      setErrors({ server: 'Произошла ошибка при отправке заявки на сервер' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
        
        {/* Заголовок страницы */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Оставить заявку
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Заполните параметры обучения для отправки администратору
          </p>
        </div>

        {/* Форма подачи заявки */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          
          {errors.server && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500 text-center font-medium border border-red-200">
              {errors.server}
            </div>
          )}

          <div className="space-y-5">
            
            {/* Поле: Наименование курса (выпадающий список) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Наименование курса
              </label>
              <select
                value={course}
                onChange={(e) => {
                  setCourse(e.target.value)
                  if (errors.course) setErrors((prev) => ({ ...prev, course: undefined }))
                }}
                className={`block w-full rounded-lg border ${
                  errors.course ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                } px-3 py-2 text-gray-950 bg-white sm:text-sm focus:outline-none focus:ring-1`}
              >
                <option value="">-- Выберите образовательный курс --</option>
                {COURSES.map((courseName, index) => (
                  <option key={index} value={courseName}>
                    {courseName}
                  </option>
                ))}
              </select>
              {errors.course && (
                <p className="mt-1 text-xs text-red-500">{errors.course}</p>
              )}
            </div>

            {/* Поле: Желаемая дата начала обучения */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Желаемая дата начала обучения (ДД.ММ.ГГГГ)
              </label>
              <input
                type="text"
                placeholder="Например, 25.10.2026"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value)
                  if (errors.startDate) setErrors((prev) => ({ ...prev, startDate: undefined }))
                }}
                className={`block w-full rounded-lg border ${
                  errors.startDate ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                } px-3 py-2 text-gray-950 sm:text-sm focus:outline-none focus:ring-1`}
              />
              {errors.startDate && (
                <p className="mt-1 text-xs text-red-500">{errors.startDate}</p>
              )}
            </div>

            {/* Поле: Способ оплаты (радиокнопки) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Удобный способ оплаты
              </label>
              <div className="space-y-2 rounded-lg border border-gray-200 p-4 bg-gray-50/50">
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="наличными"
                    checked={paymentMethod === 'наличными'}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value)
                      if (errors.paymentMethod) setErrors((prev) => ({ ...prev, paymentMethod: undefined }))
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-900 font-medium">Наличными</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="переводом по номеру телефона"
                    checked={paymentMethod === 'переводом по номеру телефона'}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value)
                      if (errors.paymentMethod) setErrors((prev) => ({ ...prev, paymentMethod: undefined }))
                    }}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-900 font-medium">Переводом по номеру телефона</span>
                </label>

              </div>
              {errors.paymentMethod && (
                <p className="mt-1 text-xs text-red-500">{errors.paymentMethod}</p>
              )}
            </div>

          </div>

          {/* Управление действиями формы */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate({ to: '/requests' })}
              className="w-1/3 flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-2/3 flex justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors shadow-sm"
            >
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}