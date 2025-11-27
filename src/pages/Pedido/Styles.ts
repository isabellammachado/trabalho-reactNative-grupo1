import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  box: {
    padding: 20,
  },
  lbl: {
    fontWeight: 'bold',
    marginTop: 15,
    color: '#4F4F4F',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
    marginTop: 5
  },

  tag: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#1591EA',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  tagSelected: { backgroundColor: '#1591EA' },
  tagText: { color: '#1591EA', fontWeight: 'bold' },

  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },

  inputLocation: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#9f9e9eff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    minHeight: 50,
    textAlignVertical: 'center'
  },
  inputDisabled: {
    backgroundColor: '#E0E0E0',
    color: '#666'
  },
  iconBox: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  btnAgora: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },

  dateBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#9f9e9eff',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  dateLabel: { fontSize: 12, color: '#4F4F4F', marginBottom: 2 },
  dateValue: { fontSize: 16, color: '#4F4F4F', fontWeight: '500' },

  btnVideo: {
    borderWidth: 2,
    borderColor: '#1591EA',
    borderStyle: 'dashed',
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    gap: 10,
    backgroundColor: '#e3f2fd'
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#9f9e9eff',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#FFF'
  }

});