import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
  card: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  descricao: {
    color: '#555',
    fontSize: 14,
  },
  loading: {
    marginTop: 50,
  },
  controles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  paginacao: {
    fontWeight: 'bold',
    color: colors.text
  }
});