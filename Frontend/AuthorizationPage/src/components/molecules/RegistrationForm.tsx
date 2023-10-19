import React, { ChangeEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../atoms/Logo";
import InputField from "../atoms/InputField";
import { useNavigate } from "react-router-dom";
import { User, fetchData } from "../../services/dataFetcher";
import axios from "axios";

interface RegistrationFormProps {
  usernameIconType: "user";
  emailIconType: "gmail";
  passwordIconType: "lock";
  confirmPasswordIconType: "lock";
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  usernameIconType,
  emailIconType,
  passwordIconType,
  confirmPasswordIconType,
}) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all the fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const data = await fetchData<{ users: User[] }>("../../../public/data.json");

      const userExists = data.users.some((user) => user.username === username);
      const emailExists = data.users.some((user) => user.gmail === email);

      if (userExists) {
        toast.error("Username already exists.");
      } else if (emailExists) {
        toast.error("Email already exists.");
      } else {
        // Generate a new user ID
        const maxId = data.users.reduce((max, user) => (user.id > max ? user.id : max), 0);
        const newUserId = maxId + 1;

        // Add the new user to the data
        data.users.push({
          id: newUserId,
          username,
          gmail: email,
          password,
          phone: "null", // You can set this to null
          role: "user", // You can set this to "user" as per your data structure
        });

        // Update the JSON file with the new data
        await axios.post("../../../public/data.json", data);

        toast.success("Hello new user");

        // Clear the form fields
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error loading data");
    }
  };

  return (
    <div className="registration-form">
      <Logo src="/images/Logo.svg" alt="logo" />
      <div className="rectangle-border">
        <InputField
          type="text"
          placeholder="Nhập tên đăng nhập"
          value={username}
          onChange={handleUsernameChange}
          iconType={usernameIconType}
        />
        <InputField
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={handleEmailChange}
          iconType={emailIconType}
        />
        <InputField
          type="password"
          placeholder="Nhập mật khẩu của bạn"
          value={password}
          onChange={handlePasswordChange}
          iconType={passwordIconType}
        />
        <InputField
          type="password"
          placeholder="Nhập lại mật khẩu của bạn"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          iconType={confirmPasswordIconType}
        />
      </div>
      <div className="registration-buttons">
        <button type="submit" onClick={handleRegister}>
          Register
        </button>
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default RegistrationForm;