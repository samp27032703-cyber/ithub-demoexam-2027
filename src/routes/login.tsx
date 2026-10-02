import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

// Интерфейс для ошибок валидации полей формы
interface LoginErrors {
  login?: string
  password?: string
  auth?: string // Для ошибок неправильного логина/пароля от сервера
}

function LoginComponent() {
  const navigate = useNavigate()

  // Состояния для полей формы
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  
  // Состояния для ошибок и загрузки
  const [errors, setErrors] = useState<LoginErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: LoginErrors = {}

    // 1. Валидация на заполнение полей на клиенте
    if (!login.trim()) {
      newErrors.login = 'Введите логин'
    }
    if (!password) {
      newErrors.password = 'Введите пароль'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setIsSubmitting(true)
      setErrors({})

      // Имитация запроса к серверу/БД для проверки учетных данных
      await new Promise((resolve) => setTimeout(resolve, 1200))

      // Эмуляция проверки (замените на реальный запрос к вашему бэкенду/Prisma)
      // Например, если логин или пароль не подходят:
      if (login.toLowerCase() !== 'admin123' || password !== 'password123') {
        setErrors({ auth: 'Неверный логин или пароль. Попробуйте снова.' })
        return
      }

      console.log('Авторизация успешна:', { login })
      
      // Перенаправление на главную страницу после успешного входа
      navigate({ to: '/' })
    } catch (err) {
      setErrors({ auth: 'Произошла ошибка при подключении к серверу' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
        
        {/* Заголовок страницы */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Вход в систему
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Еще не зарегистрированы?{' '}
            <button
              type="button"
              onClick={() => navigate({ to: '/register' })}
              className="font-medium text-indigo-600 hover:text-indigo-500 bg-transparent border-none cursor-pointer underline decoration-dotted"
            >
              Регистрация
            </button>
          </p>
        </div>

        {/* Форма авторизации */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          
          {/* Общая ошибка некорректного ввода (логин/пароль не совпадают) */}
          {errors.auth && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500 text-center font-medium border border-red-200">
              {errors.auth}
            </div>
          )}

          <div className="space-y-4">
            
            {/* Поле: Логин */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Логин
              </label>
              <input
                type="text"
                className={`relative block w-full rounded-lg border ${
                  errors.login ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                } px-3 py-2 text-gray-950 placeholder-gray-400 focus:z-10 focus:outline-none sm:text-sm`}
                placeholder="Введите ваш логин"
                value={login}
                onChange={(e) => {
                  setLogin(e.target.value)
                  if (errors.login) setErrors(prev => ({ ...prev, login: undefined }))
                }}
              />
              {errors.login && (
                <p className="mt-1 text-xs text-red-500">{errors.login}</p>
              )}
            </div>

            {/* Поле: Пароль */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Пароль
              </label>
              <input
                type="password"
                className={`relative block w-full rounded-lg border ${
                  errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                } px-3 py-2 text-gray-950 placeholder-gray-400 focus:z-10 focus:outline-none sm:text-sm`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errors.password) setErrors(prev => ({ ...prev, password: undefined }))
                }}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

          </div>

          {/* Кнопка отправки формы */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 transition-colors"
            >
              {isSubmitting ? 'Проверка...' : 'Войти'}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
