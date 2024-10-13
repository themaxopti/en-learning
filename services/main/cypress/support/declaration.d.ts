import { MountOptions, MountReturn } from 'cypress/react'
import { MemoryRouterProps } from 'react-router-dom'
import { EnhancedStore } from '@reduxjs/toolkit'
import { RootState } from '../../src/store/store'

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mounts a React node
       * @param component React Node to mount
       * @param options Additional options to pass into mount
       */
      mount(
        component: React.ReactNode,
        options?: MountOptions & { routerProps?: MemoryRouterProps,reduxStore?: EnhancedStore<RootState> }
      ): Cypress.Chainable<MountReturn>
    }
  }
}