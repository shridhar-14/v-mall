import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { CartContext } from '../../context/CartContext';

const CartScreen = () => {
  const { cart, dispatch } = useContext(CartContext);
  const [message, setMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    showMessage('Removed from cart');
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      {message !== '' && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{message}</Text>
        </View>
      )}

      {cart.length === 0 ? (
        <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>
                  ₹{item.price} x {item.quantity}
                </Text>
                <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(item.id)}>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ₹{getTotalPrice()}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
  toast: {
    position: 'absolute',
    top: 15,
    left: '10%',
    right: '10%',
    backgroundColor: '#ff4d4d',
    padding: 12,
    borderRadius: 8,
    zIndex: 999,
    alignItems: 'center',
    elevation: 6,
  },
  toastText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyText: {
    marginTop: 150,
    textAlign: 'center',
    fontSize: 18,
    color: '#777',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#ccc',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  price: {
    fontSize: 15,
    color: '#009688',
    marginBottom: 10,
  },
  removeButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF6B6B',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  removeText: {
    color: '#fff',
    fontWeight: '500',
  },
  totalContainer: {
    padding: 16,
    backgroundColor: '#E6F0FA',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#007AFF',
  },
});

export default CartScreen;