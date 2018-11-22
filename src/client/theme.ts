import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeOptions } from '../../node_modules/@material-ui/core/styles/createMuiTheme'
import { colors } from '@material-ui/core'
import { isBrowser } from 'react-device-detect'

const themeOptions: ThemeOptions = {
  shadows: [
    'none', 'none', 'none', 'none', 'none',
    'none', 'none', 'none', 'none', 'none',
    'none', 'none', 'none', 'none', 'none',
    'none', 'none', 'none', 'none', 'none',
    'none', 'none', 'none', 'none', 'none'
  ],
  palette: {
    primary: {
      main: colors.blue["300"]
    },
    // secondary: {
    //   main: colors.lightBlue["200"]
    // },
    // background: {
    //   default: colors.grey["200"]
    // },
  },
  props: {
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    }
  }
}

const theme = createMuiTheme(themeOptions)

export default theme
