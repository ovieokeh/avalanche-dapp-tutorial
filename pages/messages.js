import Layout from '../components/layout/Layout'
import MessagesView from '../views/messages/MessagesView'

export default function Home() {
  return (
    <Layout
      pageTitle="Messages | Avaxbox"
      pageDescription="View all received messages"
    >
      <MessagesView />
    </Layout>
  )
}
