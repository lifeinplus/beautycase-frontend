import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useState } from 'react'

import config from '@/app/config/config'
import { CloudinaryImage } from '@/shared/components/image/CloudinaryImage'
import { ArrowButton } from './ui/ArrowButton'

export interface ImageSectionProps {
    imageIds?: string[]
    defaultImageId?: string
}

export const ImageSection = ({
    imageIds = [],
    defaultImageId = config.cloudinary.defaultProductId,
}: ImageSectionProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1)
        }
    }

    const handleNext = () => {
        if (currentIndex < imageIds.length - 1) {
            setCurrentIndex((prev) => prev + 1)
        }
    }

    return (
        <section className="relative mx-auto max-w-md space-y-2">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-md">
                <CloudinaryImage
                    className="h-full w-full object-cover transition-all duration-500"
                    imageId={imageIds[currentIndex]}
                    defaultImageId={defaultImageId}
                    width={800}
                />

                {imageIds.length > 1 && (
                    <>
                        {currentIndex > 0 && (
                            <ArrowButton
                                aria-label="Previous image"
                                className="left-3"
                                icon={ChevronLeftIcon}
                                onClick={handlePrev}
                            />
                        )}
                        {currentIndex < imageIds.length - 1 && (
                            <ArrowButton
                                aria-label="Next image"
                                className="right-3"
                                icon={ChevronRightIcon}
                                onClick={handleNext}
                            />
                        )}
                    </>
                )}
            </div>

            {imageIds.length > 1 && (
                <div className="flex justify-center gap-1">
                    {imageIds.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={classNames(
                                `h-2 w-2 cursor-pointer rounded-full`,
                                index === currentIndex
                                    ? 'bg-rose-500 dark:bg-rose-400'
                                    : 'bg-neutral-400/50',
                                'focus-visible:rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 focus-visible:outline-dashed dark:focus-visible:outline-rose-700'
                            )}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}
