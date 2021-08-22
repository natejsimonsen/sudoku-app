import * as React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { useUserConfig } from "../context/userConfigContext";

import Header from "./header";

const Layout = ({ children }) => {
  const { state } = useUserConfig();
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div
      style={{
        backgroundColor: state?.theme.bgColor,
        color: state?.theme.color,
      }}
    >
      <div
        style={{
          minHeight: "calc(100vh - 5rem)",
        }}
      >
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <div
          style={{
            margin: "0 auto",
            padding: `0 1.0875rem 1.45rem`,
          }}
        >
          <main>{children}</main>
        </div>
      </div>
      <footer
        style={{ backgroundColor: state?.theme.navBgColor }}
        className="flex items-center justify-center w-full h-20 bottom-0"
      >
        © {new Date().getFullYear()}, Built by Nate Simonsen
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
