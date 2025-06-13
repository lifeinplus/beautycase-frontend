import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    Font,
} from '@react-pdf/renderer'

import type { Stage } from '../../stages/types'
import type { Tool } from '../../tools/types'

Font.register({
    family: 'Roboto',
    fonts: [
        {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
            fontWeight: 'normal',
        },
        {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
            fontWeight: 'bold',
        },
    ],
})

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        paddingTop: 30,
        paddingBottom: 65,
        paddingHorizontal: 30,
        fontFamily: 'Roboto',
    },

    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 25,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },

    header: {
        marginBottom: 30,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    headerSubtitle: {
        fontSize: 14,
        color: '#334155',
        marginBottom: 20,
    },

    headerImage: {
        width: '100%',
        objectFit: 'cover',
        marginBottom: 15,
        borderRadius: 4,
    },

    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },

    stageContainer: {
        marginBottom: 30,
        padding: 15,
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
    },

    stageTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },

    stageSubtitle: {
        fontSize: 16,
        color: '#334155',
        marginBottom: 20,
        textAlign: 'center',
    },

    stageImage: {
        height: 300,
        objectFit: 'cover',
        marginBottom: 10,
        borderRadius: 4,
        marginHorizontal: 100,
    },

    stepsTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#2c3e50',
    },

    stepsList: {
        marginBottom: 15,
    },

    stepItem: {
        fontSize: 12,
        marginBottom: 4,
        color: '#34495e',
    },

    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    productCard: {
        width: '48%',
        marginBottom: 15,
        padding: 8,
        backgroundColor: '#ffffff',
        borderRadius: 4,
        alignItems: 'center',
    },

    productImage: {
        width: '50%',
        height: 100,
        objectFit: 'cover',
        marginBottom: 6,
        borderRadius: 3,
    },

    productName: {
        fontSize: 12,
        textAlign: 'center',
        color: '#2c3e50',
        marginBottom: 3,
    },

    productBrand: {
        fontSize: 10,
        color: '#334155',
        textAlign: 'center',
    },

    toolsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    toolCard: {
        width: '48%',
        marginBottom: 15,
        padding: 8,
        backgroundColor: '#ffffff',
        borderRadius: 4,
        alignItems: 'center',
    },

    toolImage: {
        width: '50%',
        height: 150,
        objectFit: 'cover',
        marginBottom: 6,
        borderRadius: 3,
    },

    toolName: {
        fontSize: 12,
        textAlign: 'center',
        color: '#2c3e50',
        marginTop: 3,
    },

    toolBrand: {
        fontSize: 10,
        color: '#334155',
        textAlign: 'center',
    },

    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
    },

    pageFooter: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        fontSize: 8,
        color: '#bdc3c7',
    },
})

interface MakeupBagData {
    category?: {
        name: string
    }
    stages?: Stage[]
    tools?: Tool[]
}

interface MakeupBagPDFProps {
    data: MakeupBagData
}

const MakeupBagPDF = ({ data }: MakeupBagPDFProps) => {
    const categoryName = data?.category?.name || 'Косметичка'
    const stages = data?.stages || []
    const tools = data?.tools || []

    const renderStages = () =>
        stages.map((stage, index) => (
            <View key={index} style={styles.stageContainer} break={index > 0}>
                <Text style={styles.stageTitle}>{stage.title}</Text>

                <Text style={styles.stageSubtitle}>{stage.subtitle}</Text>

                <Image style={styles.stageImage} src={stage.imageUrl} />

                {stage.steps && stage.steps.length > 0 && (
                    <View style={styles.stepsList}>
                        <Text style={styles.stepsTitle}>Шаги:</Text>

                        {stage.steps.map((step, stepIndex) => (
                            <Text key={stepIndex} style={styles.stepItem}>
                                {stepIndex + 1}. {step}
                            </Text>
                        ))}
                    </View>
                )}

                {stage.products && stage.products.length > 0 && (
                    <View style={styles.productsGrid} break>
                        {stage.products.map((product, productIndex) => (
                            <View key={productIndex} style={styles.productCard}>
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

    const renderTools = () => (
        <View style={styles.toolsGrid}>
            {tools.map((tool, index) => (
                <View key={index} style={styles.toolCard}>
                    <Image style={styles.toolImage} src={tool.imageUrl} />

                    <Text style={styles.toolName}>{tool.name}</Text>

                    {tool.brand?.name && (
                        <Text style={styles.toolBrand}>{tool.brand.name}</Text>
                    )}
                </View>
            ))}
        </View>
    )

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{categoryName}</Text>
                    <Text style={styles.headerSubtitle}>
                        Индивидуальный подбор продуктов
                    </Text>
                    <Image
                        style={styles.headerImage}
                        src={
                            'https://res.cloudinary.com/beautycase/image/upload/v1732162378/title_gm1yla.png'
                        }
                    />
                </View>

                {stages.length > 0 && (
                    <View break>
                        <Text style={styles.sectionTitle}>Этапы</Text>
                        {renderStages()}
                    </View>
                )}

                {tools.length > 0 && (
                    <View break>
                        <Text style={styles.sectionTitle}>Инструменты</Text>
                        {renderTools()}
                    </View>
                )}

                <View style={styles.header} break>
                    <Text style={styles.headerTitle}>
                        Спасибо, что выбрали меня!
                    </Text>
                    <Text style={styles.text}>
                        Если остались вопросы по косметике или необходим урок по
                        какому-либо ещё макияжу, обращайтесь по телефону: +381
                        62 9446 904 (Сербия) Буду рада помочь)
                    </Text>
                    <Text style={styles.text}>
                        Мои услуги: все виды макияжа, укладки, причёски,
                        обучение, подарочные сертификаты
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
