import React from 'react';
import { Page, Text, View, Document } from '@react-pdf/renderer';

import { styles } from './ca-detailed-report-pdf.styles';

const CADetailedReportPDFDoc = ({
  totalDurationObj: { h, m, s },
  totalOpeExps,
  totalMatExps,
  data,
}) => {
  return data.length !== 0 ? (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>
          Detailed Charges Report by Etimetracking
        </Text>

        <View style={styles.subHeads}>
          <Text style={styles.author}>
            {data.length > 0 &&
              `${data[0]['Start Date']} - ${
                data[data.length - 1]['Start Date']
              }`}
          </Text>
        </View>

        <View style={styles.subHeads}>
          <Text>{`Total Time: ${h}:${m}:${s}`}</Text>
        </View>
        <View style={styles.subHeads}>
          <Text>Operating Expenses: {totalOpeExps} USD</Text>
        </View>
        <View style={styles.subHeads}>
          <Text>Material Expenses: {totalMatExps} USD</Text>
        </View>
        <View style={styles.subHeads}>
          <Text>Total Amount: {totalOpeExps + totalMatExps} USD</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHs}>
            <Text style={styles.hDate}>Date</Text>
            <Text style={styles.hDescription}>Description</Text>
            <Text style={styles.hDuration}>Duration</Text>
            <Text style={styles.hUser}>User</Text>
          </View>
          <View style={styles.tableList}>
            {data.length !== 0 &&
              data.map((item) => (
                <View style={styles.tableEntry}>
                  <Text style={styles.hDate}>
                    {item['Start Date']}
                  </Text>
                  <Text style={styles.hDescription}>
                    {item.Description
                      ? item.Description
                      : '(No description)'}
                  </Text>
                  <Text style={styles.hDuration}>
                    {item['Duration (HH:mm:ss)']}
                  </Text>
                  <Text style={styles.hUser}>{item.User}</Text>
                  <Text style={styles.hDate}></Text>
                  <Text style={styles.hDescription}>
                    {item.Project}
                  </Text>
                  <Text style={styles.hDuration}>
                    {`${item['Start Time']} - ${item['End Time']}`}
                  </Text>
                  <Text style={styles.hUser}>0.00 USD</Text>

                  {/* MAT EXP */}
                  {item.materialExps &&
                    item.materialExps.length !== 0 && (
                      <Text style={styles.expHead}>
                        Material Expenses:
                      </Text>
                    )}
                  {item.materialExps &&
                    item.materialExps.length !== 0 && (
                      <View style={styles.matEntry}>
                        <View style={styles.matHead}>
                          <Text style={styles.hDescription}>
                            Name
                          </Text>
                          <Text style={styles.hDateMat}>
                            Quantity
                          </Text>
                          <Text style={styles.hDateMat}>
                            Price Per Unit
                          </Text>
                          <Text style={styles.hDateMat}>Total</Text>
                        </View>
                        {item.materialExps.map((exp) => (
                          <View style={styles.matBody}>
                            <Text style={styles.hDescription}>
                              {exp.materialName}
                            </Text>
                            <Text style={styles.hDateMat}>
                              {exp.quantity}
                            </Text>
                            <Text style={styles.hDateMat}>
                              {exp.pricePerUnit}
                            </Text>
                            <Text style={styles.hDateMat}>
                              {exp.quantity * exp.pricePerUnit}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}

                  {/* OPE EXP */}

                  {item.operatingExps &&
                    item.operatingExps.length !== 0 && (
                      <Text style={styles.expHead}>
                        Operational Expenses:
                      </Text>
                    )}

                  {item.operatingExps &&
                    item.operatingExps.length !== 0 && (
                      <View style={styles.matEntry}>
                        <View style={styles.matHead}>
                          <Text style={styles.hDateOpe}>Amount</Text>
                          <Text style={styles.hDateOpe}>
                            Expense Type
                          </Text>
                          <Text style={styles.hDescription}>
                            Note
                          </Text>
                        </View>
                        {item.operatingExps.map((exp) => (
                          <View style={styles.matBody}>
                            <Text style={styles.hDateOpe}>
                              {exp.amount}
                            </Text>
                            <Text style={styles.hDateOpe}>
                              {exp.expType.expenseName}
                            </Text>
                            <Text style={styles.hDescription}>
                              {exp.note}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
                </View>
              ))}
          </View>
        </View>
        <View style={styles.signArea}>
          <Text style={styles.signText}>Sign Here</Text>
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
  ) : (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>
          Detailed Report by Etimetracking
        </Text>
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
};

export default CADetailedReportPDFDoc;
