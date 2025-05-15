import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="logo-container">
        <img
          src="/src/assets/logoIntero.png"
          alt="Logo Nutralyze"
          width="80px"
          height="80px"
        />
      </div>

      <div className="title-container">
        <p className="title">NUTRALYZE</p>
      </div>

      <div className="buttons-container">
        <button className="login-button">Accedi</button>
        <button className="secondary-button"></button>
      </div>
    </div>
  );
}
export default Header;
