import AppHeader from "../app-header/AppHeader";
import AppPromo from "../app-promo/AppPromo";
const App = () => {

    return (
        <div className="app">
            <AppHeader />
            <div className="container">
                <AppPromo />
            </div>
        </div>
    );
}

export default App;