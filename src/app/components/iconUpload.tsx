'use client';
import {useDropzone} from 'react-dropzone';
import React, {useCallback, useState, useRef} from 'react';
import { ToastContainer, toast } from 'react-toastify';


export default function IconUpload() {

    interface DropzoneProps {
        required?: boolean;
        name: string;
    }

    function Dropzone(props: DropzoneProps){
        const {required, name} = props; 
        const hiddenInputRef = useRef<HTMLInputElement | null>(null);
        const [file, setFiles] = useState<File | null>(null);
      
        const {getRootProps, getInputProps, isDragActive} = useDropzone({
            onDrop: (incomingFiles: File[]) => {
                if (hiddenInputRef.current) {

                    const fileSize = incomingFiles[0].size / 1024 / 1024; // Convert bytes to MB
                    if (fileSize > 2) {
                        toast.error('The file size is greater than 2 MB', {
                            position: "top-center",
                            autoClose: 5000,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                        return;
                    }

                    const fileType = incomingFiles[0].type;
                    if (fileType !== 'image/png' && fileType !== 'image/jpeg') {
                        toast.error('The file type is not supported', {
                            position: "top-center",
                            autoClose: 5000,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                        return;
                    }


                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(incomingFiles[0]);
                    hiddenInputRef.current.files = dataTransfer.files;
                    setFiles(incomingFiles[0]);

                    const errorElement = document.querySelector('#valid_error_icon_upload') as HTMLDivElement;
                    errorElement.style.display = "none";
                }
            }
        });
      
        return (
            <div {...getRootProps({className: 'dropzone'})}>
                <input type="file" name={name} required={required} style={{display: 'none'}} ref={hiddenInputRef} />
                <input {...getInputProps()} />
                {
                    
                    isDragActive ?
                    <div className='drag_files active'>
                        <p>Drop the files here ...</p>
                    </div>:
                    <div className='drag_files text-center'>
                        {
                            file 
                            ?
                            <img src={URL.createObjectURL(file)} alt="" />
                            :
                            <i className="iconoir-cloud-upload"></i>
                        }
                        <p>Drag 'n' drop image here, or click to select image</p>
                        <p>.png, .jpg, .jpeg max 2 MB</p>
                    </div>
                
                }
            </div>
        );
    }

    return (
        <>
            <Dropzone name="icon_upload" required={true}/>
            <ToastContainer /> 
        </>
    )
}