import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  box: {
    padding: 20,
  },
  lbl: {
    fontWeight: 'bold',
    marginTop: 15,
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
    marginTop: 5
  },

  tag: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  tagSelected: { backgroundColor: colors.primary },
  tagText: { color: colors.primary, fontWeight: 'bold' },

  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },

  inputLocation: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: colors.gray,
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
    backgroundColor: colors.danger,
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
    borderColor: colors.gray,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#FFF',
  },
  dateLabel: { fontSize: 12, color: '#888', marginBottom: 2 },
  dateValue: { fontSize: 16, color: '#333', fontWeight: '500' },

  btnVideo: {
    borderWidth: 2,
    borderColor: colors.primary,
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
    borderColor: colors.gray,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#FFF'
  }

});