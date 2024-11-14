import './App.css';
import ModuleRoutes from "./shared/routes";
import {SnackbarProvider} from "notistack";

const App = () => {
    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <ModuleRoutes/>
        </SnackbarProvider>

    );
}

export default App;
