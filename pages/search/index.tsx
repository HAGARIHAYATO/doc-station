import { useRouter } from 'next/router';
import Layout from '../../components/Layout'
import firebase from '../../lib/db';
import { useCollectionData } from "react-firebase-hooks/firestore";
import Doc from '../../components/Doc'
import { DocStruct } from '../../index'

export default function Home() {
  const router = useRouter()
  const queries = String(router.query.q).trim().split(" ")
  console.log(queries)
  const [values, loading, error]: [Array<DocStruct>, boolean, Error] = useCollectionData(
    firebase.firestore().collection('docs'),
    {
      idField: "id",
      snapshotListenOptions: { includeMetadataChanges: true }
    }
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{`Error: ${error.message}`}</div>;
  }
  const results = values.filter((val) => {
    for (const query of queries) {
      return val.title.indexOf(query) !== -1
    }
  })
  console.log(results)
  return (
    <>
      <Layout>
        <div className="docs__index">
          {results.map((item, i) => {
            return <Doc item={item} key={i}/>
          })}
        </div>
      </Layout>
      <style jsx>{`
      .docs__index {
        padding: 30px 0;
      }
      `}</style>
    </>
  )
}