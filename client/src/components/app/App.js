import AppHeader from "../app-header/AppHeader";
import AppPromo from "../app-promo/AppPromo";
import AppAboutOne from "../app-about/AppAboutOne";
import AppAboutTwo from "../app-aboutTwo/AppAboutTwo";
const App = () => {



    return (
        <div className="app">
            <AppHeader />
            <div className="container">
                <AppPromo />
                <AppAboutOne />
                <AppAboutTwo />
            </div>
        </div>
    );
}

export default App;