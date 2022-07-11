import React, { useRef, useState } from "react";

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const Upload = ({
  label = 'Default label',
  updateFilesCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});

  return (
   <input type="file" ref={fileInputField} />
  )
}

export default Upload;
