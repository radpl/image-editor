// import React, { useState } from 'react'
// import InputText from "../common/InputText";
// import styles from "./loginform.module.css";
// import SimpleButton from "../common/SimpleButton";

// export default function LoginForm(props) {

//   const [inputValue, setInput] = useState("");
//   const [inputPass, setInputPass] = useState("");

//   const handleChange = (event) => {
//     const { value } = event.target;
//     setInput(value);
//   }

//   const handlePassChange = (event) => {
//     const { value } = event.target;
//     setInputPass(value);
//   }
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log("Login");
//     props.hideLogin(event);
//   }

//   const handleSave = (event) => {

//   }

//   return (
//     <div className={styles.popupMain} onClick={props.hideLogin}>
//       <div className={styles.popupLogin} onClick={(event) => { event.stopPropagation() }}>
//         <form onSubmit={handleSubmit}>
//           <InputText onChange={handleChange} value={inputValue} placeholder="Username" />
//           <InputText type="password" name="password" onChange={handlePassChange} value={inputPass} placeholder="Password" />
//           <SimpleButton handleClick={() => { }}>Login</SimpleButton>
//         </form>
//       </div>
//     </div >
//   );
// }