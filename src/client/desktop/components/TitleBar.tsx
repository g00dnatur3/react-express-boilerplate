import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import BaseStyle from '../base/BaseStyle'
import MenuIcon from '@material-ui/icons/Menu'
import BackIcon from '@material-ui/icons/ArrowBackIos'
import CartIcon from '@material-ui/icons/ShoppingCart'
import Badge from '@material-ui/core/Badge'
import SearchBar from '../components/SearchBar'
import {onEvent, offEvent, events} from '../../event'
import Drawer from '@material-ui/core/Drawer'
import theme from '../../theme'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'

import Group from '@material-ui/icons/Group'
import CardGiftcard from '@material-ui/icons/CardGiftcard'
import PanTool from '@material-ui/icons/PanTool'
import FolderOpen from '@material-ui/icons/FolderOpen'
import FindInPage from '@material-ui/icons/FindInPage'
import ShoppingBasket from '@material-ui/icons/ShoppingBasket'
import PermContactCalendar from '@material-ui/icons/PermContactCalendar'

export interface Props { 
  title: string | JSX.Element,
  leftIcon?: 'back' | 'menu',
  rightIcon?: 'cart',
  leftClick?: () => void,
  rightClick?: () => void,
  hideSearchBar?: boolean,
  onSearchChange?: (val) => void,
  searchValue?: string,
  onCancelSearch?: () => void
}

class Style extends BaseStyle {
  container: React.CSSProperties = {
    color: 'white',
    //zIndex: 1000,
    // borderWidth: 1,
    // borderStyle: 'solid',
    // paddingTop: 10,
    // paddingBottom: 10,
    backgroundColor: theme.palette.primary.main,
    //position: 'fixed',
    //width: '100%',
    // marginLeft: 0
    //width: screenSize().width,
    //marginLeft: -2
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'black',
    //minWidth: 950,
  }
  toolBar: React.CSSProperties = {
    justifyContent: 'space-between',
  }
  title: React.CSSProperties = {
    fontSize: 24,
    //minWidth: 160,
    color: 'white',
    // borderWidth: 1,
    // borderStyle: 'solid',
    //textAlign: 'center',
  }
  icon: React.CSSProperties = {
    fontSize: 32,
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'black'
  }
  button: React.CSSProperties = {
    // borderWidth: 1,
    // borderStyle: 'solid',
    width: 36,
    height: 36,
  }
  badge: React.CSSProperties = {
    marginTop: 6,
    marginRight: 60,
    // borderWidth: 1,
    // borderStyle: 'solid',
  }
  row: React.CSSProperties = {
    ...this.row,
    //justifyContent: 'space-around',
    // borderWidth: 1,
    // borderStyle: 'solid',
  }
}

interface State {
  drawerOpen: boolean
}

export class TitleBar extends React.Component<Props, {}> {
  
  state: State = {drawerOpen: false}

  _cartListener: () => void = () => this.forceUpdate()

  componentDidMount() {
    //onEvent(events.cart, this._cartListener)
  }

  componentWillUnmount() {
    //if (this._cartListener) offEvent(events.cart, this._cartListener)
  }

  render(): JSX.Element {

    const style: Style = new Style()

    const getMenuItem = (t, href) => {
      const s = {marginRight: 0}
      const icon = 
        t === 'About Us'          ? <PermContactCalendar style={s} /> :
        t === 'Contact Us'        ? <Group style={s} /> :
        t === 'Terms of Use'      ? <FolderOpen style={s} /> :
        t === 'Privacy Info'      ? <PanTool style={s} /> : null
      return (
      <ListItem button>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={t} onClick={() => window.location.href = href}/>
      </ListItem>)
    }

    const drawerMenu = (
      <div style={{width: 250, paddingTop: 15}}>
        <div>
        {getMenuItem('About Us', '#')}
        {getMenuItem('Contact Us', '#')}
        {getMenuItem('Terms of Use', '#')}
        {getMenuItem('Privacy Info', '#')}
        </div>
      </div>
    );

    const searchBar = this.props.hideSearchBar 
      ? null 
      : <SearchBar onChange={this.props.onSearchChange} 
                   value={this.props.searchValue} 
                   onCancelSearch={this.props.onCancelSearch} />

    let leftIcon = null
    let rightIcon = null
    if (this.props.leftIcon === 'menu') {
      const onMenuClick = () => this.setState({drawerOpen: true})
      leftIcon = <MenuIcon onClick={onMenuClick} style={{...style.icon, marginLeft: 60}} />
    }
    if (this.props.leftIcon === 'back') leftIcon = <BackIcon style={{...style.icon, marginLeft: 60}} />

    // if (this.props.rightIcon === 'cart') {
    //   const onCartClick = () => window.location.href='/cart'
    //   const cartSize = getCartSize()
    //   if (cartSize > 0) {
    //     rightIcon = (
    //       <Badge onClick={onCartClick} style={style.badge} badgeContent={cartSize} color='secondary'>
    //         <CartIcon onClick={onCartClick} style={style.icon} />
    //       </Badge>
    //     )
    //   }
    //   else {
    //     rightIcon = (<CartIcon onClick={onCartClick} style={{...style.icon, marginRight: 60}} />)
    //   }
    // }

    const drawer = (
      <Drawer 
        open={this.state.drawerOpen}
        onClose={() => this.setState({drawerOpen: false})}>
        <div tabIndex={0} role="button">
          {drawerMenu}
        </div>
      </Drawer>
    )

    return (
    <div>

      <div style={style.container}>
        <div style={{...style.row, justifyContent: 'space-between', alignItems: 'center', height: 80}}>
          <div style={style.row}>
            <IconButton style={{...style.button, backgroundColor: 'transparent'}} color='inherit' onClick={this.props.leftClick}>
              {leftIcon}
            </IconButton>
            <div style={{...style.title, paddingLeft: 50, paddingRight: 20, fontSize: 18}}>Branding &reg;</div>
          </div>
          <IconButton style={{...style.button, backgroundColor: 'transparent', minWidth: 100}} color='inherit' onClick={this.props.rightClick}>
            {rightIcon}
          </IconButton>
        </div>
        { this.props.leftIcon === 'menu' ? drawer : null }
      </div>

      <div style={{...style.row, justifyContent: 'center', marginTop: -80, height: 80, ...style.title, paddingLeft: 2}}>
        <Typography variant='title' color='inherit'>
          {this.props.title}
          <div style={{width: 20}}></div>
          {searchBar}
        </Typography>
      </div>

    </div>
    )
  }
  
}

export default TitleBar