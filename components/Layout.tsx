import react, {FC} from 'react';
import Link from 'next/link';
import {colors, texts} from '../lib/style.json';
import SearchForm from './SearchForm'

interface Props {
  children: any
}

const Layout: FC<Props> = (props) => {
  const { children } = props
  return (
    <>
      <header>
        <div className="leftBox">
          <Link href="/">top</Link>
          <SearchForm />
        </div>
        <div className="rightBox">
          <Link href="/post">post</Link>
        </div>
      </header>
      <main>{ children }</main>
      <footer></footer>
      <style jsx global>{`
      body {
        min-height: 100vh;
        padding: 0 0 140px 0;
        background-color: ${colors.back};
        color: ${colors.text};
        position: relative;
      }
      header {
        height: 60px;
        padding: 0 5%;
        background-color: ${colors.main};
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      header div {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .leftBox {
        width: 30%;
      }
      main {
        padding: 1% 5%;
      }
      footer {
        padding: 0 1%;
        background-color: ${colors.mainDark};
        height: 140px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }
      `}</style>
    </>
  )
}

export default Layout