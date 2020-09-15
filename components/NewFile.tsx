import react, {FC, useState, useEffect, Dispatch, SetStateAction, useReducer} from 'react';
import Link from 'next/link';
import {colors, texts} from '../lib/style.json';

interface Props {
  isOpen: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
  dispatch: Dispatch<any>
}

const NewFile: FC<Props> = (props) => {
  let [content, setContent] = useState("")
  let [fileContent, setFileContent] = useState("")
  const [isInputFile, setFile] = useState(false)
  const initState = () => {
    setContent("")
    setFileContent("")
    setFile(false)
    props.setOpen(!props.isOpen)
  } 
  return (
    <>
      {props.isOpen ? <div className="layer">
        <div className="newInput">
          <label htmlFor="file">
            Select File
            {isInputFile ? <img src="/static/check.svg"/> : ""}
            <input type="file" id="file" onChange={(e) => {
              setFileContent(e.target.value)
              e.target.value !== "" ? setFile(true) : setFile(false); 
            }}/>
          </label>
          <br />
          <input type="text" onChange={(e) => { setContent(e.target.value)}}/>
          <br />
          <button onClick={() => {
            console.log(content !== "", isInputFile, content, fileContent)
            if (content !== "" && isInputFile) {
              props.dispatch({
                name: content,
                isFolder: false
              })
              initState()
              return
            }
          }}>Add File</button>
        </div>
        <img src="/static/back.png" className="eliminate" onClick={() => {
          initState()
        }}/>
      </div> : ""}
      <style jsx>{`
      .layer {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 100;
      }
      .newInput {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: inline-block;
        background-color: ${colors.back};
        border-radius: 5px;
        padding: 1% 3%;
        & input, button, label {
          width: 100%;
          height: 30px;
          margin: 5px 0;
          color: ${colors.back} !important;
        }
        & label {
          line-height: 36px;
          height: 40px;
          display: inline-block;
          text-align: center;
          color: ${colors.dark} !important;
          font-size: 16px;
          padding: 0 25px 0 5px;
          border-radius: 10px;
          border: solid 2px ${colors.dark};
          position: relative;
          & input[type="file"] {
            display: none;
          }
          & img {
            height: 20px;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
      .eliminate {
        height: 40px;
        position: absolute;
        top: 5px;
        right: 5px;
        background-color: black;
        border-radius: 10px;
        padding: 7px;
      }
      `}</style>
    </>
  )
}

export default NewFile