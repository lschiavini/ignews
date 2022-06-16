import { fireEvent, render, screen } from "@testing-library/react";
import { fn, mocked } from "jest-mock";
import { Session } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SubscribeButton from ".";


jest.mock('next-auth/react')
jest.mock('next/router')


describe('SubscribeButton component', () => {
    it('renders correctly', () => {

      const useSessionMocked = mocked(useSession)

      useSessionMocked.mockReturnValueOnce({ 
        data: null, 
        status: 'unauthenticated',
      })

      render(
        <SubscribeButton />
      )
      expect(screen.getByText('Subscribe Now')).toBeInTheDocument()
    })

    it('redirects user to sign in when not authenticated', () => {

      const useSessionMocked = mocked(useSession)

      useSessionMocked.mockReturnValueOnce({ 
        data: null, 
        status: 'unauthenticated',
      })

      const signInMocked = mocked(signIn)

      render(<SubscribeButton />)

      const subscribeButton = screen.getByText('Subscribe Now')

      fireEvent.click(subscribeButton)

      expect(signInMocked).toHaveBeenCalled()

    })


    it('redirects to posts when user has active subscription', () => {
      const useRouterMocked = mocked(useRouter)
      const useSessionMocked = mocked(useSession)
      const pushMock = jest.fn()

      useRouterMocked.mockReturnValueOnce({
        push: pushMock
      } as any)

      useSessionMocked.mockReturnValueOnce({ 
        data: {
            user: {
              name: "John Doe", 
              email: "john.doe@email.com"
            }, 
            activeSubscription: "lalalalla",
            expires: "fake-expires"
        } as Session,
        status: 'authenticated',
      })

      render(<SubscribeButton />)

      const subscribeButton = screen.getByText('Subscribe Now')

      fireEvent.click(subscribeButton)
      
      expect(pushMock).toHaveBeenCalledWith('/posts')

    })
})