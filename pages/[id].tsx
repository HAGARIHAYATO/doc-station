import Layout from '../components/Layout'
import { useRouter } from 'next/router';
import { DocStruct } from '../index'
import firebase from '../lib/db'
import {colors, texts} from '../lib/style.json';
import { useDocument } from "react-firebase-hooks/firestore";

export default function Home() {
  const router = useRouter()
  const id = router.query.id
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`docs/${id}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{`Error: ${error.message}`}</div>;
  }
  const valueStrings = value.data().text.split("\n")
  const doc = value.data()
  return (
    <>
      <Layout>
        <div className="rows__theme">
          <p className="theme__title">{doc.title}</p>
          <div>
            <p className="theme__id">ID: {value.id}</p>
            <p className="theme__id">CREATED: {doc.createdAt}</p>
          </div>
        </div>
        <div className="rows">
          {valueStrings.map((str, i) => {
            return <div key={i+1} className={i%2 === 0 ? "row" : "row odd"}><p className="number">{i+1}</p><pre>{str} </pre></div>
          })}
        </div>
      </Layout>
      <style jsx>{`
      .rows__theme {
        background-color: ${colors.text};
        font-weight: bold;
        font-size: 26px;
        padding: 2% 4%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .theme__title {
        color: ${colors.dark} !important;
      }
      .theme__id {
        font-size: 16px;
        color: grey !important;
      }
      .rows {
        padding: 1%;
        background-color: ${colors.text};
        overflow-x: scroll;
      }
      .row {
        padding: 0 0 0 70px;
        position: relative;
      }
      .odd {
        background-color: lightblue;
      }
      .row pre {
        color: ${colors.dark} !important;
      }
      .number {
        position: absolute;
        left: 5px;
        color: ${colors.main} !important;
      }
      `}</style>
    </>
  )
}