import React, {ReactNode} from "react";
import TopMenu from "./TopMenu.tsx";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="container-xxl">

      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            😀 Meme
          </a>
          <TopMenu />
        </div>
      </nav>
      {children}
    </div>);
}

export default Layout;