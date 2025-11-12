import { AdvancedImage } from '@cloudinary/react'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useState } from 'react'

import config from '@/app/config/config'
import cloudinary from '@/shared/lib/cloudinary/cloudinary'
import { ArrowButton } from './ui/ArrowButton'

export interface ImageSectionProps {
    imageIds?: string[]
}

export const ImageSection = ({ imageIds }: ImageSectionProps) => {
    if (!imageIds?.length) return null

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

    const publicId =
        imageIds[currentIndex] || config.cloudinary.defaultThumbnailName

    const cldImg = cloudinary
        .image(publicId)
        .resize(scale().width(800))
        .format('auto')
        .quality('auto')

    return (
        <section className="relative mx-auto mb-3 max-w-md">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-md">
                <AdvancedImage
                    cldImg={cldImg}
                    className="h-full w-full object-cover transition-all duration-500"
                />

                {imageIds.length > 1 && (
                    <>
                        {currentIndex > 0 && (
                            <ArrowButton
                                aria-label="Previous image"
                                icon={ChevronLeftIcon}
                                onClick={handlePrev}
                                side="left"
                            />
                        )}
                        {currentIndex < imageIds.length - 1 && (
                            <ArrowButton
                                aria-label="Next image"
                                icon={ChevronRightIcon}
                                onClick={handleNext}
                                side="right"
                            />
                        )}
                    </>
                )}
            </div>

            {imageIds.length > 1 && (
                <div className="mt-2 flex justify-center gap-1">
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
