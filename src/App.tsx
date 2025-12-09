import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {ellipse, square, statsChart, triangle} from 'ionicons/icons';
import Home from './pages/Home';
import PageClasificadosMundial from './components/PageClasificadosMundial';
import PrimeraFase from './components/PrimeraFase';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import EstadisticasClasificados from "./components/EstadisticasClasificados";



setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/clasificados">
            <PageClasificadosMundial />
          </Route>
          <Route path="/primerafase">
            <PrimeraFase />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
            <Route exact path="/estadisticas">
                <EstadisticasClasificados />
            </Route>




        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/home">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="clasificados" href="/clasificados">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Clasificados</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/primerafase">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Primera fase</IonLabel>
          </IonTabButton>

            <IonTabButton tab="estadisticas" href="/estadisticas">

                <IonIcon aria-hidden="true" icon={statsChart} />
                <IonLabel>Estadísticas</IonLabel>
            </IonTabButton>



        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
