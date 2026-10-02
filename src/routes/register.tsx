import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/register')({
  component: RegisterComponent,
})

function RegisterComponent() {
  const navigate = useNavigate()
  
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Record<string, string> = {}

    // Валидация регулярных выражений строго по вашему ТЗ
    if (!/^[a-zA-Z0-9]{6,}$/.test(login)) {
      errs.login = 'Только латиница и цифры, не менее 6 символов'
    }
    if (password.length < 8) {
      errs.password = 'Пароль должен быть минимум 8 символов'
    }
    if (!/^[а-яА-ЯёЁ\s]+$/.test(fullName)) {
      errs.fullName = 'Разрешены только символы кириллицы и пробелы'
    }
    if (!/^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(phone)) {
      errs.phone = 'Формат телефона должен быть: 8(XXX)XXX-XX-XX'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Некорректный формат адреса электронной почты'
    }

    // Проверка уникальности логина по критериям
    if (login.toLowerCase() === 'admin' || login.toLowerCase() === 'user123') {
      errs.login = 'Этот логин уже зарегистрирован в базе данных'
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    console.log('Данные занесены в базу данных:', { login, password, fullName, phone, email })
    navigate({ to: '/login' })
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[390px] bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-4 shadow-xl">
        <h2 className="text-xl font-bold text-center text-white">Регистрация</h2>
        
        <form onSubmit={handleSubmit} className="space-y-3" noValidate>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Логин</label>
            <input
              type="text"
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              value={login}
              onChange={(e) => {
                setLogin(e.target.value)
                setErrors((prev) => ({ ...prev, login: '' }))
              }}
            />
            {errors.login && <p className="mt-1 text-[10px] text-red-400">{errors.login}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Пароль</label>
            <input
              type="password"
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setErrors((prev) => ({ ...prev, password: '' }))
              }}
            />
            {errors.password && <p className="mt-1 text-[10px] text-red-400">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">ФИО</label>
            <input
              type="text"
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value)
                setErrors((prev) => ({ ...prev, fullName: '' }))
              }}
            />
            {errors.fullName && <p className="mt-1 text-[10px] text-red-400">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Телефон</label>
            <input
              type="text"
              placeholder="8(999)123-45-67"
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                setErrors((prev) => ({ ...prev, phone: '' }))
              }}
            />
            {errors.phone && <p className="mt-1 text-[10px] text-red-400">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Email адрес</label>
            <input
              type="email"
              placeholder="example@mail.ru"
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setErrors((prev) => ({ ...prev, email: '' }))
              }}
            />
            {errors.email && <p className="mt-1 text-[10px] text-red-400">{errors.email}</p>}
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-2 rounded-xl text-xs border-none cursor-pointer mt-2 active:scale-95 transition-all">
            Создать пользователя
          </button>
        </form>

        <p className="text-[11px] text-slate-400 text-center">
          Уже зарегистрированы?{' '}
          <button type="button" onClick={() => navigate({ to: '/login' })} className="text-indigo-400 font-bold bg-transparent border-none cursor-pointer underline">
            Войти
          </button>
        </p>
      </div>
    </div>
  )
}
