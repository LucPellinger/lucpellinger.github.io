import Switch from 'react-switch';
import { FaSun, FaMoon, FaCheck,  } from 'react-icons/fa';
import { FaXmark } from "react-icons/fa6";

const iconStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  fontSize: 16,
};

function ThemeToggleSwitch({ isDarkTheme, toggleTheme }) {
  return (
    <Switch
      onChange={toggleTheme}
      checked={isDarkTheme}
      onColor="#4D4D4D"
      offColor="#ccc"
      height={24}
      width={48}
      handleDiameter={20}

      // no icons in the track
      //checkedIcon={false}
      //uncheckedIcon={false}
      checkedIcon={
        <div style={iconStyle}>
          <FaCheck />
        </div>
      }
      uncheckedIcon={
        <div style={iconStyle}>
          <FaXmark />
        </div>
      }

      // only the handle shows the appropriate icon
      checkedHandleIcon={
        <div style={iconStyle}>
          <FaMoon aria-label="dark mode" />
        </div>
      }
      uncheckedHandleIcon={
        <div style={iconStyle}>
          <FaSun aria-label="light mode" />
        </div>
      }

      aria-label="theme switch"
    />
  );
}

export default ThemeToggleSwitch;