import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {acceptStyle, activeStyle, baseStyle, rejectStyle} from "./UploadCss";

function UploadComponent() {
    const [files, setFiles] = useState([]);


    const onDrop = useCallback((acceptedFiles: any) => {
        setFiles(acceptedFiles.map((file: Blob | MediaSource) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
        console.log(acceptedFiles);
    }, []);

    const {
        getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject
    } = useDropzone({
        onDrop, accept: 'image/jpeg, image/png'
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [isDragActive, isDragReject, isDragAccept]);

    const thumbs = files.map((file: any) => (
        <div key={file.name}>
            <img
                src={file.preview}
                alt={file.name}
                width={300}
                height={300}
            />
        </div>
    ));

    // Clean up images
    useEffect(() => () => {
        files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section>
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <div style={{border: '1px', borderStyle: 'dashed'}}>Drag and drop your images here.</div>
            </div>
            <div>
                {thumbs}
            </div>
        </section>
    )
}

export default UploadComponent;
