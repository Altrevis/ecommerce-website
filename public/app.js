// filepath: /ecommerce-website/ecommerce-website/src/app.js

// Importe les modules nécessaires de React et React Router
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Importe les composants principaux de l'application
import Header from './components/Header';
import Footer from './components/Footer';

// Importe les pages (attention : ici tu importes des fichiers HTML, normalement il faut des composants React)
import Accueil from './pages/Accueil.html';
import Contact from './pages/Contact.html';
import Inscription from './pages/Inscription.html';
import Paiment from './pages/Paiment.html';
import Panier from './pages/Panier.html';
import Compte from './pages/MonCompte.html';
import Créer from './pages/CreerProduit.html';

// Composant principal de l'application
const App = () => {
    return (
        <Router>
            {/* Affiche le header sur toutes les pages */}
            <Header />
            {/* Définit les routes de l'application */}
            <Switch>
                <Route path="/" exact component={Accueil} />
                <Route path="/contact" component={Contact} />
                <Route path="/inscription" component={Inscription} />
                <Route path="/paiment" component={Paiment} />
                <Route path="/panier" component={Panier} />
                <Route path="/compte" component={Compte} />
                <Route path="/creer" component={Créer} />
            </Switch>
            {/* Affiche le footer sur toutes les pages */}
            <Footer />
        </Router>
    );
};

// Monte le composant App dans la div ayant l'id 'root'
ReactDOM.render(<App />, document.getElementById('root'));