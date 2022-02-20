import React from "react"
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function MainTemplate(props){
    const {
        children,
        nba_officialsite,
        nba_officialsitelink,
        navItems,
        logo
    } = props;
    return(
        <>
            <Header
                logo = {logo}
                navItems = {navItems}
            />

            {children}

            <Footer
             officialsite = {nba_officialsite}
             officialsitelink = {nba_officialsitelink}
             navItems={navItems}
            />
        </>
    );
}


export default MainTemplate;