import React from 'react'
import Thumbnail from "../common/Thumbnail";
import { Link } from "react-router-dom";

export default function ImageBrowser(props) {

  return (
    <div>
      <ul>
        {props.userImages.map((image, index) => {
          //const id = index + 1;
          return <li>
            <Thumbnail image={image.thumbnail} width="15%" height="15%" />
            <Link to={"/edit/" + image._id}>Edit Image</Link>
          </li>
        })}
      </ul>
    </div>
  )
}
