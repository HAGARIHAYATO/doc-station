import Layout from '../../components/Layout'
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter()
  const id = router.query.id
  return (
    <>
      <Layout>
        {id}
      </Layout>
      <style jsx>{`
      `}</style>
    </>
  )
}