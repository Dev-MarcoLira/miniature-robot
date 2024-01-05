import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import '../styles/fileUploadForm.css'


const FileUploadForm = () =>{

    const [ dragging, setDragging ] = useState(false)
    const [ files, setFiles ] = useState([])

    const springProps = useSpring({
        opacity: files.length > 0 ? 1 : 0,
        marginTop: files.length > 0 ? 20 : 0,
    })

    const handleDragEnter = e =>{

        e.preventDefault()
        setDragging(true)
    }

    const handleDragOver = e =>{
        e.preventDefault()
    }

    const handleDragLeave = () => {
        setDragging(false)
    }

    const handleDrop = e =>{
        e.preventDefault()

        setDragging(false)

        const droppedFiles = Array.from(e.dataTransfer.files)
        setFiles([ ...files, ...droppedFiles ])
    }

    const handleFileRemove = index =>{
        const newFiles = [ ...files ]

        newFiles.splice(index, 1)
        setFiles(newFiles)
    }

    const handleUpload = () =>{
        console.log('Uploading files: ', files)
    }

    return (
        <div className='file-upload-container'>

            <div
                className={ `drop-area ${dragging ? 'dragging' : ''}` }
                onDragEnter={ handleDragEnter }                
                onDragOver={ handleDragOver }
                onDragLeave={ handleDragLeave }
                onDrop={ handleDrop }
            >
                <p>Drag and drop files here or click to select files</p>
            </div>

            <animated.div className='file-list' style={ springProps }>
                <ul>
                    {
                        files.map((file, index)=> {
                            <li key={ index }>
                                { file.name }
                                <button onClick={ () => handleFileRemove(index) }>Remove</button>
                            </li>
                        })
                    }
                </ul>
            </animated.div>

            <button onClick={ handleUpload }>Upload</button>

        </div>
    )

}

export default FileUploadForm