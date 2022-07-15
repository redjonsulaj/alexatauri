import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {acceptStyle, activeStyle, baseStyle, rejectStyle} from "./UploadCss";
import {toast, ToastContainer, ToastOptions} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UploadComponent() {
    const [newVersionAvailable, setNewVersionAvailable] = useState(false);

    const toastConfig: ToastOptions = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    };

    const onDrop = useCallback((acceptedFiles: any) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            enableToast('File Uploaded Successfully');
            acceptedFiles.forEach( (file: Blob) => {
                let fr = new FileReader();
                fileReader(fr);
                fr.readAsText(file)
            });
            return acceptedFiles;
        }
    }, []);

    function fileReader(fr: FileReader) {
        fr.onload = function(e: any) {
            let result = JSON.parse(e.target.result as string);
            // const formatter = JSON.stringify(result, null, 2).replace(/[\])}[{(]/g, '');
            const _result = Object.keys(result).reduce( (a: any, c) => {
                if (a && !!a.length) {
                    a.push({[c]: result[c]})
                } else {
                    a = [];
                    a.push({[c]: result[c]})
                }
                return a;
            }, []);
            const _result2: any = [...files, ..._result]
            setFiles(_result2.map((file: any, index: any) => Object.assign({}, {value: JSON.stringify(file, null, 2), index: index})));
        };
    }

    const {acceptedFiles, fileRejections,
        getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject
    } = useDropzone({
        onDrop, accept: 'application/JSON'
    });

    const enableToast = (content = 'Wow so easy!') => {
        toast(content, toastConfig);
        setTimeout( () =>  setNewVersionAvailable(true), 1000);
    };
    const dismissAll = () => toast.dismiss();

    const [files, setFiles] = useState([]);
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [isDragActive, isDragReject, isDragAccept]);

    const thumbs = files.map((file: any) => {
        // console.error('Detection: ', file)
        return (
            <div key={file.index}>
                <textarea value={file.value} cols={20} rows={3} readOnly={true} style={{resize: 'none'}}/>
            </div>
        )
    });

    // // Clean up images
    // useEffect(() => () => {
    //     files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    // }, [files]);

    // useEffect(() => {
    //     if (newVersionAvailable) {
    //         dismissAll();
    //     }
    //     }, [newVersionAvailable]
    // );

    return (
        <section>
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <div style={{border: '1px', borderStyle: 'dashed'}}>Drag and drop your files here.</div>
            </div>
            <div>
                {thumbs}
            </div>
            <ToastContainer />
        </section>
    )
}

export default UploadComponent;
