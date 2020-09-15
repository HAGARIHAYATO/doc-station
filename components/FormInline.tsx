import react, {FC, useState, useEffect, Dispatch, SetStateAction, useReducer} from 'react';
import Link from 'next/link';
import {colors, texts} from '../lib/style.json';
import NewFolder from './NewFolder';
import NewFile from './NewFile';

interface Props {
  index: number,
  content: any
}

const FormInline: FC<Props> = (props) => {
  const [isFolderOpen, setIsFolderOpen] = useState(false)
  const [isWriteLine, setIsWriteLine] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [title, setTitle] = useState("")

  const [isNewFileOpen, setNewFileOpen] = useState(false)
  const [isNewFolderOpen, setNewFolderOpen] = useState(false)
  const addChild = (isFolder: boolean) => {
    isFolder ? setNewFolderOpen(!isNewFolderOpen) : setNewFileOpen(!isNewFileOpen);
  }

  const [children, dispatch] = useReducer((state, action) => {
    state.push(action)
    return state
  }, [])

  useEffect(() => {
    if (title !== "") {
      props.content.name = title;
    }
    if (children.length > 1) {
      props.content.content = children;
    }
  }, [title, children])


  return (
    <>
      <div className="inline">
        {
          props.content.isFolder?
          <>
          {isWriteLine ?
            <input type="text" className="input"
              onChange={(e) => { setTitle(e.target.value) }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  setIsWriteLine(!isWriteLine);
                }
              }}
            />
            :
            <><p className="inline__title" onClick={() => { setIsFolderOpen(!isFolderOpen);}}><span className="frame">› </span>{props.content.name}</p><img src="/static/gear.svg" onClick={() => { setIsNavOpen(!isNavOpen) }}/></>
          }
          </>
          :
          <>
          {isWriteLine ?
            <input type="text" className="input"/>
            :
            <><p className="inline__title">{props.content.name}</p><img src="/static/gear.svg"/></>
          }
          </>
        }
        {isNavOpen ? <div className="navi">
          <p onClick={() => { setIsWriteLine(!isWriteLine); setIsNavOpen(!isNavOpen); }}>Rename</p>
          <p onClick={() => { setIsNavOpen(!isNavOpen); addChild(true); }}>Add Folder</p>
          <p onClick={() => { setIsNavOpen(!isNavOpen); addChild(false); }}>Add File</p>
        </div> : <></>}
      </div>
      <br />
      {isFolderOpen ? children.map((c, i) => {
        return <div className="children"> <FormInline content={c} index={i} key={c}/></div>
      }) : ""}
      <NewFolder isOpen={isNewFolderOpen} setOpen={setNewFolderOpen} dispatch={dispatch}/>
      <NewFile isOpen={isNewFileOpen} setOpen={setNewFileOpen} dispatch={dispatch}/>
      <style jsx>{`
      .inline {
        position: relative;
        margin: 2px 10px;
        border-radius: 3px;
        border: none;
        display: inline-block;
        ${isWriteLine
          ?
          ""
          :
          `padding: 0 10px; background-color: black; color: ${colors.text} !important; line-height: 30px;`
        }
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
      .inline__title {
        display: inline-block;
        cursor: pointer;
      }
      .frame {
        display: inline-block;
        margin: 0 5px;
        ${isFolderOpen ? "transform: rotate(90deg);" : ""}
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
      .children {
        margin: 0 ${30}px;
      }
      .input {
        background-color: lightgrey;
        color: ${colors.back} !important;
        border: none;
        padding: 1% 3%;
        border-radius: 2px;
      }
      `}</style>
    </>
  )
}

export default FormInline