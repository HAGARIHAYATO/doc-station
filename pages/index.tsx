import Layout from '../components/Layout'
import firebase from '../lib/db';
import { useCollectionData } from "react-firebase-hooks/firestore";
import Doc from '../components/Doc'
import { DocStruct } from '../index'

export default function Home() {
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
  return (
    <>
      <Layout>
        <div className="docs__index">
          {values.map((item, i) => {
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
