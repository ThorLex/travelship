import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import {
  Card,
  Title,
  Text,
  List,
  Button,
  TextInput,
  useTheme,
  Surface,
  Divider,
} from 'react-native-paper';
import { CreditCard, Smartphone, DollarSign, Plus, Trash2 } from 'lucide-react-native';

export default function Payment() {
  const theme = useTheme();
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const paymentMethods = [
    {
      id: '1',
      type: 'card',
      name: 'Carte bancaire',
      details: '**** **** **** 1234',
      expiry: '12/26',
      isDefault: true,
    },
    {
      id: '2',
      type: 'wallet',
      name: 'Portefeuille électronique',
      details: 'Solde: 45.50€',
      isDefault: false,
    },
  ];

  const recentTransactions = [
    {
      id: '1',
      type: 'payment',
      description: 'Paiement colis PKG001',
      amount: '-25.00€',
      date: '15/01/2025',
      status: 'Complété',
    },
    {
      id: '2',
      type: 'refund',
      description: 'Remboursement PKG002',
      amount: '+40.00€',
      date: '14/01/2025',
      status: 'Complété',
    },
    {
      id: '3',
      type: 'payment',
      description: 'Paiement colis PKG003',
      amount: '-15.00€',
      date: '13/01/2025',
      status: 'En cours',
    },
  ];

  const handleAddCard = () => {
    if (!cardNumber || !expiryDate || !cvv || !cardName) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    Alert.alert('Succès', 'Carte ajoutée avec succès', [
      { text: 'OK', onPress: () => {
        setShowAddCard(false);
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
        setCardName('');
      }}
    ]);
  };

  const handleDeletePaymentMethod = (id: string) => {
    Alert.alert(
      'Supprimer',
      'Êtes-vous sûr de vouloir supprimer cette méthode de paiement ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive' },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={[styles.title, { color: theme.colors.primary }]}>
          Méthodes de paiement
        </Title>
        <Text style={styles.subtitle}>
          Gérez vos moyens de paiement
        </Text>
      </View>

      {/* Solde du portefeuille */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.walletHeader}>
            <View style={styles.walletInfo}>
              <Text style={styles.walletLabel}>Solde disponible</Text>
              <Text style={[styles.walletAmount, { color: theme.colors.primary }]}>
                45.50€
              </Text>
            </View>
            <Button
              mode="outlined"
              onPress={() => {}}
              style={styles.addFundsButton}
            >
              Recharger
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Méthodes de paiement */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Moyens de paiement</Text>
            <Button
              mode="text"
              onPress={() => setShowAddCard(true)}
              icon={() => <Plus size={16} color={theme.colors.primary} />}
            >
              Ajouter
            </Button>
          </View>

          {paymentMethods.map((method) => (
            <Surface key={method.id} style={styles.paymentMethodItem} elevation={1}>
              <View style={styles.paymentMethodContent}>
                <View style={styles.paymentMethodIcon}>
                  {method.type === 'card' ? (
                    <CreditCard size={24} color={theme.colors.primary} />
                  ) : (
                    <Smartphone size={24} color={theme.colors.primary} />
                  )}
                </View>
                <View style={styles.paymentMethodInfo}>
                  <Text style={styles.paymentMethodName}>{method.name}</Text>
                  <Text style={styles.paymentMethodDetails}>{method.details}</Text>
                  {method.expiry && (
                    <Text style={styles.paymentMethodExpiry}>Expire: {method.expiry}</Text>
                  )}
                  {method.isDefault && (
                    <Text style={[styles.defaultLabel, { color: theme.colors.primary }]}>
                      Par défaut
                    </Text>
                  )}
                </View>
                <Button
                  mode="text"
                  onPress={() => handleDeletePaymentMethod(method.id)}
                  icon={() => <Trash2 size={16} color="#F44336" />}
                >
                </Button>
              </View>
            </Surface>
          ))}
        </Card.Content>
      </Card>

      {/* Formulaire d'ajout de carte */}
      {showAddCard && (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Ajouter une carte</Text>
            
            <TextInput
              label="Numéro de carte"
              value={cardNumber}
              onChangeText={setCardNumber}
              mode="outlined"
              style={styles.input}
              keyboardType="numeric"
              placeholder="1234 5678 9012 3456"
            />

            <View style={styles.row}>
              <TextInput
                label="MM/AA"
                value={expiryDate}
                onChangeText={setExpiryDate}
                mode="outlined"
                style={[styles.input, styles.halfWidth]}
                placeholder="12/26"
              />
              <TextInput
                label="CVC"
                value={cvv}
                onChangeText={setCvv}
                mode="outlined"
                style={[styles.input, styles.halfWidth]}
                keyboardType="numeric"
                placeholder="123"
              />
            </View>

            <TextInput
              label="Nom sur la carte"
              value={cardName}
              onChangeText={setCardName}
              mode="outlined"
              style={styles.input}
              placeholder="Jean Dupont"
            />

            <View style={styles.buttonRow}>
              <Button
                mode="outlined"
                onPress={() => setShowAddCard(false)}
                style={styles.cancelButton}
              >
                Annuler
              </Button>
              <Button
                mode="contained"
                onPress={handleAddCard}
                style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
              >
                Ajouter
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Historique des transactions */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Transactions récentes</Text>
          
          {recentTransactions.map((transaction, index) => (
            <View key={transaction.id}>
              <View style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  <DollarSign 
                    size={20} 
                    color={transaction.type === 'payment' ? '#F44336' : '#4CAF50'} 
                  />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionDescription}>
                    {transaction.description}
                  </Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                  <Text style={[
                    styles.transactionStatus,
                    { color: transaction.status === 'Complété' ? '#4CAF50' : '#FF9800' }
                  ]}>
                    {transaction.status}
                  </Text>
                </View>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.type === 'payment' ? '#F44336' : '#4CAF50' }
                ]}>
                  {transaction.amount}
                </Text>
              </View>
              {index < recentTransactions.length - 1 && <Divider style={styles.divider} />}
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
  },
  card: {
    margin: 16,
    backgroundColor: '#FFFFFF',
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletInfo: {
    flex: 1,
  },
  walletLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  walletAmount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  addFundsButton: {
    borderColor: '#00C896',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  paymentMethodItem: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodIcon: {
    marginRight: 16,
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 2,
  },
  paymentMethodDetails: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 2,
  },
  paymentMethodExpiry: {
    fontSize: 12,
    color: '#757575',
  },
  defaultLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },
  input: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    borderColor: '#757575',
  },
  addButton: {
    flex: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 2,
  },
  transactionStatus: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 8,
  },
});