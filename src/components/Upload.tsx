import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {acceptStyle, activeStyle, baseStyle, rejectStyle} from "./UploadCss";
import {ToastContainer, toast, ToastOptions} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UploadComponent() {
    const toastConfig: ToastOptions = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    };

    const onDrop = useCallback((af: any) => {
        console.log(24, af, acceptedFiles)
        // setFiles(af.map((file: Blob | MediaSource) => Object.assign(file, {
        //     preview: URL.createObjectURL(file)
        // })));
        enableToast('File Uploaded Successfully');
    }, []);

    const {acceptedFiles, fileRejections,
        getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject
    } = useDropzone({
        onDrop, accept: 'json'
    });

    const enableToast = (content = 'Wow so easy!') => toast(content, toastConfig);
    const dismissAll = () =>  toast.dismiss();

    const [files, setFiles] = useState([]);

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
            <ToastContainer />
        </section>
    )
}

export default UploadComponent;
