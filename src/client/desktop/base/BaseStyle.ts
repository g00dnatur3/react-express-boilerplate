export class BaseStyle {
  row?: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center'
  }
  separator?: React.CSSProperties = {
      borderWidth: 0,
      borderTopWidth: 1,
      borderStyle: 'solid',
      height: 0,
      paddingBottom: 20,
      color: 'lightgrey'
  }
  // flip: React.CSSProperties = {
  //   transform: 'scaleX(-1)',
  //   WebkitTransform: 'scaleX(-1)',
  // }
  picture?: React.CSSProperties = {
    paddingTop: 5,
    paddingBottom: 5,
  }
  center: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
  withStyles? = (styles) => {
    if (styles) {
      const keys = Object.keys(styles)
      for (let key of keys) {
        this[key] = Object.assign(this[key], styles[key])
      }
    }
  }
}

export default BaseStyle