import react, {FC, useState, useEffect, Dispatch, SetStateAction, useReducer} from 'react';
import Link from 'next/link';
import {colors, texts} from '../lib/style.json';

interface Props {

}

interface Doc {
  name: string,
  body: string
}

const DocsForm: FC<Props> = () => {
  const submit = () => {
    console.log("submit")
  }
  const [docs, dispatch] = useReducer((state, action) => {
    state.push(action)
    return state
  }, [])
  const [isFolderOpen, setIsFolderOpen] = useState(false)
  const [isWrite, setIsWrite] = useState(true)
  const [isSetting, setIsSetting] = useState(false)
  const [mainTitle, setMainTitle] = useState("")
  return (
    <>
      <div className="form">
        <div className="form__container">
          <div className="form__inner">
            {isWrite
            ?
            <input type="text"
              onChange={(e) => { setMainTitle(e.target.value) }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  setIsWrite(!isWrite);
                }
              }}
              className="form__directly__title"
            />
            :
            <p
              className="form__directly__title">{mainTitle}
              <img
                src="/static/gear.svg"
                onClick={() => {
                  setIsSetting(!isSetting)
                }}
              />
            </p>}
            {isSetting ? <div className="navi">
              <p onClick={() => { setIsWrite(!isWrite); setIsSetting(!isSetting) }}>Rename</p>
              <p>Add Folder</p>
            </div> : <></>}
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
        padding: 2% 0 80px 0;
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
      }
      .form__directly__title {
        padding: 0 10px; 
        position: absolute;
        top: -15px;
        left: 2%;
        height: 30px;
        border-radius: 3px;
        border: none;
        ${isWrite ? `background-color: lightgrey; color: ${colors.back} !important; width: 150px;` : `background-color: black; color: ${colors.text} !important; line-height: 30px;`}
        z-index: 1;
        & img {
          margin: 0 0 4px 10px;
          height: 18px;
          vertical-align: middle;
          transition: all .3s;
          &:hover {
            transform: scale(1.15);
          }
        }
      }
      .navi {
        position: absolute;
        top: 16px;
        left: 100px; 
        z-index: 2;
        background-color: black;
        border: solid 1px ${colors.text};
        border-radius: 3px;
        width: 100px;
        min-height: 100px;
        font-size: 10px;
        padding: 5px 10px;
        & p {
          color: ${colors.text} !important;
          cursor: pointer;
        }
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
        &:hover {
          box-shadow: 0 0 5px ${colors.back};
        }
        &:active {
          box-shadow: none;
        }
      }
      `}</style>
    </>
  )
}

export default DocsForm