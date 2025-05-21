"use client"
import FileInput from '@/components/file-input'
import FormField from '@/components/form-field'
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from '@/constants'
import { useFileInput } from '@/lib/hooks/useFileInput'
import { ChangeEvent, useState } from 'react'

const UploadPage = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        visibility: "public"
    })

    const video = useFileInput(MAX_VIDEO_SIZE);
    const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

    const [error, setError] = useState<string | null>(null)

    const handleInputChange = (e: ChangeEvent) => {
        const { name, value } = e.target

        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div className="wrapper-md upload-page">
            <h1>Upload a Video</h1>
            {error && <div className='error-field'>{error}</div>}

            <form className="ronuded-20 shadow-10 gap-6 w-full flex-flex-col px-5 py-7 5">
                <FormField
                    id="title"
                    label="Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter a clear and concise video title"
                />
                <FormField
                    id="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe what this video is about"
                    as="textarea"
                />
                <FileInput
                    id="video"
                    label="Video"
                    accept="video/*"
                    file={video.file}
                    previewUrl={video.previewUrl}
                    inputRef={video.inputRef}
                    onChange={video.onChange}
                    onReset={video.resetFile}
                    type="video"
                />
                <FileInput
                    id="thumbnail"
                    label="Thumbnail"
                    accept="image/*"
                    file={thumbnail.file}
                    previewUrl={thumbnail.previewUrl}
                    inputRef={thumbnail.inputRef}
                    onChange={thumbnail.onChange}
                    onReset={thumbnail.resetFile}
                    type="image"
                />
                <FormField
                    id="visibility"
                    label="Visibility"
                    value={formData.visibility}
                    onChange={handleInputChange}
                    options={[
                        { value: "public", label: "Public" },
                        { value: "private", label: "Private" }
                    ]}
                    as="select"
                />
            </form>
        </div>
    )
}

export default UploadPage