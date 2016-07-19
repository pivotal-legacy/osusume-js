import React from "react"
import ListComponent from '../shared_components/ListComponent'
import CustomFileInput from '../shared_components/CustomFileInput'

export default function PhotoPickerComponent(props) {
  let fileNames = []
  for (let file of props.selectedPhotos) {
    fileNames.push(file.name)
  }

  return (
    <div>
      <label>Add Photo</label>
      <ListComponent items={fileNames} />
      <CustomFileInput selectPhotos={props.selectPhotos} />
    </div>
  )
}
