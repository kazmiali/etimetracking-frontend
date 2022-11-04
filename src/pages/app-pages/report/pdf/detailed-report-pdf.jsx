import React from 'react';
import { Page, Text, View, Document } from '@react-pdf/renderer';

import { styles } from './detailed-report-pdf.styles';

export default function PdfDocument({
  totalDurationObj: { h, m, s },
  totalbillableHours,
  billableRate,
  data,
}) {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>
          Detailed Report by Etimetracking
        </Text>
        <Text style={styles.author}>
          {data.length > 0 &&
            `${data[0]['Start Date']} - ${
              data[data.length - 1]['Start Date']
            }`}
        </Text>

        <View style={styles.subHeads}>
          <Text>{`Total: ${h}:${m}:${s}`}</Text>
          <Text
            style={styles.abc}
          >{`Billable: ${totalbillableHours.h}:${totalbillableHours.m}:${totalbillableHours.s}`}</Text>
          <Text style={styles.abc}>
            Amount: {totalbillableHours.h * billableRate} USD
          </Text>
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
