import react, {FC} from 'react';
import Link from 'next/link';
import {colors, texts} from '../lib/style.json';

interface Props {

}

const SearchForm: FC<Props> = () => {
  return (
    <>
      <div className="searchBox">
        <img src="static/search.svg"/>
        <input type="text" className="searchInput"/>
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
        & img {
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
      }
      `}</style>
    </>
  )
}

export default SearchForm