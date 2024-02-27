import "./Header.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
export const Header = () => {
  return (
    <div className="header">
      <div>
        <h1 className="chat-header">
          <b>Chatbot</b>
        </h1>
        <p>Chatbot prototype by William Yang</p>
      </div>
      <nav>
        <ul className="icon-list">
          <li>
            <div className="icon-container">
              <ContactSupportOutlinedIcon className="icon" />
              <p>Shopping Method</p>
            </div>
          </li>
          <li>
            <div className="icon-container">
              <LocationOnOutlinedIcon className="icon" />
              <p>Store Locator</p>
            </div>
          </li>
          <li>
            <div className="icon-container">
              <AccountCircleOutlinedIcon className="icon" />
              <p>Login</p>
            </div>
          </li>
          <li>
            <div className="icon-container">
              <ShoppingCartOutlinedIcon className="icon" />
              <p>Cart</p>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};
