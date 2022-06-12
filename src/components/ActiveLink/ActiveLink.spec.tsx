import { render, screen } from "@testing-library/react";
import ActiveLink from ".";

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe('ActiveLink component', () => {
    it('renders correctly', () => {
      render(
        <ActiveLink 
        href="/"
        activeLinkClassname="active"
        >
          <a>Home</a>
        </ActiveLink>
      )
    
      expect(screen.getByText('Home')).toBeInTheDocument()
    })
    
    
    it('is receiving active class if link is currently active', () => {
      const {getByText} = render(
        <ActiveLink 
        href="/"
        activeLinkClassname="active"
        >
          <a>Home</a>
        </ActiveLink>
      )
    
      expect(getByText('Home')).toHaveClass('active')
    })
})