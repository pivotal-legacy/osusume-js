import React from 'react'

export default class CustomFileInput extends React.Component {
  constructor(props) {
    super(props)
    this.selectPhotos = this.selectPhotos.bind(this)
  }

  selectPhotos(e) {
    this.props.selectPhotos(e.target.files)
  }

  render() {
    let input

    return (
      <div>
        <input ref={node => {input = node}} className="file-input" type="file" multiple="multiple" onChange={this.selectPhotos}/>
        <button onClick={_ => {input.click()}}>select photos</button>
      </div>
    )
  }
}
