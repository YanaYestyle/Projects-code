import { ThemeProvider } from "styled-components";
import Game from "./components/Game";
import GlobalStyle from "./styles/global";
import { baseTheme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={baseTheme}>
      <GlobalStyle />
      <Game />
    </ThemeProvider>
  );
}

export default App;
