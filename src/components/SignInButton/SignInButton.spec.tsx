import { render, screen } from "@testing-library/react";
import SignInButton from ".";
import { useSession } from "next-auth/react";
import { mocked } from "jest-mock";
import styles from './styles.module.scss'
import { Session } from "next-auth";


jest.mock('next-auth/react')

describe('SignInButton component', () => {
    it('renders correctly when user is not auth', () => {

      const useSessionMocked = mocked(useSession)

      useSessionMocked.mockReturnValueOnce({ 
        data: null, 
        status: 'unauthenticated',
      })

      render(
        <SignInButton />
      )
      expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
    })

    it('renders correctly when user is auth', () => {
      const useSessionMocked = mocked(useSession)

      useSessionMocked.mockReturnValueOnce({ 
        data: {
            user: {name: "John Doe", email: "john.doe@email.com"}, 
            expires: "fake-expires"
          } as (Session | null), 
        status: 'authenticated',
      })


      render(
        <SignInButton />
      )
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })


})