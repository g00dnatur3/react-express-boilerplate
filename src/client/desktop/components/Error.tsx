import * as React from 'react'
import { screenSize } from '../../helpers/DeviceHelper'
import getLog from '../../../utils/log'
import ReactLoading from 'react-loading'
import ErrorIcon from '@material-ui/icons/Error'
import theme from '../../theme'

const log = getLog('LandingPage')

interface Props { 
  message?: string
}

interface Style {
  container: React.CSSProperties,
  message: React.CSSProperties,
  icon: React.CSSProperties,
}

export class Error extends React.Component<Props, {}> {

  render(): JSX.Element {

    const style: Style = {
      container: {
				paddingTop: 80,
				background: 'transparent',
				display: 'flex',
				flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18
      },
      icon: {
        paddingBottom: 10,
        fontSize: 32,
        color: 'red'
      },
      message: {
        fontSize: 14,
        paddingTop: 20,
        color: 'grey'
      }
    }

    return (
      <div style={style.container}>
        <ErrorIcon style={style.icon}/>
        <div>Something went wrong.</div>
        <div style={style.message}>{this.props.message}</div>
      </div>
    )
  }
  
}

export default Error