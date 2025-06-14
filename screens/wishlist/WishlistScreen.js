import React, { useContext } from 'react';
import { View, FlatList, Text, StyleSheet, Image } from 'react-native';
import { WishlistContext } from '../../context/WishlistContext';

const WishlistScreen = () => {
  const { wishlist } = useContext(WishlistContext);

  return (
    <View style={styles.container}>
      {wishlist.length === 0 ? (
        <Text style={styles.emptyText}>Your wishlist is empty 💔</Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.thumbnail }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>₹{item.price}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f4f7f9',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    textAlign: 'center',
    marginTop: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    height: 150,
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#e91e63',
  },
});

export default WishlistScreen;