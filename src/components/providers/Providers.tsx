'use client'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from '@/store/store'
// import persistor from the correct path where it is exported
// Make sure persistor is exported from your store file, e.g., '@/store/store'
import { persistor } from '@/store/store'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={
          <div className="min-h-screen flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        } 
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  )
}

