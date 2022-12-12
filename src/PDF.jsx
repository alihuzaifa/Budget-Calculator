import React from 'react';
import { Page, Text, Document, StyleSheet, View } from '@react-pdf/renderer';

const style = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    }
})

const PDF = (props) => {
    const { data } = props
    return (
        <>
            {/* Document Component is the total pdf maker either you make it 1 page or Multiple Page */}
            {
                <Document>
                    <Page style={style.body}>
                        <View style={{ borderBottom: '1px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingVertical: "10px", paddingHorizontal: "3px", fontWeight: "bold" }}>
                            <Text>Item Name</Text>
                            <Text>Item Price</Text>
                        </View>
                        {
                            data.map((v, index) => {
                                return (
                                    <View key={index} style={{ borderBottom: '1px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: "3px", paddingVertical: "10px" }}>
                                        <Text>{v.itemName}</Text>
                                        <Text>{v.itemPrice}</Text>
                                    </View>
                                )
                            })
                        }
                    </Page>
                </Document>

            }
        </>
    )
}

export default PDF;