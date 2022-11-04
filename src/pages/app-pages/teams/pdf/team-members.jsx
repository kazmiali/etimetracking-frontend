import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
  },
  subHeads: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: '15',
  },
  subHead2: {
    fontSize: '20px',
  },
  author: {
    fontSize: 16,
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  table: {
    flexDirection: 'column',
    width: '100%',
    paddingTop: '30',
  },
  tableHs: {
    width: '100%',
    borderBottom: '1px solid grey',
    color: 'grey',
    flexDirection: 'row',
    fontSize: '10',
    marginBottom: '4',
    borderBottomWidth: '1',
    borderBottomStyle: 'solid',
    borderBottomColor: 'grey',
  },
  tableList: {
    flexDirection: 'column',
    width: '100%',
  },
  tableEntry: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'flex-start',
    minHeight: '20',
    borderBottomWidth: '1',
    borderBottomStyle: 'solid',
    borderBottomColor: 'grey',
    fontSize: '10',
    textOverflow: 'hidden',
    paddingTop: '10',
  },
  hDate: {
    minWidth: '20%',
    maxWidth: '20%',
    paddingBottom: '4',
  },
  hDescription: {
    minWidth: '30%',
    maxWidth: '30%',
    paddingBottom: '4',
  },
  max: {
    maxWidth: '40%',
  },
  hDuration: {
    minWidth: '15%',
    maxWidth: '15%',
    paddingLeft: '5',
    paddingBottom: '4',
  },
  hUser: {
    minWidth: '35%',
    maxWidth: '35%',
    paddingBottom: '4',
  },
  abc: {
    color: '#000',
    marginLeft: '10',
  },
});

export default function PdfDocument(props) {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>
          {`Team member of workspace ${props.workspaceName}`}
        </Text>

        <View style={styles.table}>
          <View style={styles.tableHs}>
            <Text style={styles.hDate}>Employee Number</Text>
            <Text style={styles.hDescription}>Name</Text>
            <Text style={styles.hUser}>Email</Text>
            <Text style={styles.hDuration}>Role</Text>
          </View>
          <View style={styles.tableList}>
            {props.data.length !== 0 &&
              props.data.map((item) => (
                <View style={styles.tableEntry}>
                  <Text style={styles.hDate}>
                    {item['Employee Number']}
                  </Text>
                  <Text style={styles.hDescription}>{item.Name}</Text>
                  <Text style={styles.hUser}>{item.Email}</Text>
                  <Text style={styles.hDuration}>{item.Role}</Text>
                </View>
              ))}
          </View>
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
  );
}
