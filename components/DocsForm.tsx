import react, {FC, useState, useEffect, Dispatch, SetStateAction, useReducer} from 'react';
import Link from 'next/link';
import {colors, texts} from '../lib/style.json';
import FormInline from './FormInline';
import NewFolder from './NewFolder';
import NewFile from './NewFile';

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
  const [children, dispatch] = useReducer((state, action) => {
    state.push(action)
    return state
  }, [])
  const [isNewFileOpen, setNewFileOpen] = useState(false)
  const [isNewFolderOpen, setNewFolderOpen] = useState(false)
  const [isWrite, setIsWrite] = useState(true)
  const [isSetting, setIsSetting] = useState(false)
  const [mainTitle, setMainTitle] = useState("")

  const addChild = (isFolder: boolean) => {
    isFolder ? setNewFolderOpen(!isNewFolderOpen) : setNewFileOpen(!isNewFileOpen);
  }
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
              <p onClick={() => { setIsWrite(!isWrite); setIsSetting(!isSetting); }}>Rename</p>
              <p onClick={() => { setIsSetting(!isSetting); addChild(true); }}>Add Folder</p>
              <p onClick={() => { setIsSetting(!isSetting); addChild(false); }}>Add File</p>
            </div> : <></>}
            {children.map((c, i) => {
              console.log(c, i)
              return <FormInline content={c} index={i} key={i}/>
            })}
          </div>
        </div>
        <button className="submitBtn" onClick={submit}>Create Docs</button>
      </div>
      <NewFolder isOpen={isNewFolderOpen} setOpen={setNewFolderOpen} dispatch={dispatch}/>
      <NewFile isOpen={isNewFileOpen} setOpen={setNewFileOpen} dispatch={dispatch}/>
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
        padding: 20px 2%;
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
          margin: 5px 0;
          font-weight: bold;
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