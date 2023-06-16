import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import { fetchRandomProfile } from './api';

const UserList = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=10');
      const fetchedUsers = response.data.results;

      const fetchProfilePromises = fetchedUsers.map(async (user) => {
        const url = await fetchRandomProfile();
        return { ...user, photoUrl: url };
      });

      const usersWithProfile = await Promise.all(fetchProfilePromises);

      setUsers(usersWithProfile);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', padding: 10 }}>
          {item.photoUrl ? (
            <Image source={{ uri: item.photoUrl }} style={{ width: 200, height: 200 }} />
          ) : (
            <ActivityIndicator />
          )}
          <Text>{item.name.first} {item.name.last}</Text>
        </View>
      )}
    />
  );
};

export default UserList;