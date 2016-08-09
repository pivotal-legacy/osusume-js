import React from "react"
import List from '../shared_components/List'
import CustomFileInput from '../shared_components/CustomFileInput'

export default function PhotoPicker(props) {
  let fileNames = []
  for (let file of props.selectedPhotos) {
    fileNames.push(file.name)
  }

  return (
    <div>
      <label>Add Photo</label>
      <List items={fileNames} />
      <CustomFileInput selectPhotos={props.selectPhotos} />
    </div>
  )
}
