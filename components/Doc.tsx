import react, {FC} from 'react';
import {colors, texts} from '../lib/style.json';
import Router from 'next/router'
import { DocStruct } from '../index'

interface Props {
  item: DocStruct
}


const Doc: FC<Props> = (props) => {
  const doc = props.item
  return(
    <>
      <div className="doc__container" onClick={() => Router.push('/' + doc.id)}>
        <p className="docTitle">{doc.title}</p>
        <p className="docID">{doc.id}</p>
      </div>
      <style jsx>{`
      .doc__container {
        background-color: ${colors.text};
        height: 60px;
        line-height: 60px;
        width: 700px;
        margin: 20px auto;
        display: flex;
        justify-content: space-between;
      }
      .docID {
        color: grey !important;
        margin: 0 20px;
      }
      .docTitle {
        color: ${colors.dark} !important;
        margin: 0 20px;
      }
      `}</style>
    </>
  )
}

export default Doc