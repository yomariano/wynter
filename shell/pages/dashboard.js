import dynamic from 'next/dynamic'

const RemoteDashboard = dynamic(
  () => import("app2/dashboard"),
  { ssr: false }
)

const App2 = () => {
  return(
    <RemoteDashboard/>
  )
}

export default App2
