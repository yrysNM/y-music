import "./hamburger.scss";

const HamburgerComponent = ({ activeHamburger, active }) => (
    <div onClick={activeHamburger} className={`hamburger hamburger_${active}`}>
        <span></span>
        <span></span>
        <span></span>
    </div>
);

export default HamburgerComponent;