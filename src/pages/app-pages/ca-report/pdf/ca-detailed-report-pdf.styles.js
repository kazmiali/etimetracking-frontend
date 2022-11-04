import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
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
  },
  tableHs: {
    width: '100%',
    borderBottom: '1px solid grey',
    color: 'grey',
    flexDirection: 'row',
    fontSize: '10',
    marginBottom: '10',
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
  },
  hDate: {
    minWidth: '13%',
    maxWidth: '13%',
    paddingBottom: '4',
  },
  hDescription: {
    minWidth: '40%',
    maxWidth: '40%',
    paddingBottom: '4',
  },
  max: {
    maxWidth: '40%',
  },
  hDuration: {
    minWidth: '25%',
    maxWidth: '25%',
    paddingLeft: '5',
    paddingBottom: '4',
  },
  hUser: {
    minWidth: '20%',
    maxWidth: '20%',
    paddingBottom: '4',
  },
  abc: {
    color: '#000',
    marginLeft: '10',
  },
  expHead: {
    fontSize: 12,
    width: '100%',
    paddingTop: '8',
  },
  matHead: {
    flexDirection: 'row',
    paddingTop: '4',
    color: 'grey',
  },
  matBody: {
    flexDirection: 'row',
  },
  hDateMat: {
    minWidth: '20%',
    maxWidth: '20%',
    paddingBottom: '4',
  },
  hDateOpe: {
    minWidth: '25%',
    maxWidth: '25%',
    paddingBottom: '4',
  },
  signArea: {
    padding: '50px 20px 20xp 20px',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  signText: {
    fontSize: '14',
    marginRight: '10',
    marginTop: '20',
    paddingTop: 5,
    paddingLeft: 30,
    paddingRight: 30,
    borderTop: '1',
  },
});
