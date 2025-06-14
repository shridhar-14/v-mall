import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 36) / 2; // Adjust based on padding & gap

const HomeScreen = ({ navigation }) => {
  const { dispatch: cartDispatch } = useContext(CartContext);
  const { wishlist, dispatch: wishlistDispatch } = useContext(WishlistContext);

  const [carts, setcarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState('');

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000);
  };

  const fetchcarts = async () => {
    try {
      const res = await fetch('https://dummyjson.com/carts');
      const data = await res.json();
      const allProducts = data.carts.flatMap(cart => cart.products);
      setcarts(allProducts);
    } catch (err) {
      alert('Failed to load carts');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('https://dummyjson.com/carts');
      const data = await res.json();
      const allProducts = data.carts.flatMap(cart => cart.products);
      setcarts(allProducts);
    } catch (err) {
      alert('Refresh failed');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchcarts();
  }, []);

  const renderItem = ({ item }) => {
    const isFav = wishlist.some(p => p.id === item.id);

    return (
      <View style={styles.card}>
        <View style={{ position: 'relative' }}>
          <Image
            source={{ uri: item.thumbnail || 'https://via.placeholder.com/150' }}
            style={styles.image}
          />
          <TouchableOpacity
            style={styles.heart}
            onPress={() => wishlistDispatch({ type: 'TOGGLE_WISHLIST', payload: item })}
          >
            <AntDesign name={isFav ? 'heart' : 'hearto'} size={20} color={isFav ? 'red' : '#999'} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{item.title || 'No Title'}</Text>
        <Text style={styles.price}>₹{item.price || 'N/A'}</Text>

        <TouchableOpacity
          style={styles.detailBtn}
          onPress={() => navigation.navigate('ProductDetail', { product: item })}
        >
          <Text style={styles.btnText}>Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => {
            cartDispatch({ type: 'ADD_TO_CART', payload: item });
            showMessage('Added to cart');
          }}
        >
          <Text style={styles.btnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} color="#007AFF" />;
  }

  return (
    <View style={{ flex: 1 }}>
      {message !== '' && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{message}</Text>
        </View>
      )}
      <FlatList
        data={carts}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 12,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#FDFEFF',
    borderRadius: 16,
    padding: 12,
    margin: 6,
    width: CARD_WIDTH,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    height: 100,
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  price: {
    fontSize: 13,
    color: '#27AE60',
    fontWeight: '600',
    marginBottom: 8,
  },
  detailBtn: {
    backgroundColor: '#1E90FF',
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  cartBtn: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
  },
  heart: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#ffffffdd',
    borderRadius: 20,
    padding: 4,
    elevation: 3,
  },
  toast: {
    position: 'absolute',
    top: 20,
    left: '10%',
    right: '10%',
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 12,
    zIndex: 1000,
    alignItems: 'center',
    elevation: 5,
  },
  toastText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default HomeScreen;