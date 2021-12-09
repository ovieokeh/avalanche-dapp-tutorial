import Layout from '../components/layout/Layout'
import HomeView from '../views/home/HomeView'

export default function Home() {
  return (
    <Layout
      pageTitle="Home | Avaxbox"
      pageDescription="Send messages on Avalanche"
    >
      <HomeView />
    </Layout>
  )
}
