import react, {FC, useState, useEffect, Dispatch, SetStateAction, useReducer} from 'react';
import Link from 'next/link';
import {colors, texts} from '../lib/style.json';

interface Props {
  isOpen: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
  dispatch: Dispatch<any>
}

const NewFolder: FC<Props> = (props) => {
  let content = ""
  return (
    <>
      {props.isOpen ? <div className="layer">
        <div className="newInput">
          <input type="text" onChange={(e) => { content = e.target.value }}/>
          <button onClick={() => {
            if (content !== "") {
              console.log(content)
              props.dispatch({
                name: content,
                isFolder: true,
                content: []
              })
              props.setOpen(!props.isOpen)
            }
          }}>Add Folder</button>
        </div>
        <img src="/static/back.png" className="eliminate" onClick={() => { props.setOpen(!props.isOpen)}}/>
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
        padding: 3%;
        & input, button {
          color: ${colors.back} !important;
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

export default NewFolder