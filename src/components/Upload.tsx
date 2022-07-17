import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {acceptStyle, activeStyle, baseStyle, rejectStyle} from "./UploadCss";
import {toast, ToastContainer, ToastOptions} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UploadComponent() {
    const [newVersionAvailable, setNewVersionAvailable] = useState(false);
    const [files, setFiles] = useState([]);

    const toastConfig: ToastOptions = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    };

    const onDrop = useCallback(async (acceptedFiles: any) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const jsonResponse = await Promise.all(acceptedFiles.map((file: Blob) => {
                let fr = new FileReader();
                fr.readAsText(file);
                return fileReader(fr);
            }));
            const merged: any = [].concat.apply([], jsonResponse);
            setFiles(merged.map((file: any) => Object.assign({}, {value: JSON.stringify(file, null, 2)})));
            if (!!merged) {
                enableToast('File Uploaded Successfully');
            }
        }
    }, []);

    async function fileReader(fr: FileReader) {
        return new Promise((resolve, reject) => {
            fr.onload = function (e: any) {
                let result = JSON.parse(e.target.result as string);
                const _result = Object.keys(result).reduce((a: any, c) => {
                    if (a && !!a.length) {
                        a.push({[c]: result[c]})
                    } else {
                        a = [];
                        a.push({[c]: result[c]})
                    }
                    return a;
                }, []);
                resolve(_result);
            };
        })
    }

    const {acceptedFiles, fileRejections,
        getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject
    } = useDropzone({
        onDrop, accept: 'application/JSON'
    });

    const enableToast = (content = 'Wow so easy!') => {
        toast(content, toastConfig);
        setTimeout(() => setNewVersionAvailable(true), 1000);
    };
    const dismissAll = () => toast.dismiss();

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [isDragActive, isDragReject, isDragAccept]);

    const thumbs = files.map((file: any, index: number) => {
        // console.error('Detection: ', file)
        return (
            <div key={index}>
                <textarea value={file.value} cols={20} rows={3} readOnly={true} style={{resize: 'none'}}/>
            </div>
        )
    });

    useEffect(() => {
        if (newVersionAvailable) {
            dismissAll();
        }
        }, [newVersionAvailable]
    );

    return (
        <section>
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <div style={{border: '1px', borderStyle: 'dashed'}}>Drag and drop your files here.</div>
            </div>
            <div>
                {thumbs}
            </div>
            <ToastContainer/>
        </section>
    )
}

export default UploadComponent;
