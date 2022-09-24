import AppHeader from "../app-header/AppHeader";
import AppPromo from "../app-promo/AppPromo";
import AppAboutOne from "../app-about/AppAboutOne";
import AppAboutTwo from "../app-aboutTwo/AppAboutTwo";
import AppEvent from "../app-events/AppEvents";
import AppEventBlog from "../app-eventBlog/AppEventBlog";
const App = () => {

    return (
        <div className="app">
            <AppHeader />
            <div className="container">
                <AppPromo />
                <AppAboutOne />
                <AppAboutTwo />
                <AppEvent />
                <AppEventBlog />
            </div>
        </div>
    );
}

export default App;