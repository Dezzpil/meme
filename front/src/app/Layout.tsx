import React, {ReactNode} from "react";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="block w-full mb-4">...menu...</div>
      {children}
    </div>
  );
}

export default Layout;