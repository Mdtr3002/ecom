import HeroOne from "../components/hero/HeroOne";
import Gameboard from "../components/gameboard";
import { useTheme } from "styled-components";
import { useStorageState } from "../custom-hook/useLocalStorage";

export default function FastToG() {
  const [soundFxEnable, setSoundFxEnable] = useStorageState("soundFx", true);
  return (
    <>
      <div className="create-new-button">
        <button
          className="shadow-lg btn btn-warning"
          onClick={() => setSoundFxEnable(!soundFxEnable)}
        >
          <i
            className={`fz-20 bi bi-${
              soundFxEnable ? "volume-up-fill" : "volume-mute-fill"
            }`}
          />
        </button>
      </div>
      <Gameboard />
    </>
  );
}
