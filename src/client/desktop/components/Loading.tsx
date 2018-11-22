import * as React from 'react'
import ReactLoading from 'react-loading'
import theme from '../../theme'
import getLog from '../../../utils/log'
const log = getLog('LandingPage')

interface Style {
  container: React.CSSProperties
}

interface Props { 
  style?: React.CSSProperties
}

export class Loading extends React.Component<Props, {}> {

  render(): JSX.Element {

    const style: Style = this.props.style 
    ? {
      container: this.props.style 
    }
    : {
      container: {
				paddingTop: 80,
				background: 'transparent',
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center',
      },
    }

    return (
      <div style={style.container}>
        <ReactLoading type='bars' color={theme.palette.primary.main} width={100} height={80}/>
      </div>
    )
  }
  
}

export default Loading