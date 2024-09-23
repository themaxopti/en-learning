import { createBrowserRouter } from 'react-router-dom'
import { App } from '@/components/App/App'
import { Suspense } from 'react'
import { LazyAbout } from '@/pages/about/About.lazy'
import { Dictionaries } from '../pages/Dictionaries/Dictionaries'
import { DictionaryPage } from '../modules/dictionaryModule/pages/DictionaryPage/DictionaryPage'
import { LoginPage } from '@/modules/authModule'
import { DictionaryListPageContainer } from '@/modules/dictionaryModule/pages/DicitionaryListPage/DictionaryListPageContainer'

const routes = [
  {
    path: '/',
    element: <DictionaryListPageContainer />,
  },
  {
    path: '/dictionary/:id',
    element: <DictionaryPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]

export const router = createBrowserRouter(routes)
export default routes
