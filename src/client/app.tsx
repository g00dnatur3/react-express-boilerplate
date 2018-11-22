import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import { 
	BrowserRouter, 
	Switch, 
	Route 
} 
from 'react-router-dom'
import { isBrowser } from 'react-device-detect'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import theme from './theme'

// PAGES -- TODO: LazyLoad
import { LandingPage } from './desktop/containers/LandingPage'

const options = {
  timeout: 5000,
  position: 'bottom center'
}

ReactDOM.render((
  <AlertProvider zIndex={2000} template={AlertTemplate} {...options}>
  <MuiThemeProvider theme={theme}>
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/landing' component={LandingPage} />
    </Switch>
  </BrowserRouter>
  </MuiThemeProvider>
  </AlertProvider>
), document.getElementById('app'))