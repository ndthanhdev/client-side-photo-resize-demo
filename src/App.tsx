import "./styles.css";
import { List } from "./List";
import { Context as Engine } from "./Engine";
import { PicaEngine } from "./engines/pica";

export default function App() {
  return (
    <div className="App">
      <Engine.Provider value={PicaEngine}>
        <List
          step={0.1}
          src="https://satyr.dev/2000x2000/1?texture=graphpaper&text=jjjjalsdkfuqwerpouiyasdf"
          // src="/1.png"
        />
      </Engine.Provider>
    </div>
  );
}
