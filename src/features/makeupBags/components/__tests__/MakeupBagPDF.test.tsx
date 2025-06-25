import { render } from '@testing-library/react'
import type { ReactNode } from 'react'
import { describe, it, expect, vi } from 'vitest'

import { mockT } from '../../../../tests/mocks/translation'
import { mockCategory1 } from '../../../categories/__mocks__/categoriesApi'
import { mockStage1, mockStage2 } from '../../../stages/__mocks__/stagesApi'
import { mockTool1, mockTool2 } from '../../../tools/__mocks__/toolsApi'
import { mockMakeupBagPDFData } from '../../__mocks__/makeupBagsApi'
import MakeupBagPDF from '../MakeupBagPDF'

vi.mock('@react-pdf/renderer', () => ({
    Document: ({ children }: { children: ReactNode }) => (
        <div data-testid="mocked-pdf-document">{children}</div>
    ),

    Page: ({
        children,
        size,
        style,
    }: {
        children: ReactNode
        size: string
        style?: any
    }) => (
        <div data-testid="mocked-pdf-page" data-size={size} style={style}>
            {children}
        </div>
    ),

    Text: ({
        children,
        fixed,
        render,
        style,
    }: {
        children?: ReactNode
        fixed?: boolean
        render?: (props: any) => string
        style?: any
    }) => (
        <span data-testid="mocked-pdf-text" data-fixed={fixed} style={style}>
            {render ? render({ pageNumber: 1, totalPages: 1 }) : children}
        </span>
    ),

    View: ({
        children,
        break: breakProp,
        style,
        wrap,
    }: {
        children: ReactNode
        break?: boolean
        style?: any
        wrap?: boolean
    }) => (
        <div
            data-testid="mocked-pdf-view"
            data-break={breakProp}
            data-wrap={wrap}
            style={style}
        >
            {children}
        </div>
    ),

    Image: ({ src, style }: { src: string; style?: any }) => (
        <img
            alt="pdf-img"
            data-testid="mocked-pdf-image"
            src={src}
            style={style}
        />
    ),

    StyleSheet: { create: (styles: any) => styles },

    Font: { register: vi.fn() },
}))

describe('MakeupBagPDF', () => {
    describe('Component Rendering', () => {
        it('should render PDF document with basic structure', () => {
            const { getByTestId } = render(
                <MakeupBagPDF data={mockMakeupBagPDFData} t={mockT} />
            )

            expect(getByTestId('mocked-pdf-document')).toBeInTheDocument()
            expect(getByTestId('mocked-pdf-page')).toBeInTheDocument()

            expect(getByTestId('mocked-pdf-page')).toHaveAttribute(
                'data-size',
                'A4'
            )
        })

        it('should render header with category name and subtitle', () => {
            const { getAllByTestId } = render(
                <MakeupBagPDF data={mockMakeupBagPDFData} t={mockT} />
            )

            const textElements = getAllByTestId('mocked-pdf-text')

            expect(
                textElements.find((el) => el.textContent === mockCategory1.name)
            ).toBeInTheDocument()

            expect(
                textElements.find((el) => el.textContent === 'pdf.subtitle')
            ).toBeInTheDocument()
        })

        it('should render page numbers', () => {
            const { getAllByTestId } = render(
                <MakeupBagPDF data={mockMakeupBagPDFData} t={mockT} />
            )

            const textElements = getAllByTestId('mocked-pdf-text')

            expect(
                textElements.find((el) => el.textContent === '1 / 1')
            ).toHaveAttribute('data-fixed', 'true')
        })
    })

    describe('Stages Rendering', () => {
        it('should render all stages with titles', () => {
            const { getAllByTestId } = render(
                <MakeupBagPDF data={mockMakeupBagPDFData} t={mockT} />
            )

            const textElements = getAllByTestId('mocked-pdf-text')

            expect(
                textElements.some((el) => el.textContent === mockStage1.title)
            ).toBe(true)

            expect(
                textElements.some((el) => el.textContent === mockStage2.title)
            ).toBe(true)
        })

        it('should render stage images', () => {
            const { getAllByTestId } = render(
                <MakeupBagPDF data={mockMakeupBagPDFData} t={mockT} />
            )

            const images = getAllByTestId('mocked-pdf-image')

            const stageImages = images.filter(
                (img) =>
                    img.getAttribute('src')?.includes(mockStage1.imageUrl) ||
                    img.getAttribute('src')?.includes(mockStage2.imageUrl)
            )

            expect(stageImages).toHaveLength(
                mockMakeupBagPDFData.stages?.length!
            )
        })
    })

    describe('Tools Rendering', () => {
        it('should render tools section title', () => {
            const { getAllByTestId } = render(
                <MakeupBagPDF data={mockMakeupBagPDFData} t={mockT} />
            )

            const textElements = getAllByTestId('mocked-pdf-text')

            expect(
                textElements.some((el) => el.textContent === 'pdf.tools')
            ).toBe(true)
        })

        it('should render all tools with names', () => {
            const { getAllByTestId } = render(
                <MakeupBagPDF data={mockMakeupBagPDFData} t={mockT} />
            )

            const textElements = getAllByTestId('mocked-pdf-text')

            expect(
                textElements.some((el) => el.textContent === mockTool1.name)
            ).toBe(true)

            expect(
                textElements.some((el) => el.textContent === mockTool2.name)
            ).toBe(true)
        })

        it('should render one tool with name', () => {
            const { getAllByTestId } = render(
                <MakeupBagPDF
                    data={{ ...mockMakeupBagPDFData, tools: [mockTool1] }}
                    t={mockT}
                />
            )

            const textElements = getAllByTestId('mocked-pdf-text')

            expect(
                textElements.some((el) => el.textContent === mockTool1.name)
            ).toBe(true)

            expect(
                textElements.some((el) => el.textContent === mockTool2.name)
            ).toBe(false)
        })
    })

    describe('Edge Cases', () => {
        it('should handle missing category name gracefully', () => {
            const dataWithoutCategory = {
                ...mockMakeupBagPDFData,
                category: undefined,
            }

            const { getAllByTestId } = render(
                <MakeupBagPDF data={dataWithoutCategory} t={mockT} />
            )

            const textElements = getAllByTestId('mocked-pdf-text')

            expect(
                textElements.some(
                    (el) => el.textContent === 'pdf.fallbackCategory'
                )
            ).toBe(true)
        })

        it('should handle empty stages array', () => {
            const dataWithoutStages = {
                ...mockMakeupBagPDFData,
                stages: undefined,
            }

            const { getAllByTestId } = render(
                <MakeupBagPDF data={dataWithoutStages} t={mockT} />
            )

            const textElements = getAllByTestId('mocked-pdf-text')

            expect(
                textElements.some((el) => el.textContent === mockCategory1.name)
            ).toBe(true)

            expect(
                textElements.some((el) => el.textContent === mockStage1.title)
            ).toBe(false)
        })

        it('should handle empty tools array', () => {
            const dataWithoutTools = {
                ...mockMakeupBagPDFData,
                tools: undefined,
            }

            const { getAllByTestId } = render(
                <MakeupBagPDF data={dataWithoutTools} t={mockT} />
            )

            const textElements = getAllByTestId('mocked-pdf-text')

            expect(
                textElements.some((el) => el.textContent === 'pdf.tools')
            ).toBe(false)
        })
    })
})
