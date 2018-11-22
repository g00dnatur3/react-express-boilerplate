import _Modal from '@material-ui/core/Modal'
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {screenSize} from '../../helpers/DeviceHelper'
import {onEvent, offEvent, events} from '../../event'

import getLog from '../../../utils/log'
const log = getLog('Modal')

const styles: any = theme => ({
  paper: {
    position: 'absolute',
    width: screenSize().width-40,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit,
  },
});

const modalStyle = {
  top: `50%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
}

interface Props {
  classes: any,
  id: string,
  style?: React.CSSProperties
}

class Modal extends React.Component<Props> {

  state = {open: false}

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  _openListener: (id) => void = (id) => {
    if (this.props.id === id) this.open()
  }

  componentDidMount() {
    log.info('componentDidMount')
    onEvent(events.openModal, this._openListener)
  }

  componentWillUnmount() {
    if (this._openListener) offEvent(events.openModal, this._openListener)
  }

  render() {
    const { classes, style } = this.props
    const _style = style ? {...modalStyle, ...style} : modalStyle
    return (
      <_Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
        onClose={this.close}>
        <div style={_style} className={classes.paper}>
          {this.props.children}
        </div>
      </_Modal>
    );
  }
}

// We need an intermediary variable for handling the recursive nesting.
const StyledModal = withStyles(styles)(Modal);

export default StyledModal;