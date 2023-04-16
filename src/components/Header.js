import logo from '../images/Logo.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header(props) {

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentLocation = useLocation();
  // const [isVisible, setIsVisible] = useState(true);

  // useEffect(() => {
  //   if (currentLocation.pathname === '/') {
  //     setIsVisible(true);
  //   } else
  //   setIsVisible(false);;
  // });

  function setNavigation() {
    if (props.headerLinkUrl !== '/sign-in' || '/sign-up') {
      localStorage.removeItem('jwt');
      navigate('/sign-in', { replace: true });
      props.handleLogin(false);
      props.setHeaderEmail('');
      setIsMenuOpen(false);
    }
    navigate(`${props.headerLinkUrl}`, { replace: true });
  }

  function openMenu() {
    if(isMenuOpen) {
      setIsMenuOpen(false);
    }
    else setIsMenuOpen(true);
  }

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = (event) => {
        setWidth(event.target.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  return (
    <header className={`${props.isLoading ? "header_off" : "header"}`}>
      {props.loggedIn &&
        <div className={`header__menu ${((width < 650) && isMenuOpen) ? "header__menu_opened" : ""} `}>
          <p className="header__menu-email">{props.headerEmail}</p>
          <button className="header__menu-btn" onClick={setNavigation}>{props.headerLinkName}</button>
      </div>}
      <div className="header__content">
        <img className="header__logo" src={logo} alt="Логотип Место" />
        <nav className={`header__nav ${props.loggedIn ? "" : "header__nav_visible"}`}>
          <p className="header__nav-email">{props.headerEmail}</p>
          <button className="header__nav-btn" onClick={setNavigation}>{props.headerLinkName}</button>
        </nav>
        {props.loggedIn &&
          <button className="header__burger" onClick={openMenu}>
          <span className={`${isMenuOpen ? "header__burger-close-icon" : "header__burger-item"}`}>Menu</span>
        </button>}
      </div>
    </header>
  );
}

export default Header;
