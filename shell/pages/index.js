import tw from 'twin.macro'
import Nav from '../components/nav'
import { useAuth } from "../context/AuthContext"
import App2 from "./dashboard"


const Home = () => {
  const { user } = useAuth();
  return (
    <div css={[tw`flex flex-col min-h-screen`, tw`bg-gradient-to-b from-purple-800 to-indigo-500`]}>
      <div css={[tw`sticky top-0 z-50`,]}>
        <Nav user={user} />
      </div>
      {user &&
        <div css={[tw`flex flex-col h-screen`]}>
          <App2 />
        </div>
      }

    </div>
  )
}

export default Home