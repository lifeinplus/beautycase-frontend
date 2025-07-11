import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    Font,
} from '@react-pdf/renderer'
import { TFunction } from 'i18next'

import config from '@/app/config'
import type { MakeupBagData } from '../types'

Font.register({
    family: 'Roboto',
    fonts: [
        {
            src: config.fonts.robotoRegular,
            fontWeight: 'normal',
        },
        {
            src: config.fonts.robotoBold,
            fontWeight: 'bold',
        },
    ],
})

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        fontFamily: 'Roboto',
        paddingBottom: 60,
        paddingHorizontal: 30,
        paddingTop: 30,
    },

    pageNumber: {
        color: 'grey',
        bottom: 25,
        fontSize: 12,
        left: 0,
        position: 'absolute',
        right: 0,
        textAlign: 'center',
    },

    text: {
        fontSize: 14,
        margin: 12,
        textAlign: 'justify',
    },

    header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        textAlign: 'center',
    },

    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    headerSubtitle: {
        color: '#334155',
        fontSize: 18,
    },

    headerImage: {
        borderRadius: 4,
        marginBottom: 15,
        objectFit: 'cover',
        width: '70%',
    },

    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },

    stageTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },

    stageSubtitle: {
        color: '#334155',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },

    stageImage: {
        borderRadius: 4,
        height: 300,
        marginBottom: 10,
        marginHorizontal: 100,
        objectFit: 'cover',
    },

    stepsTitle: {
        color: '#2c3e50',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    stepsList: {
        marginBottom: 15,
    },

    stepItem: {
        color: '#34495e',
        fontSize: 12,
        marginBottom: 4,
    },

    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 30,
    },

    productCard: {
        alignItems: 'center',
        marginTop: 15,
        width: '50%',
    },

    productImage: {
        borderRadius: 3,
        height: 100,
        marginBottom: 6,
    },

    productName: {
        color: '#2c3e50',
        fontSize: 12,
        marginBottom: 3,
        textAlign: 'center',
    },

    productBrand: {
        color: '#334155',
        fontSize: 10,
        textAlign: 'center',
    },

    toolsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    toolCard: {
        alignItems: 'center',
        marginBottom: 15,
        width: '50%',
    },

    toolImage: {
        borderRadius: 3,
        height: 100,
        marginBottom: 6,
    },

    toolName: {
        color: '#2c3e50',
        fontSize: 12,
        marginTop: 3,
        textAlign: 'center',
    },

    toolBrand: {
        color: '#334155',
        fontSize: 10,
        textAlign: 'center',
    },

    pageFooter: {
        bottom: 30,
        color: '#bdc3c7',
        fontSize: 8,
        left: 30,
        right: 30,
        textAlign: 'center',
        position: 'absolute',
    },
})

interface MakeupBagPDFProps {
    data: MakeupBagData
    t: TFunction<'makeupBag'>
}

const MakeupBagPDF = ({ data, t }: MakeupBagPDFProps) => {
    const categoryName = t(`categories.${data?.category?.name}.full`)
    const stages = data?.stages || []
    const tools = data?.tools || []

    const renderStages = () =>
        stages.map((stage, index) => (
            <View key={index}>
                <View wrap={false}>
                    <Text style={styles.stageTitle}>{stage.title}</Text>
                    <Text style={styles.stageSubtitle}>{stage.subtitle}</Text>
                    <Image style={styles.stageImage} src={stage.imageUrl} />
                </View>

                {stage.steps && stage.steps.length > 0 && (
                    <View style={styles.stepsList} wrap={false}>
                        <Text style={styles.stepsTitle}>
                            {t('stage:steps')}:
                        </Text>

                        {stage.steps.map((step, stepIndex) => (
                            <Text key={stepIndex} style={styles.stepItem}>
                                {stepIndex + 1}. {step}
                            </Text>
                        ))}
                    </View>
                )}

                {stage.products && stage.products.length > 0 && (
                    <View style={styles.productsGrid}>
                        {stage.products.map((product, productIndex) => (
                            <View
                                key={productIndex}
                                style={styles.productCard}
                                wrap={false}
                            >
                                <Image
                                    style={styles.productImage}
                                    src={product.imageUrl}
                                />

                                <Text style={styles.productName}>
                                    {product.name}
                                </Text>

                                {product.brand?.name && (
                                    <Text style={styles.productBrand}>
                                        {product.brand.name}
                                    </Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}
            </View>
        ))

    const renderTools = () => {
        // Split tools into two groups for layout purposes
        const firstTools = tools.length > 2 ? tools.slice(0, 2) : tools
        const restTools = tools.length > 2 ? tools.slice(2) : []

        return (
            <>
                <View wrap={false}>
                    <Text style={styles.sectionTitle}>
                        {t('tool:titles.list')}
                    </Text>

                    <View style={styles.toolsGrid}>
                        {firstTools.map((tool, index) => (
                            <View
                                key={tool._id ? tool._id : `tool-${index}`}
                                style={styles.toolCard}
                                wrap={false}
                            >
                                <Image
                                    style={styles.toolImage}
                                    src={tool.imageUrl}
                                />

                                <Text style={styles.toolName}>{tool.name}</Text>

                                {tool.brand?.name && (
                                    <Text style={styles.toolBrand}>
                                        {tool.brand.name}
                                    </Text>
                                )}
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.toolsGrid}>
                    {restTools.map((tool, index) => (
                        <View
                            key={tool._id ? tool._id : `tool-rest-${index}`}
                            style={styles.toolCard}
                            wrap={false}
                        >
                            <Image
                                style={styles.toolImage}
                                src={tool.imageUrl}
                            />

                            <Text style={styles.toolName}>{tool.name}</Text>

                            {tool.brand?.name && (
                                <Text style={styles.toolBrand}>
                                    {tool.brand.name}
                                </Text>
                            )}
                        </View>
                    ))}
                </View>
            </>
        )
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{categoryName}</Text>
                    <Text style={styles.headerSubtitle}>
                        {t('hero.byline')}
                    </Text>
                </View>

                {stages.length && renderStages()}

                {tools.length && renderTools()}

                <View style={styles.header} break>
                    <Text style={styles.headerTitle}>
                        {t('component:footer.thanks')}
                    </Text>

                    <Text
                        style={styles.text}
                    >{`${t('component:footer.questions')}: ${t('component:footer.phone')} (${t('component:footer.country')}) ${t('component:footer.help')}`}</Text>

                    <Image
                        style={styles.headerImage}
                        src={config.cloudinary.makeupBagHero}
                    />

                    <Text style={styles.text}>
                        {t('component:footer.services')}
                    </Text>
                </View>

                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) =>
                        `${pageNumber} / ${totalPages}`
                    }
                    fixed
                />
            </Page>
        </Document>
    )
}

export default MakeupBagPDF
