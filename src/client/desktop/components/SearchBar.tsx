import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import SearchBar from 'material-ui-search-bar'
import { Object } from 'es6-shim';

interface Style {
  root?: React.CSSProperties,
  iconButton?: React.CSSProperties,
  icon?: React.CSSProperties,
  input?: React.CSSProperties
}

const style: Style = {
  root: {
    //transition: 'top 0.1s ease-in-out',
    height: 45,
    margin: 0,
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'black',
    width: 350
  },
  iconButton: {
    marginTop: -2,
  },
  input: {
    //fontSize: 16
  },
  icon: {
    //fontSize: 22
  },
}

function CustomSearchBar(props) {
  const { classes, style, onChange, value, onCancelSearch } = props
  return (
    <SearchBar
      style={style}
      onChange={onChange}
      searchIcon={(<div></div>)}
      value={value}
      onCancelSearch={onCancelSearch}
      classes={{
        root: classes.root,
        iconButton: classes.iconButton,
        input: classes.input,
        icon: classes.icon,
      }} />
  )
}

interface State {
  style?: Style
}

interface Props {
  onChange?: (val) => void,
  value?: string,
  onCancelSearch?: () => void
}

export class _SearchBar extends React.Component<Props, State> {

  state:State = {}

  _scrollListener: (event) => void

  componentDidMount() {
    if (!this._scrollListener) this._scrollListener = (event) => this.handleScroll(event)
    window.addEventListener('scroll', this._scrollListener)
  }

  componentWillUnmount() {
    if (this._scrollListener) window.removeEventListener('scroll', this._scrollListener)
  }

  handleScroll(event) {
    let newHeight = 35 - window.scrollY
    if (newHeight < 0) newHeight = 0
    if (newHeight > 35) newHeight = 35
    const opacity = (newHeight / 35)
    const root = Object.assign({}, style.root, {
      height: newHeight,
      marginTop: newHeight === 0 ? 0 : 5,
      opacity
    })
    this.setState({style: {root}})
  }

  render() {
    let _style = style
    if (this.state.style) {
      _style = Object.assign({}, style, this.state.style)
    }
    const StyledSearchBar = withStyles(_style as any)(CustomSearchBar)
    return (
      <StyledSearchBar onChange={this.props.onChange} value={this.props.value} onCancelSearch={this.props.onCancelSearch} />
    )
  }
}

export default _SearchBar