import "./Header.css";

function Header() {
  return (
    <div className="personalizzazione">
      <div id="img">
        <img
          src="/src/assets/logoIntero.png"
          alt="fwfwef"
          width="60px"
          height="60px"
        />
      </div>
      <div id="centrale">
        <p>NUTRALYZE</p>
      </div>
      <div id="fine">
        <p>FINE</p>
      </div>
    </div>
  );
}
export default Header;
