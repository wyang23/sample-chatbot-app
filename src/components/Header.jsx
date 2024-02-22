import "./Header.css";

export const Header = () => {
  return (
    <div className="header">
      <h1 className="chat-header">
        {/* <img src={logo} alt="gemini" width={120} /> */}
        <b>Chatbot</b>
      </h1>
      <p>Chatbot prototype by William Yang</p>
    </div>
  );
};
