import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    { url: 'https://unsplash.com', tag: 'Разработка', title: 'Основы алгоритмизации', desc: 'Изучение базовых концепций.' },
    { url: 'https://unsplash.com', tag: 'Данные', title: 'Проектирование баз данных', desc: 'Реляционные архитектуры и SQL.' },
    { url: 'https://unsplash.com', tag: 'Дизайн', title: 'Основы веб-дизайна', desc: 'Интерфейсы и адаптивная верстка.' },
    { url: 'https://unsplash.com', tag: 'Системы', title: 'Информационные платформы', desc: 'Автоматизация процессов.' }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-between p-4 antialiased">
      <header className="w-full max-w-[390px] bg-slate-800 border border-slate-700 px-4 py-3 flex items-center justify-between rounded-2xl shadow-lg">
        <span className="text-base font-extrabold tracking-tight text-indigo-400">EduPortal</span>
        <div className="flex gap-2">
          <button type="button" onClick={() => navigate({ to: '/login' })} className="text-xs font-bold text-slate-300 px-3 py-1.5 rounded-xl bg-slate-700 border-none cursor-pointer">Вход</button>
          <button type="button" onClick={() => navigate({ to: '/register' })} className="text-xs font-bold bg-indigo-600 text-white px-3 py-1.5 rounded-xl border-none cursor-pointer">Регистрация</button>
        </div>
      </header>

      <main className="w-full max-w-[390px] py-6 flex-1 flex flex-col justify-center space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black text-white">Информационная Система</h1>
          <p className="text-xs text-slate-400">Подача заявок и отслеживание обучения.</p>
        </div>

        {/* Слайдер по критериям (4 картинки, 3 секунды, кнопки) */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
          <div className="w-full h-full flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide, idx) => (
              <div key={idx} className="w-full h-full shrink-0 relative">
                <img src={slide.url} alt="" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                  <span className="text-[9px] font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">{slide.tag}</span>
                  <h4 className="text-sm font-bold text-white mt-1">{slide.title}</h4>
                  <p className="text-[10px] text-slate-400">{slide.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-900/80 text-white w-7 h-7 rounded-full border border-slate-700 cursor-pointer flex items-center justify-center font-bold">←</button>
          <button type="button" onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900/80 text-white w-7 h-7 rounded-full border border-slate-700 cursor-pointer flex items-center justify-center font-bold">→</button>
        </div>

        {/* Сетка переходов */}
        <div className="grid grid-cols-1 gap-2.5">
          <button type="button" onClick={() => navigate({ to: '/create-request' })} className="flex items-center gap-3 bg-slate-800 p-4 rounded-xl border border-slate-700 text-left cursor-pointer">
            <span className="text-lg font-bold text-indigo-400">+</span>
            <div><span className="block text-xs font-bold text-slate-100">Новая заявка</span><span className="block text-[10px] text-slate-400">Формирование параметров обучения</span></div>
          </button>
          <button type="button" onClick={() => navigate({ to: '/requests' })} className="flex items-center gap-3 bg-slate-800 p-4 rounded-xl border border-slate-700 text-left cursor-pointer">
            <span className="text-lg font-bold text-emerald-400">☰</span>
            <div><span className="block text-xs font-bold text-slate-100">Мои заявки</span><span className="block text-[10px] text-slate-400">Просмотр и написание отзывов</span></div>
          </button>
        </div>
      </main>

      <footer className="text-[10px] text-slate-500 py-2">© 2026 EDUPORTAL • 390×844 px</footer>
    </div>
  )
}
