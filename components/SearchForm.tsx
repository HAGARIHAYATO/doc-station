import react, {FC, useState} from 'react';
import Link from 'next/link';
import {colors, texts} from '../lib/style.json';
import Router from 'next/router';

interface Props {

}

const SearchForm: FC<Props> = () => {
  const [url, setUrl] = useState("")
  return (
    <>
      <div className="searchBox">
        <img src="static/search.svg" className="searchIcon"/>
        <input type="text" className="searchInput" onChange={(e) => {
          let uri = "/search"
          const words = e.target.value.split(" ")
          if (e.target.value.trim() !== "") {
            uri += "?q="
            uri += words.join("%20")
          }
          setUrl(uri)
        }}
        onKeyDown={(e) => {
          if (url === "") return
          if (e.key == 'Enter') {
            e.preventDefault()
            // TODO
            if (url === "/search") return
            Router.push(url)
          }
        }}
        />
      </div>
      <style jsx>{`
      .searchBox {
        background-color: ${colors.mainLight};
        display: inline-block;
        height: 40px;
        margin: 10px 1%;
        padding: 5px 12px;
        border-radius: 2px;
        width: 300px;
        position: relative;
      }
      .searchIcon {
        height: 20px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      .searchInput {
        background-color: ${colors.mainLight};
        outline: none;
        border: none;
        height: 30px;
        padding: 0 0 0 28px;
        width: 100%;
      }
      `}</style>
    </>
  )
}

export default SearchForm