import React from "react"
import style from "./Footer.module.css"
import logoNBA from "../../assets/images/NBA-logo.png"
import logoTwitter from "../../assets/images/twitter.png"
import logoInstagram from "../../assets/images/instagram.png"
import logoFacebook from "../../assets/images/facebook.png"
import {NavLink} from "react-router-dom";

function Footer(props){
    const {officialsite, officialsitelink, navItems} = props;

    const itemList = navItems.map((item) => {
        return (
            <li key={item.url} className="nav-item">
                <NavLink exact={item.exact}
                         activeClassName={style.active}
                         to={item.url}>
                    {item.text}
                </NavLink>
            </li>
        )
    });

    return(
        <footer>

            <div className="container-fluid">

                <div className="row">

                    <div className="col">

                        <nav className={style.footerNav}>
                            <ul className="nav flex-column">
                                {itemList}
                            </ul>
                        </nav>

                    </div>

                    <div className="col">

                        <div className={`d-flex align-items-center justify-content-end ${style.copyright}`}>

                            <div id={style.officialsite}>
                                <a href={officialsitelink} target="_blank">
                                    {officialsite}
                                </a>

                                <div id={style.socialLogo} className={style.socialLogo}>

                                    <a href="https://twitter.com/nba" target="_blank">
                                        <img src={logoTwitter} alt="logo"/>
                                    </a>

                                    <a href="https://www.instagram.com/nba/" target="_blank">
                                        <img src={logoInstagram} alt="logo"/>
                                    </a>

                                    <a href="https://www.facebook.com/nba/" target="_blank">
                                        <img src={logoFacebook} alt="logo"/>
                                    </a>

                                </div>


                            </div>

                            <div id={style.officialLogo} className={style.logo}>
                                <a href="https://www.nba.com" target="_blank">
                                    <img src={logoNBA} alt="logo"/>
                                </a>
                            </div>


                        </div>

                    </div>

                </div>

            </div>

        </footer>

    );
}

export default Footer;