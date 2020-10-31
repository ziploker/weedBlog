import ReactOnRails from 'react-on-rails';

import App from '../packs/app.jsx'
import AdminEdit from '../packs/adminEdit'
import Admin from '../packs/admin'
import Login from '../packs/pages/login'


// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  App, AdminEdit, Admin, Login
});
