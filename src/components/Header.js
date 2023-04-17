import logo from '../images/Logo.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Header(props) {

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function setNavigation() {
    if (props.headerLinkUrl !== '/sign-in' || '/sign-up') {
      props.onSignOut(false);
      //Закрываем окно меню в шапке при выходе из системы
      setIsMenuOpen(false);
    }
    navigate(`${props.headerLinkUrl}`, { replace: true });
  }

  //Функция изменения состояния окна.
  //Также пригодится для изменения иконки кнопки меню

  function openMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className={`${props.isLoading ? "header_off" : "header"}`}>
      {props.loggedIn &&
        <div className={`header__menu ${((props.width < 650) && isMenuOpen) ? "header__menu_opened" : ""} `}>
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
