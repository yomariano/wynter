import Link from 'next/link'
import { useAuth } from "../context/AuthContext";
import Button from "./button"
import tw from 'twin.macro'

const Nav = () => {
  const { user, login, logout } = useAuth();

  return (

    <div css={[tw`grid grid-cols-12 gap-4`]}>
      <div css={[tw`col-span-11 justify-self-end m-3`]}>
        {
          !user
            ? <Button isSecondary onClick={login}>Login</Button>
            : <Button isSecondary onClick={logout}>Logout</Button>
        }
      </div>
      {user &&
        <img src={user.photoURL} css={[tw`object-cover h-12 w-12 rounded-full m-3 items-center justify-self-center`]} />
      }

    </div>
  )
}

export default Nav
