import React from 'react'
import { FileUploadDirectUpload } from './_components/file_upload'

const page = () => {
  return (
    <main className="mx-auto px-7 max-w-2xl pt-12 max-h-screen overflow-y-hidden py-6">
        <h1 className="text-3xl font-bold shadow-lg tracking-tight ">File Uploader</h1>
        <p className="text-sm text-muted-foreground py-4">
            Upload your files here.
        </p>
        <p className="text-xs pb-7 text-muted-foreground">
            (Please! don't upload large file I'm not running separate worker it's all on single thread)
        </p>
        <FileUploadDirectUpload />
    </main>
  )
}

export default page