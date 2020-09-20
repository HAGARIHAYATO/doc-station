import react, {FC, useState, useEffect, useCallback} from 'react';
import {colors, texts} from '../lib/style.json';
import Router from 'next/router'
import firebase from '../lib/db';
import {useDropzone} from 'react-dropzone';

interface Props {

}

const DocsForm: FC<Props> = () => {
  const [code, setCode] = useState("")
  const [title, setTitle] = useState("")
  const [isfill, setFillFlag] = useState(false)
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      reader.readAsText(file);
      reader.onload = () => {
        setCode(String(reader.result));
      }
    })
    setFillFlag(!isfill)
  }, [])
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({ onDrop, disabled: isfill, multiple: false});
  const getNowTime = (date: Date): String => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return year + "-" + (month > 9 ? month : "0" + month) + "-" + (day > 9 ? day : "0" + day)
  }
  const submit = () => {
    let docs = firebase.firestore().collection('docs')
    try {
      docs
        .add({
          text: code,
          createdAt: getNowTime(new Date),
          title: title,
        })
        .then(ref => {
          console.log('Add ID: ', ref.id)
          Router.push("/")
        })
        .catch(e => console.error(e))
    } catch {
      console.error
    }
  }
  return (
    <>
      <div className="form">
        <input
          type="text"
          className="title"
          placeholder="please, input title"
          onChange={(e) => {
            setTitle(e.target.value)
          }
        }/>
        <div className="container">
          <img src={isfill ? "/static/check.svg" : "/static/plus.svg"} className="fillMark"/>
          <img className="removeIcon" src="/static/remove.svg" onClick={() => {
            setCode("")
            setFillFlag(!isfill);
          }}/>
          <div {...getRootProps({className: 'dropzone'})} className="drop">
            <input {...getInputProps()} type="file"/>
          </div>
        </div>
        <div className="form__container">
          <div className="form__inner">
            <pre>
              {code}
            </pre>
          </div>
        </div>
        <button className="submitBtn" onClick={submit}>Create Docs</button>
      </div>
      <style jsx>{`
      .form {
        width: 100%;
        background-color: ${colors.text};
        position: relative;
        color: ${colors.back};
        padding: 10px 0 60px 0;
      }
      .form__container {
        width: 100%;
        min-height: 100px;
        background-color: ${colors.dark};
        padding: 2%;
      }
      .form__inner {
        border: solid 1px ${colors.text};
        border-radius: 10px;
        min-height: 100px;
        width: 100%;
        position: relative;
        padding: 20px 2%;
      }
      .submitBtn {
        padding: .7% 4%;
        width: 200px;
        border-radius: 3px;
        font-weight: bold;
        background-color: ${colors.main};
        color: ${colors.text};
        border: none;
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        transition: box-shadow .2s;
      }
      .submitBtn:hover {
        box-shadow: 0 0 5px ${colors.back};
      }
      .submitBtn:active {
        box-shadow: none;
      }
      .container {
        margin: 1% 2%;
        background-color: ${colors.back};
        width: 96%;
        height: 100px;
        border: dotted 2px ${colors.dark};
        border-radius: 10px;
        position: relative;
        display: flex;
        justify-content: center;
      }
      .drop {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        height: inherit;
      }
      .fillMark {
        height: 40px;
        margin: auto 1%;
      }
      .removeIcon {
        width: ${isfill ? "40px" : "0"};
        transition: all .5s;
        z-index: 2;
      }
      .title {
        padding: 0 5px;
        margin: 0 0 0 2%;
        height: 30px;
        width: 200px;
        color: ${colors.dark} !important;
      }
      `}</style>
    </>
  )
}

export default DocsForm